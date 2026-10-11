# Extended Mind Writing

The complete style-gate pipeline for Markdown essays - procedure, voice spec,
ban list, and scripts in one portable folder. Documented in
["Writing With an Extended Mind"](https://thenewobjective.com/uncategorized/writing-with-an-extended-mind/)
(thenewobjective.com). Copy the whole folder and it runs anywhere Node does.

The method's core claim: **calibration does not transfer between authors.** The
config in this folder carries one site's numbers as a starting point. The
intended use is to recalibrate against your own corpus - the package enforces
the *workflow* (caps + ban list + per-author measurement), not anyone's voice.

## Files

| File | Purpose |
|---|---|
| `SKILL.md` | Agent skill: the drafting/revision procedure the site's agents follow |
| `voice.md` | The authoritative voice spec (orientation, caps, structure) |
| `style-audit.md` | The quarantine ban list (entries under `## Entries`) |
| `audit-style.mjs` | Mechanical style audit: density caps + quarantine list |
| `stylometry.mjs` | Stylometric profiling: function words, rhythm, punctuation |
| `calibrate.mjs` | Derives caps from YOUR corpus and writes a config module |
| `extended-mind.config.mjs` | Example user config (generated; edit or re-derive) |

No dependencies. Node 18+ (uses `node:` imports, `pathToFileURL`, `fileURLToPath`).

## The method in three steps

1. **Calibrate.** Run `calibrate.mjs` over your strongest published essays. It
   profiles the corpus, exercises the same counters the audit uses, and WRITES a
   config module: each cap derived just past your corpus's observed maximum, with
   the originating statistic recorded as a comment next to it. No transcription
   from CLI output. Re-run it when the corpus grows.
2. **Gate.** List model-cohort idioms as lines in `style-audit.md`, and run
   `audit-style.mjs` with your generated config on every draft; fix every
   FAIL before publishing.
3. **Record.** When a model cohort leaves an idiom in your draft, append a line
   to the list. The list is the drift record.

## Usage

    node calibrate.mjs <corpus-dir-or-files>... [-c base-config.mjs] [-o out.config.mjs]
    node audit-style.mjs <file-or-dir>... [-c config.mjs] [--log path] [--fail-on-warn] [-q]
    node stylometry.mjs <file-or-dir>... [--corpus] [--distance <draft>] [--json]

All scripts print findings and exit 0 (pass) / 1 (violations) / 2 (usage error).

## What the audit checks

| Cap | Check | Default | Notes |
|---|---|---|---|
| 1 | Em / double-hyphen dashes | FAIL | Skipped inside block quotes, link spans |
| 2 | Smart quotes, U+2026, NBSP, thin space | FAIL | Skipped inside masks |
| 3a | Anaphoric triads ("it verifies, it explains, and it points at") | FAIL > 1/1200w | The model-cohort structural signature |
| 3b | Total "X, Y, and Z" constructions | WARN > 9/1200w | Dense enumeration is legitimate technical style |
| 4/9 | Quarantined phrases | FAIL | From the list; per-phrase permits supported |
| 6 | Consecutive short sentences | WARN at 4, FAIL at 5+ | Runs up to 3 are a deliberate closing beat |
| 7 | Paragraphs opening with "This " | FAIL > 1/500w | Demonstrative openers |
| 8 | Sentence-initial "So," / "That said," / "In short," | FAIL > 1/1000w | Cheap transitions |
| 10 | "not X; it is Y" pivots | FAIL > 1/1500w | Forced second-clause patterns |
| 12 | Sentence-length sd per paragraph | WARN < 5 | Uniform rhythm is the loudest LLM tell |
| 13 | Burstiness (max/mean sentence length) | FAIL < 1.9 | Note the polarity: uniformity is machine-like here, not variance |
| 14 | Hedge/transition glue density | WARN > 6/1k | Connective fillers vs stated causal relations |

Deliberately NOT implemented: metaphor clusters per section, paragraphs per
section. Naive counting misclassifies figure captions and image credits as prose,
which fails genuine human essays; treat those two as editorial checks.

## The quarantine list

`style-audit.md` is the ban list. The format rules:

- One phrase per line, lowercase; longer forms go first when one phrase
  contains another (matching is leftmost-first).
- An optional permitted context follows the phrase after the first colon
  (split on the FIRST colon; the note may contain further colons).
- Entries live under an `## Entries` header; everything above it is
  documentation the parser ignores. Within the section, `#` comment lines
  and `|` rows are ignored.

Permitted contexts are enforced mechanically: `DEFAULT_PERMITS` (in
`audit-style.mjs`) maps a phrase to `{ when, then }` rules - `when` gates on the
line's note text, `then` must match the ~80-character context around the use.
Your config's `quarantine.permits` takes the same DATA shape, so you can add or
override permissions without writing code:

    permits: {
      // allow "leverage" only before tooling nouns
      leverage: [{ when: /tooling/i, then: /\bleverage\s+(the\s+)?existing\s+tooling\b/i }]
    }

The list format is plain lines by design: entries append by hand mid-session,
diff cleanly, and the phrase needs no table scaffolding to copy. A missing list
warns loudly on stderr and falls back to the config's `quarantine.fallback`
list.

## Calibration, not transcription

`calibrate.mjs` exists because copying CLI output into a config by hand is a
transcription step, and transcription steps erode. The generator writes the
config module itself:

    node calibrate.mjs my-essays/ -o ./my.config.mjs
    node audit-style.mjs my-draft.md -c ./my.config.mjs

For each cap it reports the corpus statistic in a trailing comment
(`// corpus max 7.09/1200w`), so every number in the file traces to a
measurement. A base config (`-c`) constrains the derivation (e.g. severities
you want kept); everything else is derived from your data. The generator
refuses to overwrite an existing config unless you say where to write with
`-o`.

Config deep-merges over `DEFAULT_CONFIG`; arrays and functions replace wholesale.

## Limitations

- English prose, sentence splitting on [.!?] followed by capitals. YMMV elsewhere.
- Sentence-length metrics are measured on extracted prose paragraphs only;
  quotes, lists, headings, and code are excluded by design.
- The audit is deliberately reg-exp-based and dependency-free. It will not catch
  everything a human editor catches; it catches what no human reliably does:
  the numeric overshoots.