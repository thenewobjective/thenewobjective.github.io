#!/usr/bin/env node
/**
 * Extended Mind - stylometric profiling for authorial calibration.
 *
 * The measuring half of the pipeline documented in "Writing With an Extended Mind"
 * (thenewobjective.com). It computes the classical stylometric feature set
 * (Mosteller & Wallace-style function words, sentence-length distribution with
 * standard deviation and long-short alternation, punctuation habits) that lets an
 * author quantify their own voice and score a draft's distance from it.
 *
 * The fingerprint is per-author by construction: two authors' essays produce
 * different numbers. Universal calibration does not transfer; measure against
 * your own published essays, not against someone else's.
 *
 * Usage:
 *   node stylometry.mjs <file-or-directory>... [--corpus] [--distance <draft>] [--json]
 *     baseline        : per-document feature vectors
 *     --corpus        : aggregate fingerprint of all documents (the "voice spec")
 *     --distance <d>  : score draft <d> against the aggregate of the other documents
 *     --json          : machine-readable output (where supported)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const FUNCTION_WORDS = [
  'the', 'of', 'and', 'a', 'to', 'in', 'is', 'that', 'it', 'for',
  'as', 'was', 'with', 'be', 'by', 'on', 'not', 'this', 'are', 'or',
  'which', 'from', 'but', 'we', 'you'
]

const PUNCT = {
  semicolon: /;/g,
  colon: /:/g,
  parenthesis: /\(/g,
  question: /\?/g,
  comma: /,/g
}

/** Extract prose text only: skip front matter, headings, code, lists, quotes; keep link anchor text. */
function prose(raw) {
  const lines = raw.split('\n')
  let inFm = lines[0]?.trim() === '---', inCode = false
  const out = []
  for (const line of lines) {
    if (inFm) {
      if (line.trim() === '---') inFm = false
      continue
    }
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    if (/^\s*::/.test(line) || /^\s*</.test(line)) continue
    if (/^#{1,6}\s/.test(line) || /^\s*([-*+]|\d+\.)\s/.test(line) || /^\s*>/.test(line)) continue
    out.push(line.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, ''))
  }
  return out.join(' ')
}

const wordCount = s => (s.match(/[A-Za-z'-]+/g) || []).length

function splitSentences(p) {
  return p
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map(s => s.trim())
    .filter(Boolean)
}

/**
 * Compute the stylometric feature vector for one document.
 * Returns null for documents under 100 words (too little signal).
 * @param {string} raw
 * @returns {{ total: number, fn: Record<string, number>, meanSentence: number,
 *            sentenceSd: number, alternation: number, punct: Record<string, number>} | null}
 */
export function profile(raw) {
  const text = prose(raw),
    total = wordCount(text)
  if (total < 100) return null

  // function word frequencies per 1000 words
  const lower = text.toLowerCase().split(/\s+/),
    fn = {}
  for (const w of FUNCTION_WORDS) {
    let n = 0
    for (const tok of lower) if (tok === w) n++
    fn[w] = +(n / total * 1000).toFixed(2)
  }

  // sentence-length distribution
  const paragraphs = text.split(/\n{2,}/).filter(p => p.trim()),
    sents = paragraphs.flatMap(splitSentences),
    lens = sents.map(wordCount).filter(n => n > 0)
  if (lens.length === 0) return null
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length, // eslint-disable-line max-params -- reduce callback signature
    sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length) // eslint-disable-line max-params -- reduce callback signature

  // alternation: fraction of adjacent sentence pairs differing in length by >8 words
  let alternations = 0
  for (let i = 1; i < lens.length; i++) if (Math.abs(lens[i] - lens[i - 1]) > 8) alternations++
  const alternation = sents.length > 1 ? alternations / (lens.length - 1) : 0,
    punct = {}
  // punctuation per 1000 words
  for (const [name, re] of Object.entries(PUNCT)) {
    const n = (text.match(re) || []).length
    punct[name] = +(n / total * 1000).toFixed(2)
  }

  return { total, fn, meanSentence: +mean.toFixed(1), sentenceSd: +sd.toFixed(1), alternation: +alternation.toFixed(2), punct }
}

/**
 * Weighted aggregate of per-document profiles into an authorial fingerprint.
 * @param {Array} profiles
 */
export function aggregate(profiles) {
  const agg = {
    docs: profiles.length,
    // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
    words: profiles.reduce((a, p) => a + p.total, 0),
    fn: {}, meanSentence: 0, sentenceSd: 0, alternation: 0, punct: {}
  }
  if (agg.words === 0) return agg
  for (const w of FUNCTION_WORDS) {
    // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
    agg.fn[w] = +(profiles.reduce((a, p) => a + p.fn[w] * p.total, 0) / agg.words).toFixed(2)
  }
  // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
  agg.meanSentence = +(profiles.reduce((a, p) => a + p.meanSentence * p.total, 0) / agg.words).toFixed(1)
  // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
  agg.sentenceSd = +(profiles.reduce((a, p) => a + p.sentenceSd * p.total, 0) / agg.words).toFixed(1)
  // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
  agg.alternation = +(profiles.reduce((a, p) => a + p.alternation * p.total, 0) / agg.words).toFixed(2)
  for (const key of Object.keys(PUNCT)) {
    // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
    agg.punct[key] = +(profiles.reduce((a, p) => a + p.punct[key] * p.total, 0) / agg.words).toFixed(2)
  }
  return agg
}

/**
 * Euclidean distance between a draft profile and an anchor spec.
 * @param {object} draft - a profile() result
 * @param {object} spec  - an aggregate() fingerprint
 * @returns {number}
 */
// eslint-disable-next-line max-params -- two operands of a distance metric; signature-required
export function distance(draft, spec) {
  let d = 0
  for (const w of FUNCTION_WORDS) d += (draft.fn[w] - spec.fn[w]) ** 2
  for (const k of ['meanSentence', 'sentenceSd', 'alternation']) d += (draft[k] - spec[k]) ** 2
  for (const k of Object.keys(PUNCT)) d += (draft.punct[k] - spec.punct[k]) ** 2
  return Math.sqrt(d)
}

// ---------------------------------------------------------------------------
// CLI plumbing
// ---------------------------------------------------------------------------

function* walk(target) {
  const st = statSync(target)
  if (st.isFile()) {
    yield target
    return
  }
  for (const entry of readdirSync(target)) {
    const p = join(target, entry)
    if (statSync(p).isDirectory()) yield* walk(p)
    else if (p.endsWith('.md')) yield p
  }
}

/**
 * CLI entry point.
 * @param {string[]} argv
 * @returns {number}
 */
export function main(argv) {
  const targets = [], wantCorpus = argv.includes('--corpus')
  let distTarget = null
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--distance') {
      distTarget = argv[++i] || null
      continue
    }
    if (!a.startsWith('--')) targets.push(a)
  }

  if (targets.length === 0) {
    console.error('Usage: node stylometry.mjs <file-or-directory>... [--corpus] [--distance <draft>]')
    return 2
  }

  if (distTarget) {
    const draftRaw = readFileSync(distTarget, 'utf8'),
      others = []
    for (const target of targets) {
      for (const file of walk(target)) {
        if (relative(process.cwd(), file) === relative(process.cwd(), distTarget)) continue
        others.push(readFileSync(file, 'utf8'))
      }
    }
    const anchorProfiles = others.map(profile).filter(Boolean)
    if (anchorProfiles.length === 0) {
      console.error('error: after excluding the draft, no anchor documents remain; pass more anchor files')
      return 2
    }
    const spec = aggregate(anchorProfiles),
      draft = profile(draftRaw)
    if (!draft) {
      console.error('error: draft too short to profile (<100 words)')
      return 2
    }
    console.log(`anchor fingerprint: ${targets.join(', ')}`)
    console.log(`draft distance: ${distance(draft, spec).toFixed(2)}\n`)
    console.log('per-feature (draft vs anchor):')
    for (const w of FUNCTION_WORDS) {
      const delta = draft.fn[w] - spec.fn[w]
      if (Math.abs(delta) > 1.5) console.log(`  "${w}": ${draft.fn[w]} vs ${spec.fn[w]} (delta ${delta > 0 ? '+' : ''}${delta.toFixed(1)}/1000w)`)
    }
    console.log(`  meanSentence: ${draft.meanSentence} vs ${spec.meanSentence}`)
    console.log(`  sentenceSd: ${draft.sentenceSd} vs ${spec.sentenceSd}`)
    console.log(`  alternation: ${draft.alternation} vs ${spec.alternation}`)
    return 0
  }

  const profiles = []
  for (const target of targets) {
    for (const file of walk(target)) {
      const p = profile(readFileSync(file, 'utf8'))
      if (p) {
        p.file = relative(process.cwd(), file)
        profiles.push(p)
      }
    }
  }
  if (profiles.length === 0) {
    console.error('error: no document produced a profile; all were under 100 words of prose')
    return 2
  }
  if (wantCorpus) console.log(JSON.stringify(aggregate(profiles), null, 2))
  else {
    for (const p of profiles) {
      console.log(`\n${p.file} (${p.total} words)`)
      // eslint-disable-next-line max-params -- sort comparators require 2 parameters by signature
      const top = Object.entries(p.fn).sort((a, b) => b[1] - a[1]).slice(0, 8)
      console.log(`  function words/1000w: ${top.map(([w, n]) => `${w}=${n}`).join(' ')}`)
      console.log(`  meanSentence=${p.meanSentence} sd=${p.sentenceSd} longShortAlternation=${p.alternation}`)
      console.log(`  punct/1000w: ${Object.entries(p.punct).map(([k, n]) => `${k}=${n}`).join(' ')}`)
    }
  }
  return 0
}

const isMain = () =>
  process.argv[1] !== undefined &&
  pathToFileURL(resolvePath(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href

if (isMain()) process.exit(main(process.argv.slice(2)))
