#!/usr/bin/env python3
"""
Download the interactive demos embedded in Interactive Linear Algebra
(https://textbooks.math.gatech.edu/ila/) together with every HTML, JS, CSS,
image, font and data file they need, mirrored with the site's folder layout.

Covers:
  * demos embedded directly in book pages (iframes, lazy-loaded data-src, etc.)
  * demos hidden inside knowls - both knowl files (knowl="knowl/....html")
    and in-page hidden knowl content, including HTML-escaped/script-escaped markup
  * the front-matter page itself with its cover image, stylesheets and scripts

Usage (Python 3.8+, standard library only):
    python3 scrape_ila_demos.py                   # saves to ./ila_demos
    python3 scrape_ila_demos.py --out mydir --delay 0.3
    python3 scrape_ila_demos.py --save-pages      # also keep every book page and
                                                  # knowl file plus their images/CSS/JS
    python3 scrape_ila_demos.py --external        # also fetch files hosted on CDNs

Output:
    <out>/ila/...                    downloaded files, same layout as the website
    <out>/demo_embeds.csv            every embed: book page -> demo link (with settings),
                                     whether it came from a knowl, and whether it downloaded
    <out>/missing.txt                files linked by HTML/CSS that could not be downloaded
    <out>/unconfirmed_guesses.txt    paths guessed from JS/knowls that did not exist
                                     (usually harmless - check if a demo misbehaves)
"""
import argparse, csv, html, os, re, sys, time
from collections import deque
from urllib.parse import urljoin, urlparse, urldefrag, parse_qsl
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

START = "https://textbooks.math.gatech.edu/ila/"
UA = "Mozilla/5.0 (ILA demo archiver)"
ASSET_EXT = (".js", ".mjs", ".css", ".json", ".html", ".htm", ".png", ".jpg",
             ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2",
             ".ttf", ".otf", ".eot", ".glsl", ".frag", ".vert", ".txt",
             ".map", ".wasm", ".mp4", ".webm", ".pdf")
IMG_EXT = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico")

# Ordinary attributes that hold a URL (incl. lazy-loading variants).
ATTR_RE = re.compile(
    r'''(?<![\w-])(?:src|href|data-src|data-href|data-url|data-lazy-src|data|poster|'''
    r'''content|background|action)\s*=\s*["']([^"'<>]+)["']''', re.I)
SRCSET_RE = re.compile(r'''(?<![\w-])(?:data-)?srcset\s*=\s*["']([^"']+)["']''', re.I)
# Knowl links: <a knowl="./knowl/xyz.html"> / data-knowl="..."
KNOWL_ATTR_RE = re.compile(r'''(?<![\w-])(?:data-)?knowl\s*=\s*["']([^"']+)["']''', re.I)
# Catch-all patterns for demo and knowl paths appearing anywhere (scripts, escaped markup).
DEMO_RE = re.compile(r'''([^\s"'<>\\()=,;]*demos/[A-Za-z0-9_.\-/]+\.html?(?:\?[^\s"'<>\\#]*)?)''')
KNOWL_PATH_RE = re.compile(r'''([^\s"'<>\\()=,;]*knowl/[A-Za-z0-9_.\-/]+\.html)''')
CSS_URL_RE = re.compile(r'''url\(\s*["']?([^"')]+)["']?\s*\)|@import\s+["']([^"']+)["']''', re.I)
JS_STR_RE = re.compile(r'''["'`]([^"'`\s<>{}()]+?\.(?:%s))(?:\?[^"'`\s]*)?["'`]''' %
                       "|".join(e.lstrip(".") for e in ASSET_EXT), re.I)


def fetch(url, retries=2):
    err = None
    for attempt in range(retries + 1):
        try:
            with urlopen(Request(url, headers={"User-Agent": UA}), timeout=30) as r:
                return r.read(), r.headers.get("Content-Type", ""), r.geturl()
        except HTTPError as e:
            if e.code in (404, 403, 410):
                return None, str(e.code), url
            err = e
        except (URLError, TimeoutError, ConnectionError, OSError) as e:
            err = e
        time.sleep(1.5 * (attempt + 1))
    return None, f"error: {err}", url


def norm(url):
    """Drop the #fragment and treat www./non-www. as the same site."""
    url, _ = urldefrag(url)
    p = urlparse(url)
    host = p.netloc[4:] if p.netloc.startswith("www.") else p.netloc
    return p._replace(netloc=host).geturl()


def clean(url):
    """Normalised URL without its ?query (one file on disk)."""
    return urlparse(norm(url))._replace(query="").geturl()


def same_site(url):
    p = urlparse(url)
    return p.scheme in ("http", "https") and p.netloc.endswith("textbooks.math.gatech.edu")


def local_path(out, url):
    path = urlparse(url).path
    if path.endswith("/"):
        path += "index.html"
    return os.path.join(out, path.lstrip("/"))


def save(out, url, data):
    path = local_path(out, url)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)


def text_of(data):
    return data.decode("utf-8", errors="replace")


def variants(body):
    """The page as-is plus un-escaped versions, so markup hidden inside knowl
    content, attributes or JS strings (&lt;iframe src=&quot;...  or  \\"demos\\/x.html\\")
    is visible to the regexes."""
    out = {body}
    js = body.replace("\\/", "/").replace('\\"', '"').replace("\\'", "'")
    out.add(js)
    for v in list(out):
        once = html.unescape(v)
        out.add(once)
        out.add(html.unescape(once))
    return out


def extract(body):
    """Return a set of (raw_reference, kind); kind is 'knowl' or 'ref'."""
    found = set()
    for v in variants(body):
        for m in ATTR_RE.finditer(v):
            found.add((m.group(1).strip(), "ref"))
        for m in SRCSET_RE.finditer(v):
            for part in m.group(1).split(","):
                if part.strip():
                    found.add((part.strip().split()[0], "ref"))
        for m in CSS_URL_RE.finditer(v):
            s = (m.group(1) or m.group(2) or "").strip()
            if s and not s.startswith("data:"):
                found.add((s, "ref"))
        for m in DEMO_RE.finditer(v):
            found.add((m.group(1), "ref"))
        for m in KNOWL_ATTR_RE.finditer(v):
            if m.group(1).strip():
                found.add((m.group(1).strip(), "knowl"))
        for m in KNOWL_PATH_RE.finditer(v):
            found.add((m.group(1), "knowl"))
    # Un-escape, then cut at the first character that cannot be part of a URL
    # (e.g. the &quot;&gt; that follows a link inside escaped knowl markup).
    found = {(re.split(r'[\s"\'<>]', html.unescape(r))[0], k) for r, k in found}
    return {(r, k) for r, k in found
            if r and not r.startswith(("data:", "blob:", "javascript:", "mailto:", "#"))}


def refs_css(body, base):
    return [urljoin(base, (m.group(1) or m.group(2)).strip())
            for m in CSS_URL_RE.finditer(body)
            if not (m.group(1) or "").startswith("data:")]


def refs_js(body, base):
    return [urljoin(base, m.group(1)) for m in JS_STR_RE.finditer(body)
            if not m.group(1).startswith(("data:", "blob:"))]


def is_demo(url):
    p = urlparse(url).path
    return "/demos/" in p and p.lower().endswith((".html", ".htm"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="ila_demos")
    ap.add_argument("--delay", type=float, default=0.2, help="seconds between requests")
    ap.add_argument("--external", action="store_true",
                    help="also download assets hosted on other sites (CDNs)")
    ap.add_argument("--save-pages", action="store_true",
                    help="also save every book page and knowl file, with their assets")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    start = norm(START)

    # ---- Step 1: crawl book pages and knowls to find every embedded demo -------------
    print("Step 1: crawling book pages and knowls for embedded demos...")
    # queue item: (url, top-level book page it belongs to, is_knowl)
    book_q, seen_book = deque([(start, None, False)]), {clean(start)}
    embeds = {}            # (book_page, found_in, demo_link_with_query) -> [candidate files]
    demo_cands = {}        # clean demo url -> True if only a guess
    query_files = set()
    page_seeds = []        # book pages / knowls to save in step 2 (front page always)
    pages_done = 0
    while book_q:
        page, top, via_knowl = book_q.popleft()
        data, ctype, final = fetch(page)
        time.sleep(a.delay)
        pages_done += 1
        if data is None or "html" not in ctype.lower():
            continue
        final = norm(final)
        top = top or final
        if page == start or a.save_pages:
            page_seeds.append(final)
        # Content of a knowl is inserted into the book page, so its relative links
        # normally resolve against the book page; also try the knowl file's own folder.
        bases = [top, final] if via_knowl and top != final else [final]
        for raw, kind in extract(text_of(data)):
            for i, base in enumerate(bases):
                ref = norm(urljoin(base, raw))
                if not same_site(ref):
                    continue
                c = clean(ref)
                if is_demo(ref):
                    guess = i > 0 or via_knowl and len(bases) > 1
                    demo_cands[c] = demo_cands.get(c, True) and guess
                    key = (top, final, norm(urljoin(bases[0], raw)))
                    embeds.setdefault(key, {"knowl": via_knowl, "cands": []})
                    if ref not in embeds[key]["cands"]:
                        embeds[key]["cands"].append(ref)
                    for _, v in parse_qsl(urlparse(ref).query):
                        if v.lower().endswith(ASSET_EXT):
                            query_files.add(urljoin(c, v))
                    continue
                if not c.startswith(start) or "/demos/" in c or c in seen_book:
                    continue
                is_knowl = kind == "knowl" or "/knowl/" in urlparse(c).path
                if is_knowl and c.endswith((".html", ".htm")):
                    seen_book.add(c)
                    book_q.append((c, top, True))
                elif not via_knowl and c.endswith((".html", "/")) and kind == "ref":
                    seen_book.add(c)
                    book_q.append((c, None, False))
        print(f"  {pages_done:4d}/{len(seen_book):4d} pages+knowls read, "
              f"{len(demo_cands):3d} distinct demos found", end="\r", flush=True)
    print()

    # ---- Step 2: download demos, front page, and everything they reference ----------
    print("Step 2: downloading demos, cover/front-page files and their dependencies...")
    q = deque([(u, u, False) for u in page_seeds] +
              [(u, u, g) for u, g in sorted(demo_cands.items())] +
              [(u, u, True) for u in sorted(query_files)])
    done, saved_set, missing, guesses = set(), set(), [], []
    while q:
        url, page, guess = q.popleft()
        url = clean(url)
        if url in done or (not same_site(url) and not a.external):
            continue
        done.add(url)
        data, ctype, final = fetch(url)
        time.sleep(a.delay)
        if data is None:
            (guesses if guess else missing).append(f"{url}\t{ctype}")
            continue
        save(a.out, url, data)
        saved_set.add(url)
        print(f"  saved {len(saved_set):4d}: {urlparse(url).path}")
        final = norm(final)
        path = urlparse(url).path.lower()
        ctype = ctype.lower()
        new = []
        if "html" in ctype or path.endswith((".html", ".htm")) or path.endswith("/"):
            new = [(urljoin(final, r), final, k == "knowl") for r, k in extract(text_of(data))]
        elif "css" in ctype or path.endswith(".css"):
            new = [(n, page, False) for n in refs_css(text_of(data), final)]
        elif "javascript" in ctype or path.endswith((".js", ".mjs")):
            body = text_of(data)
            new = [(n, page, True) for n in refs_js(body, page) + refs_js(body, final)]
        for n, pg, g in new:
            n = clean(n)
            p = urlparse(n)
            if n in done or not p.scheme.startswith("http"):
                continue
            low = p.path.lower()
            if not low.endswith(ASSET_EXT):
                continue
            # Follow demo pages; skip links to book chapters (handled in step 1).
            if low.endswith((".html", ".htm")) and not is_demo(n):
                continue
            if low.endswith(".pdf") and not a.save_pages:
                continue
            q.append((n, pg, g))

    # ---- Reports ---------------------------------------------------------------------
    with open(os.path.join(a.out, "demo_embeds.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["book_page", "found_in", "from_knowl", "demo_url", "downloaded"])
        for (top, found_in, _), info in sorted(embeds.items()):
            ok = [c for c in info["cands"] if clean(c) in saved_set]
            w.writerow([top, found_in if found_in != top else "",
                        "yes" if info["knowl"] else "no",
                        (ok or info["cands"])[0], "yes" if ok else "NO"])
    with open(os.path.join(a.out, "missing.txt"), "w") as f:
        f.write("\n".join(missing))
    with open(os.path.join(a.out, "unconfirmed_guesses.txt"), "w") as f:
        f.write("\n".join(guesses))
    demos_ok = sum(1 for u in demo_cands if u in saved_set)
    imgs = [u for u in saved_set if urlparse(u).path.lower().endswith(IMG_EXT)]
    knowl_embeds = sum(1 for i in embeds.values() if i["knowl"])
    print(f"\nDone. {len(saved_set)} files saved to '{a.out}'.")
    print(f"  demo pages downloaded: {demos_ok}")
    print(f"  embeds found: {len(embeds)} ({knowl_embeds} inside knowls)")
    print(f"  images saved (incl. cover): {len(imgs)}")
    print(f"  referenced files not found: {len(missing)} (see missing.txt)")


if __name__ == "__main__":
    sys.exit(main())
