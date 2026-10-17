---
title: Notation as a Complexity Budget
date: 2026-10-16 12:00:00 -0600
description: Precedence buys brevity by spending shared knowledge; a notation is a smell when the spending is invisible.
---

## Introduction

> "Simplicity does not precede complexity, but follows it."
>
> &mdash; [Alan Perlis](https://www.cs.yale.edu/homes/perlis-alan/quotes.html)

Every few years a single arithmetic problem stops the internet. In 2019 it was 8/2(2+2), screenshotted
from a cartoon and posted to Twitter. Google Calculator returned 16; calculators that bind juxtaposition
more tightly returned 1; and the comment sections reached for BEDMAS, PEMDAS, and the distributive
property in roughly that order of desperation. One commenter defended the answer 1 with FOIL, an
algorithm for multiplying binomials, declaring that it "applies to every bracket operation always in
every expression". [HuffPost
Canada](https://www.huffingtonpost.ca/entry/math-problem-twitter-bedmas-pemdas_ca_5d420367e4b0acb57fc6b0fd)
covered the spectacle and polled its own office along the way; the office's staunch BEDMAS defenders
mostly got 1, which is the answer the same acronym had, in other regions, been credited with ruling out.

The participants were not bad at arithmetic. Two camps compiled the same string against two different
grammars, and both grammars were grammars their schooling had taught them. That is what makes these
threads interesting to a programmer rather than merely entertaining: they are public demonstrations that
a notation can carry two parse trees, and that its users will defend each with equal confidence. The
mathematicians consulted in the same article gave a one-sentence verdict, and it is worth holding onto:
add brackets.

In ["Managing Complexity"](/software-systems-engineering/managing-complexity/)
I argued that complexity is the gravity of software, that language is the
material we build with, and that complexity cannot be removed, only shifted. Those claims operate at
the scale of systems: DSLs, general purpose languages, the architecture that organizes them. There
is a smaller scale, and it is the scale at which everyone meets a notation first. My claim here is
that the law does not pause at the expression. A notation is a budget spent on every reader:
precedence buys brevity by spending shared knowledge, and a notation is a smell not when it spends
but when the spending is invisible. PEMDAS is not a defect of arithmetic or of precedence. It is an
invisible ledger, and the recurring online wars over a single string are bug reports filed against
it.

## Two Grammars, One String

PEMDAS does more than omit details: its letter order proposes an ordering that the convention does not
define. Multiplication and division share one precedence level, resolved left to right, and nothing in
the spelling of the acronym says so. Take 6/2*3: read left to right it is 9; let the M bind first, as
its list position invites, and it is 1. BEDMAS prints the two letters in the opposite order and
advertises the identical left-to-right rule, so the ordering inside each acronym is decoration. If the
order were binding, the two acronyms would specify different languages; they demonstrably do not.
Decoration bites, and the misreading that treats M as a license to divide late fills threads of its own.

The more serious omission is a second convention, orthogonal to the ordering question: implied
multiplication. In typeset mathematics a factor written flush against a group conventionally binds
tighter than an explicit operator: 1/2a is read as 1/(2a), and 8/2(2+2) is read under that convention
as 8/(2(2+2)) = 1. This convention is exactly what PEMDAS never mentions, and the tooling splits on it
in public. Google Calculator evaluates strictly left to right and returns 16; the article's screenshots
include a scientific calculator returning 1, and such behavior varies by model because the juxtaposition
convention itself varies. The same contest replays at any size: 60/5(7-5) is 24 to a strict reader
and 6 to a juxtaposition reader. When the machines cannot agree on the parse of a string, the failure
is not in the arithmetic; the string has failed to carry one tree across their conventions, and the
mnemonic was never equipped to settle the tie.

The rule also says nothing about unary minus. As mathematical convention has it, -3^2 is -(3^2) = -9;
Excel's formula language, whose precedence table places negation above exponentiation, reads the same
string as (-3)^2 and returns 25. The contrast is between two designed conventions, not a universal
rule, and that is the point: implementations may differ by design, and the trouble begins when users
mistake one convention for the rule. Two parses, one string, two tools: the pattern repeats wherever
a corner case exceeds the poster. The mnemonic omits the convention that decides its hardest cases,
and unary signs sit outside its contract entirely. Three defect reports, one poster.

## The Parser in the Head

The deeper failure lives in how the rules are taught, and the compound-fraction rule exhibits it
cleanly. Every schoolroom carries a second evaluator alongside PEMDAS: to divide by a fraction, take
its reciprocal and multiply. In cases that stay healthy, the mechanical form and the meaning agree,
and the student has no reason to suspect the rule has a domain at all:

```text
(2/3) / (3/7) =>  {take the reciprocal of the second fraction, then multiply}
(2/3) * (7/3) =>  (2*7)/(3*3) = 14/9
```

Surgery and meaning agree here, and the agreement is conditional. The rewrite x/(y/z) = x*z/y is a
theorem about fields: it requires the divisor to exist (z nonzero) and its reciprocal to exist (y
nonzero). The schoolroom formulation prints the procedure and omits the precondition, and the
precondition is precisely where the failure lives. Now put a zero where the meaning lives:

```text
(2/3) / (0/7) =>  {take the reciprocal of the second fraction, then multiply}
(2/3) * (7/0) =>  (2*7)/(3*0) = 14/0
```

The divisor 0/7 is 0, so the expression was undefined before any rule fired; the rewrite merely relocates
the undefinedness into a shape that looks like an ordinary fraction. The next case is worse, because the
surgery converts an expression with no value into a confident number:

```text
(2/3) / (3/0) =>  {take the reciprocal of the second fraction, then multiply}
(2/3) * (0/3) =>  (2*0)/(3*3) = 0/9 = 0
```

Here the three levels of the subject come apart. That the string is written legally is syntax; whether
it has a value is semantics; the reciprocal step is a third thing, a rewrite rule licensed to preserve
meaning only where its preconditions hold. The student executing the rewrite has no representation in
which "does the reciprocal exist?" is even a question; the meaning of the expression is never consulted,
so it can never veto a step.

The composition question answers itself here. PEMDAS and the reciprocal rule are neighbors in every
curriculum, but they are fragments from different levels of the subject: one orders binary operators; the
other rewrites compound fractions. Neither was ever a denotation, so no consistency between them was ever
possible, and a question like "how is this rule consistent with PEMDAS?" has a blunt answer: it is not,
because consistency requires meanings, and neither rule trades in them.

This is a failure mode I have argued against before in the context of stack and prefix notations, with
the same conclusion: [one shouldn't have to execute a program in one's head in order to understand what
it does](/types-and-programming-languages/overview-of-prefix-vs-postfix-notations-evaluation-schemes/).
That is partly what a computer is for. PEMDAS pedagogy demands that you execute, in your head, the parser
you were never shown; the grammar, the tree, and the meaning are all present in the subject, and only the
shorthand handed to children leaves them out.

The budget vocabulary states the damage precisely. PEMDAS spends knowledge the reader must bring and
never lists what it spends: neither the equal precedence of M and D, nor the juxtaposition convention
that decides its hardest cases, nor the precondition on its neighbor rule. An expression is locally
comprehensible when its parse can be recovered from the expression itself and a small, declared rule
set. PEMDAS expressions are not locally comprehensible. They depend on a convention that lives outside
the string, in the reader's schooling, and the schooling varies by region and by textbook. That is
nonlocality in the notation, and it is where the smell lives.

## A Complexity Budget

None of this convicts precedence. A precedence table is compression, and compression is what
notation is for: $a \times x^2 + b \times x + c$ is legible as written, while its fully parenthesized
spelling is a thicket of brackets. The correct accounting is that a precedence hierarchy spends
global knowledge to purchase local brevity, and every notation sets that exchange rate somewhere.
A remark from a Lambda the Ultimate thread makes the cost explicit:

> "readers have to know the precedence table to mentally arrive at the same parse tree that the
> parser does"
>
> &mdash; [Lambda the Ultimate, "Languages without operator
> precedence"](https://web.archive.org/web/20080823152019/http://lambda-the-ultimate.org/node/2943)

The sentence makes the trade legible from the reader's side: the brevity was purchased with a mental
possession, and possession differs between readers. Every language design sets its budget somewhere;
the known choices read as positions on the exchange rate:

- **Lisp** refuses to run the budget at all: every compound form is parenthesized, and the entire
  ledger sits on the page. The cost is verbosity; the purchase is that the parse tree is visible
  rather than reconstructed from a table.
- **APL** spends almost nothing: every function shares one precedence, evaluated right to left. In
  Kenneth Iverson's account, that simplification is part of what makes notation
  a [tool of thought](https://www.jsoftware.com/papers/tot.htm).
- **Smalltalk** spends one line: binary messages of equal precedence, resolved left to right, so
  2+3*4 is 20. Readers trained on algebra flinch, but the rule fits in one sentence and cannot return
  two answers.
- **The C family** spends the most: a maximal table every reader must hold in memory, and house
  styles whose first advice is a mandate to parenthesize. A community that routinely recommends
  overriding its own feature's default behavior has filed a report against the feature.

The budget is not only set once, at language design time. It escalates. Modern languages let
programmers declare new operators and, in some, their fixity and precedence: Haskell operators carry
fixity declarations, and Scala settles the precedence of a symbolic operator by its first character.
Each declaration is sound in isolation, and nothing is missing from the specification. The costs
compound at the seams all the same: the parse of a fragment now depends on declarations distributed
across libraries, and a reader who knows each library separately can still be unable to parse their
composition without locating and combining those declarations by hand. PEMDAS is the schoolroom
dialect of this structure: the rule set lives in the reader, and different readers carry different
rules.

The exchange rate is not free to choose arbitrarily either, because the knowledge being spent is held
by other people. A notation that requires fully parenthesized trees is locally comprehensible and
tedious; a notation with an invisible, shifting ledger is concise and unreadable to outsiders. Between
them sits the working consensus: a small, stable, documented set of precedence levels, associativity
decided once and stated, and parentheses everywhere else. The budget succeeds when it is small enough
to learn once and visible enough to audit:

- **Specify rather than memorialize.** A grammar defines precedence and associativity; a mnemonic
  compresses territory the student must already possess, and cannot substitute for the definition.
- **State rules with their domains.** The reciprocal rule is x/(y/z) = x*z/y where y and z are nonzero;
  a rule without a precondition is an invitation to compute 0/9 from an expression that has no value.
- **Define juxtaposition or forbid it.** A grammar with an undefined production is a bug, whether it
  ships in a compiler or on a poster.
- **Reject what cannot be parsed.** When two operators have no declared relative precedence, the
  honest response is an error, not an arbitrary tree: a rejected expression asks for parentheses, a
  misparsed one silently rewrites the author's intent.

## The Arch of the Expression

The parent article's central image is the arch: a new organization of ordinary material that made
grand constructions possible by making the load path visible. The parenthesis is the arch of the
expression. A precedence rule moves knowledge into the reader; a parenthesis moves the structure onto
the page, where everyone can see what carries what. A parenthesis does not make knowledge optional;
the reader still needs the language. What it makes explicit is the one fact a flattened string
otherwise withholds: which structure was intended. That is why the one-sentence verdict of the
mathematicians in the 2019 episode, "include more brackets", and the mandate in C coding standards
are the same instruction arriving from two cultures: put the tree in the string.

The viral expressions were not failures of the readers. They were this design working as designed:
the string was flattened and stripped of the signals that would have fixed one parse, and the
mnemonic, asked to break the tie, announced its letters in the wrong order. An expression exists to
denote one tree. An expression that can end a forum thread with two confident answers has not been
misread; each side compiled it faithfully against a different grammar, and the string cannot say
which was intended. The operators are innocent. Fitting on a poster is not a specification.

The framework closes at the scale it opened. In the parent article, architecture dominates material,
and the arch shows that organization, not strength of components, is what buys scale. At the scale of
a single line, the same law: notation dominates reading, and the parenthesis is the smallest arch we
own. Complexity cannot be removed, only shifted; the discipline is to shift it where it can be seen,
into the grammar and onto the page, and never into the reader unlisted.

## References

- Michael L Haufe, ["Managing Complexity"](/software-systems-engineering/managing-complexity/)
  (on this site), 2024
- Melanie Woods, ["This Math Problem Is Dividing The Internet. What's The Right
  Answer?"](https://www.huffingtonpost.ca/entry/math-problem-twitter-bedmas-pemdas_ca_5d420367e4b0acb57fc6b0fd),
  HuffPost Canada, 2019
- ["Languages without operator
  precedence"](https://web.archive.org/web/20080823152019/http://lambda-the-ultimate.org/node/2943),
  Lambda the Ultimate (archived copy)
- [Operator Precedence Considered Harmful](https://wiki.c2.com/?OperatorPrecedenceConsideredHarmful), WikiWikiWeb
- Kenneth Iverson, ["Notation as a Tool of Thought"](https://www.jsoftware.com/papers/tot.htm), 1980
- Michael Haufe, [Overview of prefix vs postfix notations + evaluation
  schemes](/types-and-programming-languages/overview-of-prefix-vs-postfix-notations-evaluation-schemes/)
  (on this site)
