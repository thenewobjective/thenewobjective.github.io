{The Low Level Nature of Concatenative Languages. Attractive on the surface, (mathematical properties, terse syntax, function composition)}
{vs. Dataflow paradigm?}
{awkwardness of the Quadratic Formula }
{No explicit concept of data/codata?}
{APL and friends have the same issue?}
{the higher level semantics of the language are not explicit and have to be kept in ones mind and/or derived. }
{rely on the composition of stacks & stack manipulation functions (or Arrays in the case of APL and friends). Why limit oneself to a single Container type? }
---
problem with tacit:
names are potentially replaced with positional
manipulation functions. for example see the quadratic
formula implemented in an applicative vs tacit language:
quadratic-formula(a, b, c) def= (root1, root2)
where minusb = - 0 b
radical = sqrt (- (* b b) (* 4 (* a c))))
divisor = * 2 a
root1 = / (+ minusb radical) divisor
root2 = / (- minusb radical) divisor
quadratic-2 == # a b c => [root1 root2 ]
[ [ [ pop pop 2 * ] # divisor
[ pop 0 swap - ] # minusb
[ swap dup * rollup * 4 * - sqrt ] ] # radical
[i] map ]
ternary i
[ [ [ + swap / ] # root1
[ - swap / ] ] # root2
[i] map ]
ternary.
can types be used to steer the arguments into the correct
positions automatically? if the arguments have the same type...
example: quadratic formula. Or does this imply that the arguments
are insufficiently typed? if quadratic takes a,b,c...are they more than
just reals? (a cannot be zero for example)
"If your function takes three integers, how do you know you're calling it with the arguments in the correct order?
Especially in the presence of macros?\
\
(apply quadratic-formula '(1 0 -4))\
(apply quadratic-formula (reverse '(1 0 -4))"
- Greg Buchholz
{
Concatenative PLs don't just eliminate spurious intermediate names but also nominal parameters.
- that community sees it as a blessing, but it is also a curse as it introduces the necessity of maintaining program state in the developers' mind as well as requiring one to juggle syntactic forms in order to get parameters in the right place: flip dup, drop, ...
- same argument as described in SPJ's IFPL book IRT combinatory logic.
- intermediate, explicit replaced with intermediate manipulation of implicit names
- more for the sake of "beauty" than clarity.
}
Gilad Bracha refers to this style to Lego with a single peg. No wonder an explicit type is needed

https://groups.google.com/d/msg/comp.lang.javascript/b-7lSuoPDWQ/GvoshODtFAAJ
http://www.google.com/url?q=http%3A%2F%2Flambda-the-ultimate.org%2Fnode%2F900%23comment-8723&sa=D&sntz=1&usg=AFQjCNFJceII8qo57m8gsDFisPHUFBji6w




https://groups.google.com/forum/#!searchin/comp.lang.javascript/haufe$20concatenative|sort:date/comp.lang.javascript/9FxKCWG7NLQ/AQ6ehNcsBQAJ
https://groups.google.com/forum/#!searchin/comp.lang.javascript/haufe$20concatenative|sort:date/comp.lang.javascript/b-7lSuoPDWQ/Y7DY2tr4FAAJ
https://groups.yahoo.com/neo/groups/concatenative/conversations/topics/4997