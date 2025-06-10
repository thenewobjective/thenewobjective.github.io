---
title: Against TDD and BDD
date:   2025-06-02 12:00:00 -0600
category: Software Systems Engineering
---

## Introduction

> "You can't debug a clump of clay into a statue. You need a vision."

&mdash; [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay)

Test-Driven Development (TDD) is often promoted not merely as a practice, but as a full-fledged methodology: one
that promises better design, fewer bugs, and more maintainable code. Yet, beneath its ritualistic appeal lies a
set of deep conceptual flaws. This article challenges the validity of TDD as a general-purpose development
methodology and explores its [epistemological](https://en.wiktionary.org/wiki/epistemology) and practical limits.

## The Illusion of Specification

At its core, a unit test asserts that the system behaves correctly for a specific instance:

- **Tests** encode *existential* claims: `∃x. P(x)`; There exists an `x` such that `P(x)` is true
- **Types** encode *universal* claims: `∀x. P(x)`; For all `x`, `P(x)` is true

This distinction is not academic. When we rely on tests to express correctness, we're engaging in
a piecemeal, incomplete verification. Tests show that something *can* work, not that it *must* work in all cases.

Contrast this with types and [contracts](https://en.wikipedia.org/wiki/Design_by_contract):

- **Types** are general but often weak theorems, statically enforced.
- **Contracts** (e.g., preconditions/postconditions/invariants) are both general and strong, usually dynamically enforced.
- **Tests** are specific and strong, but fundamentally limited in scope.

Relying on tests as specifications is like verifying that a bridge won't collapse by only driving one kind of car across it.

![Calvin and Hobbes - Bridge Collapse](/media-library/software-systems-engineering/calvin-and-hobbes-bridge.jpg "Calvin and Hobbes")

This also illustrates a broader philosophical fallacy: the **is–ought problem**, articulated by [David Hume](https://en.wikipedia.org/wiki/David_Hume).
Just because a system behaves a certain way in one test (an *is*) does not imply that it should behave that way (an *ought*).
Implementation is a fact (more specifically an artifact), not a truth. A test passes but that doesn’t mean the design is valid, necessary, or even desirable.
For every passing test, there may be an infinity of broken intentions.

## TDD Prioritizes Local Over Global Thinking

TDD encourages developers to build programs bottom-up: write a test, write just enough code to pass it, refactor, repeat.
This can lead to design that is **emergent**, but often *reactionary*. There's little room for stepping back and asking,
"What is the architecture of this system?" or "What are the core domain concepts?"

Alan Kay's metaphor is apt: you can't sculpt a masterpiece by poking clay randomly, you need a *vision*. TDD often
disincentivizes that vision.

## Goodhart's Law and the Green Bar Fetish

> "Tests become artifacts whose presence is mistaken for assurance."

&mdash; [James O. Coplien](https://en.wikipedia.org/wiki/Jim_Coplien)

> "When a measure becomes a target, it ceases to be a good measure."

&mdash; [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law)

Test coverage, green bars, [red-green-refactor cycles](https://martinfowler.com/bliki/TestDrivenDevelopment.html),
 these metrics quickly become the *goal* rather than tools of insight.
Developers chase 100% coverage, write trivial tests, or test irrelevant minutiae just to satisfy the methodology.

The result: brittle, high-maintenance test suites that offer little confidence in overall system correctness.
In information-theoretic terms, a passing test that has never failed conveys no new knowledge. It simply affirms
what the code already does, often tautologically. Many unit tests exist merely to confirm that a variable holds
the value it was just assigned. Automation does not equal understanding; green bars do not guarantee clarity.

## TDD Cannot Replace Thinking

> If you're breaking apart coherent functions just to make them testable, you're sacrificing clarity for ceremony.

&mdash; [James O. Coplien](https://en.wikipedia.org/wiki/Jim_Coplien)

A dangerous illusion promoted by TDD evangelism is that following the test cycle *automatically* produces good design.
But the process of writing robust, clear, and maintainable software still requires:

- Understanding the domain
- Anticipating future needs
- Modeling relationships and invariants
- Clear communication through code

TDD does not guarantee any of these. In fact, it often becomes a ritual substitute for deeper analysis.
Worse, it can degrade architecture: when tests require mockable seams or testability-driven indirection,
the resulting code reflects test mechanics, not conceptual structure.

> "The real value of tests is not that they detect bugs in the code, but that they detect inadequacies in the methods,
> concentration, and skills of those who design and produce the code."

&mdash; [C.A.R. Hoare](https://en.wikipedia.org/wiki/Tony_Hoare)

## Tests as a Language Smell

> If your unit tests outnumber or outweigh your production code, you may be spending
> more time maintaining tests than building software.

&mdash; [James O. Coplien](https://en.wikipedia.org/wiki/Jim_Coplien)

Ask yourself: why do we need so many unit tests in the first place? Could it be that our languages lack better means of
expression and verification?

- In Haskell, types + [property-based testing](https://techblog.criteo.com/introduction-to-property-based-testing-f5236229d237) (e.g., [QuickCheck](https://www.cse.chalmers.se/~rjmh/QuickCheck/)) cover vast input spaces with concise logic.
- In Eiffel, [contracts](https://www.eiffel.com/values/design-by-contract/introduction/) are baked into the language, making intent executable
  - I've also written a Contracts library for JavaScript/TypeScript which is available on [npm](https://www.npmjs.com/package/@final-hill/decorator-contracts)
- In Lisps and Smalltalks, interactive [REPLs](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) and [live programming](https://gbracha.blogspot.com/2012/11/debug-mode-is-only-mode.html) reduce the need for preemptive testing.

If exhaustive unit testing is necessary, it may indicate a **deficiency in the language**, not a virtue in the practice.
The more a system relies on voluminous tests to prove its value, the more likely its underlying design or language
lacks the means for abstraction, constraint, or introspection. Tests that proliferate unchecked often produce more
churn than clarity, and serve as a tax on evolution.

> We say, “I can make a change because I have tests.” Who does that? Who drives their car around banging into the guard rails!?

&mdash; [Rich Hickey](https://en.wikipedia.org/wiki/Rich_Hickey): ["Simple Made Easy"](https://www.youtube.com/watch?v=SxdOUGdseq4)

## Integration Testing: The Architectural Illusion

Integration tests aim to validate that multiple components work together as expected. At their best, they serve as
sanity checks across modules or subsystems.

But these tests can become dangerous when used as surrogates for architectural reasoning. Crossing [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html)
and invoking side effects, integration tests are costly to write, brittle in execution, and ambiguous in interpretation.
Worse, they often devolve into ["big bang" tests](https://www.tutorialspoint.com/software_testing_dictionary/big_bang_testing.htm) that obscure failure sources.

A passing integration test might imply that parts of the system are communicating, but not *how* or *why* they succeed
 or whether that success is reproducible under real-world constraints.

We cannot test our way into good architecture. We must **design** for it.

## BDD: Behavior-Driven or Buzzword-Driven?

[Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) (BDD) is often presented as a more user-focused evolution of TDD. In practice,
it inherits most of TDD's flaws:

- Still based on *examples* rather than specifications
- Encourages verbose, brittle, [Given-When-Then scenarios](https://martinfowler.com/bliki/GivenWhenThen.html)
- Adds another layer of ceremony without increasing semantic rigor

BDD improves communication when used thoughtfully. But it does not fix the underlying issue:
**confusing strong examples with complete specifications.**

## The Norvig vs. Jeffries Anecdote

A telling illustration of TDD’s limitations comes from [Peter Norvig](https://en.wikipedia.org/wiki/Peter_Norvig)'s succinct, correct
[implementation](https://norvig.com/sudoku.html) of Sudoku
solving in contrast to Extreme Programming (XP) founder [Ron Jeffries](https://en.wikipedia.org/wiki/Ron_Jeffries)’ protracted,
[unsuccessful](https://web.archive.org/web/20220121203939/http://ravimohan.blogspot.com/2007/04/learning-from-sudoku-solvers.html)
attempt using TDD.

TDD could not rescue Jeffries from the absence of a clear algorithmic strategy. Norvig succeeded through domain
knowledge and formal modeling, not iterative test scaffolding.

Sometimes, tests follow understanding. They do not produce it.

## The Myth of "Living Documentation"

TDD and BDD advocates often claim that tests serve as "living documentation", always up-to-date and executable.
But this is more wishful thinking than reality.

- Tests document *how*, not *why*.
- They often reflect incidental implementation details, not enduring design intent.
- As systems evolve, test suites accumulate duplication, workarounds, and blind spots.

Unlike real documentation, tests are not curated, summarized, or structured for comprehension. They are optimized
for mechanical verification, not human understanding. Assuming otherwise is a category error. A test that never
fails does not evolve with the system, it stagnates beside it, growing increasingly detached from intent.
Assertions, embedded within code, may provide more durable, semantically rich contracts than suites of external
test files optimized for mechanical repetition rather than human meaning.

## Uncle Bob and the Double-Entry Fallacy

[Robert Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) (Uncle Bob), [likens TDD](https://www.quora.com/What-is-so-wrong-with-TDD/answer/Robert-Martin-9?ch=10&oid=66884040&share=f76dd637&srid=KFoiv&target_type=answer)
to double-entry bookkeeping, implying that both are essential practices that professionals ignore at their peril.
The analogy is appealing but flawed.

### Bookkeeping Is Formal, TDD Is Improvised

Double-entry bookkeeping is a centuries-old, formally defined system with legal and financial significance. TDD, on
the other hand, is an informal methodology with no standardization and vast differences in interpretation and practice.

### Tests Are Not Audit Trails

Double-entry bookkeeping provides traceable, auditable records. TDD does not. A passing test suite says little about
what is missing or whether the software aligns with real-world requirements.

### Programming Is Design, Not Record-Keeping

Accounting records facts. Programming constructs systems. The analogy breaks because it assumes programming is clerical
rather than conceptual. TDD may validate implementation details, but it does not create clarity of thought or design.

### Disasters Won’t Mandate TDD

Martin ends with a dramatic suggestion: someday, a software disaster will make TDD legally or professionally mandatory.
But some of the greatest software disasters in history ([Ariane 5](https://web.archive.org/web/20160903040218/https://hownot2code.com/2016/09/02/a-space-error-370-million-for-an-integer-overflow/), [Therac-25](https://en.wikipedia.org/wiki/Therac-25), [Boeing 737 MAX](https://spectrum.ieee.org/how-the-boeing-737-max-disaster-looks-to-a-software-developer)) weren’t caused by a lack of unit
tests they were caused by miscommunication, system-level failures, and misunderstood requirements.

TDD, as it exists today, doesn’t address these high-level issues. It targets low-level correctness in small units of
code. It’s a local technique, not a systemic safeguard.

Martin’s analogy works as rhetoric. But as justification for elevating TDD to the level of a professional standard,
it falls apart.

## Conclusion: Tests Are Tools, Not Truths

None of this is to say that tests are unimportant. They serve a pragmatic role: catching regressions, guarding
against unexpected behavior, and providing feedback during development. But when tests are elevated from a
supporting practice to a governing principle, as in TDD or BDD, they become an epistemological overreach.

TDD rests on a seductive but flawed idea: that correctness can emerge from accumulation, that truth is a matter
of coverage. But engineering is not statistics. Software design is not the sum of its edge cases. We are not
inductive agents hoping to infer correctness from examples. We are designers, seeking structure, clarity, and invariants.

A test can show that a program *works here*. It cannot tell us *what it means to work*. That comes from types,
contracts, semantics, and above all, from thought.

Use tests:

- To lock in hard-won insights.
- To capture regressions, not define intentions.
- To supplement, not replace, specification, design, and reasoning.

TDD promises clarity through ritual. But clarity does not emerge from repetition. It emerges from reflection.

You can test your way to passing code. You cannot test your way to understanding.

## References and Further Reading

- [Sudoku in Coders At work](https://pindancing.blogspot.com/2009/09/sudoku-in-coders-at-work.html)
- [Even tests has got to justify themselves](https://ayende.com/blog/4217/even-tests-has-got-to-justify-themselves)
- [Effective software testing](https://www.effective-software-testing.com/), by Maurício Aniche
- [Types vs. Tests: An Epic Battle?](https://www.infoq.com/presentations/Types-Tests/)
- [246 Findings From our Smart Contract Audits: An Executive Summary](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)
  - "Finally, manually produced unit tests, even extensive ones, likely offer either weak or, at worst, no protection against the flaws an expert auditor can find."
  - "If there were a causal relationship between better unit tests and fewer audit findings, with a large and consistent effect size, we’d have seen better evidence for it than we did."
- [Software Testing: From Theory to Practice](https://web.archive.org/web/20201229191633/https://sttp.site/)
- [The Flawed Theory Behind Unit Testing](https://michaelfeathers.typepad.com/michael_feathers_blog/2008/06/the-flawed-theo.html)
- [TDD as if you Meant It](https://web.archive.org/web/20120202223247/https://cumulative-hypotheses.org/2011/08/30/tdd-as-if-you-meant-it/)
- [TDD Doesn't Work](https://blog.cleancoder.com/uncle-bob/2016/11/10/TDD-Doesnt-work.html)
- [Why Most Unit Testing is Waste](https://web.archive.org/web/20140318154538/http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf)
- [John Hughes - Don't Write Tests](https://www.youtube.com/watch?v=hXnS_Xjwk2Y)
- [GeeCON Prague 2018: Tomer Gabel - The Folly of TDD](https://www.youtube.com/watch?v=GSp5NmUgZmQ)
