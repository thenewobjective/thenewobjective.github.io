---
name: extended-mind-writing
description: 'Draft, revise, or calibrate essays under content/ using the mechanical
  voice-gate workflow. Use when: writing or revising any article, essay, or Markdown
  prose under content/; running a style audit; fixing FAIL findings; calibrating
  voice against the essay corpus; checking whether a phrase is a model-cohort idiom;
  adding a quarantine row. Not for site code or deployment work.'
---

# Extended Mind Writing

Draft and revise prose through the site's mechanical voice gate: voice anchors
calibrate the model's register, a thesis-first outline is approved before prose,
a script enforces the density caps, and a quarantine list names model-cohort
idioms. The gate is the definition of done: a draft with unaddressed FAILs is
unfinished. The voice spec itself lives beside this file in
[voice.md](./voice.md); SKILL.md carries only the procedure.

## The workflow, in order

1. **Read the voice spec.** Load [voice.md](./voice.md) in full. The
   orientation sentence is the short form of the whole spec; the
   Correspondence Discipline (analogy -> structural correspondence -> common
   principle, each stage claiming only what its evidence supports) governs
   analogies in the draft.
2. **Read the three anchors in full before drafting.** They are the few-shot
   definition of the voice, not optional background:
   - [Conway's Law and Consequences](../../../content/software-systems-engineering/conways-law-and-consequences.md)
   - [Managing Complexity](../../../content/software-systems-engineering/managing-complexity.md)
   - [Against TDD and BDD](../../../content/software-systems-engineering/against-tdd-and-bdd.md)

   Register: the three anchors are analytical peer-to-peer essays. Personal
   Me/You essays (uncategorized/dreamwork) are the site's second register; the
   caps measure structure, not register.
3. **Thesis-first outline, approved BEFORE prose.** Present the outline and wait
   for approval. Rejecting prose costs an evening; rejecting an outline costs a
   sentence.
4. **Draft.** Me/You voice per the site's established register; argument-first
   structure; the user's own phrasing wins over any smoother alternative.
5. **Run the gate.** `npm run audit:style -- <path-to-draft>` (or invoke
   [audit-style.mjs](./audit-style.mjs) directly with the same arguments).
   Fix every FAIL and present the audit output in your response. Warnings
   (cap 12 rhythm subwindows) are informational; report and move on.
6. **Record drift.** If you reach for a polished-essay English phrase not yet in
   the ban list, restructure the sentence and flag the phrase as an entry
   candidate for [style-audit.md](./style-audit.md).

## Quarantine format

The ban list lives in [style-audit.md](./style-audit.md). Format rules:

- One phrase per line, lowercase; longer forms go first when one phrase
  contains another (matching is leftmost-first).
- An optional permitted context follows the phrase after the first colon
  (split on the FIRST colon; the note may contain further colons).
- Entries live under an `## Entries` header; everything above it is
  documentation the parser ignores. Within the section, `#` comment lines
  are ignored (like `|` rows).

## Quarantine permits

The log's entries carry optional permitted-context notes after the first colon.
The audit's permit mechanism resolves them mechanically - a permit note
documents what the predicate enforces. If a FAIL names a phrase that the log's
note permits in context, check the context window before editing prose; but
never edit the log to silence a FAIL. Surface the conflict instead.

## Scripts

- [audit-style.mjs](./audit-style.mjs) - the gate. Reads
  [style-audit.md](./style-audit.md) at runtime; the log path resolves
  relative to the script file.
- [stylometry.mjs](./stylometry.mjs) - fingerprint: function words, sentence
  rhythm, punctuation.
- [calibrate.mjs](./calibrate.mjs) - derives caps from a corpus and writes a
  config module (site config: [extended-mind.config.mjs](./extended-mind.config.mjs)).
- [README.md](./README.md) - the user-facing pipeline documentation; the
  article's Artifacts section points readers here.

This whole folder is the shareable unit the article describes; there is no
separate site/portable copy to keep in sync.

## Never

- Commit to `main` without the user's explicit request (deploys to production).
- Present a draft with unaddressed FAIL findings.
- Rewrite the user's own sentences for smoothness without asking; their habits
  (e.g. preferring "due to the fact that" over "because") are the calibration,
  not drift.