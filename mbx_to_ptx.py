#!/usr/bin/env python3
"""
mbx_to_ptx.py — MathBookXML fork → modern PreTeXt tag migrator  (v8)
======================================================================
Transformation pipeline (applied in order)
-------------------------------------------
  0.   <me>\\begin{split}…</me>     → <md>/<mrow>
  1.   <men …>                      → <md number="yes">
  2.   Tag renames (TAG_MAP)         me→md, bluebox→insight, specialcase→observation
  2.5  Wrap bare <md> content        → <mrow>
  2.6  Strip \\def\\X{\\color{…}}   from <mrow> / after <md>
  2.7  &amp;                         → \\amp inside <mrow>
  3.   <latex-code> TikZ             → <image> (CDATA-aware, <p>-managed)
  4.   <restrict-version>            → <paragraphs component="…">
  4.5  \\vec{…}                      → \\begin{pmatrix}…\\end{pmatrix}
  5.   \\amat{…} / \\mat{…}         → array / bmatrix (\\amp separators)
  5.5  \\color{red}                  → \\color{highlight} inside <mrow>
  6.   Closing punctuation           moved outside </md>
  7.   \\syseq{…}                    → \\left\\{\\begin{alignedat}{N+1}…\\right.

       ALIGNMENT MODEL (v8):
       Each \\+-separated group gives ONE variable column. \\. gives a blank
       column. The converted alignedat{N+1} has:
         • r-col k: the k-th variable's coefficient (right-aligned), or {}
         • l-col k (k<N): operator between col k and col k+1 ({}+{}/{}-{}/{}),
           placed in its OWN column so all instances of that operator are aligned
         • l-col N: the = sign — every row's = is in the SAME column
         • r-col N+1: RHS value (right-aligned)
       This produces a proper typeset grid with every element aligned.

  8.   hide-type="…"                 attribute removed
  9.   label="…" on ol/ul            → marker="…"

Usage
-----
    python mbx_to_ptx.py myfile.xml [--dry-run | --in-place --backup]
    python mbx_to_ptx.py source/ --recursive [--dry-run | --in-place --backup]
    python mbx_to_ptx.py source/ --recursive --list-todos
"""

import argparse
import re
import shutil
import sys
from pathlib import Path

# ─────────────────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────────────────

TAG_MAP: dict[str, str] = {
    "me":          "md",
    "bluebox":     "insight",
    "specialcase": "observation",
}

SOURCE_EXTENSIONS = {".xml", ".ptx", ".mbx"}
_FILL_MARKER = "<!-- FILL:"
_TODO_MARKER = "%% TODO:"

_MROW_PAT = re.compile(r"<mrow>([\s\S]*?)</mrow>", re.DOTALL)
_MD_PAT   = re.compile(r"<md(\b[^>]*)>([\s\S]*?)</md>",  re.DOTALL)


# ─────────────────────────────────────────────────────────────────────────────
# Utility: balanced-brace helpers
# ─────────────────────────────────────────────────────────────────────────────

def _find_matching_brace(text: str, open_pos: int) -> int:
    depth = 0; i = open_pos
    while i < len(text):
        ch = text[i]
        if ch == "\\": i += 2; continue
        if ch == "{": depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0: return i
        i += 1
    return -1


def _iter_macro_calls(text: str, macro: str):
    """Yield (start, end, content) for every \\macro{…} span."""
    search_from = 0; cmd = "\\" + macro; cmd_len = len(cmd)
    while True:
        idx = text.find(cmd, search_from)
        if idx == -1: break
        after = idx + cmd_len
        if after < len(text) and text[after].isalpha():
            search_from = idx + 1; continue
        j = after
        while j < len(text) and text[j] in " \t\n\r": j += 1
        if j >= len(text) or text[j] != "{": search_from = idx + 1; continue
        close = _find_matching_brace(text, j)
        if close == -1: search_from = idx + 1; continue
        yield idx, close + 1, text[j + 1 : close]
        search_from = close + 1


# ─────────────────────────────────────────────────────────────────────────────
# Utility: matrix / row tokenisers
# ─────────────────────────────────────────────────────────────────────────────

def _split_matrix_entries(row_text: str) -> list[str]:
    """Whitespace-at-depth-0 tokeniser; strips trailing commas."""
    tokens: list[str] = []; buf: list[str] = []; depth = 0
    i = 0; s = row_text.strip(); n = len(s)
    while i < n:
        c = s[i]
        if c == "\\":
            buf.append(c); i += 1
            if i < n:
                if s[i].isalpha() or s[i] == "@":
                    while i < n and (s[i].isalpha() or s[i] == "@"):
                        buf.append(s[i]); i += 1
                else:
                    buf.append(s[i]); i += 1
            continue
        if c == "{": depth += 1; buf.append(c)
        elif c == "}": depth -= 1; buf.append(c)
        elif c in " \t\n\r" and depth == 0:
            tok = "".join(buf).rstrip(",")
            if tok: tokens.append(tok)
            buf = []
        else:
            buf.append(c)
        i += 1
    tok = "".join(buf).rstrip(",")
    if tok: tokens.append(tok)
    return tokens


def _split_on_semicolons(content: str) -> list[str]:
    """Split on ';' at depth 0. '\\;' (thick space) is not a separator."""
    rows: list[str] = []; buf: list[str] = []; depth = 0; i = 0
    while i < len(content):
        ch = content[i]
        if ch == "\\":
            nxt = content[i + 1] if i + 1 < len(content) else ""
            if nxt == ";": buf.extend(["\\", ";"]); i += 2; continue
            buf.append(ch)
            if nxt: buf.append(nxt); i += 2; continue
        elif ch == "{": depth += 1; buf.append(ch)
        elif ch == "}": depth -= 1; buf.append(ch)
        elif ch == ";" and depth == 0:
            row = "".join(buf).strip()
            if row: rows.append(row)
            buf = []; i += 1; continue
        else: buf.append(ch)
        i += 1
    tail = "".join(buf).strip()
    if tail: rows.append(tail)
    return rows


# ─────────────────────────────────────────────────────────────────────────────
# Step 0 — <me>\\begin{split}…</me> → <md>/<mrow>
# ─────────────────────────────────────────────────────────────────────────────

_SPLIT_ENV_PAT = re.compile(
    r"<me>((?:(?!</?me>)[\s\S])*?)\\begin\{split\}"
    r"([\s\S]*?)\\end\{split\}"
    r"((?:(?!</?me>)[\s\S])*?)</me>",
    re.DOTALL,
)


def _split_rows_at_dbl_backslash(content: str) -> list[str]:
    rows: list[str] = []; buf: list[str] = []; depth = 0; i = 0
    while i < len(content):
        ch = content[i]
        if ch == "\\":
            if i + 1 < len(content) and content[i + 1] == "\\":
                if depth == 0:
                    row = "".join(buf).strip()
                    if row: rows.append(row)
                    buf = []; i += 2
                    while i < len(content) and content[i] in " \t": i += 1
                    continue
                else:
                    buf.extend(["\\", "\\"]); i += 2; continue
            buf.append(ch); i += 1; continue
        if ch == "{": depth += 1
        elif ch == "}": depth -= 1
        buf.append(ch); i += 1
    last = "".join(buf).strip()
    if last: rows.append(last)
    return [r for r in rows if r]


def _transform_split(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; count = 0
    def _replacer(m: re.Match) -> str:
        nonlocal count
        prefix = m.group(1).strip()
        rows = _split_rows_at_dbl_backslash(m.group(2))
        if not rows: return m.group(0)
        mrows: list[str] = []
        for idx, row in enumerate(rows):
            row_clean = row.replace("&amp;", r"\amp").strip()
            if idx == 0 and prefix: row_clean = prefix + "\n" + row_clean
            if row_clean: mrows.append(f"<mrow>{row_clean}</mrow>")
        if not mrows: return m.group(0)
        count += 1
        result = "\n".join(["<md>"] + mrows + ["</md>"])
        suffix = m.group(3).strip()
        if suffix: result += suffix
        return result
    new_text = _SPLIT_ENV_PAT.sub(_replacer, text)
    if count: changes.append(f"\\begin{{split}} → <md>/<mrow> ({count} instance(s))")
    return new_text, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 1 — <men> → <md number="yes">
# ─────────────────────────────────────────────────────────────────────────────

_MEN_OPEN = re.compile(r"<men(\b[^>]*?)(/>|>)", re.DOTALL)


def _transform_men(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []
    def _open(m: re.Match) -> str:
        a = m.group(1); e = m.group(2)
        return f'<md{a} number="yes"{e}' if a.strip() else f'<md number="yes"{e}'
    new_text, n = _MEN_OPEN.subn(_open, text)
    if n: changes.append(f'<men> → <md number="yes"> ({n} opening/self-closing tag(s))')
    nc = new_text.count("</men>"); new_text = new_text.replace("</men>", "</md>")
    if nc: changes.append(f"</men> → </md> ({nc} closing tag(s))")
    return new_text, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 2 — Simple tag renames
# ─────────────────────────────────────────────────────────────────────────────

def _build_tag_pattern(old: str) -> re.Pattern:
    return re.compile(r"(</?)(?:" + re.escape(old) + r")(?=[\s>/])", re.MULTILINE)

_TAG_PATTERNS = [(_build_tag_pattern(o), o, n) for o, n in TAG_MAP.items()]


def _apply_tag_renames(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; result = text
    for pattern, old, new in _TAG_PATTERNS:
        result2, count = pattern.subn(r"\g<1>" + new, result)
        if count: changes.append(f"{old} → {new} ({count} substitution(s))")
        result = result2
    return result, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 2.5 — Wrap bare <md> in <mrow>
# ─────────────────────────────────────────────────────────────────────────────

def _wrap_md_mrow(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; count = 0
    def _r(m: re.Match) -> str:
        nonlocal count
        body = m.group(2)
        if "<mrow>" in body: return m.group(0)
        s = body.strip()
        if not s: return m.group(0)
        count += 1
        return f"<md{m.group(1)}>\n<mrow>{s}</mrow>\n</md>"
    new_text = _MD_PAT.sub(_r, text)
    if count: changes.append(f"Wrapped bare <md> content in <mrow> ({count} block(s))")
    return new_text, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 2.6 — Strip \\def\\X{\\color{…}} macros
# ─────────────────────────────────────────────────────────────────────────────

_DEF_COLOR_PAT = re.compile(r"\\def\\[a-zA-Z]\{\\color\{[^}]*\}\}\s*", re.MULTILINE)


def _strip_color_defs(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; total = [0]
    def _mrow_r(m: re.Match) -> str:
        body, n = _DEF_COLOR_PAT.subn("", m.group(1)); total[0] += n
        return f"<mrow>{body}</mrow>"
    t = _MROW_PAT.sub(_mrow_r, text)
    _md_after = re.compile(r"(<md\b[^>]*>)([ \t\n\r]*)" + _DEF_COLOR_PAT.pattern, re.DOTALL)
    t2, n2 = _md_after.subn(r"\1\2", t); total[0] += n2
    if total[0]:
        changes.append(
            r"\def\X{\color{…}} macros stripped from math blocks "
            f"({total[0]} instance(s)) — ensure they are in docinfo <macros>"
        )
    return t2, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 2.7 — &amp; → \\amp inside <mrow>
# ─────────────────────────────────────────────────────────────────────────────

def _transform_amp_in_mrow(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; total = [0]
    def _r(m: re.Match) -> str:
        body = m.group(1); n = body.count("&amp;")
        if n: total[0] += n; body = body.replace("&amp;", r"\amp")
        return f"<mrow>{body}</mrow>"
    t = _MROW_PAT.sub(_r, text)
    if total[0]: changes.append(f"&amp; → \\amp inside <mrow> ({total[0]} substitution(s))")
    return t, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 3 — <latex-code> TikZ → <image> (CDATA-aware, <p>-managed)
# ─────────────────────────────────────────────────────────────────────────────

_LATEX_CODE_PAT  = re.compile(r"<latex-code>([\s\S\n]*?)</latex-code>", re.MULTILINE)
_CDATA_OPEN      = re.compile(r"<!\[CDATA\[")
_CDATA_CLOSE     = "]]>"
_TRAILING_P      = re.compile(r"<p(\b[^>]*)>\s*$", re.DOTALL)
_LEADING_CLOSE_P = re.compile(r"^\s*</p>", re.DOTALL)


def _transform_tikz(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; count = 0; parts: list[str] = []; prev_end = 0
    for m in _LATEX_CODE_PAT.finditer(text):
        raw = m.group(1); has_cdata = False
        cm = _CDATA_OPEN.search(raw)
        if cm and _CDATA_CLOSE in raw:
            has_cdata = True; body = raw[cm.end() : raw.rfind(_CDATA_CLOSE)]
        else:
            body = raw
        if not body.strip().startswith("\\begin{tikzpicture}"): continue
        count += 1
        inner = f"<![CDATA[{body}]]>" if has_cdata else body
        img = (
            "<image>\n<shortdescription>\n"
            "<!-- FILL: Brief alt-text for this TikZ figure (linear algebra context) -->\n"
            "</shortdescription>\n<description>\n<p>\n"
            "<!-- FILL: Complete accessibility description of this TikZ figure "
            "for a linear algebra course -->\n</p>\n"
            f"</description>\n<latex-image>{inner}</latex-image>\n</image>"
        )
        pre = text[prev_end : m.start()]
        tp = _TRAILING_P.search(pre)
        if tp: pre = pre[: tp.start()]; prefix = ""
        else:  prefix = "</p>\n"
        rem = text[m.end() :]; cp = _LEADING_CLOSE_P.match(rem)
        if cp: suffix = ""; next_end = m.end() + cp.end()
        else:  suffix = "\n<p>"; next_end = m.end()
        parts.append(pre); parts.append(prefix + img + suffix); prev_end = next_end
    parts.append(text[prev_end:]); result = "".join(parts)
    if count:
        changes.append(
            f"<latex-code> TikZ → <image> wrapper ({count} figure(s); "
            f"accessibility placeholders need filling)"
        )
    return result, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 4 — <restrict-version> → <paragraphs component="…">
# ─────────────────────────────────────────────────────────────────────────────

_RV_OPEN = re.compile(r"<restrict-version\b([^>]*?)>", re.DOTALL)
_RV_VER  = re.compile(r'(?:version|component)=["\']([^"\']+)["\']')


def _transform_restrict_version(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []
    def _r(m: re.Match) -> str:
        vm = _RV_VER.search(m.group(1)); comp = vm.group(1) if vm else "FIXME"
        return f'<paragraphs component="{comp}">'
    t, n = _RV_OPEN.subn(_r, text); t = t.replace("</restrict-version>", "</paragraphs>")
    if n: changes.append(f'<restrict-version> → <paragraphs component="…"> ({n} instance(s))')
    return t, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 4.5 — \\vec{…} → pmatrix
# ─────────────────────────────────────────────────────────────────────────────

def _convert_vec(content: str) -> str:
    entries = _split_matrix_entries(content)
    if not entries: return f"\\vec{{{content}}}"
    body = " \\\\\n".join(entries)
    result = f"\\begin{{pmatrix}}\n{body}\n\\end{{pmatrix}}"
    if len(entries) == 1:
        result += (
            "  %% CHECK: was \\vec{" + content.strip() + "}; "
            "if a vector-accent (v⃗) was intended, revert to \\vec"
        )
    return result


def _transform_vec(text: str) -> tuple[str, list[str]]:
    locs = list(_iter_macro_calls(text, "vec"))
    if not locs: return text, []
    parts: list[str] = []; prev = 0
    for s, e, c in locs:
        parts.append(text[prev:s]); parts.append(_convert_vec(c)); prev = e
    parts.append(text[prev:])
    return "".join(parts), [f"\\vec{{}} → pmatrix column vector ({len(locs)} instance(s))"]


# ─────────────────────────────────────────────────────────────────────────────
# Step 5 — \\amat{…} / \\mat{…} → standard matrix environments
# ─────────────────────────────────────────────────────────────────────────────

def _convert_amat(content: str) -> str:
    rows = _split_on_semicolons(content)
    if not rows: return f"\\amat{{{content}}}"
    parsed = [_split_matrix_entries(r) for r in rows]
    n = max((len(r) for r in parsed), default=0)
    if n < 2:
        body = " \\\\\n".join(r" \amp ".join(r) for r in parsed)
        return f"\\begin{{bmatrix}}\n{body}\n\\end{{bmatrix}}"
    spec = "r" * (n - 1) + "|r"
    body = " \\\\\n".join(r" \amp ".join(r) for r in parsed)
    return f"\\left[\\begin{{array}}{{{spec}}}\n{body}\n\\end{{array}}\\right]"


def _convert_mat(content: str) -> str:
    rows = _split_on_semicolons(content)
    if not rows: return f"\\mat{{{content}}}"
    parsed = [_split_matrix_entries(r) for r in rows]
    body = " \\\\\n".join(r" \amp ".join(r) for r in parsed)
    return f"\\begin{{bmatrix}}\n{body}\n\\end{{bmatrix}}"


def _transform_matrices(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []
    ac = list(_iter_macro_calls(text, "amat"))
    if ac:
        parts: list[str] = []; prev = 0
        for s, e, c in ac:
            parts.append(text[prev:s]); parts.append(_convert_amat(c)); prev = e
        parts.append(text[prev:]); text = "".join(parts)
        changes.append(f"\\amat{{}} → augmented array ({len(ac)} instance(s))")
    mc = list(_iter_macro_calls(text, "mat"))
    if mc:
        parts = []; prev = 0
        for s, e, c in mc:
            parts.append(text[prev:s]); parts.append(_convert_mat(c)); prev = e
        parts.append(text[prev:]); text = "".join(parts)
        changes.append(f"\\mat{{}} → bmatrix ({len(mc)} instance(s))")
    return text, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 5.5 — \\color{red} → \\color{highlight} inside <mrow>
# ─────────────────────────────────────────────────────────────────────────────

_COLOR_RED_PAT = re.compile(r"\\color\{red\}")


def _transform_color_red(text: str) -> tuple[str, list[str]]:
    changes: list[str] = []; total = [0]
    def _r(m: re.Match) -> str:
        body, n = _COLOR_RED_PAT.subn(r"\\color{highlight}", m.group(1))
        total[0] += n; return f"<mrow>{body}</mrow>"
    t = _MROW_PAT.sub(_r, text)
    if total[0]:
        changes.append(f"\\color{{red}} → \\color{{highlight}} ({total[0]} substitution(s) in <mrow>)")
    return t, changes


# ─────────────────────────────────────────────────────────────────────────────
# Step 6 — Closing punctuation outside </md>
# ─────────────────────────────────────────────────────────────────────────────

_CLOSE_PUNCT_PAT = re.compile(r"([.,;])\s*(</md>)", re.MULTILINE)


def _transform_closing_punct(text: str) -> tuple[str, list[str]]:
    t, n = _CLOSE_PUNCT_PAT.subn(r"\2\1", text)
    return t, [f"Closing punctuation moved outside math tags ({n} instance(s))"] if n else []


# ─────────────────────────────────────────────────────────────────────────────
# Step 7 — \\syseq{…} → \\left\\{\\begin{alignedat}{N+1}…\\right.
#
# ALIGNMENT MODEL (v8) — proper grid with one column per variable:
#
#   alignedat{N+1} for N variable columns:
#     r-col k   : k-th variable coefficient, right-aligned (or {} if absent)
#     l-col k   : operator between col k and col k+1 ({}+{}, {}-{}, or {})
#     l-col N   : {}={} — the = sign; same column for EVERY row → aligned
#     r-col N+1 : RHS value, right-aligned
#     l-col N+1 : {} (punctuation placeholder)
#
#   This matches the structure of standard mathematical systems typography.
#
# PARSING:
#   \\+ separates column groups; each group → one variable column.
#   \\. (pure blank group) → blank {} in that column.
#   The group containing '=' → lhs terms fill remaining columns, rhs extracted.
#   Groups without '=' → single variable term for that column.
# ─────────────────────────────────────────────────────────────────────────────

_PURE_DOT_RE = re.compile(r"^\s*(\\\.\s*)+$")


def _has_eq_at_depth0(text: str) -> bool:
    """Return True if '=' appears at depth 0 (not <= >= != ==)."""
    depth = 0; i = 0
    while i < len(text):
        ch = text[i]
        if ch == "\\": i += 2; continue
        if ch == "{": depth += 1
        elif ch == "}": depth -= 1
        elif ch == "=" and depth == 0:
            p = text[i - 1] if i > 0 else ""; n = text[i + 1] if i + 1 < len(text) else ""
            if p not in "<>!=" and n != "=": return True
        i += 1
    return False


def _split_on_eq_depth0(text: str) -> tuple[str, str]:
    """Split text on the first '=' at depth 0. Returns (lhs, rhs) or (text, '')."""
    depth = 0; i = 0
    while i < len(text):
        ch = text[i]
        if ch == "\\": i += 2; continue
        if ch == "{": depth += 1
        elif ch == "}": depth -= 1
        elif ch == "=" and depth == 0:
            p = text[i - 1] if i > 0 else ""; n = text[i + 1] if i + 1 < len(text) else ""
            if p not in "<>!=" and n != "=":
                return text[:i].rstrip(), text[i + 1:].lstrip()
        i += 1
    return text, ""


def _split_on_syseq_plus(row: str) -> list[str]:
    r"""
    Split *row* on \\+ (backslash immediately followed by +) at depth 0.
    Colour macros like \\r followed by + are NOT split: in \\r+, the \\
    consumes \\r (two chars), so the + is only a plain plus.
    """
    groups: list[str] = []; buf: list[str] = []; depth = 0; i = 0
    while i < len(row):
        ch = row[i]
        if ch == "\\":
            if depth == 0 and i + 1 < len(row) and row[i + 1] == "+":
                groups.append("".join(buf)); buf = []; i += 2; continue
            buf.append(ch)
            if i + 1 < len(row): buf.append(row[i + 1]); i += 2
            else: i += 1
            continue
        if ch == "{": depth += 1
        elif ch == "}": depth -= 1
        buf.append(ch); i += 1
    groups.append("".join(buf))
    return groups


def _is_blank_term(t: str) -> bool:
    """True if term is \\. (one or more blank placeholders)."""
    return bool(re.match(r"^\s*(\\\.\s*)+$", t))


def _parse_lhs_terms(lhs: str) -> tuple[list[str], list[str]]:
    r"""
    Split an equation LHS like 'x + 2y - 3z' into terms and inter-term operators.

    Returns (terms, ops) where ops[i] connects terms[i] to terms[i+1].
      'x + 2y - 3z' → (['x', '2y', '3z'], ['+', '-'])
      '-7y - 4z'    → (['-7y', '4z'], ['-'])    # leading - stays with first term
      '10z'         → (['10z'], [])
    """
    terms: list[str] = []; ops: list[str] = []; buf: list[str] = []
    depth = 0; i = 0; s = lhs.strip()
    while i < len(s):
        ch = s[i]
        if ch == "\\":
            buf.append(ch)
            if i + 1 < len(s): buf.append(s[i + 1]); i += 2
            else: i += 1
            continue
        if ch == "{": depth += 1; buf.append(ch)
        elif ch == "}": depth -= 1; buf.append(ch)
        elif ch in "+-" and depth == 0:
            term = "".join(buf).strip()
            if term:
                terms.append(term); ops.append(ch); buf = []
            else:
                buf.append(ch)  # leading sign → part of first term
        else:
            buf.append(ch)
        i += 1
    last = "".join(buf).strip()
    if last: terms.append(last)
    return terms, ops


def _strip_rlap(row: str) -> tuple[str, str]:
    """Extract trailing \\rlap punctuation. Returns (cleaned_row, punct_char)."""
    m = re.search(r"\\rlap\s*(?:(\.)|\{([^}]*)\})\s*$", row)
    if m:
        punct = m.group(1) or m.group(2) or ""
        return row[: m.start()].rstrip(), punct
    return row, ""


def _convert_syseq(content: str) -> str:
    r"""
    Convert a \\syseq{…} body to a \\left\\{alignedat{N+1}\\right. block.

    Each \\+-separated group yields ONE variable column:
      • Pure \\. group  → blank column ({})
      • Group with '='  → parse lhs into per-column terms; extract rhs
      • Other group     → single-term column (no '=')

    The resulting alignedat has N+1 column pairs where N = number of variable
    columns (max across all rows):
      r-col k   : k-th variable term (or {})
      l-col k   : operator {}+{} / {}-{} / {} (blank)
      l-col N   : {}={} (= sign — same column every row)
      r-col N+1 : rhs
      l-col N+1 : {} (punctuation or empty)
    """
    rows_raw = _split_on_semicolons(content)
    if not rows_raw:
        return f"\\syseq{{{content}}}"

    rows_raw[-1], punct = _strip_rlap(rows_raw[-1])

    # ── Parse each row into a flat list of (kind, term, op_after) entries ────
    # kind: 'blank' | 'term'
    # term: LaTeX string for the variable coefficient (empty for blank)
    # op_after: '+', '-', or '' (operator connecting THIS col to NEXT col;
    #           '' means: infer later from context or neighbouring row)
    parsed_entries: list[list[tuple[str, str, str]]] = []
    parsed_rhs: list[str] = []

    for row in rows_raw:
        groups = [g.strip() for g in _split_on_syseq_plus(row)]
        entries: list[tuple[str, str, str]] = []
        rhs = ""

        for g in groups:
            if _PURE_DOT_RE.match(g):
                entries.append(("blank", "", ""))
            elif _has_eq_at_depth0(g):
                lhs_g, rhs_g = _split_on_eq_depth0(g)
                rhs = rhs_g.strip()
                terms_g, ops_g = _parse_lhs_terms(lhs_g.strip())
                for ti, t in enumerate(terms_g):
                    op = ops_g[ti] if ti < len(ops_g) else ""
                    if _is_blank_term(t):
                        entries.append(("blank", "", op))
                    else:
                        entries.append(("term", t, op))
            else:
                # Single-term group without '=' (e.g. 'x' in a diagonal system)
                terms_g, ops_g = _parse_lhs_terms(g)
                for ti, t in enumerate(terms_g):
                    op = ops_g[ti] if ti < len(ops_g) else ""
                    if _is_blank_term(t):
                        entries.append(("blank", "", op))
                    else:
                        entries.append(("term", t, op))

        parsed_entries.append(entries)
        parsed_rhs.append(rhs)

    n_cols = max((len(e) for e in parsed_entries), default=1)
    n_cols = max(n_cols, 1)

    # ── Build alignedat rows ──────────────────────────────────────────────────
    alignat_rows: list[str] = []
    n_rows = len(parsed_entries)

    for ri, (entries, rhs) in enumerate(zip(parsed_entries, parsed_rhs)):
        # Pad short rows with blank entries
        padded = list(entries) + [("blank", "", "")] * (n_cols - len(entries))
        cells: list[str] = []

        for ci in range(n_cols):
            kind, term, op = padded[ci]
            r = term if kind == "term" else "{}"
            cells.append(r)

            if ci == n_cols - 1:
                # Last variable column: l-col = equals sign
                cells.append("{}={}")
            else:
                # Determine operator for the l-col between col ci and ci+1
                nkind, nterm, _ = padded[ci + 1]
                if r == "{}" or nkind == "blank":
                    # At least one side is absent → blank operator column
                    cells.append("{}")
                elif op == "+":
                    cells.append("{}+{}")
                elif op == "-":
                    cells.append("{}-{}")
                else:
                    # op not set (inter-group transition): infer from next term sign
                    if nterm.lstrip().startswith("-"):
                        cells.append("{}")   # minus is embedded in the term
                    else:
                        cells.append("{}+{}")

        # RHS and punctuation
        rhs_str = rhs + (punct if ri == n_rows - 1 else "")
        cells.extend([rhs_str, "{}"])
        alignat_rows.append(" \\amp ".join(cells))

    body = " \\\\\n".join(alignat_rows)
    return (
        f"\\left\\{{\\begin{{alignedat}}{{{n_cols + 1}}}\n"
        f"{body}\n"
        f"\\end{{alignedat}}\\right."
    )


def _transform_syseq(text: str) -> tuple[str, list[str]]:
    locs = list(_iter_macro_calls(text, "syseq"))
    if not locs: return text, []
    parts: list[str] = []; prev = 0; count = 0
    for s, e, c in locs:
        parts.append(text[prev:s]); parts.append(_convert_syseq(c))
        prev = e; count += 1
    parts.append(text[prev:])
    return "".join(parts), [f"\\syseq{{}} → alignedat ({count} conversion(s))"]


# ─────────────────────────────────────────────────────────────────────────────
# Step 8 — Remove hide-type="…" attribute
# ─────────────────────────────────────────────────────────────────────────────

_HIDE_TYPE_PAT = re.compile(r'\s+hide-type=(?:"[^"]*"|\'[^\']*\')')


def _transform_hide_type(text: str) -> tuple[str, list[str]]:
    """Remove non-standard hide-type="…" attribute from any element."""
    t, n = _HIDE_TYPE_PAT.subn("", text)
    return t, [f"hide-type attribute removed ({n} instance(s))"] if n else []


# ─────────────────────────────────────────────────────────────────────────────
# Step 9 — label="…" → marker="…" on <ol> / <ul>
# ─────────────────────────────────────────────────────────────────────────────

_LIST_LABEL_PAT = re.compile(r'(<(?:ol|ul)\b[^>]*?)\blabel=', re.DOTALL)


def _transform_list_label(text: str) -> tuple[str, list[str]]:
    """Replace label= with marker= on <ol> and <ul> tags only."""
    t, n = _LIST_LABEL_PAT.subn(r'\1marker=', text)
    return t, [f"label= → marker= on ol/ul ({n} instance(s))"] if n else []


# ─────────────────────────────────────────────────────────────────────────────
# Main pipeline
# ─────────────────────────────────────────────────────────────────────────────

_PIPELINE = [
    ("split→md",         _transform_split),
    ("men→md",           _transform_men),
    ("tag-renames",      _apply_tag_renames),
    ("wrap-md-mrow",     _wrap_md_mrow),
    ("strip-color-defs", _strip_color_defs),
    ("amp-in-mrow",      _transform_amp_in_mrow),
    ("tikz",             _transform_tikz),
    ("restrict-version", _transform_restrict_version),
    ("vec",              _transform_vec),
    ("matrices",         _transform_matrices),
    ("color-red",        _transform_color_red),
    ("closing-punct",    _transform_closing_punct),
    ("syseq",            _transform_syseq),
    ("hide-type",        _transform_hide_type),
    ("list-label",       _transform_list_label),
]


def migrate_text(source: str) -> tuple[str, list[str]]:
    result = source; all_changes: list[str] = []
    for _name, fn in _PIPELINE:
        result, step = fn(result); all_changes.extend(step)
    todos = result.count(_FILL_MARKER) + result.count(_TODO_MARKER)
    if todos and all_changes:
        all_changes.append(
            f"⚠  {todos} placeholder(s) need manual review (run --list-todos to locate them)"
        )
    return result, all_changes


def count_todos_in_file(path: Path, encoding: str = "utf-8") -> list[tuple[int, str]]:
    try: lines = path.read_text(encoding=encoding).splitlines()
    except UnicodeDecodeError: lines = path.read_text(encoding="latin-1").splitlines()
    return [(i + 1, ln) for i, ln in enumerate(lines) if _FILL_MARKER in ln or _TODO_MARKER in ln]


# ─────────────────────────────────────────────────────────────────────────────
# File / directory helpers
# ─────────────────────────────────────────────────────────────────────────────

def migrate_file(src: Path, dst: Path, *, dry_run=False, backup=False, encoding="utf-8") -> list[str]:
    try: text = src.read_text(encoding=encoding)
    except UnicodeDecodeError: text = src.read_text(encoding="latin-1"); encoding = "latin-1"
    migrated, changes = migrate_text(text)
    if not changes: return []
    if not dry_run:
        if backup and src == dst and src.exists():
            shutil.copy2(src, src.with_suffix(src.suffix + ".bak"))
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(migrated, encoding=encoding)
    return changes


def _default_output(src: Path) -> Path:
    return src.with_stem(src.stem + "_ptx").with_suffix(".ptx")


def _collect_sources(root: Path) -> list[Path]:
    return [p for p in root.rglob("*")
            if p.is_file() and p.suffix.lower() in SOURCE_EXTENSIONS and not p.name.endswith(".bak")]


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Migrate MathBookXML fork source files to modern PreTeXt.",
        formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__,
    )
    parser.add_argument("input"); parser.add_argument("-o", "--output", default=None)
    parser.add_argument("-r", "--recursive", action="store_true")
    parser.add_argument("--in-place", action="store_true"); parser.add_argument("--backup", action="store_true")
    parser.add_argument("--dry-run", action="store_true"); parser.add_argument("--list-todos", action="store_true")
    parser.add_argument("--encoding", default="utf-8")
    args = parser.parse_args(argv)
    src_path = Path(args.input).expanduser().resolve()
    if not src_path.exists():
        print(f"ERROR: path not found: {src_path}", file=sys.stderr); return 1

    if args.list_todos:
        files = _collect_sources(src_path) if src_path.is_dir() else [src_path]
        any_found = False
        for f in sorted(files):
            hits = count_todos_in_file(f, encoding=args.encoding)
            if hits:
                any_found = True; rel = f.relative_to(src_path) if src_path.is_dir() else f.name
                print(f"\n{rel}")
                for ln, l in hits: print(f"  line {ln:4d}: {l.strip()}")
        if not any_found: print("No unfilled placeholders found.")
        return 0

    if src_path.is_dir():
        if not args.recursive:
            print("ERROR: input is a directory — pass --recursive.", file=sys.stderr); return 1
        files = _collect_sources(src_path)
        if not files: print("No source files found.", file=sys.stderr); return 0
        tf = tc = 0
        for f in sorted(files):
            dst = f if args.in_place else _default_output(f)
            changes = migrate_file(f, dst, dry_run=args.dry_run, backup=args.backup, encoding=args.encoding)
            if changes:
                tf += 1; tc += len(changes); tag = "[DRY-RUN] " if args.dry_run else ""
                print(f"{tag}{f.relative_to(src_path)}")
                for c in changes: print(f"    {c}")
                if not args.in_place and not args.dry_run:
                    print(f"    → written to {dst.relative_to(src_path)}")
        print(f"\n{'(dry-run) ' if args.dry_run else ''}{tf} file(s) modified, {tc} item(s) reported.")
    else:
        dst = src_path if args.in_place else (Path(args.output).expanduser().resolve() if args.output else _default_output(src_path))
        changes = migrate_file(src_path, dst, dry_run=args.dry_run, backup=args.backup, encoding=args.encoding)
        if changes:
            tag = "[DRY-RUN] " if args.dry_run else ""
            print(f"{tag}{src_path.name}")
            for c in changes: print(f"    {c}")
            if not args.dry_run and not args.in_place: print(f"    → written to {dst}")
        else:
            print("No changes needed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
