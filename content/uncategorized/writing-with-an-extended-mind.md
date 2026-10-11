---
title: Writing With an Extended Mind
date: 2026-09-28 12:00:00 -0600
---

## Introduction

> "The purpose of the computer was not to automate tasks but to extend the range of problems a human could think about."
>
> &mdash; [Douglas Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart), *[Augmenting Human Intellect](https://www.dougengelbart.org/pubs/augment-3906.html)*, 1962 (paraphrased)

My most recent article drew a question about its authenticity: was it written by a
machine? It is a reasonable way to read that piece. My technical prose has
become ever more formulaic in its structure lately, a side effect of the density of
the topics I take on and the large backlog of drafts I have accumulated over the
years in partial states of completion. If you have noticed that my articles share a
form, you are not imagining it. The pattern looks like this:

1. Argument-first structure
2. Technical precision with immediate plain-English payoff
3. Concrete, functional analogies
4. Strategic short sentences as punctuation
5. Wit embedded in structure, not decoration
6. Direct address without haranguing

Even as I write the above, it reads like a machine produced it. Who thinks like that?

![Are you an LLM?](/media-library/uncategorized/are-you-an-llm.png)

I think many stoic personalities are considered suspect these days since we're all sensitive
towards looking for the artificial. I am no exception.

Now, the motivation for me to create a generic template for writing articles is for three primary reasons:

1. If I follow a structure consistently, it allows me to focus on the content rather than the form.
2. I was originally inspired by Edgar Allan Poe's essay: "The Philosophy of Composition" where he describes his methodical approach to writing.
3. I hoped with a generic template I could streamline my writing process and maintain a consistent quality across my articles.

But, as my subjects have gotten more intricate, the material I want to carry (numerous
quotes, images, colorful analogies) fits the rigid parts of my template less and less
cleanly. I found myself at a crossroads: abandon the template, or find a way to integrate
these elements without losing what the structure buys me.

So in the last article, I used an LLM to generate the SVG images, perform fact checking, and to act as a review assistant. Frankly I'm not a fan of the form, and if I tried to rewrite that article in a different style I think it would clash with the subject matter. Sometimes formal writing can just be a
slog...

So, ironically, instead of trying to be a purist and avoid the influence of the LLM, I decided that going forward to embrace it as an extension of my own mind in my writing process. The challenge being:

1. How do I get the LLM to think like I do?
2. How do I get it to write like I do?
3. If I treat it as an extension of my own mind, how do I ensure that it truly enhances my thinking rather than just mimicking it?

So the goal is not, how do I get the LLM to write articles for me, but rather, how do I get it to
act like a time machine that allows me to turn a month-long writing process into a week long one?
Instead of doing tactical word play over and over to refine my prose, can I wield the LLM to write a sentence or paragraph that captures my intent and reflects my mind so that I can focus on higher-level thinking and creativity?

This article documents the method I (and my LLM) have come up with, and it was written by the very method it describes, with the model as co-author and not a ghostwriter (and yes, it would have been
faster to produce that way as well, but it has to be MY thoughts and perspective for it to truly count). The thinking behind that requirement
lives in my earlier essay,
[The Role of Programming](/types-and-programming-languages/the-role-of-programming/),
which argued that cognitive tools either contract the intellect or extend the mind,
depending on whether the user's own understanding stays in the loop. That essay ended
with the sentence "We want the extended mind" and then stopped, because saying how a
practitioner actually couples with such a tool was outside its scope. Here I take up
that unfinished work, and I hand it to you at a level you can lift
into your own practice. The coupling can be achieved in more than one direction; the
one I know is writing, where the product is supposed to be a human voice. Yours,
I should be clear, not mine: this is an invitation to develop your own, not a
template for importing mine; I don't want to meet a doppleganger of my voice on other pages...

Two wagers stand before you, whether you have thought about them explicitly or
not. One treats the model as contracted intelligence: a prompt goes in, a finished artifact comes out, and
your part is acceptance. The other treats it as an extension of your own mind, in
the sense [Clark and Chalmers proposed](https://en.wikipedia.org/wiki/Extended_mind_thesis): a component that
is reliably available, actively used, and integrated into reasoning so thoroughly that the coupled system is the thing
you should evaluate. The tool is the same. The difference is what you are prepared
to supply, and it is the difference between a subscription that ends and an ability
that compounds.

## Ghostwriter, Contractor, Symbiote

Three models of agency describe how people actually use a language model, and the
distinction between them is not about features or subscriptions. It is about where
authorship lives. You should figure out early which one you are practicing, because
each will make you into a different kind of practitioner.

The **ghostwriter** model asks the model to produce the finished artifact. You type
the wish; the draft comes back. You take the credit and bear no understanding; the
work is signed by whoever owns the account. This is the
production mode behind the phrase AI slop, and the slop is no accident. A language
model completes text according to the statistical shape of its training corpus, so a
prompt addressed casually is answered in the corpus's own voice: <abbr title="The rule-of-three habit: clauses or phrases grouped in threes for rhetorical effect (e.g. I came, I saw, I conquered)">the triadic constructions</abbr> (I came, I saw, I conquered),
<abbr title="A ready-made phrase worn smooth by over-use: it arrives pre-packaged and means less each time it is repeated">the stock idioms</abbr> (delve into, a testament to, pivotal),
the uniform paragraphs. When you detect that voice,
your detector is working; that part of the criticism is honest. What the ghostwritten
artifact never contains is the one product that matters in cognitive work: the
model of the problem domain being described, in either party.

The **contractor** model is more defensible and nearly as contracting. Here you
write the specification, the model delivers the implementation, and tests or
contracts verify the result. I have a good deal of respect for the formal
applications of this pattern; [Erik Meijer's](https://queue.acm.org/detail.cfm?id=3746223)
Universalis puts machine-checkable contracts under LLM execution, and that is a real
advance. But it shares a property with every contracted deliverable: your
contribution ends at acceptance. Meijer states the philosophy explicitly: code should
be *written by machines* and *read by domain experts*. Reading is not deriving. If you
can verify a result but not reconstruct how it was reached, you own
correctness without owning understanding, which is the Four-Color theorem's position,
as argued at length in my earlier essay. Capacity is the durable product of
cognitive work, and a contract leaves your capacity where it started.

The **symbiote** model is different in kind, and it is the one Engelbart was
pointing at seven decades ago. Clark and Chalmers' Extended Mind Thesis sets the
conditions for calling an external process part of a mind rather than a hand tool:
it must be reliably available, actively used, and genuinely integrated into the
reasoning itself. A notebook you always carry qualifies. A chat window you visit
when the words won't come does not; it is a vending machine with better manners.
The distinction is not in the software. It is in your commitments as the person
using it: what stays in the loop, the standards you insist on supplying yourself,
and how much you are willing to delegate while still being able to evaluate it. The
coupled system is the unit of analysis, and it
should be better than either component alone. If it is not, you have consulted
the tool rather than coupled with it.

That framing resolves what looks like a crisis. The complaint you may have heard (or
made) that an LLM contracts the user's capacity is really a complaint about the
ghostwriting posture, not about language models generally. Under the symbiote model
the demand runs the other
direction: the model is powerful exactly to the degree that the mind it extends is
already developed. That development is what this article is about.

## What Coupling Requires

Sharing a voice with another intelligence is impossible until certain conditions
hold, and they turn out to be requirements, not preferences. Before the four steps,
one admission: my voice did not emerge from the corpus alone. As an aid to the
voice discovery, I identified writers whose thinking and prose resemble mine, and
used them as a lever: "write the way Christopher Alexander thinks and the way Alan
Kay argues; sentence it the way Dijkstra disciplines; recruit sources the way a
classical essayist converses." Saying that sentence out loud to the model does
something a raw corpus dump cannot: it points the model's training data at the
writers who are already close to me, and lets it interpolate the remaining distance.
The formulation requires an uncomfortable amount of self-awareness about whom you
sound like (and not who you are pretending to be); it is worth working through, because the answer is usually knowable.
Here is the honest format for the rest of this section: the requirement, what was
done here, and how you can do it yourself. Four times. No homework, no mystery.

**1. Voice must exist before coupling.**

A model cannot adopt a voice it has not been shown; describing a voice in
adjectives produces the model's own default register, which is everyone's and
therefore no one's.

*What was done here:* before any drafting, the model read a significant number of
my prior articles end to end. Not as research. As calibration.

*How you do it:* collect your strongest published sentences and hand them over
verbatim before asking for anything. The corpus is the specification; a single
paragraph your reader could identify beats every adjective ever written. If the
corpus alone leaves the interpolation fuzzy, name the writers you are closest to
and say what each contributes; that is the Hitchens move, and it has a pedigree:
he took T. S. Eliot's line seriously - "immature poets imitate; mature poets
steal" - and taught his students to absorb the writers they admire while refusing
to remain a replica of them. Naming your influences to the model is the mature
version of both halves: it steals the training data's nearest neighbors while the
corpus keeps the final say.

**2. The gate must be mechanical.**

Instruction-following is unreliable, even from a model that genuinely intends to
cooperate. Counts are not. A style guide that cannot be checked guides nothing.

*What was done here:* the guide's qualitative rules were converted into fourteen
numbered caps, a script measures them on every draft, and the first draft of this
article failed the gate seven times before it passed clean. In other words, it acts
like a unit test and/or a linter for your prose.

*How you do it:* encode your voice's boundaries as mechanical checks and fix every
failure. The reason this works is the reason compilers work: the check is outside
the system being checked. In other words, when you come across a weird phrase you
would never say yourself, you have encountered a drift. For example,
I rarely use the word "because" in my own writing and instead use "due to the fact that" which is a bad habit from high school essay writing. So when I encounter it in the model's output, I recognize it as a drift and add it to the blacklist (quarantine log).

**3. Drift must be named, not merely banned.**

Every cohort of models over-uses its own phrases, and the phrases change as models
change. A prohibition list grows forever and still lags. For example. ChatGPT had a
bad habit of using "goblin" references for a [short period of time](https://openai.com/index/where-the-goblins-came-from/).

*What was done here:* an append-only quarantine list. Twenty entries, the
newest the gate catching my own mannerisms in the draft of this very article;
the fix is the sentence you just read.

*How you do it:* when an idiom shows up, append it to the list. Never delete an
entry; comment it out to retire one, so the retirement is on the record.

**4. The author must retain the point of judgment.**

The model proposes; the human disposes. Judgment cannot be shared the way process
can, or the symbiote thesis would be false and the ghostwriter would be the correct
model.

*What was done here:* the outline of this article was approved before a word of
prose existed. When the prose later drifted, whole paragraphs were cut rather than
patched, including a full rewrite of this introduction.

*How you do it:* you write the thesis, you reject or approve the outline, you own
the verdict on what a piece claims and what it concedes. The model owns structure,
counterargument, alternatives, and revision of its own drafts. Weaken the mind and
the coupling weakens with it. (Clark and Chalmers again: the criteria are about
coupling to a mind.).

I generally like to approach writing in two directions: top-down and bottom-up. Top-down involves starting with the high-level structure and thesis, while bottom-up focuses on organizing disparate notes into potential paragraphs and sections. Once the bottom-up organization is in place, then the LLM can aid me in getting the flow and transitions right. I then make a followup pass to get the phrasing and style aligned with my own voice, and of course add some flair where appropriate.

## How You Do It

The five practices below are the generalized protocol. They are deliberately
tool-agnostic; you can apply all of them with any capable model. None
requires my specific pipeline, and if you follow them you will end up
speaking in *your* voice, not mine.

**Few-shot the voice; never describe it.** Collect your strongest published
sentences and hand them over verbatim before asking for anything. The model
contributes completion of your patterns; a *description* of your voice only
invites it to imitate its own defaults. Your anchors are the working definition,
and they update as your style does.

**State the thesis first and demand the outline before prose.** The thesis is
the author's, not the tool's. Requiring a thesis-first outline before any
paragraph exists makes the disagreement cheap: rejecting an outline costs a
sentence, rejecting prose costs an evening. If the outline is wrong, the
conversation has caught the failure at its cheapest layer.

**Put the disagreement early.** The places where a draft's character lives are
its openings, transitions, and conclusions. Let the model draft the outline while
the human drafts every opening; the voice-bearing sections then stay with the
human, and the model's contribution lands in the machinery where it is strong.

**Verify at the gate; do not attempt to police the prompt.** Instructions
drift; counts do not. Whatever your voice's boundaries are, encode them as
checks the draft must pass before it is presented, and fix every failure. A
guide that says "vary your rhythm" produces nothing; a count of sentence-length
instability produces evidence, and the revision the count demands is itself
useful. Calibrate those counts against your own essays rather than against
generic model output, because a detector trained on generic prose misfires on
structured argumentative writing: a fully machine-drafted piece of mine once
scored as perfectly human while one I wrote myself screened as machine-written.
Universal calibration does not transfer.

## The Artifacts

*How you do it:* you have already read how the method works; here is the method
itself. It ships as five small files, no dependencies, no install step: an audit
script that implements the gate, a stylometry script that measures your
fingerprint, a calibrate script that derives your config from your corpus, an
example config, and an example quarantine log. They live under
[`/.github/skills/extended-mind-writing/`] on this site's repository,
and they run anywhere Node does. The audit checks the caps mechanically:

```text
caps: emDashes/encoding (fail), anaphoricTriads (fail > 1/1200w),
      totalTriads (warn > 9/1200w), quarantine rows (fail),
      shortRun (warn at 4, fail at 5+), thisOpeners (fail > 1/500w),
      cheapTransitions (fail > 1/1000w), pivot (fail > 1/1500w),
      sentenceSd (warn < 5), burstiness (fail < 1.9), glue (warn > 6/1k)
```

and flags every phrase the quarantine log names, with permitted contexts
resolved the same way the site's own gate resolves them. Run it on a draft:

```
node audit-style.mjs draft.md -c ./extended-mind.config.mjs
```

and fix every FAIL before you show the draft to anyone. Mechanical checks are
not only custom-built: standard tooling covers the layers the audit deliberately
does not. Markdown lint enforces the format-level boundaries (a 120-column wrap,
straight quotes, heading structure) that belong to the file rather than the
voice, and an editor grammar checker such as LanguageTool reads every sentence
for correctness, a layer the audit ignores on purpose: its counters hunt drift
patterns, not grammar. The custom script keeps only what no stock rule can
express. For the caps' values,
`calibrate.mjs` closes the loop: it runs the same counters the audit uses over
your published essays and writes the config module itself, each cap derived a
little past your corpus's observed maximum with the originating statistic
recorded in a comment beside it. Nothing is transcribed by hand, and the script
refuses to overwrite an existing file so the gate cannot cannibalize itself. The
stylometry script prints your fingerprint: function-word frequencies per
thousand words, sentence length mean and standard deviation, long-short
alternation, punctuation habits.

```
node stylometry.mjs my-essays/ --corpus > my-fingerprint.json
```

One warning before you lean on the example config: the numbers it ships are
this site's calibration, not a specification. The package enforces the
workflow; the numbers enforce my voice. That is the misfire
finding from the gate practice above, seen from the tool side: a universal
calibration cannot exist, which is exactly why the tool ships recalibratable.
Run `calibrate.mjs` over your own essays first; the example config is a
fallback for when you cannot, and it will be measured against my habits
instead of yours.

**Record drift as dated data.** When a model cohort leaves its idioms in a
draft, the idiom goes into a dated log with the era that produced it, never
deleted. The log becomes a calibration record across model generations: it
shows how the machine's defaults drift, and it lets the gate adapt without
changing the voice. Prohibit nothing quietly. Supersede everything loudly.

## What Comes Next

Several articles in progress on this site will be written with this method, and
they will say so under a standing disclosure convention rather than in
disclaimers. Some of the backlog pieces will take the method further; a few
will deliberately probe where the coupling fails. The method is unfinished, but it
is documented well enough to reproduce, which is the state in which a method
deserves to be experimented with.

For anyone intending to do the same, the steps compress to three. Build a
voice corpus and treat it as a specification: actual sentences, not
adjectives. Build the gate: whatever your boundaries are, encode them as
mechanical checks, and resist the temptation to trust good intentions. Keep
the log: dated, append-only, and public if you wish, since the drift history
is useful to everyone adapting to instruments that change under them. None of
this tells you what to say. It frees you to say it at a pace that used to
require a staff.

King Thamus told Theuth that his invention would produce forgetfulness, and
 twenty-five centuries of cognitive tools have repeatedly proved the mechanism
right. The tool takes over the task; the person stops performing it; and then the
capacity quietly leaves. The extended mind allows the coupled system to do what
either party alone could not, provided the capacity is in
the loop; otherwise the machine simply performs, and you build nothing. That is the whole of the
discipline.

## References and Further Reading

* *[The Role of Programming](https://thenewobjective.com/types-and-programming-languages/the-role-of-programming/)*, Michael L Haufe, 2026
* *[Managing Complexity](https://thenewobjective.com/software-systems-engineering/managing-complexity/)*, Michael L Haufe, 2024
* *[Augmenting Human Intellect: A Conceptual Framework](https://www.dougengelbart.org/pubs/augment-3906.html)*, Douglas C. Engelbart, SRI, 1962
* *[The Extended Mind](https://www.jstor.org/stable/3328150)*, Andy Clark and David J. Chalmers, Analysis 58(1), 1998
* *[Phaedrus (Thamus and Theuth)](https://en.wikipedia.org/wiki/Phaedrus_(dialogue))*, Plato (trans. Jowett)
* *[Universalis](https://queue.acm.org/detail.cfm?id=3746223)*, Erik Meijer, ACM Queue, 2025
* Christopher Hitchens on imitation and transformation, citing T. S. Eliot's "Immature poets imitate; mature poets steal", Vanity Fair, 1996
