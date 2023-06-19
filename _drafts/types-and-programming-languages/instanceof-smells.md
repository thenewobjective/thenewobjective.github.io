A instanceof B harmful?
 requires explicit import of B

which leads to another blog topic: namespace pollution

<https://alvinalexander.com/java/java-instanceof-interface-example/>

Not object oriented
 Implies if-elsedom and switchdom

The `instanceof` operator is unreliable and should be avoided.

- Not object-oriented
<https://softwareengineering.stackexchange.com/questions/197010/is-there-any-situation-when-theres-no-alternative-to-instanceof>
<https://stackoverflow.com/questions/2449254/why-is-instanceof-considered-bad-practice>

In JavaScript it fails across iframe boundaries and also node module boundaries.
Each gets a copy of the code and the `instanceof` operator fails.

Related:
 • <https://www.google.com/search?client=firefox-b-1-e&biw=1600&bih=763&ei=c2HAXJDALoHwtAXPrrnYDg&q=instanceof+operator+vs+method&oq=instanceof+operator+vs+method&gs_l=psy-ab.3..0i22i30.13713.17732..17885...0.0..0.194.1127.12j2......0....1..gws-wiz.......0i71j0i8i30j0i8i13i30j0j33i299j33i160.7FttgHgYp9c>
 • <https://javarevisited.blogspot.com/2015/12/10-points-about-instanceof-operator-in-java-example.html>
 • <http://www.javapractices.com/topic/TopicAction.do?Id=31>
 • <https://stackoverflow.com/questions/20589590/why-not-use-instanceof-operator-in-oop-design>
 • <http://learnertobeginner.blogspot.com/2010/07/instanceof-operator-kills-object.html>
 • <https://www.google.com/search?client=firefox-b-1-e&q=gilad+bracha+%22instanceof%22&sa=X&ved=2ahUKEwip6aCf8ujhAhUEa60KHQnLCyYQ5t4CMAB6BAgDEAk&biw=1600&bih=763>
 • <https://objectteams.wordpress.com/2010/03/20/how-many-concepts-for-modules-do-we-need/>
 • <https://dzone.com/articles/instanceof-considered-harmful>
 • <https://www.crockford.com/javascript/inheritance.html>
 • <https://stackoverflow.com/questions/1919295/can-i-set-the-type-of-a-javascript-object/1919670#1919670>
<https://www.google.com/search?q=instanceof%20code%20smell&cad=h>
