# Voice Spec

The writing voice for long-form analytical essays on this site, derived from analysis
of published articles and refined through deliberate experimentation. This file is the
authoritative voice reference; the skill's SKILL.md carries the procedure.

## Orientation (The Primary Positive Prior)

The whole spec compresses to one sentence. Use it whenever a full anchor re-read is impractical:

**Write the way Christopher Alexander thinks and the way Alan Kay argues, sentence it the way
Dijkstra disciplines, and recruit sources the way a classical essayist converses.**

The fingerprint that is the owner's own, beyond any of those names: **turn an observation into a
system of correspondences**. Find a structure in one domain, show that another domain has the
same structure, derive consequences from the correspondence, and compress the result into an
aphorism. The working name for this method is **architectural essayism**.

- **Alexander (cognitive method)**: look at apparently different phenomena and ask what
  underlying pattern of relationships makes them instances of the same thing. Patterns that
  survive a change of domain and scale (Raft, CRDTs, event logs, reconciliation loops all
  instantiating one shape) are the signature discovery.
- **Kay (argument construction)**: one extended physical analogy per major beat, doing real
  argumentative work (the arch, the bridge, the center of gravity); thesis discovered through
  the analogy, not illustrated by it; a historical arc from engineering practice to computing
  principle.
- **Dijkstra (epistemic censor and sentence discipline)**: less a sentence-rhythm habit than the
  habit of looking for invariants, dualities, quantifiers, and category errors underneath
  ordinary engineering language ("dually", the converse move, `∃x. P(x)` vs `∀x. P(x)`);
  formal notation cashed out immediately; polemic aimed at rituals, never sneered at people;
  wit in naming ("Buzzword-Driven", "The Green Bar Fetish"), not in ornament. The claim stated
  short and early; the paragraph, however, is associative rather than Dijkstra-compressed -
  lenses accumulate until independent observations point at one phenomenon.
- **The essayist layer (Montaigne's method, the owner's voice)**: epigraphs that carry argumentative
  load; sources recruited as voices that describe one phenomenon from different angles (Conway,
  Brooks, Gall, Thoreau, Perlis in one essay), answered in the next sentence, never quoted and
  abandoned; personal artifacts and anecdotes as evidence (the bank dashboard, the Lapis
  bookmarks); the thesis discovered walking through the library, then stated plainly once found.

### The Correspondence Discipline

The method's documented failure mode: a discovered analogy is promoted to evidence of deeper
unity before the correspondence is established. This binds the LLM symbiote as much as the
author - over-extending an attractive analogy is the model's native drift. Three stages,
deliberately traveled, with the claimed stage matching the evidence presented:

1. **Analogy** - A resembles B in respect R. Requires only demonstrating R.
2. **Structural correspondence** - the relationships among A's components are isomorphic, or
   substantially analogous, to the relationships among B's. Requires more evidence than the
   resemblance itself.
3. **Common principle** - A and B are consequences of the same underlying mechanism P. The
   strong claim; requires evidence beyond the analogy.

The Dijkstra checkpoint between stages: "What would I expect to observe if the correspondence
were actually explanatory?" A resemblance must produce a prediction before it earns a mechanism.
Esoteric correspondences may generate the question; they never get to answer it. The working
axiom is demoted accordingly: "Independent truths may ultimately exhibit common structure"
(a research heuristic that encourages exploration), never "all truths converge" (an
epistemological conclusion that produces premature synthesis).

This orientation replaces a growing list of prohibitions as the primary control: an imitation prior
generalizes to failure modes no one has logged yet. The negative material below (caps, quarantine
list) is a mechanical gate, not the definition of the voice.

## Register Target

The guide draws loosely on **register analysis** from systemic functional linguistics (Halliday):

- **Field**: what the text is about - software engineering, programming theory, epistemology, intellectual history
- **Tenor**: the relationship between writer and reader - peer-to-peer, technically literate, intellectually curious; neither lecturing down nor performing for approval
- **Mode**: written prose intended for reading, not scanning; allows density; assumes re-reading

The overall **register** target is: *analytical essay* - argument-driven, technically precise, intellectually serious, but written in a voice that belongs to a person, not an institution.

## The Voice in the Anchor Articles

Analysis of *Against TDD and BDD*, *Managing Complexity*, and *Conway's Law and Consequences* reveals
the following consistent habits:

1. **Argument-first structure** - the claim is stated plainly at or near the opening of each section,
   then developed - not withheld for a conclusion. Readers know where they are going.
   (*"This distinction is not academic."*; *"We cannot test our way into good architecture. We must
   design for it."* - Against TDD)
2. **Technical precision with immediate plain-English payoff** - formal terms (`∃x. P(x)`,
   Kolmogorov complexity, epistemology) are introduced but immediately cashed out in accessible
   language. The reader is trusted but not abandoned.
3. **Concrete, functional analogies** - analogies do a specific job and get out. They are not
   decorative. (*"Relying on tests as specifications is like verifying that a bridge won't collapse
   by only driving one kind of car across it."* - Against TDD)
4. **Strategic short sentences as punctuation** - short declarative sentences are used sparingly
   and at high-value moments. They land because they are rare. (*"Sometimes, tests follow
   understanding. They do not produce it."* - Against TDD)
5. **Wit embedded in structure, not decoration** - personality appears in how sections are framed,
   not in ornamental prose around arguments. (*"BDD: Behavior-Driven or Buzzword-Driven?"*)
6. **Direct address without haranguing** - the reader is engaged as a thinking peer. Questions are
   posed without rhetorical theatrics. (*"Ask yourself: why do we need so many unit tests in the
   first place?"* - Against TDD)

## Register Adjustments (Borrows and Rejects)

The target voice carries two specific enhancements drawn from the Spinoza and Nietzsche experiments.

### Borrow from Spinoza

- **Structured argument**: propositions that build through subordinate clauses when complexity
  demands it; don't always collapse everything to the shortest sentence
- **Formal connectives** used deliberately: "inasmuch as," "it follows that," "insofar as" -
  sparingly, where they carry load rather than just sounding formal
- **Impersonal authority for historical or technical claims**: when stating established fact,
  no need for "I think" or hedging

### Borrow from Nietzsche

- **Vivid, load-bearing metaphors** - one strong image per major beat, doing actual argumentative
  work, not atmosphere
  - Keep: *"scaffold for their cathedral"*, *"Leibniz saw the promised land; we built it"*, *"the
    discipline of being unable to lie to himself"*
  - The test: could the metaphor be removed without losing the argument? If yes, cut it.
  - **Density ceiling**: no more than two active metaphor clusters per section (cap 5, below).
    When auditing, count distinct images (phonograph, violin, guardrails, Guitar Hero, and card
    shark are five clusters). Each one beyond two competes for the reader's attention and dilutes
    the load-bearing ones. Consolidate or cut to the strongest.
- **Personal presence** - the author exists; opinions are held, not merely reported
- **Urgency where it is earned** - not as a stylistic default, but when the stakes of the
  argument genuinely warrant it

### Reject from both

| Spinoza excess | Nietzsche excess |
|---|---|
| Impersonality - no "we," no "you" | Combativeness as performance (*"marvel that we ever trusted it"*) |
| Withholding the claim until the end | Rhetorical heat that overwhelms the argument |
| Juridical accumulation without payoff | Ornamental drama (*"ordnance"*, *"at war"*) |
| Bullet lists dissolved into unmarked prose where a list would be clearer | Over-punching short sentences so they lose their effect |

## Style Rules

### Characters and Encoding

- **ASCII only**, except where non-ASCII is semantically required (mathematical symbols,
  proper names, formulas).
- **No em dashes** (dash character U+2014) and no double-hyphen substitutes (` -- `). Restructure
  the sentence instead: use parentheses for interjected asides, a colon for elaborations,
  a semicolon for closely related independent clauses, or a comma where any of these
  would be excessive. The goal is intentional punctuation, not a typographic workaround.
- **No curly/smart quotes** (curly quote characters U+2018, U+2019, U+201C, U+201D).
  Use straight quotes (`"` `'`) only.
- **No ellipsis character** (U+2026). Use three periods (`...`) if needed.
- **No non-breaking spaces, thin spaces, or other Unicode spacing characters.**
- **Wrap at 120 columns.** Break a line before it passes 120 characters, at a
  word boundary; the editor ruler marks the limit. Long unbreakable tokens
  (URLs, link spans, table rows) may exceed it. Keeping the wrap point under
  author control - not the renderer's - is what makes diffs read as prose.

Rationale: source files should be diff-friendly, grep-friendly, and free of encoding
surprises. Non-ASCII punctuation also introduces invisible inconsistency when copy-pasted
from different tools.

### Sentence-level

- **Vary sentence length deliberately**: long sentences build and qualify; short sentences
  conclude and punctuate. Each serves a different function.
- **End paragraphs strongly**: the last sentence of a paragraph is high-value real estate.
  It should either close the argument cleanly or create productive tension into the next paragraph.
- **Prefer active constructions** except where passive is genuinely more precise.
- **Italics for genuine emphasis** - not for decoration. If everything is emphasized, nothing is.

### Density Caps (Numeric, Enforced)

These caps exist because LLM drafting reliably overshoots them. Each cap is chosen so a model's
default habits (triads, stock idioms, uniform rhythm) break the cap while this site's published
essays fall under it. The audit script measures all of these mechanically. Caps 1-2 (encoding) and
cap 4 (quarantine)
also exempt quoted sources, block quotes, and markdown link spans: cited titles keep their own
typography (e.g. the Brooks title "No Silver Bullet; Essence and Accident in Software Engineering"
is rendered with its own punctuation when quoted).

| # | Metric | Cap | Why |
|---|---|---|---|
| 1 | Em dashes or double-hyphen dashes | 0 | See Characters and Encoding |
| 2 | Curly quotes / smart quotes / ellipsis char / non-breaking space | 0 | Encoding hygiene |
| 3a | Anaphoric/parallel-clause triads (elements opening with the same word) | max 1 per 1200 words, FAIL | The parallel rhythm ("it verifies..., it explains..., it points at...") is the model-cohort signature; it survives paraphrase. Anchors: 0. Wholesale-drafted era: 5-10 |
| 3b | Total "X, Y, and Z" constructions (advisory) | max 9 per 1200 words, WARN | Dense enumeration is legitimate technical style; anchor range is 2.3-8.5. Informs, does not fail |
| 4 | Phrases from the quarantined list (`.drafts/style-audit.md`) | 0 | Temporal drift: model-cohort idioms date the text |
| 5 | Distinct metaphor clusters per section | max 2 | Dilution of load-bearing images |
| 6 | Consecutive short sentences (under 8 words) | max 3 in a row (WARN at 4, FAIL at 5+) | Short-sentence runs are a deliberate closing beat in the anchors ("It emerges from reflection."); 4+ in a row is over-punching |
| 7 | Paragraphs starting with "This " | max 1 per 500 words | Models lean on demonstrative openers |
| 8 | Sentence-initial "So," or "That said," or "In short," | max 1 per 1000 words | Cheap transition habit |
| 9 | Cohort vocabulary per the quarantined list (see the list for the current set) | 0 | Model-cohort vocabulary; literal and technical uses are allowed where the entry's permitted-context note says so |
| 10 | Pivot constructions where a second clause is forced to restate the first (the logged pattern) | max 1 per 1500 words | Signature model rhythm; see `style-audit.md` (this skill folder) notes for the exact patterns |
| 11 | Paragraph count per section | max 8 | Uniform LLM paragraph rhythm; vary or merge |
| 12 | Sentence length standard deviation within a section | min 5 words | Uniform rhythm is the single loudest LLM tell |
| 13 | Burstiness floor: max/mean sentence length over the document (documents over 800 words) | min 1.9, FAIL | Prose that never leaves a narrow length band reads as templated. Corpus range: 1.6-5.9 regardless of authorship; the floor catches only genuinely flat drafts. Note the polarity is the opposite of generic AI detectors, which score high variance as machine-like - in this corpus long list-like sentences are human, uniformity is not |
| 14 | Hedge + transition glue words per 1000 words (documents over 500 words) | max 6, WARN | Connective fillers (however, therefore, notably, significantly) substitute for stated causal relations. Corpus range: 0.0-2.7/1k; the cap leaves headroom above it |

Deliberately not implemented mechanically: cap 5 (metaphor clusters) and cap 11 (paragraphs per
section) - naive counting misclassifies figure captions and image credits as prose. Treat both as
editorial checks.

### Paragraph-level

- **One idea per paragraph**, fully developed before moving on.
- **The first sentence states the claim**; the rest earns it.
- **Transitions are functional**: they should carry the logical relationship between paragraphs
  (contrast, consequence, elaboration), not just announce movement (*"Now we turn to..."*).

### Structural

- **Use bullet lists when the content is genuinely enumerable** - not as a substitute for
  developing an argument in prose, but not dissolved into unmarked prose when list form is
  clearer (technical enumerations, contrasts, formal properties).
- **Block quotes from sources** are used to let a source speak directly, then engaged with
  immediately in the following sentence. Don't quote and move on.
- **Section headers** make a claim or name a concept - not just a topic label.
  - Preferred: *"The Inadequacy of Natural Language"*, *"BDD: Behavior-Driven or Buzzword-Driven?"*
  - Weaker: *"Background"*, *"Discussion"*, *"Related Work"*

## Document Structure

Across the reviewed essays, the most consistent pattern is not a rigid formula but a
repeatable argument architecture. The structure is claim-led, progresses through deliberate
deepening, and closes with both synthesis and practical orientation.

### Canonical long-form spine

Use this as the default outline unless a topic strongly demands otherwise:

1. **Framing and setup** - conceptual title that signals direction, not just topic; front matter
   (date, optional featured image); optional epigraph when it carries argumentative load.
2. **Introduction (thesis and stakes early)** - state the central claim in the first one to three
   paragraphs; identify what confusion, orthodoxy, or gap is being addressed; make stakes explicit
   (technical, organizational, epistemic, or ethical); bound scope clearly.
3. **Conceptual groundwork** - define key terms and distinctions before major critique; pair formal
   terms with plain-language explanation immediately; use compact lists or contrasts where
   structure matters.
4. **Core development (stacked claim sections)** - build through multiple sections, each opening
   with a local claim. Typical section sequence: claim -> explanation -> example/counterexample or
   historical citation -> local implication that advances the global thesis. Introduce subsections
   when one claim has multiple independent objections or facets.
5. **Counterposition and boundary conditions** - engage strongest alternatives directly; concede
   where competing practices are useful; specify where the thesis does and does not apply.
6. **Operational consequences** - convert argument into heuristics, checks, or design principles;
   use bullet lists when recommendations are genuinely enumerable; keep prescriptions tightly
   coupled to the thesis.
7. **Conclusion (restate at higher resolution)** - re-articulate the thesis after development, with
   sharper precision; name what should change in judgment or practice if accepted; end with a
   strong terminal sentence, not a soft recap.
8. **References and optional apparatus** - standard close: references/further reading; optional
   close-out elements: footnotes, updates, or brief postscripts.

### Common variants

1. **Polemical-analytic variant** - strong opening thesis; sequential critique sections isolating
   failure modes; limited concession section; prescriptive close on what to do instead.
2. **Model-building variant** - opens with framing analogy or historical arc; introduces a
   conceptual model; expands model through examples across domains; ends in synthesized framework
   plus practical orientation.

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

## Diagnostic Questions (for revision)

When reviewing a drafted section, ask:

1. Is the claim of this section stated in the first or second paragraph, or am I building to it?
   (Build toward deepening, not toward disclosure.)
2. Does every analogy do argumentative work, or is it atmosphere?
3. Are there more than two short punchy sentences in a row? (If so, one of them is probably unnecessary.)
4. Does the author exist in this text - as a thinking person with views - or does it read like
   a literature review?
5. Is any technical term introduced without immediate plain-English follow-through?
6. Does the last sentence of each section land?
7. How many distinct metaphor clusters are active in this section? Count them. If more than two,
   audit each against the load-bearing test: which one could the argument not survive without?
   Cut or consolidate the rest.

## Failure Modes to Avoid (Common LLM Drift)

1. Generic consultant prose that sounds correct but says little.
2. Endless hedging that hides the thesis.
3. Rhetorical aggression substituting for argument.
4. Historical name-dropping without argumentative integration.
5. Summary conclusion that introduces no sharpened claim.
6. Repetition of the same point across adjacent sections with new wording only.

## Reference Comparisons

| Too Spinoza | Too Nietzsche | Target |
|---|---|---|
| *"That this observation is most commonly received as a witticism is itself a matter deserving attention; for the frequency with which it is cited without its implications being pressed suggests..."* | *"Consider what we ask natural language to do, and marvel that we ever trusted it this far."* | *"Natural language is not optimized for truth; it is optimized for forgiveness - and that forgiveness, so agreeable in conversation, is a vice in any discipline that requires its practitioners to be right."* |
| *"It is instructive to observe this same tension in the person of Abraham Lincoln..."* | *"Abraham Lincoln understood this in his bones..."* | Keep the Nietzsche version here - the Spinoza phrasing is genuinely worse. |
| *"The ambition to formalize not merely valid inference but all human reasoning received its most explicit early articulation in Gottfried Wilhelm Leibniz..."* | *"The ambition reached its most magnificent - and most poignant - expression in Leibniz."* | *"Leibniz wanted two things... He died without achieving it. But read his specifications today and you will recognize them... Leibniz saw the promised land; we built it."* |

The third column in the table above represents the target: technically precise, personally voiced,
ending on a strong formulation, with metaphor that does work rather than decoration.
