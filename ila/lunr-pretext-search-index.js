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
  "id": "frontmatter-6",
  "level": "1",
  "url": "frontmatter-6.html",
  "type": "Preface",
  "number": "",
  "title": "History of the Updated Edition",
  "body": " History of the Updated Edition     The Georgia Tech\/Duke edition, entitled Interactive Linear Algebra was published in 2019, by Dan Margalit and Joseph Rabinoff, with contributions from Larry Rolen.    This updated edition, entitled Interactive Linear Algebra: Updated Edition , was published in 2026, with updates and modifications by Chris Jankowski and Hunter Lehmann.     Hunter Lehmann updated the technical aspects of the project from the original customized MathBookXML by Rabinoff to modern PreTeXt and improved digital accessibility of the text.    Chris Jankowski contributed exercises for student practice.        "
},
{
  "id": "overview",
  "level": "1",
  "url": "overview.html",
  "type": "Preface",
  "number": "",
  "title": "Overview",
  "body": " Overview   The Subject of This Textbook  Before starting with the content of the text, we first ask the basic question: what is linear algebra?  Linear: having to do with lines, planes, etc.  Algebra: solving equations involving unknowns.  The name of the textbook highlights an important theme: the synthesis between algebra and geometry. It will be very important to us to understand systems of linear equations both algebraically (writing equations for their solutions) and geometrically (drawing pictures and visualizing).   The term algebra was coined by the th century mathematician Abu Ja far Muhammad ibn Musa al-Khwarizmi. It comes from the Arabic word al-jebr , meaning reunion of broken parts.   At the simplest level, solving a system of linear equations is not very hard. You probably learned in high school how to solve a system like However, in real life one usually has to be more clever.  Engineers need to solve many, many equations in many, many variables. Here is a tiny example:   Often it is enough to know some information about the set of solutions, without having to solve the equations in the first place. For instance, does there exist a solution? What does the solution set look like geometrically? Is there still a solution if we change the to a ?  Sometimes the coefficients also contain parameters, like the eigenvalue equation    In data modeling, a system of equations generally does not actually have a solution. In that case, what is the best approximate solution?    Accordingly, this text is organized into three main sections.   Solve the matrix equation (chapters 2 4).  Solve systems of linear equations using matrices, row reduction, and inverses.  Analyze systems of linear equations geometrically using the geometry of solution sets and linear transformations.      Solve the matrix equation (chapters 5 6).  Solve eigenvalue problems using the characteristic polynomial.  Understand the geometry of matrices using similarity, eigenvalues, diagonalization, and complex numbers.      Approximately solve the matrix equation (chapter 7).  Find best-fit solutions to systems of linear equations that have no actual solution using least-squares approximations.  Study the geometry of closest vectors and orthogonal projections.       This text is roughly half computational and half conceptual in nature. The main goal is to present a library of linear algebra tools, and more importantly, to teach a conceptual framework for understanding which tools should be applied in a given context.   If Matlab can find the answer faster than you can, then your question is just an algorithm: this is not real problem solving.   The subtle part of the subject lies in understanding what computation to ask the computer to do for you  it is far less important to know how to perform computations that a computer can do better than you anyway.    Uses of Linear Algebra in Engineering  The vast majority of undergraduates at Georgia Tech have to take a course in linear algebra. There is a reason for this:   Most engineering problems, no matter how complicated, can be reduced to linear algebra:    Here we present some sample problems in science and engineering that require linear algebra to solve.   Civil Engineering  The following diagram represents traffic flow around the town square. The streets are all one way, and the numbers and arrows indicate the number of cars per hour flowing along each street, as measured by sensors underneath the roads.   Directed traffic flows into, out of, and around a square formed by four intersections.   Four intersections form the corners of a square. Internal one-way streets carry unknown hourly flows: across the top from left to right, down the right side, across the bottom from right to left, and up the left side. At the upper-left intersection, 120 cars per hour enter from the left and 250 leave upward. At the upper-right intersection, 120 enter from above and 70 leave to the right. At the lower-right intersection, 530 enter from the right and 390 leave downward. At the lower-left intersection, 115 enter from below and 175 leave to the left.     There are no sensors underneath some of the streets, so we do not know how much traffic is flowing around the square itself. What are the values of ? Since the number of cars entering each intersection has to equal the number of cars leaving that intersection, we obtain a system of linear equations:     Chemical Engineering  A certain chemical reaction (burning) takes ethane and oxygen, and produces carbon dioxide and water: What ratio of the molecules is needed to sustain the reaction? The following three equations come from the fact that the number of atoms of carbon, hydrogen, and oxygen on the left side has to equal the number of atoms on the right, respectively: .    Biology  In a population of rabbits,   half of the newborn rabbits survive their first year;    of those, half survive their second year;    the maximum life span is three years;    rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.   If you know the rabbit population in 2016 (in terms of the number of first, second, and third year rabbits), then what is the population in 2017? The rules for reproduction lead to the following system of equations, where represent the number of newborn, first-year, and second-year rabbits, respectively: A common question is: what is the asymptotic behavior of this system? What will the rabbit population look like in 100 years? This turns out to be an eigenvalue problem.   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.       Astronomy  An asteroid has been observed at the following locations: Its orbit around the sun is elliptical; it is described by an equation of the form What is the most likely orbit of the asteroid, given that there was some significant error in measuring its position? Substituting the data points into the above equation yields the system There is no actual solution to this system due to measurement error, but here is the best-fitting ellipse:  Six measured asteroid positions and a red best-fit ellipse on a coordinate grid.   A coordinate grid from to and to shows the measured points , , , , , and . A tilted red ellipse is fitted to the six points. Its displayed equation is .        Computer Science  Each web page has some measure of importance, which it shares via outgoing links to other pages. This leads to zillions of equations in zillions of variables. Larry Page and Sergei Brin realized that this is a linear algebra problem at its core, and used the insight to found Google. We will discuss this example in detail in .     How to Use This Textbook  There are a number of different categories of ideas that are contained in most sections. They are listed at the top of the section, under Objectives , for easy review. We classify them as follows.   Recipes: these are algorithms that are generally straightforward (if sometimes tedious), and are usually done by computer in real life. They are nonetheless important to learn and to practice.   Vocabulary words: forming a conceptual understanding of the subject of linear algebra means being able to communicate much more precisely than in ordinary speech. The vocabulary words have precise definitions, which must be learned and used correctly.   Essential vocabulary words: these vocabulary words are essential in that they form the essence of the subject of linear algebra. For instance, if you do not know the definition of an eigenvector, then by definition you cannot claim to understand linear algebra.   Theorems: these describe in a precise way how the objects of interest relate to each other. Knowing which recipe to use in a given situation generally means recognizing which vocabulary words to use to describe the situation, and understanding which theorems apply to that problem.   Pictures: visualizing the geometry underlying the algebra means interpreting and drawing pictures of the objects involved. The pictures are meant to be a core part of the material in the text: they are not just a pretty add-on.    This textbook is exclusively targeted at Math 1553 at Georgia Tech. As such, it contains exactly the material that is taught in that class; no more, and no less: students in Math 1553 are responsible for understanding all visible content. In the online version some extra material (most examples and proofs, for instance) is hidden, in that one needs to click on a link to reveal it, like this:   Hidden Content  Hidden content is meant to enrich your understanding of the topic, but is not an official part of Math 1553. That said, the text will be very hard to follow without understanding the examples, and studying the proofs is an excellent way to learn the conceptual part of the material. (Not applicable to the PDF version.)   Finally, we remark that there are over 140 interactive demos contained in the text, which were created to illustrate the geometry of the topic. Click the view in a new window link, and play around with them! You will need a modern browser. Internet Explorer is not a modern browser; try Safari, Chrome , or Firefox . Here is a demo from :   Click and drag the points on the grid on the right.     The implicit equation of best fit for six data points, found by least squares.       Feedback  Every page of the online version has a link on the bottom for providing feedback. This will take you to the GitHub Issues page for this book. It requires a Georgia Tech login to access.   "
},
{
  "id": "overview-2-3",
  "level": "2",
  "url": "overview.html#overview-2-3",
  "type": "Remark",
  "number": "0.1",
  "title": "",
  "body": " The term algebra was coined by the th century mathematician Abu Ja far Muhammad ibn Musa al-Khwarizmi. It comes from the Arabic word al-jebr , meaning reunion of broken parts.  "
},
{
  "id": "overview-2-7",
  "level": "2",
  "url": "overview.html#overview-2-7",
  "type": "Insight",
  "number": "0.2",
  "title": "",
  "body": " If Matlab can find the answer faster than you can, then your question is just an algorithm: this is not real problem solving.  "
},
{
  "id": "overview-3-3",
  "level": "2",
  "url": "overview.html#overview-3-3",
  "type": "Insight",
  "number": "0.3",
  "title": "",
  "body": " Most engineering problems, no matter how complicated, can be reduced to linear algebra:   "
},
{
  "id": "overview-3-5",
  "level": "2",
  "url": "overview.html#overview-3-5",
  "type": "Example",
  "number": "0.4",
  "title": "Civil Engineering.",
  "body": " Civil Engineering  The following diagram represents traffic flow around the town square. The streets are all one way, and the numbers and arrows indicate the number of cars per hour flowing along each street, as measured by sensors underneath the roads.   Directed traffic flows into, out of, and around a square formed by four intersections.   Four intersections form the corners of a square. Internal one-way streets carry unknown hourly flows: across the top from left to right, down the right side, across the bottom from right to left, and up the left side. At the upper-left intersection, 120 cars per hour enter from the left and 250 leave upward. At the upper-right intersection, 120 enter from above and 70 leave to the right. At the lower-right intersection, 530 enter from the right and 390 leave downward. At the lower-left intersection, 115 enter from below and 175 leave to the left.     There are no sensors underneath some of the streets, so we do not know how much traffic is flowing around the square itself. What are the values of ? Since the number of cars entering each intersection has to equal the number of cars leaving that intersection, we obtain a system of linear equations:   "
},
{
  "id": "overview-3-6",
  "level": "2",
  "url": "overview.html#overview-3-6",
  "type": "Example",
  "number": "0.5",
  "title": "Chemical Engineering.",
  "body": " Chemical Engineering  A certain chemical reaction (burning) takes ethane and oxygen, and produces carbon dioxide and water: What ratio of the molecules is needed to sustain the reaction? The following three equations come from the fact that the number of atoms of carbon, hydrogen, and oxygen on the left side has to equal the number of atoms on the right, respectively: .  "
},
{
  "id": "overview-3-7",
  "level": "2",
  "url": "overview.html#overview-3-7",
  "type": "Example",
  "number": "0.6",
  "title": "Biology.",
  "body": " Biology  In a population of rabbits,   half of the newborn rabbits survive their first year;    of those, half survive their second year;    the maximum life span is three years;    rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.   If you know the rabbit population in 2016 (in terms of the number of first, second, and third year rabbits), then what is the population in 2017? The rules for reproduction lead to the following system of equations, where represent the number of newborn, first-year, and second-year rabbits, respectively: A common question is: what is the asymptotic behavior of this system? What will the rabbit population look like in 100 years? This turns out to be an eigenvalue problem.   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.     "
},
{
  "id": "overview-3-8",
  "level": "2",
  "url": "overview.html#overview-3-8",
  "type": "Example",
  "number": "0.8",
  "title": "Astronomy.",
  "body": " Astronomy  An asteroid has been observed at the following locations: Its orbit around the sun is elliptical; it is described by an equation of the form What is the most likely orbit of the asteroid, given that there was some significant error in measuring its position? Substituting the data points into the above equation yields the system There is no actual solution to this system due to measurement error, but here is the best-fitting ellipse:  Six measured asteroid positions and a red best-fit ellipse on a coordinate grid.   A coordinate grid from to and to shows the measured points , , , , , and . A tilted red ellipse is fitted to the six points. Its displayed equation is .      "
},
{
  "id": "overview-3-9",
  "level": "2",
  "url": "overview.html#overview-3-9",
  "type": "Example",
  "number": "0.9",
  "title": "Computer Science.",
  "body": " Computer Science  Each web page has some measure of importance, which it shares via outgoing links to other pages. This leads to zillions of equations in zillions of variables. Larry Page and Sergei Brin realized that this is a linear algebra problem at its core, and used the insight to found Google. We will discuss this example in detail in .  "
},
{
  "id": "overview-4-4",
  "level": "2",
  "url": "overview.html#overview-4-4",
  "type": "Example",
  "number": "0.10",
  "title": "Hidden Content.",
  "body": " Hidden Content  Hidden content is meant to enrich your understanding of the topic, but is not an official part of Math 1553. That said, the text will be very hard to follow without understanding the examples, and studying the proofs is an excellent way to learn the conceptual part of the material. (Not applicable to the PDF version.)  "
},
{
  "id": "overview-4-6",
  "level": "2",
  "url": "overview.html#overview-4-6",
  "type": "Figure",
  "number": "0.11",
  "title": "",
  "body": " Click and drag the points on the grid on the right.   "
},
{
  "id": "fig-bestfit-implicit",
  "level": "2",
  "url": "overview.html#fig-bestfit-implicit",
  "type": "Figure",
  "number": "0.12",
  "title": "",
  "body": " The implicit equation of best fit for six data points, found by least squares.   "
},
{
  "id": "systems-of-eqns",
  "level": "1",
  "url": "systems-of-eqns.html",
  "type": "Section",
  "number": "1.1",
  "title": "Systems of Linear Equations",
  "body": " Systems of Linear Equations    Understand the definition of , and what it means to use to label points on a geometric object.  Pictures: solutions of systems of linear equations, parameterized solution sets.  Vocabulary words:  consistent , inconsistent , solution set .     During the first half of this textbook, we will be primarily concerned with understanding the solutions of systems of linear equations.   Linear equation definition of   An equation in the unknowns is called linear if both sides of the equation are a sum of (constant) multiples of , plus an optional constant.    For instance, are linear equations, but are not.  We will usually move the unknowns to the left side of the equation, and move the constants to the right.  A system of linear equations is a collection of several linear equations, like  Linear equation system of System of linear equations  System of linear equations definition of    Solution sets     A solution of a system of equations is a list of numbers that make all of the equations true simultaneously.  The solution set of a system of equations is the collection of all solutions.  Solving the system means finding all solutions with formulas involving some number of parameters.   System of linear equations solution of  Solution System of linear equations  Solution set definition of     A system of linear equations need not have a solution. For example, there do not exist numbers and making the following two equations true simultaneously: In this case, the solution set is empty . As this is a rather important property of a system of equations, it has its own name.   System of linear equations inconsistent  System of linear equations consistent  Consistent System of linear equations  Inconsistent System of linear equations   A system of equations is called inconsistent if it has no solutions. It is called consistent otherwise.    A solution of a system of equations in variables is a list of numbers. For example, is a solution of . As we will be studying solutions of systems of equations throughout this text, now is a good time to fix our notions regarding lists of numbers.    Line, Plane, Space, Etc.   The number zero We use  Real numbers  The real numbers to denote the set of all real numbers, i.e., the number line. This contains numbers like    Real -space  Real -space point of    Real -space    Let be a positive whole number. We define An -tuple of real numbers is called a point of .    In other words, is just the set of all (ordered) lists of real numbers. We will draw pictures of in a moment, but keep in mind that this is the definition . For example, and are points of .   The number line  Real numbers  Line number line  When , we just get back: . Geometrically, this is the number line.   The number line marked with integers from -3 to 3      The Euclidean plane  Plane -plane  When , we can think of as the -plane. We can do so because every point on the plane can be represented by an ordered pair of real numbers, namely, its - and -coordinates.  The Euclidean plane with two marked points   The Euclidean plane with drawn horizontal and vertical axes and two marked points at and .     3-Space  Space  When , we can think of as the space we (appear to) live in. We can do so because every point in space can be represented by an ordered triple of real numbers, namely, its -, -, and -coordinates.  3-space with two marked points  3-space with , and axes drawn along with a grid in the -plane and two marked points at and .     Interactive: Points in 3-Space   A point in 3-space, and its coordinates. Click and drag the point, or move the sliders.     So what is ? or ? or ? These are harder to visualize, so you have to go back to the definition: is the set of all ordered -tuples of real numbers .  They are still geometric spaces, in the sense that our intuition for and often extends to .  We will make definitions and state theorems that apply to any , but we will only draw pictures for and .  The power of using these spaces is the ability to label various objects of interest, such as geometric objects and solutions of systems of equations, by the points of .   Color Space  Space color space  Color space  All colors you can see can be described by three quantities: the amount of red, green, and blue light in that color. (Humans are trichromatic .) Therefore, we can use the points of to label all colors: for instance, the point labels the color with red, green, and blue intensity.  Gradient of colors on a cube, with red, green, and blue axes labeled    Traffic Flow  In the , we could have used to label the amount of traffic passing through four streets. In other words, if there are cars per hour passing through roads , respectively, then this can be recorded by the point in . This is useful from a psychological standpoint: instead of having four numbers, we are now dealing with just one piece of data.  Directed traffic flows into, out of, and around a square formed by four intersections.    QR Codes  QR codes  A QR code is a method of storing data in a grid of black and white squares in a way that computers can easily read. A typical QR code is a grid. Reading each line left-to-right and reading the lines top-to-bottom (like you read a book) we can think of such a QR code as a sequence of digits, each digit being 1 (for white) or 0 (for black). In such a way, the entire QR code can be regarded as a point in . As in the previous , it is very useful from a psychological perspective to view a QR code as a single piece of data in this way.   The QR code for this textbook is a array of black\/white squares.   QR code that links to the textbook homepage     In the above examples, it was useful from a psychological perspective to replace a list of four numbers (representing traffic flow) or of 841 numbers (representing a QR code) by a single piece of data: a point in some . This is a powerful concept; starting in , we will almost exclusively record solutions of systems of linear equations in this way.    Pictures of Solution Sets  Solution set picture of  Before discussing how to solve a system of linear equations below, it is helpful to see some pictures of what these solution sets look like geometrically.   One Equation in Two Variables  Consider the linear equation . We can rewrite this as , which defines a line in the plane: the slope is , and the -intercept is .   Line in the plane with slope negative 1 and interecept 1      Lines  Line geometric definition of   For our purposes, a line is a ray that is straight and infinite in both directions.     One Equation in Three Variables  Consider the linear equation . This is the implicit equation for a plane in space.   Plane in 3-space      Planes  Plane geometric definition of   A plane is a flat sheet that is infinite in all directions.     The equation defines a -plane in -space, and more generally, a single linear equation in variables defines an -plane in -space. We will make these statements precise in .    Two Equations in Two Variables  Now consider the system of two linear equations Each equation individually defines a line in the plane, pictured below.   Two lines in the plane intersecting at a point    A solution to the system of both equations is a pair of numbers that makes both equations true at once. In other words, it as a point that lies on both lines simultaneously. We can see in the picture above that there is only one point where the lines intersect: therefore, this system has exactly one solution. (This solution is , as the reader can verify.)  Usually, two lines in the plane will intersect in one point, but of course this is not always the case. Consider now the system of equations These define parallel lines in the plane.   Two parallel lines in the plane    The fact that that the lines do not intersect means that the system of equations has no solution. Of course, this is easy to see algebraically: if , then it is cannot also be the case that .  There is one more possibility. Consider the system of equations The second equation is a multiple of the first, so these equations define the same line in the plane.   Two lines in the plane that are equal    In this case, there are infinitely many solutions of the system of equations.    Two Equations in Three Variables  Consider the system of two linear equations Each equation individually defines a plane in space. The solutions of the system of both equations are the points that lie on both planes. We can see in the picture below that the planes intersect in a line. In particular, this system has infinitely many solutions.   The planes defined by the equations and intersect in the red line, which is the solution set of the system of both equations.      In general, the solutions of a system of equations in variables is the intersection of -planes in -space. This is always some kind of linear space, as we will discuss in .     Parametric Description of Solution Sets  Implicit equation  Parametric form  According to , solving a system of equations means writing down all solutions in terms of some number of parameters. We will give a systematic way of doing so in ; for now we give parametric descriptions in the examples of the previous .   Lines  Line parametric form of  Consider the linear equation of this . In this context, we call an implicit equation of the line. We can write the same line in parametric form as follows: This means that every point on the line has the form for some real number . In this case, we call a parameter , as it parameterizes the points on the line.             Now consider the system of two linear equations of . These collectively form the implicit equations for a line in . (At least two equations are needed to define a line in space.) This line also has a parametric form with one parameter  :    The planes defined by the equations and intersect in the yellow line, which is parameterized by . Move the slider to change the parameterized point.    Note that in each case, the parameter allows us to use to label the points on the line. However, neither line is the same as the number line : indeed, every point on the first line has two coordinates, like the point , and every point on the second line has three coordinates, like .    Planes  Plane parametric form of  Consider the linear equation of . This is an implicit equation of a plane in space. This plane has an equation in parametric form : we can write every point on the plane as In this case, we need two parameters  and to describe all points on the plane.   The plane in defined by the equation . This plane is parameterized by two numbers ; move the sliders to change the parameterized point.    Note that the parameters allow us to use to label the points on the plane. However, this plane is not the same as the plane : indeed, every point on this plane has three coordinates, like the point .   When there is a unique solution, as in , it is not necessary to use parameters to describe the solution set.   "
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
  "number": "1.2",
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
  "number": "1.3",
  "title": "Solution sets.",
  "body": " Solution sets     A solution of a system of equations is a list of numbers that make all of the equations true simultaneously.  The solution set of a system of equations is the collection of all solutions.  Solving the system means finding all solutions with formulas involving some number of parameters.   System of linear equations solution of  Solution System of linear equations  Solution set definition of    "
},
{
  "id": "systems-of-eqns-3-8",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-3-8",
  "type": "Definition",
  "number": "1.4",
  "title": "",
  "body": " System of linear equations inconsistent  System of linear equations consistent  Consistent System of linear equations  Inconsistent System of linear equations   A system of equations is called inconsistent if it has no solutions. It is called consistent otherwise.   "
},
{
  "id": "subsection-Rn-3",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-3",
  "type": "Definition",
  "number": "1.5",
  "title": "",
  "body": " Real -space  Real -space point of    Real -space    Let be a positive whole number. We define An -tuple of real numbers is called a point of .   "
},
{
  "id": "subsection-Rn-5",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-5",
  "type": "Example",
  "number": "1.6",
  "title": "The number line.",
  "body": " The number line  Real numbers  Line number line  When , we just get back: . Geometrically, this is the number line.   The number line marked with integers from -3 to 3    "
},
{
  "id": "subsection-Rn-6",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-6",
  "type": "Example",
  "number": "1.7",
  "title": "The Euclidean plane.",
  "body": " The Euclidean plane  Plane -plane  When , we can think of as the -plane. We can do so because every point on the plane can be represented by an ordered pair of real numbers, namely, its - and -coordinates.  The Euclidean plane with two marked points   The Euclidean plane with drawn horizontal and vertical axes and two marked points at and .   "
},
{
  "id": "subsection-Rn-7",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-7",
  "type": "Example",
  "number": "1.8",
  "title": "3-Space.",
  "body": " 3-Space  Space  When , we can think of as the space we (appear to) live in. We can do so because every point in space can be represented by an ordered triple of real numbers, namely, its -, -, and -coordinates.  3-space with two marked points  3-space with , and axes drawn along with a grid in the -plane and two marked points at and .   "
},
{
  "id": "subsection-Rn-8",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-8",
  "type": "Example",
  "number": "1.9",
  "title": "Interactive: Points in 3-Space.",
  "body": " Interactive: Points in 3-Space   A point in 3-space, and its coordinates. Click and drag the point, or move the sliders.    "
},
{
  "id": "subsection-Rn-13",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-13",
  "type": "Example",
  "number": "1.11",
  "title": "Color Space.",
  "body": " Color Space  Space color space  Color space  All colors you can see can be described by three quantities: the amount of red, green, and blue light in that color. (Humans are trichromatic .) Therefore, we can use the points of to label all colors: for instance, the point labels the color with red, green, and blue intensity.  Gradient of colors on a cube, with red, green, and blue axes labeled  "
},
{
  "id": "systems-eqns-R4",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-R4",
  "type": "Example",
  "number": "1.12",
  "title": "Traffic Flow.",
  "body": " Traffic Flow  In the , we could have used to label the amount of traffic passing through four streets. In other words, if there are cars per hour passing through roads , respectively, then this can be recorded by the point in . This is useful from a psychological standpoint: instead of having four numbers, we are now dealing with just one piece of data.  Directed traffic flows into, out of, and around a square formed by four intersections.  "
},
{
  "id": "subsection-Rn-15",
  "level": "2",
  "url": "systems-of-eqns.html#subsection-Rn-15",
  "type": "Example",
  "number": "1.13",
  "title": "QR Codes.",
  "body": " QR Codes  QR codes  A QR code is a method of storing data in a grid of black and white squares in a way that computers can easily read. A typical QR code is a grid. Reading each line left-to-right and reading the lines top-to-bottom (like you read a book) we can think of such a QR code as a sequence of digits, each digit being 1 (for white) or 0 (for black). In such a way, the entire QR code can be regarded as a point in . As in the previous , it is very useful from a psychological perspective to view a QR code as a single piece of data in this way.   The QR code for this textbook is a array of black\/white squares.   QR code that links to the textbook homepage    "
},
{
  "id": "systems-eqns-picture-line",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-picture-line",
  "type": "Example",
  "number": "1.15",
  "title": "One Equation in Two Variables.",
  "body": " One Equation in Two Variables  Consider the linear equation . We can rewrite this as , which defines a line in the plane: the slope is , and the -intercept is .   Line in the plane with slope negative 1 and interecept 1    "
},
{
  "id": "defn-lines",
  "level": "2",
  "url": "systems-of-eqns.html#defn-lines",
  "type": "Definition",
  "number": "1.16",
  "title": "Lines.",
  "body": " Lines  Line geometric definition of   For our purposes, a line is a ray that is straight and infinite in both directions.   "
},
{
  "id": "systems-eqns-picture-plane",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-picture-plane",
  "type": "Example",
  "number": "1.17",
  "title": "One Equation in Three Variables.",
  "body": " One Equation in Three Variables  Consider the linear equation . This is the implicit equation for a plane in space.   Plane in 3-space    "
},
{
  "id": "systems-eqns-pictures-7",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-pictures-7",
  "type": "Definition",
  "number": "1.18",
  "title": "Planes.",
  "body": " Planes  Plane geometric definition of   A plane is a flat sheet that is infinite in all directions.   "
},
{
  "id": "systems-eqns-pictures-8",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-pictures-8",
  "type": "Remark",
  "number": "1.19",
  "title": "",
  "body": " The equation defines a -plane in -space, and more generally, a single linear equation in variables defines an -plane in -space. We will make these statements precise in .  "
},
{
  "id": "systems-eqns-picture-2lines",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-picture-2lines",
  "type": "Example",
  "number": "1.20",
  "title": "Two Equations in Two Variables.",
  "body": " Two Equations in Two Variables  Now consider the system of two linear equations Each equation individually defines a line in the plane, pictured below.   Two lines in the plane intersecting at a point    A solution to the system of both equations is a pair of numbers that makes both equations true at once. In other words, it as a point that lies on both lines simultaneously. We can see in the picture above that there is only one point where the lines intersect: therefore, this system has exactly one solution. (This solution is , as the reader can verify.)  Usually, two lines in the plane will intersect in one point, but of course this is not always the case. Consider now the system of equations These define parallel lines in the plane.   Two parallel lines in the plane    The fact that that the lines do not intersect means that the system of equations has no solution. Of course, this is easy to see algebraically: if , then it is cannot also be the case that .  There is one more possibility. Consider the system of equations The second equation is a multiple of the first, so these equations define the same line in the plane.   Two lines in the plane that are equal    In this case, there are infinitely many solutions of the system of equations.  "
},
{
  "id": "systems-eqns-two-planes",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-two-planes",
  "type": "Example",
  "number": "1.21",
  "title": "Two Equations in Three Variables.",
  "body": " Two Equations in Three Variables  Consider the system of two linear equations Each equation individually defines a plane in space. The solutions of the system of both equations are the points that lie on both planes. We can see in the picture below that the planes intersect in a line. In particular, this system has infinitely many solutions.   The planes defined by the equations and intersect in the red line, which is the solution set of the system of both equations.    "
},
{
  "id": "systems-eqns-pictures-11",
  "level": "2",
  "url": "systems-of-eqns.html#systems-eqns-pictures-11",
  "type": "Remark",
  "number": "1.23",
  "title": "",
  "body": " In general, the solutions of a system of equations in variables is the intersection of -planes in -space. This is always some kind of linear space, as we will discuss in .  "
},
{
  "id": "systems-of-eqns-6-5",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-6-5",
  "type": "Example",
  "number": "1.24",
  "title": "Lines.",
  "body": " Lines  Line parametric form of  Consider the linear equation of this . In this context, we call an implicit equation of the line. We can write the same line in parametric form as follows: This means that every point on the line has the form for some real number . In this case, we call a parameter , as it parameterizes the points on the line.             Now consider the system of two linear equations of . These collectively form the implicit equations for a line in . (At least two equations are needed to define a line in space.) This line also has a parametric form with one parameter  :    The planes defined by the equations and intersect in the yellow line, which is parameterized by . Move the slider to change the parameterized point.    Note that in each case, the parameter allows us to use to label the points on the line. However, neither line is the same as the number line : indeed, every point on the first line has two coordinates, like the point , and every point on the second line has three coordinates, like .  "
},
{
  "id": "systems-of-eqns-6-6",
  "level": "2",
  "url": "systems-of-eqns.html#systems-of-eqns-6-6",
  "type": "Example",
  "number": "1.26",
  "title": "Planes.",
  "body": " Planes  Plane parametric form of  Consider the linear equation of . This is an implicit equation of a plane in space. This plane has an equation in parametric form : we can write every point on the plane as In this case, we need two parameters  and to describe all points on the plane.   The plane in defined by the equation . This plane is parameterized by two numbers ; move the sliders to change the parameterized point.    Note that the parameters allow us to use to label the points on the plane. However, this plane is not the same as the plane : indeed, every point on this plane has three coordinates, like the point .  "
},
{
  "id": "row-reduction",
  "level": "1",
  "url": "row-reduction.html",
  "type": "Section",
  "number": "1.2",
  "title": "Row Reduction",
  "body": " Row Reduction    Learn to replace a system of linear equations by an augmented matrix.  Learn how the elimination method corresponds to performing row operations on an augmented matrix.  Understand when a matrix is in (reduced) row echelon form.  Learn which row reduced matrices come from inconsistent linear systems.  Recipe: the row reduction algorithm.  Vocabulary words:  row operation , row equivalence , matrix , augmented matrix , pivot , (reduced) row echelon form .     In this section, we will present an algorithm for solving a system of linear equations.    The Elimination Method  Elimination method  We will solve systems of linear equations algebraically using the elimination method. In other words, we will combine the equations in various ways to try to eliminate as many variables as possible from each equation. There are three valid operations we can perform on our system of equations:  Scaling: we can multiply both sides of an equation by a nonzero number.   Replacement: we can add a multiple of one equation to another, replacing the second equation with the result.   Swap: we can swap two equations.       Solve using the elimination method.    At this point we ve eliminated both and from the third equation, and we can solve to get . Substituting for in the second equation gives , or . Substituting for and in the first equation gives , or . Thus the only solution is .  We can check that our solution is correct by substituting into the original equation:     Augmented Matrices and Row Operations  Solving equations by elimination requires writing the variables and the equals sign over and over again, merely as placeholders: all that is changing in the equations is the coefficient numbers . We can make our life easier by extracting only the numbers, and putting them in a box: Augmented matrix Matrix   Matrix definition of  Matrix augmented This is called an augmented matrix . The word augmented refers to the vertical line, which we draw to remind ourselves where the equals sign belongs; a matrix is a grid of numbers without the vertical line. In this notation, our three valid ways of manipulating our equations become row operations : Row operations   Scaling: multiply all entries in a row by a nonzero number. Row operations scaling  Here the notation simply means the first row , and likewise for etc. Row of a matrix   Replacement: add a multiple of one row to another, replacing the second row with the result. Row operations replacement  Row replacement Row operations, replacement    Swap: interchange two rows. Row operations swap       When we wrote our row operations above we used expressions like . Of course this does not mean that the second row is equal to the second row minus twice the first row. Instead it means that we are replacing the second row with the second row minus twice the first row. This kind of syntax is used frequently in computer programming when we want to change the value of a variable.     Solve using row operations.    We start by forming an augmented matrix: Eliminating a variable from an equation means producing a zero to the left of the line in an augmented matrix. First we produce zeros in the first column (i.e. we eliminate ) by subtracting multiples of the first row. This was made much easier by the fact that the top-left entry is equal to , so we can simply multiply the first row by the number below and subtract. In order to eliminate in the same way, we would like to produce a in the second column. We could divide the second row by , but this would produce fractions; instead, let s divide the third by . We swapped the second and third row just to keep things orderly. Now we translate this augmented matrix back into a system of equations: Hence ; back-substituting as in gives .    The process of doing row operations to a matrix does not change the solution set of the corresponding linear equations!  Indeed, the whole point of doing these operations is to solve the equations using the elimination method.   Row equivalence   Two matrices are called row equivalent if one can be obtained from the other by doing some number of row operations.    So the linear equations of row-equivalent matrices have the same solution set .   An Inconsistent System   Solve the following system of equations using row operations:     First we put our system of equations into an augmented matrix. We clear the entries below the top-left using row replacement. Now we clear the second entry from the last row. This translates back into the system of equations Our original system has the same solution set as this system. But this system has no solutions: there are no values of making the third equation true! We conclude that our original equation was inconsistent.       Echelon Forms  In the previous we saw how to translate a system of linear equations into an augmented matrix. We want to find an algorithm for solving such an augmented matrix. First we must decide what it means for an augmented matrix to be solved .   Row echelon form   A matrix is in row echelon form if:  All zero rows are at the bottom.  The first nonzero entry of a row is to the right of the first nonzero entry of the row above.  Below the first nonzero entry of a row, all entries are zero.      Here is a picture of a matrix in row echelon form:    Pivot   A pivot is the first nonzero entry of a row of a matrix in row echelon form.    A matrix in row-echelon form is generally easy to solve using back-substitution. For example, We immediately see that , which implies and See .   Reduced row echelon form   A matrix is in reduced row echelon form if it is in row echelon form, and in addition:  Each pivot is equal to 1.  Each pivot is the only nonzero entry in its column.      Here is a picture of a matrix in reduced row echelon form:   A matrix in reduced row echelon form is in some sense completely solved. For example,    The following matrices are in reduced row echelon form: The following matrices are in row echelon form but not reduced row echelon form: The following matrices are not in echelon form:     When deciding if an augmented matrix is in (reduced) row echelon form, there is nothing special about the augmented column(s). Just ignore the vertical line.   If an augmented matrix is in reduced row echelon form, the corresponding linear system is viewed as solved . We will see below why this is the case, and we will show that any matrix can be put into reduced row echelon form using only row operations.   Why the word pivot ?  Consider the following system of equations: We can visualize this system as a pair of lines in (red and blue, respectively, in the picture below) that intersect at the point . If we subtract the first equation from the second, we obtain the equation , or . This results in the system of equations: In terms of row operations on matrices, we can write this as:              What has happened geometrically is that the original blue line has been replaced with the new blue line . We can think of the blue line as rotating, or pivoting, around the solution . We used the pivot position in the matrix in order to make the blue line pivot like this. This is one possible explanation for the terminology pivot .     The Row Reduction Algorithm    Every matrix is row equivalent to one and only one matrix in reduced row echelon form.    We will give an algorithm, called row reduction or Gaussian elimination , which demonstrates that every matrix is row equivalent to at least one matrix in reduced row echelon form.   The uniqueness statement is interesting it means that, no matter how you row reduce, you always get the same matrix in reduced row echelon form.   This assumes, of course, that you only do the three legal row operations, and you don t make any arithmetic errors.  We will not prove uniqueness, but maybe you can!   Row Reduction  Row reduction algorithm  Gaussian elimination Row reduction     Step 1a: Swap the 1st row with a lower one so a leftmost nonzero entry is in the 1st row (if necessary).  Step 1b: Scale the 1st row so that its first nonzero entry is equal to 1.  Step 1c: Use row replacement so all entries below this 1 are 0.  Step 2a: Swap the 2nd row with a lower one so that the leftmost nonzero entry is in the 2nd row.  Step 2b: Scale the 2nd row so that its first nonzero entry is equal to 1.  Step 2c: Use row replacement so all entries below this 1 are 0.  Step 3a: Swap the 3rd row with a lower one so that the leftmost nonzero entry is in the 3rd row.  etc.  Last Step: Use row replacement to clear all entries above the pivots, starting with the last pivot.        Row reduce this matrix:                The reduced row echelon form of the matrix is The reduced row echelon form of the matrix tells us that the only solution is    Animated slideshow of the row reduction in this example.      Here is the row reduction algorithm, summarized in pictures. Row reduction picture of              It will be very important to know where are the pivots of a matrix after row reducing; this is the reason for the following piece of terminology.   Pivot position   A pivot position of a matrix is an entry that is a pivot of a row echelon form of that matrix.  A pivot column of a matrix is a column that contains a pivot position.     Pivot Positions   Find the pivot positions and pivot columns of this matrix     We saw in that a row echelon form of the matrix is The pivot positions of are the entries that become pivots in a row echelon form; they are marked in color below: The first, second, and third columns are pivot columns.     An Inconsistent System   Solve the linear system using row reduction.     This row reduced matrix corresponds to the inconsistent system     In the above example, we saw how to recognize the reduced row echelon form of an inconsistent system.   The Row Echelon Form of an Inconsistent System  System of linear equations inconsistent RREF criterion  An augmented matrix corresponds to an inconsistent system of equations if and only if the last column (i.e., the augmented column) is a pivot column .   In other words, the row reduced matrix of an inconsistent system looks like this:   We have discussed two classes of matrices so far:  When the reduced row echelon form of a matrix has a pivot in every non-augmented column, then it corresponds to a system with a unique solution:   When the reduced row echelon form of a matrix has a pivot in the last (augmented) column, then it corresponds to a system with a no solutions:   What happens when one of the non-augmented columns lacks a pivot? This is the subject of .   A System with Many Solutions   Solve the linear system using row reduction.     This row reduced matrix corresponds to the linear system In what sense is the system solved? We will see in .     "
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
  "id": "row-reduction-elimination-3",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "elimination "
},
{
  "id": "systems-eqns-example1",
  "level": "2",
  "url": "row-reduction.html#systems-eqns-example1",
  "type": "Example",
  "number": "1.28",
  "title": "",
  "body": "  Solve using the elimination method.    At this point we ve eliminated both and from the third equation, and we can solve to get . Substituting for in the second equation gives , or . Substituting for and in the first equation gives , or . Thus the only solution is .  We can check that our solution is correct by substituting into the original equation:    "
},
{
  "id": "row-reduction-elimination-5-2",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-5-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "augmented matrix matrix row operations "
},
{
  "id": "row-reduction-elimination-5-3",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-5-3",
  "type": "Remark",
  "number": "1.29",
  "title": "",
  "body": " When we wrote our row operations above we used expressions like . Of course this does not mean that the second row is equal to the second row minus twice the first row. Instead it means that we are replacing the second row with the second row minus twice the first row. This kind of syntax is used frequently in computer programming when we want to change the value of a variable.  "
},
{
  "id": "systems-eqns-example1b",
  "level": "2",
  "url": "row-reduction.html#systems-eqns-example1b",
  "type": "Example",
  "number": "1.30",
  "title": "",
  "body": "  Solve using row operations.    We start by forming an augmented matrix: Eliminating a variable from an equation means producing a zero to the left of the line in an augmented matrix. First we produce zeros in the first column (i.e. we eliminate ) by subtracting multiples of the first row. This was made much easier by the fact that the top-left entry is equal to , so we can simply multiply the first row by the number below and subtract. In order to eliminate in the same way, we would like to produce a in the second column. We could divide the second row by , but this would produce fractions; instead, let s divide the third by . We swapped the second and third row just to keep things orderly. Now we translate this augmented matrix back into a system of equations: Hence ; back-substituting as in gives .   "
},
{
  "id": "row-reduction-elimination-5-5",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-5-5",
  "type": "Insight",
  "number": "1.31",
  "title": "",
  "body": "The process of doing row operations to a matrix does not change the solution set of the corresponding linear equations! "
},
{
  "id": "row-reduction-elimination-5-7",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-5-7",
  "type": "Definition",
  "number": "1.32",
  "title": "",
  "body": " Row equivalence   Two matrices are called row equivalent if one can be obtained from the other by doing some number of row operations.   "
},
{
  "id": "row-reduction-elimination-5-9",
  "level": "2",
  "url": "row-reduction.html#row-reduction-elimination-5-9",
  "type": "Example",
  "number": "1.33",
  "title": "An Inconsistent System.",
  "body": " An Inconsistent System   Solve the following system of equations using row operations:     First we put our system of equations into an augmented matrix. We clear the entries below the top-left using row replacement. Now we clear the second entry from the last row. This translates back into the system of equations Our original system has the same solution set as this system. But this system has no solutions: there are no values of making the third equation true! We conclude that our original equation was inconsistent.   "
},
{
  "id": "row-reduction-echelon-forms-3",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-3",
  "type": "Definition",
  "number": "1.34",
  "title": "",
  "body": " Row echelon form   A matrix is in row echelon form if:  All zero rows are at the bottom.  The first nonzero entry of a row is to the right of the first nonzero entry of the row above.  Below the first nonzero entry of a row, all entries are zero.     "
},
{
  "id": "row-reduction-echelon-forms-5",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-5",
  "type": "Definition",
  "number": "1.35",
  "title": "",
  "body": " Pivot   A pivot is the first nonzero entry of a row of a matrix in row echelon form.   "
},
{
  "id": "row-reduction-echelon-forms-7",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-7",
  "type": "Definition",
  "number": "1.36",
  "title": "",
  "body": " Reduced row echelon form   A matrix is in reduced row echelon form if it is in row echelon form, and in addition:  Each pivot is equal to 1.  Each pivot is the only nonzero entry in its column.     "
},
{
  "id": "row-reduction-echelon-forms-10",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-10",
  "type": "Example",
  "number": "1.37",
  "title": "",
  "body": " The following matrices are in reduced row echelon form: The following matrices are in row echelon form but not reduced row echelon form: The following matrices are not in echelon form:   "
},
{
  "id": "row-reduction-echelon-forms-11",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-11",
  "type": "Insight",
  "number": "1.38",
  "title": "",
  "body": " When deciding if an augmented matrix is in (reduced) row echelon form, there is nothing special about the augmented column(s). Just ignore the vertical line.  "
},
{
  "id": "row-reduction-echelon-forms-13",
  "level": "2",
  "url": "row-reduction.html#row-reduction-echelon-forms-13",
  "type": "Remark",
  "number": "1.39",
  "title": "Why the word “pivot”?",
  "body": " Why the word pivot ?  Consider the following system of equations: We can visualize this system as a pair of lines in (red and blue, respectively, in the picture below) that intersect at the point . If we subtract the first equation from the second, we obtain the equation , or . This results in the system of equations: In terms of row operations on matrices, we can write this as:              What has happened geometrically is that the original blue line has been replaced with the new blue line . We can think of the blue line as rotating, or pivoting, around the solution . We used the pivot position in the matrix in order to make the blue line pivot like this. This is one possible explanation for the terminology pivot .  "
},
{
  "id": "row-reduction-works",
  "level": "2",
  "url": "row-reduction.html#row-reduction-works",
  "type": "Theorem",
  "number": "1.40",
  "title": "",
  "body": "  Every matrix is row equivalent to one and only one matrix in reduced row echelon form.   "
},
{
  "id": "row-reduction-6-3",
  "level": "2",
  "url": "row-reduction.html#row-reduction-6-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "row reduction Gaussian elimination "
},
{
  "id": "row-reduction-6-4",
  "level": "2",
  "url": "row-reduction.html#row-reduction-6-4",
  "type": "Insight",
  "number": "1.41",
  "title": "",
  "body": " The uniqueness statement is interesting it means that, no matter how you row reduce, you always get the same matrix in reduced row echelon form.  "
},
{
  "id": "algo-row-reduction",
  "level": "2",
  "url": "row-reduction.html#algo-row-reduction",
  "type": "Algorithm",
  "number": "1.42",
  "title": "Row Reduction.",
  "body": " Row Reduction  Row reduction algorithm  Gaussian elimination Row reduction     Step 1a: Swap the 1st row with a lower one so a leftmost nonzero entry is in the 1st row (if necessary).  Step 1b: Scale the 1st row so that its first nonzero entry is equal to 1.  Step 1c: Use row replacement so all entries below this 1 are 0.  Step 2a: Swap the 2nd row with a lower one so that the leftmost nonzero entry is in the 2nd row.  Step 2b: Scale the 2nd row so that its first nonzero entry is equal to 1.  Step 2c: Use row replacement so all entries below this 1 are 0.  Step 3a: Swap the 3rd row with a lower one so that the leftmost nonzero entry is in the 3rd row.  etc.  Last Step: Use row replacement to clear all entries above the pivots, starting with the last pivot.     "
},
{
  "id": "row-reduction-eg1",
  "level": "2",
  "url": "row-reduction.html#row-reduction-eg1",
  "type": "Example",
  "number": "1.43",
  "title": "",
  "body": "  Row reduce this matrix:                The reduced row echelon form of the matrix is The reduced row echelon form of the matrix tells us that the only solution is    Animated slideshow of the row reduction in this example.     "
},
{
  "id": "defn-pivot-pos",
  "level": "2",
  "url": "row-reduction.html#defn-pivot-pos",
  "type": "Definition",
  "number": "1.45",
  "title": "",
  "body": " Pivot position   A pivot position of a matrix is an entry that is a pivot of a row echelon form of that matrix.  A pivot column of a matrix is a column that contains a pivot position.   "
},
{
  "id": "pivot-pos-eg",
  "level": "2",
  "url": "row-reduction.html#pivot-pos-eg",
  "type": "Example",
  "number": "1.46",
  "title": "Pivot Positions.",
  "body": " Pivot Positions   Find the pivot positions and pivot columns of this matrix     We saw in that a row echelon form of the matrix is The pivot positions of are the entries that become pivots in a row echelon form; they are marked in color below: The first, second, and third columns are pivot columns.   "
},
{
  "id": "row-reduction-eg-inconsistent",
  "level": "2",
  "url": "row-reduction.html#row-reduction-eg-inconsistent",
  "type": "Example",
  "number": "1.47",
  "title": "An Inconsistent System.",
  "body": " An Inconsistent System   Solve the linear system using row reduction.     This row reduced matrix corresponds to the inconsistent system    "
},
{
  "id": "row-reduction-6-16",
  "level": "2",
  "url": "row-reduction.html#row-reduction-6-16",
  "type": "Theorem",
  "number": "1.48",
  "title": "The Row Echelon Form of an Inconsistent System.",
  "body": " The Row Echelon Form of an Inconsistent System  System of linear equations inconsistent RREF criterion  An augmented matrix corresponds to an inconsistent system of equations if and only if the last column (i.e., the augmented column) is a pivot column .  "
},
{
  "id": "row-reduction-6-19",
  "level": "2",
  "url": "row-reduction.html#row-reduction-6-19",
  "type": "Example",
  "number": "1.49",
  "title": "A System with Many Solutions.",
  "body": " A System with Many Solutions   Solve the linear system using row reduction.     This row reduced matrix corresponds to the linear system In what sense is the system solved? We will see in .   "
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
  "id": "chap-geometry",
  "level": "1",
  "url": "chap-geometry.html",
  "type": "Chapter",
  "number": "2",
  "title": "Systems of Linear Equations: Geometry",
  "body": " Systems of Linear Equations: Geometry    We have already discussed systems of linear equations and how this is related to matrices. In this chapter we will learn how to write a system of linear equations succinctly as a matrix equation, which looks like , where is an matrix, is a vector in and is a variable vector in . As we will see, this is a powerful perspective. We will study two related questions:  What is the set of solutions to ?  What is the set of so that is consistent?  The first question is the kind you are used to from your first algebra class: what is the set of solutions to . The second is also something you could have studied in your previous algebra classes: for which does have a solution? This question is more subtle at first glance, but you can solve it in the same way as the first question, with the quadratic formula.   In order to answer the two questions listed above, we will use geometry. This will be analogous to how you used parabolas in order to understand the solutions to a quadratic equation in one variable. Specifically, this chapter is devoted to the geometric study of two objects:  the solution set of a matrix equation , and  the set of all that makes a particular system consistent.  The second object will be called the column space of . The two objects are related in a beautiful way by the rank theorem in .  Instead of parabolas and hyperbolas, our geometric objects are subspaces, such as lines and planes. Our geometric objects will be something like 13-dimensional planes in , etc. It is amazing that we can say anything substantive about objects that we cannot directly visualize.    "
},
{
  "id": "chap-geometry-2-1",
  "level": "2",
  "url": "chap-geometry.html#chap-geometry-2-1",
  "type": "Primary Goal",
  "number": "2.1",
  "title": "",
  "body": " We have already discussed systems of linear equations and how this is related to matrices. In this chapter we will learn how to write a system of linear equations succinctly as a matrix equation, which looks like , where is an matrix, is a vector in and is a variable vector in . As we will see, this is a powerful perspective. We will study two related questions:  What is the set of solutions to ?  What is the set of so that is consistent?  The first question is the kind you are used to from your first algebra class: what is the set of solutions to . The second is also something you could have studied in your previous algebra classes: for which does have a solution? This question is more subtle at first glance, but you can solve it in the same way as the first question, with the quadratic formula.  "
},
{
  "id": "chap-matrices",
  "level": "1",
  "url": "chap-matrices.html",
  "type": "Chapter",
  "number": "3",
  "title": "Linear Transformations and Matrix Algebra",
  "body": " Linear Transformations and Matrix Algebra    Learn about linear transformations and their relationship to matrices.   In practice, one is often lead to ask questions about the geometry of a transformation : a function that takes an input and produces an output. This kind of question can be answered by linear algebra if the transformation can be expressed by a matrix.   Suppose you are building a robot arm with three joints that can move its hand around a plane, as in the following picture.         Define a transformation as follows: is the position of the hand when the joints are rotated by angles , respectively. The output of tells you where the hand will be on the plane when the joints are set at the given input angles.  Unfortunately, this kind of function does not come from a matrix, so one cannot use linear algebra to answer questions about this function. In fact, these functions are rather complicated; their study is the subject of inverse kinematics .   In this chapter, we will be concerned with the relationship between matrices and transformations. In , we will consider the equation as a function with independent variable and dependent variable , and we draw pictures accordingly. We spend some time studying transformations in the abstract, and asking questions about a transformation, like whether it is one-to-one and\/or onto ( ). In we will answer the question: when exactly can a transformation be expressed by a matrix? We then present matrix multiplication as a special case of composition of transformations ( ). This leads to the study of matrix algebra : that is, to what extent one can do arithmetic with matrices in the place of numbers. With this in place, we learn to solve matrix equations by dividing by a matrix in .    "
},
{
  "id": "chap-matrices-2-1",
  "level": "2",
  "url": "chap-matrices.html#chap-matrices-2-1",
  "type": "Primary Goal",
  "number": "3.1",
  "title": "",
  "body": " Learn about linear transformations and their relationship to matrices.  "
},
{
  "id": "chap-matrices-2-3",
  "level": "2",
  "url": "chap-matrices.html#chap-matrices-2-3",
  "type": "Example",
  "number": "3.2",
  "title": "",
  "body": " Suppose you are building a robot arm with three joints that can move its hand around a plane, as in the following picture.         Define a transformation as follows: is the position of the hand when the joints are rotated by angles , respectively. The output of tells you where the hand will be on the plane when the joints are set at the given input angles.  Unfortunately, this kind of function does not come from a matrix, so one cannot use linear algebra to answer questions about this function. In fact, these functions are rather complicated; their study is the subject of inverse kinematics .  "
},
{
  "id": "chap-determinant",
  "level": "1",
  "url": "chap-determinant.html",
  "type": "Chapter",
  "number": "4",
  "title": "Determinants",
  "body": " Determinants   We begin by recalling the overall structure of this book:  Solve the matrix equation .  Solve the matrix equation , where is a number.  Approximately solve the matrix equation .  At this point we have said all that we will say about the first part. This chapter belongs to the second.   Learn about determinants: their computation and their properties.   The determinant of a square matrix is a number . This incredible quantity is one of the most important invariants of a matrix; as such, it forms the basis of most advanced computations involving matrices.  In , we will define the determinant in terms of its behavior with respect to row operations. The determinant satisfies many wonderful properties: for instance, if and only if is invertible. We will discuss some of these properties in as well. In , we will give a recursive formula for the determinant of a matrix. This formula is very useful, for instance, when taking the determinant of a matrix with unknown entries; this will be important in . Finally, in , we will relate determinants to volumes. This gives a geometric interpretation for determinants, and explains why the determinant is defined the way it is. This interpretation of determinants is a crucial ingredient in the change-of-variables formula in multivariable calculus.    "
},
{
  "id": "chap-determinant-2-2",
  "level": "2",
  "url": "chap-determinant.html#chap-determinant-2-2",
  "type": "Primary Goal",
  "number": "4.1",
  "title": "",
  "body": " Learn about determinants: their computation and their properties.  "
},
{
  "id": "chap-eigenvalues",
  "level": "1",
  "url": "chap-eigenvalues.html",
  "type": "Chapter",
  "number": "5",
  "title": "Eigenvalues and Eigenvectors",
  "body": " Eigenvalues and Eigenvectors    Solve the matrix equation    This chapter constitutes the core of any first course on linear algebra: eigenvalues and eigenvectors play a crucial role in most real-world applications of the subject.   In a population of rabbits,  half of the newborn rabbits survive their first year;  of those, half survive their second year;  the maximum life span is three years;  rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.  What is the asymptotic behavior of this system? What will the rabbit population look like in 100 years?   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.       "
},
{
  "id": "chap-eigenvalues-2-1",
  "level": "2",
  "url": "chap-eigenvalues.html#chap-eigenvalues-2-1",
  "type": "Primary Goal",
  "number": "5.1",
  "title": "",
  "body": " Solve the matrix equation   "
},
{
  "id": "chap-eigenvalues-2-3",
  "level": "2",
  "url": "chap-eigenvalues.html#chap-eigenvalues-2-3",
  "type": "Example",
  "number": "5.2",
  "title": "",
  "body": " In a population of rabbits,  half of the newborn rabbits survive their first year;  of those, half survive their second year;  the maximum life span is three years;  rabbits produce 0, 6, 8 baby rabbits in their first, second, and third years, respectively.  What is the asymptotic behavior of this system? What will the rabbit population look like in 100 years?   Left: the population of rabbits in a given year. Right: the proportions of rabbits in that year. Choose any values you like for the starting population, and click Advance 1 year several times. What do you notice about the long-term behavior of the ratios? This phenomenon turns out to be due to eigenvectors.    "
},
{
  "id": "chap-orthogonality",
  "level": "1",
  "url": "chap-orthogonality.html",
  "type": "Chapter",
  "number": "6",
  "title": "Orthogonality",
  "body": " Orthogonality   Let us recall one last time the structure of this book:  Solve the matrix equation .  Solve the matrix equation , where is a number.  Approximately solve the matrix equation .  We have now come to the third part.   Approximately solve the matrix equation    Finding approximate solutions of equations generally requires computing the closest vector on a subspace to a given vector. This becomes an orthogonality problem: one needs to know which vectors are perpendicular to the subspace.              In data modeling, one often asks: what line is my data supposed to lie on? This can be solved using a simple application of the least-squares method.               Gauss invented the method of least squares to find a best-fit ellipse: he correctly predicted the (elliptical) orbit of the asteroid Ceres as it passed behind the sun in 1801.                "
},
{
  "id": "chap-orthogonality-2-2",
  "level": "2",
  "url": "chap-orthogonality.html#chap-orthogonality-2-2",
  "type": "Primary Goal",
  "number": "6.1",
  "title": "",
  "body": " Approximately solve the matrix equation   "
},
{
  "id": "chap-orthogonality-2-5",
  "level": "2",
  "url": "chap-orthogonality.html#chap-orthogonality-2-5",
  "type": "Example",
  "number": "6.2",
  "title": "",
  "body": " In data modeling, one often asks: what line is my data supposed to lie on? This can be solved using a simple application of the least-squares method.             "
},
{
  "id": "chap-orthogonality-2-6",
  "level": "2",
  "url": "chap-orthogonality.html#chap-orthogonality-2-6",
  "type": "Example",
  "number": "6.3",
  "title": "",
  "body": " Gauss invented the method of least squares to find a best-fit ellipse: he correctly predicted the (elliptical) orbit of the asteroid Ceres as it passed behind the sun in 1801.             "
},
{
  "id": "backmatter-2",
  "level": "1",
  "url": "backmatter-2.html",
  "type": "Appendix",
  "number": "A",
  "title": "Notation",
  "body": " Notation  The following table defines the notation used in this book. Page numbers or references refer to the first appearance of each symbol.   "
},
{
  "id": "appendix-gfdl",
  "level": "1",
  "url": "appendix-gfdl.html",
  "type": "Appendix",
  "number": "B",
  "title": "GNU Free Documentation License",
  "body": " GNU Free Documentation License  Version 1.3, 3 November 2008  Copyright copyright 2000, 2001, 2002, 2007, 2008 Free Software Foundation, Inc.  Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.   0. PREAMBLE  The purpose of this License is to make a manual, textbook, or other functional and useful document free in the sense of freedom: to assure everyone the effective freedom to copy and redistribute it, with or without modifying it, either commercially or noncommercially. Secondarily, this License preserves for the author and publisher a way to get credit for their work, while not being considered responsible for modifications made by others.  This License is a kind of copyleft , which means that derivative works of the document must themselves be free in the same sense. It complements the GNU General Public License, which is a copyleft license designed for free software.  We have designed this License in order to use it for manuals for free software, because free software needs free documentation: a free program should come with manuals providing the same freedoms that the software does. But this License is not limited to software manuals; it can be used for any textual work, regardless of subject matter or whether it is published as a printed book. We recommend this License principally for works whose purpose is instruction or reference.    1. APPLICABILITY AND DEFINITIONS  This License applies to any manual or other work, in any medium, that contains a notice placed by the copyright holder saying it can be distributed under the terms of this License. Such a notice grants a world-wide, royalty-free license, unlimited in duration, to use that work under the conditions stated herein. The Document , below, refers to any such manual or work. Any member of the public is a licensee, and is addressed as you . You accept the license if you copy, modify or distribute the work in a way requiring permission under copyright law.  A Modified Version of the Document means any work containing the Document or a portion of it, either copied verbatim, or with modifications and\/or translated into another language.  A Secondary Section is a named appendix or a front-matter section of the Document that deals exclusively with the relationship of the publishers or authors of the Document to the Document s overall subject (or to related matters) and contains nothing that could fall directly within that overall subject. (Thus, if the Document is in part a textbook of mathematics, a Secondary Section may not explain any mathematics.) The relationship could be a matter of historical connection with the subject or with related matters, or of legal, commercial, philosophical, ethical or political position regarding them.  The Invariant Sections are certain Secondary Sections whose titles are designated, as being those of Invariant Sections, in the notice that says that the Document is released under this License. If a section does not fit the above definition of Secondary then it is not allowed to be designated as Invariant. The Document may contain zero Invariant Sections. If the Document does not identify any Invariant Sections then there are none.  The Cover Texts are certain short passages of text that are listed, as Front-Cover Texts or Back-Cover Texts, in the notice that says that the Document is released under this License. A Front-Cover Text may be at most 5 words, and a Back-Cover Text may be at most 25 words.  A Transparent copy of the Document means a machine-readable copy, represented in a format whose specification is available to the general public, that is suitable for revising the document straightforwardly with generic text editors or (for images composed of pixels) generic paint programs or (for drawings) some widely available drawing editor, and that is suitable for input to text formatters or for automatic translation to a variety of formats suitable for input to text formatters. A copy made in an otherwise Transparent file format whose markup, or absence of markup, has been arranged to thwart or discourage subsequent modification by readers is not Transparent. An image format is not Transparent if used for any substantial amount of text. A copy that is not Transparent is called Opaque .  Examples of suitable formats for Transparent copies include plain ASCII without markup, Texinfo input format, LaTeX input format, SGML or XML using a publicly available DTD, and standard-conforming simple HTML, PostScript or PDF designed for human modification. Examples of transparent image formats include PNG, XCF and JPG. Opaque formats include proprietary formats that can be read and edited only by proprietary word processors, SGML or XML for which the DTD and\/or processing tools are not generally available, and the machine-generated HTML, PostScript or PDF produced by some word processors for output purposes only.  The Title Page means, for a printed book, the title page itself, plus such following pages as are needed to hold, legibly, the material this License requires to appear in the title page. For works in formats which do not have any title page as such, Title Page means the text near the most prominent appearance of the work s title, preceding the beginning of the body of the text.  The publisher means any person or entity that distributes copies of the Document to the public.  A section Entitled XYZ means a named subunit of the Document whose title either is precisely XYZ or contains XYZ in parentheses following text that translates XYZ in another language. (Here XYZ stands for a specific section name mentioned below, such as Acknowledgements , Dedications , Endorsements , or History .) To Preserve the Title of such a section when you modify the Document means that it remains a section Entitled XYZ according to this definition.  The Document may include Warranty Disclaimers next to the notice which states that this License applies to the Document. These Warranty Disclaimers are considered to be included by reference in this License, but only as regards disclaiming warranties: any other implication that these Warranty Disclaimers may have is void and has no effect on the meaning of this License.    2. VERBATIM COPYING  You may copy and distribute the Document in any medium, either commercially or noncommercially, provided that this License, the copyright notices, and the license notice saying this License applies to the Document are reproduced in all copies, and that you add no other conditions whatsoever to those of this License. You may not use technical measures to obstruct or control the reading or further copying of the copies you make or distribute. However, you may accept compensation in exchange for copies. If you distribute a large enough number of copies you must also follow the conditions in section 3.  You may also lend copies, under the same conditions stated above, and you may publicly display copies.    3. COPYING IN QUANTITY  If you publish printed copies (or copies in media that commonly have printed covers) of the Document, numbering more than 100, and the Document s license notice requires Cover Texts, you must enclose the copies in covers that carry, clearly and legibly, all these Cover Texts: Front-Cover Texts on the front cover, and Back-Cover Texts on the back cover. Both covers must also clearly and legibly identify you as the publisher of these copies. The front cover must present the full title with all words of the title equally prominent and visible. You may add other material on the covers in addition. Copying with changes limited to the covers, as long as they preserve the title of the Document and satisfy these conditions, can be treated as verbatim copying in other respects.  If the required texts for either cover are too voluminous to fit legibly, you should put the first ones listed (as many as fit reasonably) on the actual cover, and continue the rest onto adjacent pages.  If you publish or distribute Opaque copies of the Document numbering more than 100, you must either include a machine-readable Transparent copy along with each Opaque copy, or state in or with each Opaque copy a computer-network location from which the general network-using public has access to download using public-standard network protocols a complete Transparent copy of the Document, free of added material. If you use the latter option, you must take reasonably prudent steps, when you begin distribution of Opaque copies in quantity, to ensure that this Transparent copy will remain thus accessible at the stated location until at least one year after the last time you distribute an Opaque copy (directly or through your agents or retailers) of that edition to the public.  It is requested, but not required, that you contact the authors of the Document well before redistributing any large number of copies, to give them a chance to provide you with an updated version of the Document.    4. MODIFICATIONS  You may copy and distribute a Modified Version of the Document under the conditions of sections 2 and 3 above, provided that you release the Modified Version under precisely this License, with the Modified Version filling the role of the Document, thus licensing distribution and modification of the Modified Version to whoever possesses a copy of it. In addition, you must do these things in the Modified Version:    Use in the Title Page (and on the covers, if any) a title distinct from that of the Document, and from those of previous versions (which should, if there were any, be listed in the History section of the Document). You may use the same title as a previous version if the original publisher of that version gives permission.  List on the Title Page, as authors, one or more persons or entities responsible for authorship of the modifications in the Modified Version, together with at least five of the principal authors of the Document (all of its principal authors, if it has fewer than five), unless they release you from this requirement.  State on the Title page the name of the publisher of the Modified Version, as the publisher.  Preserve all the copyright notices of the Document.  Add an appropriate copyright notice for your modifications adjacent to the other copyright notices.  Include, immediately after the copyright notices, a license notice giving the public permission to use the Modified Version under the terms of this License, in the form shown in the Addendum below.  Preserve in that license notice the full lists of Invariant Sections and required Cover Texts given in the Document s license notice.  Include an unaltered copy of this License.  Preserve the section Entitled History , Preserve its Title, and add to it an item stating at least the title, year, new authors, and publisher of the Modified Version as given on the Title Page. If there is no section Entitled History in the Document, create one stating the title, year, authors, and publisher of the Document as given on its Title Page, then add an item describing the Modified Version as stated in the previous sentence.  Preserve the network location, if any, given in the Document for public access to a Transparent copy of the Document, and likewise the network locations given in the Document for previous versions it was based on. These may be placed in the History section. You may omit a network location for a work that was published at least four years before the Document itself, or if the original publisher of the version it refers to gives permission.  For any section Entitled Acknowledgements or Dedications , Preserve the Title of the section, and preserve in the section all the substance and tone of each of the contributor acknowledgements and\/or dedications given therein.  Preserve all the Invariant Sections of the Document, unaltered in their text and in their titles. Section numbers or the equivalent are not considered part of the section titles.  Delete any section Entitled Endorsements . Such a section may not be included in the Modified Version.  Do not retitle any existing section to be Entitled Endorsements or to conflict in title with any Invariant Section.  Preserve any Warranty Disclaimers.   If the Modified Version includes new front-matter sections or appendices that qualify as Secondary Sections and contain no material copied from the Document, you may at your option designate some or all of these sections as invariant. To do this, add their titles to the list of Invariant Sections in the Modified Version s license notice. These titles must be distinct from any other section titles.  You may add a section Entitled Endorsements , provided it contains nothing but endorsements of your Modified Version by various parties for example, statements of peer review or that the text has been approved by an organization as the authoritative definition of a standard.  You may add a passage of up to five words as a Front-Cover Text, and a passage of up to 25 words as a Back-Cover Text, to the end of the list of Cover Texts in the Modified Version. Only one passage of Front-Cover Text and one of Back-Cover Text may be added by (or through arrangements made by) any one entity. If the Document already includes a cover text for the same cover, previously added by you or by arrangement made by the same entity you are acting on behalf of, you may not add another; but you may replace the old one, on explicit permission from the previous publisher that added the old one.  The author(s) and publisher(s) of the Document do not by this License give permission to use their names for publicity for or to assert or imply endorsement of any Modified Version.    5. COMBINING DOCUMENTS  You may combine the Document with other documents released under this License, under the terms defined in section 4 above for modified versions, provided that you include in the combination all of the Invariant Sections of all of the original documents, unmodified, and list them all as Invariant Sections of your combined work in its license notice, and that you preserve all their Warranty Disclaimers.  The combined work need only contain one copy of this License, and multiple identical Invariant Sections may be replaced with a single copy. If there are multiple Invariant Sections with the same name but different contents, make the title of each such section unique by adding at the end of it, in parentheses, the name of the original author or publisher of that section if known, or else a unique number. Make the same adjustment to the section titles in the list of Invariant Sections in the license notice of the combined work.  In the combination, you must combine any sections Entitled History in the various original documents, forming one section Entitled History ; likewise combine any sections Entitled Acknowledgements , and any sections Entitled Dedications . You must delete all sections Entitled Endorsements .    6. COLLECTIONS OF DOCUMENTS  You may make a collection consisting of the Document and other documents released under this License, and replace the individual copies of this License in the various documents with a single copy that is included in the collection, provided that you follow the rules of this License for verbatim copying of each of the documents in all other respects.  You may extract a single document from such a collection, and distribute it individually under this License, provided you insert a copy of this License into the extracted document, and follow this License in all other respects regarding verbatim copying of that document.    7. AGGREGATION WITH INDEPENDENT WORKS  A compilation of the Document or its derivatives with other separate and independent documents or works, in or on a volume of a storage or distribution medium, is called an aggregate if the copyright resulting from the compilation is not used to limit the legal rights of the compilation s users beyond what the individual works permit. When the Document is included in an aggregate, this License does not apply to the other works in the aggregate which are not themselves derivative works of the Document.  If the Cover Text requirement of section 3 is applicable to these copies of the Document, then if the Document is less than one half of the entire aggregate, the Document s Cover Texts may be placed on covers that bracket the Document within the aggregate, or the electronic equivalent of covers if the Document is in electronic form. Otherwise they must appear on printed covers that bracket the whole aggregate.    8. TRANSLATION  Translation is considered a kind of modification, so you may distribute translations of the Document under the terms of section 4. Replacing Invariant Sections with translations requires special permission from their copyright holders, but you may include translations of some or all Invariant Sections in addition to the original versions of these Invariant Sections. You may include a translation of this License, and all the license notices in the Document, and any Warranty Disclaimers, provided that you also include the original English version of this License and the original versions of those notices and disclaimers. In case of a disagreement between the translation and the original version of this License or a notice or disclaimer, the original version will prevail.  If a section in the Document is Entitled Acknowledgements , Dedications , or History , the requirement (section 4) to Preserve its Title (section 1) will typically require changing the actual title.    9. TERMINATION  You may not copy, modify, sublicense, or distribute the Document except as expressly provided under this License. Any attempt otherwise to copy, modify, sublicense, or distribute it is void, and will automatically terminate your rights under this License.  However, if you cease all violation of this License, then your license from a particular copyright holder is reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable means prior to 60 days after the cessation.  Moreover, your license from a particular copyright holder is reinstated permanently if the copyright holder notifies you of the violation by some reasonable means, this is the first time you have received notice of violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days after your receipt of the notice.  Termination of your rights under this section does not terminate the licenses of parties who have received copies or rights from you under this License. If your rights have been terminated and not permanently reinstated, receipt of a copy of some or all of the same material does not give you any rights to use it.    10. FUTURE REVISIONS OF THIS LICENSE  The Free Software Foundation may publish new, revised versions of the GNU Free Documentation License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns. See .  Each version of the License is given a distinguishing version number. If the Document specifies that a particular numbered version of this License or any later version applies to it, you have the option of following the terms and conditions either of that specified version or of any later version that has been published (not as a draft) by the Free Software Foundation. If the Document does not specify a version number of this License, you may choose any version ever published (not as a draft) by the Free Software Foundation. If the Document specifies that a proxy can decide which future versions of this License can be used, that proxy s public statement of acceptance of a version permanently authorizes you to choose that version for the Document.    11. RELICENSING  Massive Multiauthor Collaboration Site (or MMC Site ) means any World Wide Web server that publishes copyrightable works and also provides prominent facilities for anybody to edit those works. A public wiki that anybody can edit is an example of such a server. A Massive Multiauthor Collaboration (or MMC ) contained in the site means any set of copyrightable works thus published on the MMC site.  CC-BY-SA means the Creative Commons Attribution-Share Alike 3.0 license published by Creative Commons Corporation, a not-for-profit corporation with a principal place of business in San Francisco, California, as well as future copyleft versions of that license published by that same organization.  Incorporate means to publish or republish a Document, in whole or in part, as part of another Document.  An MMC is eligible for relicensing if it is licensed under this License, and if all works that were first published under this License somewhere other than this MMC, and subsequently incorporated in whole or in part into the MMC, (1) had no cover texts or invariant sections, and (2) were thus incorporated prior to November 1, 2008.  The operator of an MMC Site may republish an MMC contained in the site under CC-BY-SA on the same site at any time before August 1, 2009, provided the MMC is eligible for relicensing.    ADDENDUM: How to use this License for your documents  To use this License in a document you have written, include a copy of the License in the document and put the following copyright and license notices just after the title page:  Copyright (C) YEAR YOUR NAME. Permission is granted to copy, distribute and\/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the section entitled \"GNU Free Documentation License\".  If you have Invariant Sections, Front-Cover Texts and Back-Cover Texts, replace the with Texts. line with this:  with the Invariant Sections being LIST THEIR TITLES, with the Front-Cover Texts being LIST, and with the Back-Cover Texts being LIST.  If you have Invariant Sections without Cover Texts, or some other combination of the three, merge those two alternatives to suit the situation.  If your document contains nontrivial examples of program code, we recommend releasing these examples in parallel under your choice of free software license, such as the GNU General Public License, to permit their use in free software.   "
},
{
  "id": "backmatter-4",
  "level": "1",
  "url": "backmatter-4.html",
  "type": "Index",
  "number": "",
  "title": "Index",
  "body": " Index   "
},
{
  "id": "backmatter-5",
  "level": "1",
  "url": "backmatter-5.html",
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
