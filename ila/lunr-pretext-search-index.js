var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "frontmatter-3",
  "level": "1",
  "url": "frontmatter-3.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": "  "
},
{
  "id": "frontmatter-4",
  "level": "1",
  "url": "frontmatter-4.html",
  "type": "Preface",
  "number": "",
  "title": "Contributors to this textbook",
  "body": " Contributors to this textbook   Dan Margalit Department of Mathematics Vanderbilt University dan.margalit@vanderbilt.edu  Joseph Rabinoff Department of Mathematics Duke University jdr@math.duke.edu  Larry Rolen Department of Mathematics Vanderbilt University larry.rolen@vanderbilt.edu  Hunter Lehmann Department of Mathematics Georgia Institute of Technology hlehmann3@gatech.edu   Rabinoff contributed all of the figures, the demos, and the technical aspects of the project, as detailed below. Hunter Lehmann worked to update the project to the latest version of PreTeXt and add accessibility features throughout the text.  The textbook is written in XML and compiled using a variant of Robert Beezer's MathBook XML , as heavily modified by Rabinoff.  The mathematical content of the textbook is written in LaTeX, then converted to HTML-friendly SVG format using a collection of scripts called PreTeX: this was coded by Rabinoff and depends heavily on Inkscape for pdf decoding and FontForge for font embedding. The figures are written in PGF\/TikZ and processed with PreTeX as well.  The demonstrations are written in JavaScript+WebGL using Steven Wittens' brilliant framework called MathBox .  All source code can be found on GitHub . It may be freely copied, modified, and redistributed, as detailed in the appendix entitled GNU Free Documentation License.   Larry Rolen wrote many of the exercises.  "
},
{
  "id": "frontmatter-5",
  "level": "1",
  "url": "frontmatter-5.html",
  "type": "Preface",
  "number": "",
  "title": "Variants of this textbook",
  "body": " Variants of this textbook  There are several variants of this textbook available.  The master version is the default version of the book.  The version for math 1553 is fine-tuned to contain only the material covered in Math 1553 at Georgia Tech.  The section numbering is consistent across versions. This explains why Section 6.3 does not exist in the Math 1553 version, for example.  You are currently viewing the master version .  "
},
{
  "id": "overview",
  "level": "1",
  "url": "overview.html",
  "type": "Preface",
  "number": "",
  "title": "Overview",
  "body": " Overview   The Subject of This Textbook  Before starting with the content of the text, we first ask the basic question: what is linear algebra?  Linear: having to do with lines, planes, etc.  Algebra: solving equations involving unknowns.  The name of the textbook highlights an important theme: the synthesis between algebra and geometry. It will be very important to us to understand systems of linear equations both algebraically (writing equations for their solutions) and geometrically (drawing pictures and visualizing).   The term algebra was coined by the th century mathematician Abu Ja far Muhammad ibn Musa al-Khwarizmi. It comes from the Arabic word al-jebr , meaning reunion of broken parts.   At the simplest level, solving a system of linear equations is not very hard. You probably learned in high school how to solve a system like However, in real life one usually has to be more clever.  Engineers need to solve many, many equations in many, many variables. Here is a tiny example:   Often it is enough to know some information about the set of solutions, without having to solve the equations in the first place. For instance, does there exist a solution? What does the solution set look like geometrically? Is there still a solution if we change the to a ?  Sometimes the coefficients also contain parameters, like the eigenvalue equation    In data modeling, a system of equations generally does not actually have a solution. In that case, what is the best approximate solution?    Accordingly, this text is organized into three main sections.   Solve the matrix equation (chapters 2 4).  Solve systems of linear equations using matrices, row reduction, and inverses.  Analyze systems of linear equations geometrically using the geometry of solution sets and linear transformations.      Solve the matrix equation (chapters 5 6).  Solve eigenvalue problems using the characteristic polynomial.  Understand the geometry of matrices using similarity, eigenvalues, diagonalization, and complex numbers.      Approximately solve the matrix equation (chapter 7).  Find best-fit solutions to systems of linear equations that have no actual solution using least-squares approximations.  Study the geometry of closest vectors and orthogonal projections.       This text is roughly half computational and half conceptual in nature. The main goal is to present a library of linear algebra tools, and more importantly, to teach a conceptual framework for understanding which tools should be applied in a given context.   If Matlab can find the answer faster than you can, then your question is just an algorithm: this is not real problem solving.   The subtle part of the subject lies in understanding what computation to ask the computer to do for you  it is far less important to know how to perform computations that a computer can do better than you anyway.    Uses of Linear Algebra in Engineering  The vast majority of undergraduates at Georgia Tech have to take a course in linear algebra. There is a reason for this:   Most engineering problems, no matter how complicated, can be reduced to linear algebra:    Here we present some sample problems in science and engineering that require linear algebra to solve.   Civil Engineering  The following diagram represents traffic flow around the town square. The streets are all one way, and the numbers and arrows indicate the number of cars per hour flowing along each street, as measured by sensors underneath the roads.   Directed traffic flows into, out of, and around a square formed by four intersections.   Four intersections form the corners of a square. Internal one-way streets carry unknown hourly flows: across the top from left to right, down the right side, across the bottom from right to left, and up the left side. At the upper-left intersection, 120 cars per hour enter from the left and 250 leave upward. At the upper-right intersection, 120 enter from above and 70 leave to the right. At the lower-right intersection, 530 enter from the right and 390 leave downward. At the lower-left intersection, 115 enter from below and 175 leave to the left.     There are no sensors underneath some of the streets, so we do not know how much traffic is flowing around the square itself. What are the values of ? Since the number of cars entering each intersection has to equal the number of cars leaving that intersection, we obtain a system of linear equations:     Chemical Engineering  A certain chemical reaction (burning) takes ethane and oxygen, and produces carbon dioxide and water: What ratio of the molecules is needed to sustain the reaction? The following three equations come from the fact that the number of atoms of carbon, hydrogen, and oxygen on the left side has to equal the number of atoms on the right, respectively: .    Biology  In a population of rabbits,   half of the newborn rabbits survive their first year;    of those, half survive their second year;    the maximum life span is three years;    rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.   If you know the rabbit population in 2016 (in terms of the number of first, second, and third year rabbits), then what is the population in 2017? The rules for reproduction lead to the following system of equations, where represent the number of newborn, first-year, and second-year rabbits, respectively: A common question is: what is the asymptotic behavior of this system? What will the rabbit population look like in 100 years? This turns out to be an eigenvalue problem.   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.      Astronomy  An asteroid has been observed at the following locations: Its orbit around the sun is elliptical; it is described by an equation of the form What is the most likely orbit of the asteroid, given that there was some significant error in measuring its position? Substituting the data points into the above equation yields the system There is no actual solution to this system due to measurement error, but here is the best-fitting ellipse:  Six measured asteroid positions and a red best-fit ellipse on a coordinate grid.   A coordinate grid from to and to shows the measured points , , , , , and . A tilted red ellipse is fitted to the six points. Its displayed equation is .        Computer Science  Each web page has some measure of importance, which it shares via outgoing links to other pages. This leads to zillions of equations in zillions of variables. Larry Page and Sergei Brin realized that this is a linear algebra problem at its core, and used the insight to found Google. We will discuss this example in detail in .     How to Use This Textbook  There are a number of different categories of ideas that are contained in most sections. They are listed at the top of the section, under Objectives , for easy review. We classify them as follows.   Recipes: these are algorithms that are generally straightforward (if sometimes tedious), and are usually done by computer in real life. They are nonetheless important to learn and to practice.   Vocabulary words: forming a conceptual understanding of the subject of linear algebra means being able to communicate much more precisely than in ordinary speech. The vocabulary words have precise definitions, which must be learned and used correctly.   Essential vocabulary words: these vocabulary words are essential in that they form the essence of the subject of linear algebra. For instance, if you do not know the definition of an eigenvector, then by definition you cannot claim to understand linear algebra.   Theorems: these describe in a precise way how the objects of interest relate to each other. Knowing which recipe to use in a given situation generally means recognizing which vocabulary words to use to describe the situation, and understanding which theorems apply to that problem.   Pictures: visualizing the geometry underlying the algebra means interpreting and drawing pictures of the objects involved. The pictures are meant to be a core part of the material in the text: they are not just a pretty add-on.    This textbook is exclusively targeted at Math 1553 at Georgia Tech. As such, it contains exactly the material that is taught in that class; no more, and no less: students in Math 1553 are responsible for understanding all visible content. In the online version some extra material (most examples and proofs, for instance) is hidden, in that one needs to click on a link to reveal it, like this:   Hidden Content  Hidden content is meant to enrich your understanding of the topic, but is not an official part of Math 1553. That said, the text will be very hard to follow without understanding the examples, and studying the proofs is an excellent way to learn the conceptual part of the material. (Not applicable to the PDF version.)   Finally, we remark that there are over 140 interactive demos contained in the text, which were created to illustrate the geometry of the topic. Click the view in a new window link, and play around with them! You will need a modern browser. Internet Explorer is not a modern browser; try Safari, Chrome , or Firefox . Here is a demo from :   Click and drag the points on the grid on the right.       Feedback  Every page of the online version has a link on the bottom for providing feedback. This will take you to the GitHub Issues page for this book. It requires a Georgia Tech login to access.   "
},
{
  "id": "overview-2-3",
  "level": "2",
  "url": "overview.html#overview-2-3",
  "type": "Remark",
  "number": "0.0.1",
  "title": "",
  "body": " The term algebra was coined by the th century mathematician Abu Ja far Muhammad ibn Musa al-Khwarizmi. It comes from the Arabic word al-jebr , meaning reunion of broken parts.  "
},
{
  "id": "overview-2-7",
  "level": "2",
  "url": "overview.html#overview-2-7",
  "type": "Insight",
  "number": "0.0.2",
  "title": "",
  "body": " If Matlab can find the answer faster than you can, then your question is just an algorithm: this is not real problem solving.  "
},
{
  "id": "overview-3-3",
  "level": "2",
  "url": "overview.html#overview-3-3",
  "type": "Insight",
  "number": "0.0.3",
  "title": "",
  "body": " Most engineering problems, no matter how complicated, can be reduced to linear algebra:   "
},
{
  "id": "overview-3-5",
  "level": "2",
  "url": "overview.html#overview-3-5",
  "type": "Example",
  "number": "0.0.4",
  "title": "Civil Engineering.",
  "body": " Civil Engineering  The following diagram represents traffic flow around the town square. The streets are all one way, and the numbers and arrows indicate the number of cars per hour flowing along each street, as measured by sensors underneath the roads.   Directed traffic flows into, out of, and around a square formed by four intersections.   Four intersections form the corners of a square. Internal one-way streets carry unknown hourly flows: across the top from left to right, down the right side, across the bottom from right to left, and up the left side. At the upper-left intersection, 120 cars per hour enter from the left and 250 leave upward. At the upper-right intersection, 120 enter from above and 70 leave to the right. At the lower-right intersection, 530 enter from the right and 390 leave downward. At the lower-left intersection, 115 enter from below and 175 leave to the left.     There are no sensors underneath some of the streets, so we do not know how much traffic is flowing around the square itself. What are the values of ? Since the number of cars entering each intersection has to equal the number of cars leaving that intersection, we obtain a system of linear equations:   "
},
{
  "id": "overview-3-6",
  "level": "2",
  "url": "overview.html#overview-3-6",
  "type": "Example",
  "number": "0.0.5",
  "title": "Chemical Engineering.",
  "body": " Chemical Engineering  A certain chemical reaction (burning) takes ethane and oxygen, and produces carbon dioxide and water: What ratio of the molecules is needed to sustain the reaction? The following three equations come from the fact that the number of atoms of carbon, hydrogen, and oxygen on the left side has to equal the number of atoms on the right, respectively: .  "
},
{
  "id": "overview-3-7",
  "level": "2",
  "url": "overview.html#overview-3-7",
  "type": "Example",
  "number": "0.0.6",
  "title": "Biology.",
  "body": " Biology  In a population of rabbits,   half of the newborn rabbits survive their first year;    of those, half survive their second year;    the maximum life span is three years;    rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.   If you know the rabbit population in 2016 (in terms of the number of first, second, and third year rabbits), then what is the population in 2017? The rules for reproduction lead to the following system of equations, where represent the number of newborn, first-year, and second-year rabbits, respectively: A common question is: what is the asymptotic behavior of this system? What will the rabbit population look like in 100 years? This turns out to be an eigenvalue problem.   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.    "
},
{
  "id": "overview-3-8",
  "level": "2",
  "url": "overview.html#overview-3-8",
  "type": "Example",
  "number": "0.0.8",
  "title": "Astronomy.",
  "body": " Astronomy  An asteroid has been observed at the following locations: Its orbit around the sun is elliptical; it is described by an equation of the form What is the most likely orbit of the asteroid, given that there was some significant error in measuring its position? Substituting the data points into the above equation yields the system There is no actual solution to this system due to measurement error, but here is the best-fitting ellipse:  Six measured asteroid positions and a red best-fit ellipse on a coordinate grid.   A coordinate grid from to and to shows the measured points , , , , , and . A tilted red ellipse is fitted to the six points. Its displayed equation is .      "
},
{
  "id": "overview-3-9",
  "level": "2",
  "url": "overview.html#overview-3-9",
  "type": "Example",
  "number": "0.0.9",
  "title": "Computer Science.",
  "body": " Computer Science  Each web page has some measure of importance, which it shares via outgoing links to other pages. This leads to zillions of equations in zillions of variables. Larry Page and Sergei Brin realized that this is a linear algebra problem at its core, and used the insight to found Google. We will discuss this example in detail in .  "
},
{
  "id": "overview-4-4",
  "level": "2",
  "url": "overview.html#overview-4-4",
  "type": "Example",
  "number": "0.0.10",
  "title": "Hidden Content.",
  "body": " Hidden Content  Hidden content is meant to enrich your understanding of the topic, but is not an official part of Math 1553. That said, the text will be very hard to follow without understanding the examples, and studying the proofs is an excellent way to learn the conceptual part of the material. (Not applicable to the PDF version.)  "
},
{
  "id": "overview-4-6",
  "level": "2",
  "url": "overview.html#overview-4-6",
  "type": "Figure",
  "number": "0.0.11",
  "title": "",
  "body": " Click and drag the points on the grid on the right.   "
},
{
  "id": "systems-of-eqns",
  "level": "1",
  "url": "systems-of-eqns.html",
  "type": "Section",
  "number": "1.1",
  "title": "Systems of Linear Equations",
  "body": " Systems of Linear Equations    Understand the definition of , and what it means to use to label points on a geometric object.  Pictures: solutions of systems of linear equations, parameterized solution sets.  Vocabulary words:  consistent , inconsistent , solution set .     During the first half of this textbook, we will be primarily concerned with understanding the solutions of systems of linear equations.   Linear equation definition of   An equation in the unknowns is called linear if both sides of the equation are a sum of (constant) multiples of , plus an optional constant.    For instance, are linear equations, but are not.  We will usually move the unknowns to the left side of the equation, and move the constants to the right.  A system of linear equations is a collection of several linear equations, like  Linear equation system of System of linear equations  System of linear equations definition of    Solution sets     A solution of a system of equations is a list of numbers that make all of the equations true simultaneously.  The solution set of a system of equations is the collection of all solutions.  Solving the system means finding all solutions with formulas involving some number of parameters.   System of linear equations solution of  Solution System of linear equations  Solution set definition of     A system of linear equations need not have a solution. For example, there do not exist numbers and making the following two equations true simultaneously: In this case, the solution set is empty . As this is a rather important property of a system of equations, it has its own name.   System of linear equations inconsistent  System of linear equations consistent  Consistent System of linear equations  Inconsistent System of linear equations   A system of equations is called inconsistent if it has no solutions. It is called consistent otherwise.    A solution of a system of equations in variables is a list of numbers. For example, is a solution of . As we will be studying solutions of systems of equations throughout this text, now is a good time to fix our notions regarding lists of numbers.   "
},
{
  "id": "systems-of-eqns-2",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-2",
  "type": "Objectives",
  "number": "1.1",
  "title": "",
  "body": "  Understand the definition of , and what it means to use to label points on a geometric object.  Pictures: solutions of systems of linear equations, parameterized solution sets.  Vocabulary words:  consistent , inconsistent , solution set .   "
},
{
  "id": "systems-of-eqns-3-2",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-3-2",
  "type": "Definition",
  "number": "1.1.1",
  "title": "",
  "body": " Linear equation definition of   An equation in the unknowns is called linear if both sides of the equation are a sum of (constant) multiples of , plus an optional constant.   "
},
{
  "id": "systems-of-eqns-3-5",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-3-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "system "
},
{
  "id": "systems-eqns-soln-sets",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-soln-sets",
  "type": "Definition",
  "number": "1.1.2",
  "title": "Solution sets.",
  "body": " Solution sets     A solution of a system of equations is a list of numbers that make all of the equations true simultaneously.  The solution set of a system of equations is the collection of all solutions.  Solving the system means finding all solutions with formulas involving some number of parameters.   System of linear equations solution of  Solution System of linear equations  Solution set definition of    "
},
{
  "id": "systems-of-eqns-3-8",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-3-8",
  "type": "Definition",
  "number": "1.1.3",
  "title": "",
  "body": " System of linear equations inconsistent  System of linear equations consistent  Consistent System of linear equations  Inconsistent System of linear equations   A system of equations is called inconsistent if it has no solutions. It is called consistent otherwise.   "
},
{
  "id": "row-reduction",
  "level": "1",
  "url": "row-reduction.html",
  "type": "Section",
  "number": "1.2",
  "title": "Row Reduction",
  "body": " Row Reduction    Learn to replace a system of linear equations by an augmented matrix.  Learn how the elimination method corresponds to performing row operations on an augmented matrix.  Understand when a matrix is in (reduced) row echelon form.  Learn which row reduced matrices come from inconsistent linear systems.  Recipe: the row reduction algorithm.  Vocabulary words:  row operation , row equivalence , matrix , augmented matrix , pivot , (reduced) row echelon form .     In this section, we will present an algorithm for solving a system of linear equations.   "
},
{
  "id": "row-reduction-2",
  "level": "2",
  "url": "row-reduction.html#row-reduction-2",
  "type": "Objectives",
  "number": "1.2",
  "title": "",
  "body": "  Learn to replace a system of linear equations by an augmented matrix.  Learn how the elimination method corresponds to performing row operations on an augmented matrix.  Understand when a matrix is in (reduced) row echelon form.  Learn which row reduced matrices come from inconsistent linear systems.  Recipe: the row reduction algorithm.  Vocabulary words:  row operation , row equivalence , matrix , augmented matrix , pivot , (reduced) row echelon form .   "
},
{
  "id": "parametric-form",
  "level": "1",
  "url": "parametric-form.html",
  "type": "Section",
  "number": "1.3",
  "title": "Parametric Form",
  "body": " Parametric Form    Learn to express the solution set of a system of linear equations in parametric form.  Understand the three possibilities for the number of solutions of a system of linear equations.  Recipe: parametric form.  Vocabulary word:  free variable .    "
},
{
  "id": "parametric-form-2",
  "level": "2",
  "url": "parametric-form.html#parametric-form-2",
  "type": "Objectives",
  "number": "1.3",
  "title": "",
  "body": "  Learn to express the solution set of a system of linear equations in parametric form.  Understand the three possibilities for the number of solutions of a system of linear equations.  Recipe: parametric form.  Vocabulary word:  free variable .   "
},
{
  "id": "backmatter-2",
  "level": "1",
  "url": "backmatter-2.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": " This book was authored in PreTeXt .  "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})
