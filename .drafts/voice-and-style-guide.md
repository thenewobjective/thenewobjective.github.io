# Voice and Style Guide

## Purpose

This document describes the target writing voice for long-form analytical essays on this site, derived
from analysis of existing published articles and refined through deliberate experimentation. It is
intended as a reference for maintaining consistency across sessions and collaborators.

---

## Stylistic Framework (Brief)

This guide draws loosely on **register analysis** from systemic functional linguistics (Halliday):

- **Field**: what the text is about — software engineering, programming theory, epistemology, intellectual history
- **Tenor**: the relationship between writer and reader — peer-to-peer, technically literate, intellectually curious; neither lecturing down nor performing for approval
- **Mode**: written prose intended for reading, not scanning; allows density; assumes re-reading

The overall **register** target is: *analytical essay* — argument-driven, technically precise, intellectually serious, but written in a voice that belongs to a person, not an institution.

---

## The Natural Baseline Voice (as it appears in published articles)

Analysis of *Against TDD and BDD*, *Managing Complexity*, and *Conway's Law and Consequences* reveals
the following consistent habits:

### What you do well

**1. Argument-first structure**
The claim is stated plainly at or near the opening of each section, then developed — not withheld
for a conclusion. Readers know where they are going.

> *"This distinction is not academic."* (Against TDD)
> *"We cannot test our way into good architecture. We must design for it."* (Against TDD)

**2. Technical precision with immediate plain-English payoff**
Formal terms (`∃x. P(x)`, Kolmogorov complexity, epistemology) are introduced but immediately
cashed out in accessible language. The reader is trusted but not abandoned.

**3. Concrete, functional analogies**
Analogies do a specific job and get out. They are not decorative.

> *"Relying on tests as specifications is like verifying that a bridge won't collapse by only
> driving one kind of car across it."* (Against TDD)

**4. Strategic short sentences as punctuation**
Short declarative sentences are used sparingly and at high-value moments. They land because they
are rare.

> *"Sometimes, tests follow understanding. They do not produce it."* (Against TDD)

**5. Wit embedded in structure, not decoration**
Personality appears in how sections are framed, not in ornamental prose around arguments.

> *"BDD: Behavior-Driven or Buzzword-Driven?"* (Against TDD)

**6. Direct address without haranguing**
The reader is engaged as a thinking peer. Questions are posed without rhetorical theatrics.

> *"Ask yourself: why do we need so many unit tests in the first place?"* (Against TDD)

---

## The Target Voice for Long-Form Essays

The target is the same baseline voice, but with two specific enhancements drawn from the
Spinoza and Nietzsche experiments:

### Borrow from Spinoza

- **Structured argument**: propositions that build through subordinate clauses when complexity
  demands it; don't always collapse everything to the shortest sentence
- **Formal connectives** used deliberately: "inasmuch as," "it follows that," "insofar as" —
  sparingly, where they carry load rather than just sounding formal
- **Impersonal authority for historical or technical claims**: when stating established fact,
  no need for "I think" or hedging

### Borrow from Nietzsche

- **Vivid, load-bearing metaphors** — one strong image per major beat, doing actual argumentative
  work, not atmosphere
  - Keep: *"scaffold for their cathedral"*, *"Leibniz saw the promised land; we built it"*,
    *"the discipline of being unable to lie to himself"*
  - The test: could the metaphor be removed without losing the argument? If yes, cut it.
  - **Density ceiling**: no more than two active metaphor clusters per section. When auditing,
    count distinct images (phonograph, violin, guardrails, Guitar Hero, and card shark are five
    clusters). Each one beyond two competes for the reader's attention and dilutes the load-bearing
    ones. Consolidate or cut to the strongest.
- **Personal presence** — the author exists; opinions are held, not merely reported
- **Urgency where it is earned** — not as a stylistic default, but when the stakes of the
  argument genuinely warrant it

### Reject from both

| Spinoza excess | Nietzsche excess |
|---|---|
| Impersonality — no "we," no "you" | Combativeness as performance (*"marvel that we ever trusted it"*) |
| Withholding the claim until the end | Rhetorical heat that overwhelms the argument |
| Juridical accumulation without payoff | Ornamental drama (*"ordnance"*, *"at war"*) |
| Bullet lists dissolved into unmarked prose where a list would be clearer | Over-punching short sentences so they lose their effect |

---

## Concrete Style Rules

### Characters and Encoding

- **ASCII only**, except where non-ASCII is semantically required (mathematical symbols,
  proper names, formulas).
- **No em dashes** (`—` U+2014) and no double-hyphen substitutes (` -- `). Restructure
  the sentence instead: use parentheses for interjected asides, a colon for elaborations,
  a semicolon for closely related independent clauses, or a comma where any of these
  would be excessive. The goal is intentional punctuation, not a typographic workaround.
- **No curly/smart quotes** (`"` `"` `'` `'`). Use straight quotes (`"` `'`) only.
- **No ellipsis character** (`…` U+2026). Use three periods (`...`) if needed.
- **No non-breaking spaces, thin spaces, or other Unicode spacing characters.**

The rationale: source files should be diff-friendly, grep-friendly, and free of encoding
surprises. Non-ASCII punctuation also introduces invisible inconsistency when copy-pasted
from different tools.

### Sentence-level

- **Vary sentence length deliberately**: long sentences build and qualify; short sentences
  conclude and punctuate. Each serves a different function.
- **End paragraphs strongly**: the last sentence of a paragraph is high-value real estate.
  It should either close the argument cleanly or create productive tension into the next paragraph.
- **Prefer active constructions** except where passive is genuinely more precise.
- **Italics for genuine emphasis** — not for decoration. If everything is emphasized, nothing is.

### Paragraph-level

- **One idea per paragraph**, fully developed before moving on.
- **The first sentence states the claim**; the rest earns it.
- **Transitions are functional**: they should carry the logical relationship between paragraphs
  (contrast, consequence, elaboration), not just announce movement (*"Now we turn to..."*).

### Structural

- **Use bullet lists when the content is genuinely enumerable** — not as a substitute for
  developing an argument in prose, but not dissolved into unmarked prose when list form is
  clearer (technical enumerations, contrasts, formal properties).
- **Block quotes from sources** are used to let a source speak directly, then engaged with
  immediately in the following sentence. Don't quote and move on.
- **Section headers** make a claim or name a concept — not just a topic label.
  - Preferred: *"The Inadequacy of Natural Language"*, *"BDD: Behavior-Driven or Buzzword-Driven?"*
  - Weaker: *"Background"*, *"Discussion"*, *"Related Work"*

### Tone

- **Intellectually confident, not dismissive**: disagreement with received wisdom is argued,
  not sneered at.
- **Serious without being humorless**: dry wit is in character; sarcasm is not.
- **Citations as intellectual conversation partners**, not as authority shields. Introduce the
  person before the quote where possible.

---

## Diagnostic Questions (for revision)

When reviewing a drafted section, ask:

1. Is the claim of this section stated in the first or second paragraph, or am I building to it?
   (Build toward deepening, not toward disclosure.)
2. Does every analogy do argumentative work, or is it atmosphere?
3. Are there more than two short punchy sentences in a row? (If so, one of them is probably unnecessary.)
4. Does the author exist in this text — as a thinking person with views — or does it read like
   a literature review?
5. Is any technical term introduced without immediate plain-English follow-through?
6. Does the last sentence of each section land?
7. How many distinct metaphor clusters are active in this section? Count them. If more than two,
   audit each against the load-bearing test: which one could the argument not survive without?
   Cut or consolidate the rest.

---

## Reference Comparisons

| Too Spinoza | Too Nietzsche | Target |
|---|---|---|
| *"That this observation is most commonly received as a witticism is itself a matter deserving attention; for the frequency with which it is cited without its implications being pressed suggests..."* | *"Consider what we ask natural language to do, and marvel that we ever trusted it this far."* | *"Natural language is not optimized for truth; it is optimized for forgiveness — and that forgiveness, so agreeable in conversation, is a vice in any discipline that requires its practitioners to be right."* |
| *"It is instructive to observe this same tension in the person of Abraham Lincoln..."* | *"Abraham Lincoln understood this in his bones..."* | Keep the Nietzsche version here — the Spinoza phrasing is genuinely worse. |
| *"The ambition to formalize not merely valid inference but all human reasoning received its most explicit early articulation in Gottfried Wilhelm Leibniz..."* | *"The ambition reached its most magnificent — and most poignant — expression in Leibniz."* | *"Leibniz wanted two things... He died without achieving it. But read his specifications today and you will recognize them... Leibniz saw the promised land; we built it."* |

The third column in the table above represents the target: technically precise, personally voiced,
ending on a strong formulation, with metaphor that does work rather than decoration.
