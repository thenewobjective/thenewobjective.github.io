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

---

## General Document Structure and Outline

Across the reviewed essays, the most consistent pattern is not a rigid formula but a
repeatable argument architecture. The structure is claim-led, progresses through deliberate
deepening, and closes with both synthesis and practical orientation.

### Canonical long-form spine

Use this as the default outline unless a topic strongly demands otherwise:

1. **Framing and setup**
  - Conceptual title that signals direction, not just topic.
  - Front matter (date, optional featured image).
  - Optional epigraph when it carries argumentative load.

2. **Introduction (thesis and stakes early)**
  - State the central claim in the first one to three paragraphs.
  - Identify what confusion, orthodoxy, or gap is being addressed.
  - Make stakes explicit (technical, organizational, epistemic, or ethical).
  - Bound scope clearly.

3. **Conceptual groundwork**
  - Define key terms and distinctions before major critique.
  - Pair formal terms with plain-language explanation immediately.
  - Use compact lists or contrasts where structure matters.

4. **Core development (stacked claim sections)**
  - Build through multiple sections, each opening with a local claim.
  - Typical section sequence:
    - claim
    - explanation
    - example/counterexample or historical citation
    - local implication that advances the global thesis
  - Introduce subsections when one claim has multiple independent objections or facets.

5. **Counterposition and boundary conditions**
  - Engage strongest alternatives directly.
  - Concede where competing practices are useful.
  - Specify where the thesis does and does not apply.

6. **Operational consequences**
  - Convert argument into heuristics, checks, or design principles.
  - Use bullet lists when recommendations are genuinely enumerable.
  - Keep prescriptions tightly coupled to the thesis.

7. **Conclusion (restate at higher resolution)**
  - Re-articulate the thesis after development, with sharper precision.
  - Name what should change in judgment or practice if accepted.
  - End with a strong terminal sentence, not a soft recap.

8. **References and optional apparatus**
  - Standard close: references/further reading.
  - Optional close-out elements: footnotes, updates, or brief postscripts.

### Common variants seen in existing essays

1. **Polemical-analytic variant**
  - Strong opening thesis.
  - Sequential critique sections isolating failure modes.
  - Limited concession section.
  - Prescriptive close on what to do instead.

2. **Model-building variant**
  - Opens with framing analogy or historical arc.
  - Introduces a conceptual model.
  - Expands model through examples across domains.
  - Ends in synthesized framework plus practical orientation.

### Section-level micro-template

Within most sections, this local form is repeatable and effective:

1. Lead sentence with section claim.
2. Development through definition and logic.
3. Evidence via example, quote, code, figure, or case.
4. Payoff line that reconnects to the larger thesis.

### Revision checklist for structure

Before publishing, verify:

1. Thesis appears in the introduction, not only in the conclusion.
2. Each major section opens with a claim, not throat-clearing background.
3. At least one serious counterposition is engaged fairly.
4. Conclusion raises resolution rather than repeating opening language.
5. Section order preserves momentum: framing -> distinctions -> development -> boundaries -> synthesis.

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

## LLM Collaboration Addendum

This guide is not only descriptive. It is operational. If an LLM is assisting with drafting or revision,
it should treat the following as default working protocol.

### What to ask for before drafting

If not already provided in the prompt, request these inputs first:

1. Working title or thesis sentence.
2. Target audience level (for example: experienced engineers, mixed technical audience, or general educated readers).
3. Desired stance type:
  - Polemical-analytic
  - Model-building
  - Expository with light argument
4. Scope boundaries (what to exclude explicitly).
5. Required sources or references to include.
6. Desired draft length range.

If these are missing and cannot be requested, proceed with conservative defaults and state assumptions
at the top of the draft.

### Default drafting workflow for the assistant

1. Produce a thesis-first outline.
2. Verify section order against the canonical spine in this guide.
3. Draft section openings as explicit claims.
4. For each technical term, add immediate plain-language payoff.
5. Insert evidence only where it advances the argument.
6. Add one serious counterposition before conclusion.
7. End with a high-resolution conclusion, not repetition.
8. Run the style and structure quality gates below before presenting output.

### Hard constraints for generated prose

1. ASCII punctuation only, except semantically required symbols or proper names.
2. No em dashes and no double-hyphen em dash substitutes.
3. No smart quotes.
4. No decorative metaphor clusters beyond the density ceiling defined earlier.
5. No section that begins with throat-clearing background when a claim can be stated directly.
6. No unresolved citation drops. Quotes must be engaged in the next sentence.

### Soft preferences for generated prose

1. Prefer clear declarative openings over dramatic framing.
2. Prefer argumentative progression over exhaustive survey.
3. Prefer one strong analogy to several weak ones.
4. Prefer edits that tighten logic over edits that increase ornament.

### Output format contract (for assistant responses)

When drafting article content, return in this order:

1. Thesis sentence.
2. Outline with section claims.
3. Full draft.
4. Short self-audit against this guide (5-10 bullets).
5. Optional revision targets (what to improve next pass).

When revising existing prose, return in this order:

1. Change summary by section.
2. Revised text.
3. Brief rationale tied to specific rules in this guide.

### Assistant self-audit checklist

Before returning output, the assistant should verify:

1. Introduction states thesis and stakes by paragraph two.
2. Every section opens with a claim.
3. Technical terms receive immediate plain-language follow-through.
4. At least one counterposition is presented and answered fairly.
5. Section endings either land a point or create productive tension.
6. Conclusion resolves at a higher level than the introduction.
7. Metaphor density is within ceiling.
8. Bullets are used only when content is truly enumerable.
9. Citations function as conversation partners, not authority shields.
10. Final sentence lands cleanly.

### Failure modes to avoid (common LLM drift)

1. Generic consultant prose that sounds correct but says little.
2. Endless hedging that hides the thesis.
3. Rhetorical aggression substituting for argument.
4. Historical name-dropping without argumentative integration.
5. Summary conclusion that introduces no sharpened claim.
6. Repetition of the same point across adjacent sections with new wording only.

### Quick prompt template for future sessions

Use or adapt this instruction block:

"Draft an analytical essay in my established site voice. Follow my Voice and Style Guide strictly. State the thesis early. Use claim-led section openings. Pair technical precision with immediate plain-English payoff. Keep metaphor density load-bearing and limited. Engage one strong counterposition fairly. End with a sharpened conclusion that changes judgment, not a recap. Keep punctuation ASCII-safe and avoid em dashes."

### Escalation policy for uncertain cases

If uncertain about voice or scope, the assistant should ask 1 to 3 focused questions. If response latency matters, proceed with explicit assumptions and mark them clearly so they can be corrected in the next pass.

---

## Reference Comparisons

| Too Spinoza | Too Nietzsche | Target |
|---|---|---|
| *"That this observation is most commonly received as a witticism is itself a matter deserving attention; for the frequency with which it is cited without its implications being pressed suggests..."* | *"Consider what we ask natural language to do, and marvel that we ever trusted it this far."* | *"Natural language is not optimized for truth; it is optimized for forgiveness — and that forgiveness, so agreeable in conversation, is a vice in any discipline that requires its practitioners to be right."* |
| *"It is instructive to observe this same tension in the person of Abraham Lincoln..."* | *"Abraham Lincoln understood this in his bones..."* | Keep the Nietzsche version here — the Spinoza phrasing is genuinely worse. |
| *"The ambition to formalize not merely valid inference but all human reasoning received its most explicit early articulation in Gottfried Wilhelm Leibniz..."* | *"The ambition reached its most magnificent — and most poignant — expression in Leibniz."* | *"Leibniz wanted two things... He died without achieving it. But read his specifications today and you will recognize them... Leibniz saw the promised land; we built it."* |

The third column in the table above represents the target: technically precise, personally voiced,
ending on a strong formulation, with metaphor that does work rather than decoration.
