---
title: The Role of Programming
date: 2026-03-02 15:00:00 -0600
featuredImage: /media-library/tapl/the-role-of-programming.png
---

## Introduction

> "Computer Science is no more about computers than astronomy is about telescopes."
>
> &mdash; [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)

Many repeat this and few follow where it leads. We say *"of course"* and move on (back to
our frameworks, our sprint boards, our AI assistants) as though the remark were merely clever rather
than damning. But [Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) was not being clever.
He was issuing a diagnosis: that the practitioners of a discipline had mistaken their instrument for
their subject, their scaffold for their cathedral. This is not a small error. Carpenters who confuse the
hammer with the house at least produce a house. Programmers who confuse the machine with the
understanding it enables produce something [harder to name](https://en.wikipedia.org/wiki/True_name), and harder to recover from.

Ask a working programmer what programming *is* and the answer will almost always describe what it
*does*: it instructs machines; it automates tasks; it ships product. True enough (as true as saying that
writing *is* the act of moving a pen). What such answers conceal is the question of whether anything
that matters is happening behind the motion.
[Gerald Jay Sussman](https://www.youtube.com/watch?v=arMH5GjBwUQ) gave the more honest account:
programming is a *cognitive technology*, a formal medium in which knowledge is not merely recorded but
*expressed*: pressed into a shape precise enough to be tested, disputed, improved. The computer is not
the audience. The program is not the product. The thinking is: thinking made formal, made testable,
made answerable.

This essay is concerned with what that means, what history it belongs to, and what we stand to lose by
forgetting it. The moment is not without urgency. We are in the middle of enthusiastic arguments that
programming is merely labor (automatable, delegable, on its way to obsolescence) and these arguments
are being acted upon by people who have confused fluency with understanding, and generation with thought.
To outsource the labor of thought is inconvenient. To outsource the *obligation* to think is another
matter entirely.

## The Invention of Formal Thought

Humanity has struggled with its own language for at least two and a half thousand years. Not from
self-hatred, but from the nagging suspicion that natural language, for all its richness, is a leaky
vessel for precise thought; that it permits too much, excuses too easily, and makes the nonsense of our
claims invisible rather than impossible. Every formal notation ever invented has been an instrument in
that struggle. Programming languages are only the latest (and most powerful) of them.

**[Aristotle](https://en.wikipedia.org/wiki/Aristotle)**, in the
*[Prior Analytics](https://en.wikipedia.org/wiki/Prior_Analytics)* (c. 350 BCE), struck the first
serious blow: the [syllogism](https://en.wikipedia.org/wiki/Syllogism) separated the *validity* of an
argument from the *prestige* of the person making it. *All A are B; all B are C; therefore all A are C*
holds regardless of whether a king or a slave utters it. **[Chrysippus](https://en.wikipedia.org/wiki/Chrysippus)**
and the Stoics pressed further, formalizing not relations between categories but relations between
truths: the connectives *if*, *and*, *not*, *or*, laying the groundwork for what would become, two
millennia later, the propositional logic governing every conditional branch in every program yet written.

The ambition reached its most magnificent (and most poignant) expression in
**[Gottfried Wilhelm Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz)** (1646-1716).
Leibniz wanted two things: a
*[lingua characteristica universalis](https://en.wikipedia.org/wiki/Characteristica_universalis)*, a
universal symbolic language in which every idea could be expressed without the fog of natural speech; and
a *[calculus ratiocinator](https://en.wikipedia.org/wiki/Calculus_ratiocinator)*, a mechanical procedure
by which any dispute could be resolved by calculation rather than rhetoric. When scholars disagreed,
one need not argue; it would suffice to say: *"Let us calculate."* He died without achieving it. But
read his specifications today and you will recognize them: they are a precise description of what
programming languages and formal verification systems have since become. Leibniz saw the promised land;
we built it.

> "That language is an instrument of human reason, and not merely a medium for the expression of thought."
>
> &mdash; [George Boole](https://en.wikipedia.org/wiki/George_Boole), *[The Laws of Thought](https://en.wikipedia.org/wiki/The_Laws_of_Thought)*, 1854

**[George Boole](https://en.wikipedia.org/wiki/George_Boole)**
(*[The Laws of Thought](https://en.wikipedia.org/wiki/The_Laws_of_Thought)*, 1854) and
**[Gottlob Frege](https://en.wikipedia.org/wiki/Gottlob_Frege)**
(*[Begriffsschrift](https://en.wikipedia.org/wiki/Begriffsschrift)*, 1879) moved from vision to
instrument: Boole by showing logical inference obeys algebraic laws; Frege by building the first fully
rigorous formal system for predicate logic, dense, difficult, and largely ignored by contemporaries who
found it ugly. They were not wrong. Precision and legibility are not natural allies, and the history of
formal notation is the record of their successive, never final, negotiations. But ugly or not,
*Begriffsschrift* worked, and working matters more than beautiful. Abraham Lincoln, who
[worked through Euclid's *Elements*](https://drloihjournal.blogspot.com/2020/11/lincolns-logic-how-abe-learned-to-tell-when-a-thing-is-proved.html)
alone in a law office to understand what it truly meant to *demonstrate* rather than merely *assert*,
would have recognized the point immediately.

The point Lincoln was proving, without quite naming it, is the same point the history of number systems
makes concrete. [Multiply XLVII by XXIII](https://rbutterworth.nfshost.com/Tables/romanmult/). Now multiply 47 by 23. The numbers are identical; the
cognitive demand is not. Roman numerals are a notation for *recording* results. The Hindu-Arabic
positional system is a notation for *performing* operations: the place values are carried by the written
form itself, offloading the bookkeeping that Roman notation forces the mind to carry unaided. A child can
learn long multiplication. A Roman-educated adult cannot apply the same procedure, not because the
arithmetic is harder but because the notation gives no surface to work on. This is not a difference in
intelligence; it is a difference in what the notation makes available to think.

Calculus makes the same argument at a higher register. State a related-rate problem in prose:

> Water is draining from a conical tank. How fast is the height falling when the volume is decreasing
> at two cubic inches per second?

The solver must first *reconstruct* the mathematical structure from the prose before any calculation
can begin. State it in Leibniz's notation and the structure is already present in the symbols:

$$V = \frac{1}{3}\pi r^2 h$$

$$\frac{dV}{dt} = -2 \text{ in}^3\text{/s}$$

$$\text{Find: } \frac{dh}{dt}$$

The procedure follows from the form. This is Leibniz's vision made concrete.
[Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html) named the consequence
directly: _"Instead of regarding the obligation to use formal symbols as a burden, we should regard the
convenience of using them as a privilege: thanks to them, school children can learn to do what in earlier
days only genius could achieve."_ The notation does not merely assist genius; it redistributes what genius
was previously required for.

### The Inadequacy of Natural Language

Consider what we ask natural language to do. It is
*ambiguous* by design: the same sentence carries [multiple valid meanings simultaneously](https://en.wikipedia.org/wiki/Buffalo_buffalo_Buffalo_buffalo_buffalo_buffalo_Buffalo_buffalo), with nothing
internal to the language to arbitrate between them: only context, and the goodwill of the listener.
It is *imprecise*: define any term and you find yourself defining further terms, each as slippery as
the last, until the chain is either circular or broken. It is *context-dependent*: the same words
mean different things in different mouths, different centuries, different moods. And it is
*not formally executable*: you cannot run it against a specification, test it for correctness, or
rely on a machine to detect when it contradicts itself. An LLM's confident agreement is not a
consistency check.
Natural language is not optimized for truth; it is optimized for forgiveness, and that forgiveness,
so agreeable in conversation, is a vice in any discipline that requires its practitioners to be *right*.
Those instabilities are not even fixed targets: language semantics [drift over time](https://www.pnas.org/doi/10.1073/pnas.2107848118),
and an LLM frozen at a training-data cutoff carries those semantics forward unchanged, so the same
prompt may produce silently different results across model generations not only from probabilistic
variation, but from the quiet evolution of what its words mean.

[Dijkstra saw this clearly](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html) and,
typically, said it better than anyone before or since: the "naturalness" of natural language "boils down
to the ease with which we can use them for making statements the nonsense of which is not obvious."
Not a tool for clarity: a tool for *concealed* confusion. And yet we keep proposing to program in it,
as though proximity to human speech were a virtue rather than a warning.

Formal notation cuts through this. Not because it is shorter (though it often is) but because it
makes *structure* visible. Lay out the rules of
[Conway's Game of Life](https://rosettacode.org/wiki/Conway%27s_Game_of_Life) in prose and you fill a
paragraph; express them in a single line of
[APL](https://rosettacode.org/wiki/Conway%27s_Game_of_Life#APL) and their combinatorial skeleton is
exposed directly, inviting operations the prose never even suggested were possible. A good notation does
not merely record thoughts that could have been thought without it; it [makes possible thoughts that could
not have been thought otherwise](https://news.ycombinator.com/item?id=25252429). This is not a convenience. It is a transformation of what thinking *is*.

> "By relieving the brain of all unnecessary work, a good notation sets it free to concentrate on more
> advanced problems, and in effect increases the mental power of the race."
>
> &mdash; [A.N. Whitehead](https://en.wikipedia.org/wiki/Alfred_North_Whitehead), cited in [*Notation as a Tool of Thought*](https://www.jsoftware.com/papers/tot1.htm), Kenneth Iverson, 1980

This historical arc clarifies what programming languages are: not conveniences, but the latest
refinement in humanity's struggle to make thought accountable.

## Programming as the Material of Thought

If notation is a cognitive prosthetic that carries operations externally so the mind can reach
further, the question becomes where the boundary between tool and mind actually falls.
Consider what the [Extended Mind Thesis](https://en.wikipedia.org/wiki/Extended_mind_thesis) claims.
Philosophers Andy Clark and David Chalmers proposed, in 1998, that cognition does not stop at the
boundary of the skull. When an external resource becomes reliably available, actively used, and
genuinely integrated into a reasoning process, it is not merely an aid to thought; it becomes
part of the cognitive system itself. The notebook you always carry is not just a record of memories;
it *is* your memory, in a functionally significant sense. The question is not where the thinking
happens. The question is whether the whole system (person plus tool) can do things neither could
do alone. [Douglas Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart) had made this
argument specifically about computing in 1962, in
*[Augmenting Human Intellect](https://www.dougengelbart.org/pubs/augment-3906.html)*: the
purpose of the computer was not to automate tasks but to extend the range of problems a human
could think about. Engelbart built that as a research program a generation before the
philosophical vocabulary for it existed.

Programming languages are cognitive tools in exactly this sense. They do not merely record what a
programmer has already understood in some private mental act; they are the medium in which the
understanding takes form. [Gerald Jay Sussman](https://www.infoq.com/presentations/Expression-of-Ideas/)
puts it directly: the computer revolution is not primarily a revolution in what machines can do. It is
a revolution in the way we think, and in the way we express what we think.

The distinction between *declarative* and *imperative* knowledge illustrates what is at stake.
Declarative knowledge states what is true:

$$\sqrt{x} = y \text{ where } y^2 = x \text{ and } y \geq 0$$

Imperative knowledge specifies how to achieve it: [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method)
for square roots starts with an initial guess $g_0$ and repeatedly refines it via

$$g_{n+1} = \frac{1}{2}\!\left(g_n + \frac{x}{g_n}\right)$$

until ($$g_n^2 \approx x$$). These are not two notations for the same thought. They are two
different cognitive acts, and a programming language that can express both (and make their
relationship explicit) extends the programmer's ability to *distinguish* them. Natural language
blurs the two routinely. Formal programming languages make the difference impossible to ignore, and
therefore easier to think about.

This is what [Harold Abelson](https://mitpress.mit.edu/9780262510875/structure-and-interpretation-of-computer-programs/)
meant when he said that programs must be written for people to read, and only incidentally for machines
to execute. The program is an argument about a domain, addressed to a human reader (including the
future self of the author), that happens also to be checkable by a machine. [Donald Knuth's](https://en.wikipedia.org/wiki/Donald_Knuth)
[Literate Programming](https://en.wikipedia.org/wiki/Literate_programming) took this seriously as a methodology: a program and its explanation are the same
document, written together, because the discipline of explaining a procedure to a reader and the
discipline of specifying it to a machine are inseparable: each catches failures the other lets through.
In literate programming, natural language explains; it does not execute. The compiler remains the
authority on semantics. LLM-based code generation dissolves that boundary: natural language becomes
the specification, and the formal code a probabilistic derivation from it.

The question of which layer carries authority is not merely procedural; it goes to what the notation
is designed to show. [Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis) put this negatively:

> "A language is considered Low-Level if it forces you to pay attention to the irrelevant."
>
> &mdash; [Alan Perlis](https://en.wikipedia.org/wiki/Alan_Perlis)

A good notation hides what should be hidden and exposes what must be engaged.
Mathematical notation itself is not exempt from these failures. When mathematicians write
$\cos^2(x)$ to mean $(\cos x)^2$ but $\cos^{-1}(x)$ to mean $\arccos(x)$ and not $1/\cos(x)$,
they are not being precise; they are relying on shared cultural context to supply a meaning the
notation cannot express on its own. For practitioners inside the tradition, this presents no
difficulty. For a learner outside it, the notation is not a tool for understanding but an obstacle to
it; a set of idioms that must be memorized before the actual thinking can begin. This is the difference
between a notation that was *designed* and one that *accumulated*. Programming languages, at their
best, are designed: the cost of a bad rule is high enough to force clarity.
[Tennent's Correspondence Principle](https://esdiscuss.org/topic/regarding-tennent-s-language-design-based-on-semantic-principles)
formalizes one such criterion: a well-designed abstraction should not alter the meaning of what it
wraps. Languages that violate it have accumulated an exception rather than enforced a rule.

> "Programming languages, because they were designed for the purpose of directing computers, offer
> important advantages as tools of thought. Not only are they universal (general-purpose), but they
> are also executable and unambiguous. Executability makes it possible to use computers to perform
> extensive experiments on ideas expressed in a programming language, and the lack of ambiguity
> makes possible precise thought experiments."
>
> &mdash; [Kenneth Iverson](https://en.wikipedia.org/wiki/Kenneth_E._Iverson), [*Notation as a Tool of Thought*](https://www.jsoftware.com/papers/tot1.htm), 1980

That clarity has a price. [Sussman again](https://www.youtube.com/watch?v=arMH5GjBwUQ): _"Programming
forces one to be precise and formal, without being excessively rigorous. The computer does not
tolerate vague descriptions or incomplete constructions. Thus the act of programming makes one keenly
aware of one's errors of reasoning or unsupported conclusions."_ This is not a limitation. It is the
mechanism by which the tool extends the mind. The resistance is the instruction. A medium that accepts
whatever you give it teaches you nothing about the quality of what you give it.

[Alan Kay](https://www.youtube.com/watch?v=p2LZLYcu_JY) formalized this in terms of how learning
actually works: the progression from *enactive* (knowledge in action and body) to *iconic* (knowledge
in images and patterns) to *symbolic* (knowledge compressed into manipulable notation) is not
automatic. The parts of the mind that need to learn do not understand English. You do not acquire
symbols by reading about them; you acquire them by doing with images until the images compress into
operations you can carry and transform. A beginner who receives only symbols without having built
through the enactive and iconic stages does not possess knowledge in a usable sense. They possess
labels. Marvin Minsky observed the same asymmetry from a different angle: _"A computer is like a
violin. You can imagine a novice trying first a phonograph and then a violin. The latter, he says,
sounds terrible... Neither is a violin, or a typewriter, until you learn how to use it."_
The [phonograph](https://en.wikipedia.org/wiki/Phonograph) plays anything on demand and teaches you
nothing. The violin extends what you can express, but only to the degree that you have built the
capacity to play it.

## You Cannot Borrow the Product Without the Process

Every generation discovers, about its newest cognitive tools, what King Thamus warned about writing
in [Plato's *Phaedrus*](https://web.archive.org/web/20141120225042/http://www.john-uebersax.com/plato/myths/phaedrus.htm).
Theuth, the inventor, presented writing to the king as a gift to memory and wisdom. Thamus disagreed:
the discovery would create forgetfulness, because those who used it would trust external marks and not
exercise their own recall. They would appear omniscient and generally know nothing. The pattern has
repeated with enough regularity to count as a law. Johannes Trithemius, in the 1490s,
[warned the monks](https://www.purplemotes.net/2012/12/23/trithemius-printing-scribes-reason/)
that printed books would make scribes complacent and undermine the active engagement that manuscript
copying required. He was not wrong about the mechanism, even if the conclusion he drew from it was
too conservative.

The mechanism is this: a cognitive tool does not merely *perform* a task; it *trains* the capacity
to perform it. When the tool performs the task instead of the person, the training stops. The tool
and the capacity look identical from the outside (both produce outputs), but they are not
interchangeable, because only one of them remains when the tool is withdrawn.

The evidence is empirical and consistent. Habitual GPS use
[measurably degrades spatial memory](https://www.nature.com/articles/s41598-020-62877-0) during
self-guided navigation; the hippocampal engagement that builds spatial models is simply not triggered
when the routing is done externally. Spell checkers
[surface-correct errors without correcting the underlying uncertainty](https://www.researchgate.net/publication/326014514_THE_INFLUENCE_OF_SPELL-CHECKERS_ON_STUDENTS%27_ABILITY_TO_GENERATE_REPAIRS_OF_SPELLING_ERRORS)
that produced them; students who use them make the same spelling errors in the next session that they
made in the last. The tool removes the symptom; the cause is undisturbed because the cause was never
engaged. In each case the degradation is not obvious to the person experiencing it, because the tool
continues to produce acceptable outputs while the capacity atrophies behind it.

This brings us to the distinction that the [Automation Paradox](https://uxpsychology.substack.com/p/the-automation-paradox-how-more-tech)
makes precise. Automation does not simply reduce operator load; in doing so, it deprives operators of
the routine practice that maintains the skills needed when automation fails. [Air France 447](https://en.wikipedia.org/wiki/Air_France_Flight_447) is the
definitive case: highly automated systems handed control to pilots who had not hand-flown the aircraft
in conditions that required it, and the unambiguous physical cues of an aerodynamic stall were not
recognized until impact. The automation had not replaced skill; it had allowed skill to quietly
disappear while producing every ordinary appearance of competence.

*Abstraction* and *obfuscation* name the difference between healthy delegation and cognitive atrophy. Abstraction is semantic compression: it hides details that are irrelevant
to the task at hand while preserving the structure of what it hides, so that a practitioner who needs
to descend into the details can do so. Obfuscation is syntactic occlusion: it hides the structure
itself, making reconstruction impossible without possessing the original. Good software architecture
abstracts. A black box whose internals you have never understood and cannot inspect obfuscates,
regardless of how cleanly its interface is documented. The practical difference is what happens when
something goes wrong: abstraction gives you a path to diagnosis; obfuscation gives you a wall.

> "The purpose of abstraction is not to be vague, but to create a new semantic level
> in which one can be absolutely precise."
>
> &mdash; [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)

[Alan Kay](https://www.youtube.com/watch?v=p2LZLYcu_JY) observed that the problem with being a
beginner is that you get a great deal of practice staying a beginner. The sign of a cognitive tool
that is working as an extension of the mind is that using it advances you through Kay's progression:
from enactive competence through iconic pattern recognition to symbolic manipulation. The sign of a
cognitive tool that is contracting the mind is that it keeps you permanently at the sign stage:
copying labels, executing procedures by rote, unable to derive, adapt, or explain. Dijkstra's remark about students with prior exposure to BASIC (that they were
_"mentally mutilated beyond hope of regeneration"_ as potential programmers) is
often quoted as mere provocation. The serious point underneath it is that a tool shapes the habits
formed while using it. A learner who acquires a practice of copying patterns without understanding
them does not merely lack knowledge; they have built cognitive habits that actively resist
acquiring it. The prosthetic does not just fail to strengthen the limb. Used during the formative
period, it deforms the way the limb would have grown.

## LLMs and the Contracted Intellect

Jonathan Swift's Laputan professors, in [*Gulliver's Travels*](https://en.wikipedia.org/wiki/The_Engine),
operated a machine (The Engine) that could generate all possible arrangements of words, thereby producing all
possible books without the least assistance from genius or study. Swift meant it as satire. It is
now a product roadmap. The objection is not that the machine is unimpressive (it is very
impressive), but that impressiveness is not the relevant criterion. The question is what happens to
the person who uses it in place of thinking.

[Bertrand Meyer](https://cacm.acm.org/blogs/blog-cacm/273577-ai-does-not-help-programmers/fulltext)
put the technical distinction flatly: AI assistants _"are not works of logic; they are works of words."_
They generate programs inferred from statistical patterns in prior programs, not from a model of
correctness. The outputs look right because they resemble things that were right; they are right by
resemblance, not by derivation. This is not a subtle deficiency. It is the difference between a proof
and a plausible-sounding argument. For most purposes (producing a first draft, exploring an
unfamiliar API, writing boilerplate), resemblance is sufficient. For the class of problems where
correctness matters and the cost of error is high, it is not.

[Cristóbal Valenzuela](https://x.com/c_valenzuelab/status/1856809765055467583) diagnosed the same
inversion in generative graphics. Traditional computer graphics established *control* first: the right
abstractions (curves, triangles, polygons, meshes) that allowed precise, intentional manipulation at
every level. Rendering quality was deferred for decades. Generative AI inverted this progression
entirely: it achieved photorealistic rendering quality before solving the control layer. Valenzuela
calls it the *inverse graphics problem*: rendering solved before control. The analogy to
LLM-generated code is direct: the output looks right (rendering quality), but the structural
abstractions that would let you reason about, modify, or debug it reliably (control) were never
established. The impressive surface is real. The foundation beneath it is not.

[Erik Meijer](https://queue.acm.org/detail.cfm?id=3746223) took the control problem seriously
at the language level. His [Universalis](https://queue.acm.org/detail.cfm?id=3746223) (named
directly for Leibniz's *characteristica universalis*) is a Prolog/Datalog/SQL variant whose
programs carry embedded pre- and post-condition contracts backed by theorem provers, with the LLM
serving as execution engine under formal constraint rather than probabilistic oracle above it.
Unlike vibe coding, Universalis establishes the formal layer first: specifications have defined
semantics, contracts are machine-checkable, and the output is verifiable in a way that a raw
prompt response is not. Valenzuela's control problem, on this account, is solvable in principle.
But Meijer's design philosophy is explicit: code should be *written by machines* and *read by
domain experts*. This is Abelson's maxim precisely inverted. A domain expert who can read a
Universalis program but cannot derive it stands in the same position of knowledge as anyone who
cites the Four-Color theorem as proof of a particular coloring claim: they accept a verified
result without possessing the understanding that produced it. Correctness is established.
Derivability (and the cognitive development that derivability represents) is not in the
picture. The accountability argument survives unchanged: accepting output you cannot derive means
owning its failures regardless of how many formal contracts it satisfied on the way to production.
None of this diminishes what Universalis actually achieves: it is, at present, the only serious
attempt to bring formal correctness to LLM-generated code at the language level itself rather than
patching the prompt. That the understanding gap remains is a limitation of the approach; that no
comparable effort yet exists anywhere in the field is a measure of how far the field still has to go.

The [empirical evidence](https://arxiv.org/pdf/2211.03622) is not encouraging on that front.
Programmers with access to AI assistants wrote significantly less secure code than those without,
and were more likely to rate their insecure answers as secure. The tool substituted confidence for
competence: the output looked finished, so the user's sense of completion was satisfied, and the
scrutiny that an uncertain programmer would have applied was not applied. The
[Microsoft critical thinking study](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf)
found the same pattern at a larger scale: higher confidence in AI output was associated with
*less* critical thinking by the user, not more. Users with AI access also produced a *less diverse*
set of solutions for the same problem: the tool's ceiling had become the user's ceiling.

A pilot who hand-flew before automation has a degrading skill. A programmer who only ever prompted
has no skill to degrade. That asymmetry is the failure mode the Automation Paradox does not fully
capture: the classic account assumes a practitioner who was once trained and has since been relieved
of practice. The deeper problem is the user who was never trained. This is Sussman's "symbol pushing": manipulating labels whose
meaning was never internalized, now industrialized. When calculus students push symbols without
understanding the operations those symbols compress, their errors are at least bounded by the
domain. When a programmer accepts outputs they cannot evaluate, the errors are bounded only by the
quality of the tool, and they will not recognize when that bound has been exceeded.
[Brian Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan) observed that if you write the
code as cleverly as possible, you are by definition not smart enough to debug it. Code you did not
write and do not understand sets that ceiling before you even begin. There is also a consequence
that focusing on knowledge tends to obscure: when that code fails, you are still responsible for it. A programmer
who accepted output they could not evaluate owns the failure of that output. Understanding is not
merely an intellectual virtue here; it is the precondition for accountability. A system that
cannot be held responsible for what it produces transfers that responsibility entirely to whoever
accepted it, regardless of whether they were in any position to evaluate it.

The vibe coding analogy is Guitar Hero versus guitar. Guitar Hero produces a performance: button
presses correctly timed to a fixed sequence, with satisfying audio feedback. The experience
*resembles* playing music. But the skills that Guitar Hero develops (reaction timing against a
predetermined pattern) have no transfer to guitar.

<details>
    <summary>Obligatory Cultural Reference</summary>
::YouTube{ id="UZlSeuU6np4" }
::
</details>

The intuition that structure helps is not wrong. [SudoLang](https://medium.com/javascript-scene/sudolang-a-powerful-pseudocode-programming-language-for-llms-d64d42aa719b)
responds to exactly this problem: it imposes programming-language structure (pipes,
constraints, pattern matching) on natural language prompts, in an attempt to make LLM behavior
more predictable. That the impulse arose at all is a concession that raw natural language is not a
sufficient specification medium. But SudoLang applies the remedy to the input layer, on the
prompt, while execution remains probabilistic. Controlling what you ask does not control what you
receive; it improves the odds without changing the nature of the contract. Better notation for
Guitar Hero is still Guitar Hero. [Gilad Bracha](https://x.com/Gilad_Bracha/status/1923410114628772088)'s summary
is precise: treating vibe coding as a development process is a Socratic dialogue with a card shark
: a partner skilled at producing convincing answers regardless of whether they are correct.

Peter Norvig's [Sudoku solver](https://web.archive.org/web/20220209031932/https://news.ycombinator.com/item?id=3033446)
versus Ron Jeffries' illustrates the difference in programming terms.
Jeffries approached the problem iteratively using test-driven development without first building a
domain model; Norvig built a representation of the problem domain first, then let the solution emerge
from it. One produced working code by the end. The other spent weeks and [ultimately acknowledged](https://web.archive.org/web/20220209031932/https://news.ycombinator.com/item?id=3033446)
that the approach had failed. The domain model is not an obstacle to be bypassed by a more fluent
code generation tool. It is the thing the solution is *about*. Vibe coding does not program against
your domain; it programs against an *implied* one: whatever domain the LLM inferred from your
prompts, which may only approximate the one you actually inhabit. The Norvig/Jeffries contrast
illustrates this precisely: Jeffries was not lacking fluency. He was programming against the implied
domain of the test suite rather than the actual domain of constraint propagation that Sudoku demands.
[Frederick Brooks](https://en.wikipedia.org/wiki/Fred_Brooks) named this distinction in
[*No Silver Bullet*](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf) (1986):
the *accidental* complexity of software is the effort required to express what you understand;
the *essential* complexity is the difficulty of understanding what you need to express in the
first place. [Rich Hickey](https://www.youtube.com/watch?v=SxdOUGdseq4) sharpened the same
distinction from the user's side: *easy* names subjective proximity (familiar, near at hand,
requiring little effort to adopt); *simple* names objective structure (one concern,
non-entangled, decomposable). The two axes are independent. A natural language prompt is as easy
as anything can be; the tangled, opaque output it tends to produce is its structural opposite.
Vibe coding maximizes ease while minimizing simplicity; conflating the two is precisely how
accidental complexity gets mistaken for a solved problem. Tools that reduce accidental complexity
are genuine advances; they lower the cost of expression.
LLMs are powerful at exactly that. What no tool can do is reduce essential complexity. The work
of building a model of the problem domain is not a form of expression; it is the prior condition
of having anything to express. LLMs reduce accidental complexity. They cannot reduce essential
complexity. Confusing the two is the category error that makes vibe coding look like progress.
The practical question of how
to manage that essential complexity (choosing the right language, designing the right
abstractions, measuring and reducing incidental overhead) is the subject of my earlier article:
[Managing Complexity](https://thenewobjective.com/software-systems-engineering/managing-complexity/).

The objection here is predictable: every generation of programmers has resisted the next level of
abstraction, and every generation has been wrong. The assembly language purists of the 1950s and 1960s
who refused compilers, insisting that only hand-written machine code could be trusted, were wrong.
[Chris Sawyer](https://en.wikipedia.org/wiki/RollerCoaster_Tycoon#History)
wrote *RollerCoaster Tycoon* (1999) almost entirely in x86 assembly, by choice and by deep
familiarity, producing a game of remarkable efficiency at a level below what any compiler of the era
could match. That is not a counter-argument to compilers; it is a confirmation of the principle: his
understanding was in the loop at every instruction. A compiler translates what you understand into
instructions you would have written yourself, given unlimited patience; your understanding of the
problem remains in the loop, and the compiler extends your reach without bypassing your judgment. The
entire progression from assembly to compiled languages to high-level abstractions has been a genuine
extension of the programmer's mind, making it possible to think precisely about larger problems than
before. The pattern worth noting is that each genuine step in this chain left the lower layer intact
for the cases that required it. GUIs did not replace the command line; WYSIWYGs did not replace the
implementation of user interfaces. Each raised the level at which most work is done while preserving
the layer below for when it was needed. That is the signature of genuine abstraction: the practitioner
who must descend can still do so.

But this objection does not rescue vibe coding from the analysis above. The level of abstraction
is not what matters (it has risen continuously, and that is a feature, not a flaw). What matters
is whether your understanding was ever in the loop at all. A compiler translates
what you have written; whether you understood what you wrote is still on you. An LLM can generate
what you have not written and may never need to understand. The distinction is not the level of
abstraction. It is the presence or absence of understanding as a precondition of the output.

Daniel Kahneman's distinction between [System 1 and System 2](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Two_systems)
thinking sharpens the concern. System 1 is fast, associative, pattern-matching; System 2 is slow,
deliberate, structural. LLMs produce plausible-looking System 1 outputs. Auditing those outputs
requires System 2 engagement: checking correctness, tracing consequences, identifying what is missing.
The irony, confirmed empirically, is that the users least equipped to do that auditing are the ones
most likely to trust the output. The programmers who would benefit most from a skeptical
second-pass are precisely the ones who have not yet built the capacity for it.

The Four-Color theorem provides a clean analogy for what is lost when verification replaces
understanding. The 1976 proof was controversial not because the result was doubted but because it
was established by computer enumeration of cases that no human could check independently. A proof
no one can survey does not train intuition, even if it establishes truth. It establishes
a fact; it does not extend the understanding of anyone who relies on it. Code generated by a process no one understands,
verified by outputs that look plausible, has the same character: it produces a result while leaving
the programmers who accept it no more capable than before.

> "Beware of bugs in the above code; I have only proved it correct, not tried it."
>
> &mdash; [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth)

Understanding and verification occupy different axes, and possessing one does not supply the other.
Knuth's point was that even full understanding still owes the empirical test. The LLM case is the
inversion: the tests may pass while the understanding is never owed at all. One gap can be closed
by running the program. The other cannot be closed by running anything.

|  | **Verified** | **Not Verified** |
|--|--|--|
| **Understood** | The goal | Knuth's gap: real, but closable (run the program) |
| **Not Understood** | Four-Color theorem; LLM output that passes its tests (no test can close this gap) | Neither axis satisfied: the worst case |

There is a further complication the table does not capture. It assumes the verification is
independent: that the tests and type-checks were written by a practitioner who understands the
domain and is therefore capable of catching what the implementation gets wrong. When the same
LLM generates both the implementation and the tests, that independence collapses. A [2025 study](https://arxiv.org/abs/2504.09246)
found that 94% of LLM-generated compilation errors are type-check failures, which [can be read as good news](https://x.com/debasishg/status/2015434786547142936): static types catch almost all the
errors. [Rich Hickey's guardrails image](https://www.youtube.com/watch?v=SxdOUGdseq4) inverts
the reading: _"We say, 'I can make a change because I have tests.' Who does that? Who drives
their car around banging into the guard rails!?"_ Accepting a 94% failure rate because the
guardrails are holding you on the road is not evidence of competent driving. And when the LLM
wrote the guardrails too, they are not independent verification; they share the same generative
provenance as the errors they are catching. You may not be in the Verified cell at all. You may
occupy a state that looks Verified from the outside while retaining every failure mode of the
Not Verified case.

## Outsourcing the Obligation to Think

So far the argument has been empirical: that delegating cognitive tasks to tools degrades the capacity
those tasks develop. There is also a categorical argument about what kind of labor programming is.

The Industrial Revolution made a first wager: that machines could carry the weight of human muscle
and that, freed from that weight, people would do more with their hands and minds than before. On
balance it paid out. The factory worker who lost a job working the looms could not have foreseen the jobs
that followed in textiles, logistics, design, and every industry that cheap cloth made possible.
The outsourcing of physical labor did not contract human agency; it expanded it.

We are now offered a second wager: that language models alone can carry the cognitive labor of reasoning,
and that, freed from that labor, people will think more and think better. The analogy is seductive.
But it is also precisely backwards.

<details>
    <summary>Obligatory Cultural Reference</summary>
::YouTube{ id="LCPhbN1l024" }
::
</details>

The objection most naturally raised here is that this is [Luddism](https://en.wikipedia.org/wiki/Luddite) in a lab coat: the error made by
every generation that feared the new tool would displace the people who had mastered the old one.
[John Henry](https://en.wikipedia.org/wiki/John_Henry_(folklore)) raced the steam drill, won, and
died. The story's lesson is not that the drill should have been stopped. It is that he was answering
the wrong question. The question was never whether human muscle could outlast the machine, but what
a person with better tools could achieve that neither could achieve alone. This essay is not that
argument.

The distinction being drawn is more specific. When weaving was automated, the output was cloth; the
cloth required no understanding from the weaver to be inspected, priced, or sold. The understanding
that built the loom and improved it lived in the engineers, who were not displaced but elevated.
Cognitive labor differs in kind: its primary product is not the artifact but the capacity that
produces it. A programmer who has worked through a problem domain has built a model, a set of
distinctions, a facility for recognizing analogous structures in new contexts. That is not a side
effect of the work. It is the work's most durable product. The software ships and is forgotten.
The understanding compounds.

Minsky's distinction holds here with unusual precision. A phonograph can play the finest violinist flawlessly.
It produces the sound, the vibration, the music. What it cannot do is teach anyone to play the
violin. An LLM can produce code, documentation, proofs, arguments. What it cannot do is transfer
the understanding that a programmer, a writer, or a logician *possesses* when they produce those
things themselves. The phonograph is not a lesser violin. It is not a violin at all. It is
something else, aimed at a different purpose, useful for what it is, destructive when mistaken for
what it is not.

## Conclusion: Extended Mind or Contracted Intellect?

Programming languages occupy a precise boundary: they are the interface at which
computational semantics and human understanding meet. That boundary has been studied exhaustively
on one side (the computational side of compilers, type systems, runtime semantics) and
comparatively little on the other: how the notation shapes the mind that uses it, what it
develops and what it allows to atrophy. The current moment, for all the noise surrounding it, at
least has the effect of making that second question impossible to ignore any longer.

[John Carmack](https://en.wikipedia.org/wiki/John_Carmack) put it plainly: _"Problem solving is the core skill. The discipline and precision
demanded by traditional programming will remain valuable transferable attributes."_ Carmack is not
a reactionary. He has spent a career pushing hardware and software to their limits by understanding
both. His point is not that old tools should be preserved for their own sake. It is that the
attributes one develops by working close to the material do not transfer automatically when one
steps away from the material. The extended mind produces an extended thinker. The contracted
intellect produces nothing that outlasts the subscription.

The question is therefore not whether AI should be used. The question is what kind of user one
intends to become. A programmer who reaches for a language model before understanding the problem
is not accelerating; they are borrowing against comprehension they have not yet earned. A
programmer who uses a language model as a thinking partner, generating candidate structures to
examine critically, cross-examining outputs against a domain model they have built independently,
accepting suggestions they can evaluate and rejecting suggestions they cannot, is doing something
genuinely different. The tool extends what they already have. It does not substitute for what they
have not yet developed. The clearest existing example is
[Terence Tao](https://en.wikipedia.org/wiki/Terence_Tao) using AI tools alongside the proof
assistant [Lean](https://en.wikipedia.org/wiki/Lean_(proof_assistant)): one of the world's
foremost mathematicians, working with a formal verification system, using AI to accelerate
exploration while the understanding that directs and evaluates the work remains entirely his own.
The tool is powerful precisely because the mind behind it is. That is the extended mind working
as intended.

Clark and Chalmers asked what counts as part of the mind. Their answer was: any process that, if
it occurred entirely in the head, we would count as genuine cognition. By that standard, a
notebook you can trust is part of your mind. A system that produces plausible-sounding text you
cannot evaluate is not part of your mind; it is, at best, a suggestion box. At worst, it is a
mirror: one that reflects your current level of understanding back at you at scale, with
confidence, and without the friction that would have required you to go further.

The Extended Mind Thesis is a thesis about coupling. The value of the external component depends
entirely on the internal component it extends. Weaken the internal component and you weaken the
system. Replace the internal component and the external component provides no extension at all.
It stands alone, performing, producing nothing that the person behind it can claim.

Programming is cognitive technology. Its purpose is not the software it produces. Its purpose is
what it does to the mind that writes it: the discipline of precision, the habit of decomposition,
the willingness to be corrected by something that cannot lie to spare your feelings. These are not
attributes one outgrows on the way to something more powerful. They are the attributes that make
anything more powerful, when the time comes, genuinely useful.

We want the extended mind. The contracted intellect is the wrong wager.

## References and Further Reading

* *[On the foolishness of "natural language programming"](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html)*, Edsger W. Dijkstra, 1978 (EWD667)
* *[The Role of Programming (Dan Friedman's 60th Birthday)](https://www.youtube.com/watch?v=arMH5GjBwUQ)*, Gerald Jay Sussman, 2004
* *[Programming for the Expression of Ideas](https://www.infoq.com/presentations/Expression-of-Ideas/)*, Gerald Jay Sussman, InfoQ
* *[Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/9780262510875/structure-and-interpretation-of-computer-programs/)*, Harold Abelson and Gerald Jay Sussman, 1996
* *[Literate Programming](https://www.literateprogramming.com/)*, Donald Knuth, 1984
* *[Notation as a Tool of Thought](https://www.jsoftware.com/papers/tot1.htm)*, Kenneth E. Iverson, Communications of the ACM 23(8), 1980
* *[The Extended Mind](https://www.jstor.org/stable/3328150)*, Andy Clark and David J. Chalmers, Analysis 58(1), 1998
* *[Doing with Images Makes Symbols: Communicating with Computers](https://www.youtube.com/watch?v=p2LZLYcu_JY)*, Alan Kay, 1987
* *[Plato: Phaedrus (Thamus and Theuth)](https://en.wikipedia.org/wiki/Phaedrus_(dialogue))*, Plato (trans. Jowett)
* *[In Praise of Scribes (De Laude Scriptorum)](https://www.purplemotes.net/2009/01/25/trithemius-in-praise-of-scribes/)*, Johannes Trithemius, 1492
* *[Engagement with mobile internet is associated with a spatial representation bias in the real world](https://www.nature.com/articles/s41467-020-18220-0)*, Louisa Dahmani and Veronique Bohbot, Nature Communications 11, 2020
* *[AI Does Not Help Programmers](https://cacm.acm.org/opinion/ai-does-not-help-programmers/)*, Bertrand Meyer, Communications of the ACM, 2023
* *[Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622)*, Neil Perry et al., arXiv, 2022
* *[The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590)* / *[Generative AI and Critical Thinking (Microsoft Study)](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking/)*, Microsoft Research, 2025
* *[Gulliver's Travels (The Engine of Lagado)](https://en.wikipedia.org/wiki/Lagado#The_Academy_of_Lagado)*, Jonathan Swift, 1726
* *[Peter Norvig: Solving Every Sudoku Puzzle](https://norvig.com/sudoku.html)*, Peter Norvig, 2006
* *[Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow)*, Daniel Kahneman, 2011
* *[No Silver Bullet: Essence and Accident in Software Engineering](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf)*, Frederick P. Brooks Jr., 1986
* *[Simple Made Easy](https://www.youtube.com/watch?v=SxdOUGdseq4)*, Rich Hickey, Strange Loop, 2011
* *[SudoLang: A Powerful Pseudocode Programming Language for LLMs](https://medium.com/javascript-scene/sudolang-a-powerful-pseudocode-programming-language-for-llms-d64d42aa719b)*, Eric Elliott, 2023
* *[Unleashing the Power of End-User Programmable AI: Universalis](https://queue.acm.org/detail.cfm?id=3746223)*, Erik Meijer, ACM Queue, 2025
* *[Augmenting Human Intellect: A Conceptual Framework](https://www.dougengelbart.org/pubs/augment-3906.html)*, Douglas Engelbart, Stanford Research Institute, 1962
* *[How Terence Tao uses AI with the Lean proof assistant](https://www.youtube.com/watch?v=hh4cjZOddQA)*, Terence Tao and Lex Fridman, 2024
* *[We're solving graphics backwards (on control in AI)](https://x.com/c_valenzuelab/status/1856809765055467583)*, Crist\u00f3bal Valenzuela, 2024
* *[Why AI is pushing developers toward typed languages](https://github.blog/ai-and-ml/llms/why-ai-is-pushing-developers-toward-typed-languages/)*, Cassidy Williams, GitHub Blog, 2026
* *[Type-Constrained Code Generation with Language Models](https://arxiv.org/abs/2504.09246)*, Niels Mündler et al., arXiv, 2025
* *[The rise and fall of rationality in language](https://www.pnas.org/doi/10.1073/pnas.2107848118)*, Marten Scheffer, Ingrid van de Leemput, Els Weinans, and Johan Bollen, PNAS 118(51), 2021
* *["Problem solving is the core skill..."](https://x.com/ID_AA_Carmack/status/1762110222321975442)*, John Carmack, X, February 2024
