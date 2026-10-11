#!/usr/bin/env node
/**
 * Extended Mind - calibration generator.
 *
 * Runs the stylometry and audit machinery over YOUR corpus of published essays
 * and WRITES a ready-to-edit config module with caps derived from what your
 * corpus actually does. No copying CLI output by hand.
 *
 * Usage:
 *   node calibrate.mjs my-essays/ [-c my-existing-config.mjs] [-o my.config.mjs]
 *
 * What it does:
 *   1. Profiles every document; builds the aggregate fingerprint and per-doc stats.
 *   2. Runs the audit's structural counters per document (triads, pivots, glue,
 *      short runs, sentence sd, burstiness) - via the same code path as the audit.
 *   3. Derives caps: for each cap, a value just past the corpus maximum (the
 *      corpus is your published, acceptable prose; the caps must accept all of it).
 *   4. Writes the config module with the derived values AND a comment block
 *      recording the corpus statistics behind each cap.
 *
 * Re-run it whenever your corpus grows. Calibration is a standing measurement,
 * not a one-time rite.
 */

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { auditRaw } from './audit-style.mjs'
import { profile, aggregate } from './stylometry.mjs'

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
 * Round a derived cap up to a small human number (integer with headroom).
 * The corpus is acceptable prose, so caps sit just above its observed max.
 */
// eslint-disable-next-line max-params -- derived value + floor are the two inputs of the rounding
const withHeadroom = (max, floor) => Math.max(floor, Math.ceil(max * 1.1 + 0.5)),
  isMain = () =>
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href

async function main(argv) {
  const args = [...argv]
  let targets = [], outPath = null, baseConfig = null
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '-o' || a === '--out') outPath = args[++i]
    else if (a === '-c' || a === '--config') {
      const href = pathToFileURL(resolve(args[++i])).href,
        mod = await import(href)
      baseConfig = mod.config || mod.default || mod
    }
    else if (!a.startsWith('--')) targets.push(a)
  }
  if (targets.length === 0) {
    console.error('Usage: node calibrate.mjs <corpus-dir-or-files>... [-c base-config.mjs] [-o out.config.mjs]')
    return 2
  }
  const out = outPath || 'extended-mind.config.mjs'
  if (existsSync(resolve(out)) && !outPath) {
    console.error(`refusing to overwrite ${out}; pass -o <path> to write elsewhere or remove the file first`)
    return 2
  }

  const cwd = process.cwd(),
    perDoc = []
  for (const target of targets) {
    for (const file of walk(target)) {
      const raw = readFileSync(file, 'utf8'),
        m = auditRaw(raw, { config: baseConfig, quarantine: [] }),
        s = profile(raw)
      if (!s) continue // under 100 words of prose: no signal, skip
      perDoc.push({ file: relative(cwd, file), measures: m.measures, styl: s, totalWords: m.totalWords })
    }
  }
  if (perDoc.length === 0) {
    console.error('error: no document produced a profile; every file was under 100 words of prose')
    return 2
  }

  const agg = aggregate(perDoc.map(d => d.styl)),
    stats = {
    docs: perDoc.length,
    words: agg.words,
    meanSentence: agg.meanSentence,
    sentenceSd: agg.sentenceSd,
    alternation: agg.alternation,
    punct: agg.punct,
    fn: agg.fn
  }

  // ---- derive caps ----
  // counts (per-window style caps): take corpus MAXIMUM (not rate) since windows
  // cap a single document; then scale to per-1000w rates for cross-doc comparability.
  // Max per-1000w rate across documents for a measure key.
  // eslint-disable-next-line one-var -- derivation block shares one declaration
  const rate = (key) => {
    return Math.max(...perDoc.map(d => (d.measures[key] || 0) / Math.max(1, d.totalWords) * 1000))
  },
  derived = {
    anaphoricTriadsPer1200: withHeadroom(rate('anaphoricTriads', 1200) * 1.2, 1),
    totalTriadsPer1200: withHeadroom(rate('totalTriads', 1200) * 1.2, 3),
    thisOpenersPer500: withHeadroom(rate('thisOpeners', 500) * 1.2, 1),
    cheapTransitionsPer1000: withHeadroom(rate('cheapTransitions', 1000) * 1.2, 1),
    pivotsPer1500: withHeadroom(rate('pivots', 1500) * 1.2, 1),
    gluePer1000: withHeadroom(rate('glueRate', 1000) * 1.2, 3),
    sentenceSdMin: (() => {
      const m = Math.max(...perDoc.map(d => d.measures.sentenceSdMin))
      return Number.isFinite(m) ? Math.max(2, Math.floor(m * 0.9 * 10) / 10) : 5
    })(),
    burstinessMin: (() => {
      const vals = perDoc.map(d => d.measures.burstiness).filter(v => v != null),
        m = Math.min(...vals)
      return vals.length ? Math.max(1.2, Math.floor(m * 0.9 * 10) / 10) : 1.9
    })()
  }

  // ---- render the config module ----
  // eslint-disable-next-line one-var -- rendering state (formatter + buffer) reads as one unit
  const fmt = n => (Number.isInteger(n) ? String(n) : String(n.toFixed(1))),
    lines = []
  lines.push('/**')
  lines.push(` * Configuration GENERATED by calibrate.mjs on ${new Date().toISOString().slice(0, 10)}.`)
  lines.push(` * Corpus: ${stats.docs} document(s), ${stats.words} words.`)
  lines.push(' * Each cap records the corpus statistic that derived it. Edit freely;')
  lines.push(' * re-run calibrate.mjs after your corpus grows to re-derive from data.')
  lines.push(' */')
  lines.push('export const config = {')
  lines.push('  caps: {')
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("    emDashes: { severity: 'fail' },")
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("    encoding: { severity: 'fail' },")
  lines.push(`    anaphoricTriads: { cap: ${fmt(derived.anaphoricTriadsPer1200)}, window: 1200, severity: 'fail' }, // corpus max ${rate('anaphoricTriads', 1200).toFixed(2)}/1200w`)
  lines.push(`    totalTriads: { cap: ${fmt(derived.totalTriadsPer1200)}, window: 1200, severity: 'warn' }, // corpus max ${rate('totalTriads', 1200).toFixed(2)}/1200w`)
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("    quarantine: { severity: 'fail' },")
  lines.push('    shortRun: { maxWords: 8, warnAt: 4, failAt: 5 },')
  lines.push(`    thisOpeners: { cap: ${fmt(derived.thisOpenersPer500)}, window: 500, severity: 'fail' }, // corpus max ${rate('thisOpeners', 500).toFixed(2)}/500w`)
  lines.push(`    cheapTransitions: { cap: ${fmt(derived.cheapTransitionsPer1000)}, window: 1000, severity: 'fail' }, // corpus max ${rate('cheapTransitions', 1000).toFixed(2)}/1000w`)
  lines.push(`    pivot: { cap: ${fmt(derived.pivotsPer1500)}, window: 1500, severity: 'fail' }, // corpus max ${rate('pivots', 1500).toFixed(2)}/1500w`)
  lines.push(`    sentenceSd: { min: ${fmt(derived.sentenceSdMin)}, tolerance: 0.05, severity: 'warn' }, // corpus min paragraph sd`)
  lines.push(`    burstiness: { min: ${fmt(derived.burstinessMin)}, minWords: 800, severity: 'fail' }, // corpus min max/mean`)
  lines.push(`    glue: { cap: ${fmt(derived.gluePer1000)}, minWords: 500, severity: 'warn' } // corpus max ${rate('glueRate', 1000).toFixed(2)}/1k`)
  lines.push('  },')
  lines.push('  glue: {')
  lines.push('    hedges: [')
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("      'significantly', 'notably', 'demonstrate', 'it is important to',")
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("      'it should be noted', 'arguably', 'markedly', 'substantially'")
  lines.push('    ],')
  lines.push('    transitions: [')
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("      'however', 'therefore', 'furthermore', 'moreover', 'additionally',")
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("      'consequently', 'nevertheless', 'in conclusion'")
  lines.push('    ]')
  lines.push('  },')
  lines.push('  masks: { blockQuotes: true, linkSpans: true, abbrElements: true, cliFlags: true },')
  lines.push('  quarantine: {')
  // eslint-disable-next-line @stylistic/quotes -- renders source: single quotes inside
  lines.push("    logPath: './style-audit.md',")
  lines.push('    fallback: [],')
  lines.push('    permits: {}')
  lines.push('  }')
  lines.push('}')
  lines.push('')

  const body = lines.join('\n')
  writeFileSync(resolve(out), body, 'utf8')
  console.log(`wrote ${out}`)
  console.log(`corpus: ${stats.docs} docs, ${stats.words} words`)
  console.log(`fingerprint: meanSentence=${stats.meanSentence} sentenceSd=${stats.sentenceSd} alternation=${stats.alternation}`)
  console.log('derived caps:')
  for (const [k, v] of Object.entries(derived)) console.log(`  ${k}: ${fmt(v)}`)
  return 0
}

if (isMain()) {
  main(process.argv.slice(2))
    .then(code => process.exit(code))
    .catch((err) => {
      console.error(String(err))
      process.exit(2)
    })
}
