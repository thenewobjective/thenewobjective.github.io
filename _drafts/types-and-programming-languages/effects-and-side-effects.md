“Having functional programming as an ideal doesn’t imply that programs should never have side-
effects. It just means that they should have no more than necessary.” — 
@paulg, On Lisp


https://www.microsoft.com/en-us/research/publication/algebraic-effects-for-functional-programming/

===========

Allen Wirfs-Brock
@awbjs
·
Jul 23, 2019
When "exception" handling was first being explored in prog languages it quickly emerged that there were  two possible approaches: non-resumable(c++, Java, JS, etc) & resumable(Common Lisp, Smalltalk, etc).

Seems to me that basically:
 "Algebraic Effects"===resumable exceptions


 =======