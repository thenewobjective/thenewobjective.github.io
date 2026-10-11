#!/usr/bin/env node
/**
 * Extended Mind - mechanical style audit for Markdown articles.
 *
 * A portable, configurable re-issue of the audit half of the pipeline documented in
 * "Writing With an Extended Mind" (thenewobjective.com). It implements the numeric
 * density caps (triads, pivots, short-sentence runs, rhythm floors, glue-word density)
 * and a dated quarantine log for model-cohort idioms.
 *
 * The numbers in DEFAULT_CONFIG are one author's calibration. Treat them as a
 * starting point, not a universal specification: run this against your own
 * published essays, then set your own caps in a config module and pass it with -c.
 * See README.md for the calibration procedure.
 *
 * Usage:
 *   node audit-style.mjs <file-or-directory>...
 *          [-c config.mjs] [--log style-audit.md] [--fail-on-warn] [-q]
 *
 * Exit codes: 0 = pass, 1 = violations (or warnings with --fail-on-warn), 2 = usage error
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const isPlainObject = v => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Deep merge override over base; arrays and functions replace wholesale. */
// eslint-disable-next-line max-params -- a merge takes exactly two operands; signature-required
function mergeConfig(base, override) {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out = {}
  for (const key of new Set([...Object.keys(base), ...Object.keys(override)])) {
    if (key in override) out[key] = override[key]
    else out[key] = base[key]
  }
  return out
}

/**
 * Default caps: the calibration used on thenewobjective.com as of 2026-09.
 * - severity: 'fail' | 'warn' | 'off' ('off' disables the check).
 * - window caps scale with document length: allowed = floor(totalWords / window),
 *   minimum 1.
 * - Cap numbering follows the source guide. Caps 5 (metaphor clusters per section)
 *   and 11 (paragraphs per section) are editorial checks and are intentionally not
 *   implemented: naive paragraph counting misclassifies figure captions and image
 *   credits as prose paragraphs, which fails genuine human essays.
 */
export const DEFAULT_CONFIG = {
  caps: {
    emDashes: { severity: 'fail' }, // 1
    encoding: { severity: 'fail' }, // 2
    anaphoricTriads: { cap: 1, window: 1200, severity: 'fail' }, // 3a
    totalTriads: { cap: 9, window: 1200, severity: 'warn' }, // 3b
    quarantine: { severity: 'fail' }, //
    shortRun: { maxWords: 8, warnAt: 4, failAt: 5 }, // 6
    thisOpeners: { cap: 1, window: 500, severity: 'fail' }, // 7
    cheapTransitions: { cap: 1, window: 1000, severity: 'fail' }, // 8
    pivot: { cap: 1, window: 1500, severity: 'fail' }, // 10
    sentenceSd: { min: 5, tolerance: 0.05, severity: 'warn' }, // 12
    burstiness: { min: 1.9, minWords: 800, severity: 'fail' }, // 13
    glue: { cap: 6, minWords: 500, severity: 'warn' } // 14
  },
  glue: {
    hedges: [
      'significantly', 'notably', 'demonstrate', 'it is important to',
      'it should be noted', 'arguably', 'markedly', 'substantially'
    ],
    transitions: [
      'however', 'therefore', 'furthermore', 'moreover', 'additionally',
      'consequently', 'nevertheless', 'in conclusion'
    ]
  },
  masks: {
    blockQuotes: true,
    linkSpans: true,
    abbrElements: true,
    cliFlags: true
  },
  quarantine: {
    logPath: './style-audit.md',
    fallback: [],
    permits: {}
  }
}

/** Built-in permitted-context patterns: phrase -> list of { when, then }.
 * "when" gates on the log row's note text; "then" is the context regex that
 * must match for the use to be permitted. This is DATA: your config's
 * quarantine.permits takes the same shape, so extending permissions needs
 * no code. */
/**
 * Resolve permit patterns for one occurrence. A phrase's patterns permit the
 * use when ANY rule matches: its `when` regex must accept the log row's note
 * AND its `then` regex must match the ~80-char context around the phrase.
 * @param {Array|undefined} rules - DEFAULT_PERMITS[phrase] or config equivalent
 * @param {string} note - the log row's permitted-context note
 * @param {string} ctx - the context window around the occurrence
 * @returns {boolean}
 */
// eslint-disable-next-line max-params -- rule + note + context are one decision's three inputs
export function resolvePermit(rules, note, ctx) {
  if (!Array.isArray(rules)) return false
  return rules.some(({ when, then }) => when.test(note) && then.test(ctx))
}

export const DEFAULT_PERMITS = {
  leverage: [
    { when: /tooling|tools|libraries|ecosystem|api/i,
      then: /\bleverage\s+(the\s+)?(existing|available|current|specific)\s+(tooling|tools|libraries|ecosystem|apis?|systems?)\b/i },
    { when: /leverage points|points of leverage/i, then: /\bleverage\s+points?\b/i }
  ],
  harness: [
    { when: /literal|equipment/i,
      then: /\b(horse|dog|safety|climbing|parachute)\s+harness\b|\b(battery|wiring)\s+harness\b/i }
  ],
  tapestry: [
    { when: /literal/i, then: /\btapestry\s+(weaving|loom)\b/i }
  ],
  landscape: [
    { when: /literal|term of art/i,
      then: /\b\w+\s+landscape\b|\blandscape\s+(architect|painting|photography|mode|orientation)\b/i }
  ],
  robust: [
    { when: /robust to|perturbation/i, then: /\brobust\s+(to|against)\s+\w+/i },
    { when: /robustness|statistical|regression|protocol/i,
      then: /\brobust(?:ness)?\s+(statistics|regression|standard|protocol)/i },
    { when: /enumerative|adjective list/i, then: /\brobust,\s+\w+/ }
  ]
}

// ---------------------------------------------------------------------------
// Quarantine log ("| Q |" rows: | Q | date | era | phrase | permitted context |)
// ---------------------------------------------------------------------------

/**
 * Parse quarantine entries from raw log text.
 * The log is markdown: prose (headers, notes) precedes an `## Entries` header;
 * only lines after that header are entries. One phrase per line; `#` comments
 * and `|` table rows are ignored; a permitted context follows the first colon.
 * @param {string} raw
 * @returns {Array<{phrase: string, note: string}>}
 */
export function parseQuarantineLog(raw) {
  const rows = []
  // Entries live under "## Entries"; the header marks where prose ends.
  const lines = raw.split('\n'),
    start = lines.findIndex(l => l.trim() === '## Entries'),
    entries = start === -1 ? [] : lines.slice(start + 1)
  for (const line of entries) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('|')) continue
    const i = trimmed.indexOf(':'),
      phrase = (i === -1 ? trimmed : trimmed.slice(0, i)).toLowerCase(),
      note = i === -1 ? '' : trimmed.slice(i + 1).trim().toLowerCase()
    if (!phrase) continue
    rows.push({ phrase, note })
  }
  // Longest first: "delve into" must be attempted before "delve" or the longer
  // rule never fires independently.
  // eslint-disable-next-line max-params -- sort comparators require 2 parameters by signature
  return rows.sort((a, b) => b.phrase.length - a.phrase.length)
}

/**
 * Load quarantine entries from the configured log path.
 * A missing log must never silently pass: the fallback is announced on stderr.
 * @param {object} quarantineCfg - the merged config's quarantine section
 * @param {string} cwd
 * @returns {{ rows: Array, source: string|null }}
 */
export function loadQuarantine({ quarantineCfg, cwd }) {
  if (!quarantineCfg.logPath) return { rows: [], source: null }
  try {
    const raw = readFileSync(resolve(cwd, quarantineCfg.logPath), 'utf8'),
      rows = parseQuarantineLog(raw)
    if (rows.length === 0) throw new Error('no quarantine entries parsed')
    return { rows, source: String(quarantineCfg.logPath) }
  } catch (err) {
    console.error(`note: could not read quarantine log (${quarantineCfg.logPath}): ${err.message}`)
    if (quarantineCfg.fallback.length === 0)
      console.error('note: continuing with NO quarantined phrases; set quarantine.logPath or quarantine.fallback in your config')
    return {
      rows: quarantineCfg.fallback.map(x => (typeof x === 'string' ? { phrase: String(x).toLowerCase(), note: '' } : { note: String(x.note || ''), phrase: String(x.phrase).toLowerCase() })),
      source: null
    }
  }
}

// ---------------------------------------------------------------------------
// Prose extraction and utilities
// ---------------------------------------------------------------------------

/** Paragraphs of prose only: skips front matter, fenced code, HTML/MDC blocks, headings, list items, quotes. */
function proseParagraphs(raw) {
  const lines = raw.split('\n'), paras = []
  let inFm = lines[0]?.trim() === '---', inCode = false, buf = []
  const flush = () => {
    if (!buf.length) return
    const p = buf.join(' ').trim()
    if (p) paras.push(p)
    buf = []
  }
  for (const line of lines) {
    if (inFm) {
      if (line.trim() === '---') inFm = false
      continue
    }
    if (/^\s*(```|~~~)/.test(line))
    {
      flush()
      inCode = !inCode
      continue
    }
    if (inCode) continue
    if (/^\s*::/.test(line) || /^\s*</.test(line)) {
      flush()
      continue
    }
    if (line.trim() === '') {
      flush()
      continue
    }
    if (/^#{1,6}\s/.test(line) || /^\s*([-*+]|\d+\.)\s/.test(line) || /^\s*>/.test(line)) {
      flush()
      continue
    }
    buf.push(line)
  }
  flush()
  return paras
}

const words = s => (s.match(/\S+/g) || []).length

function splitSentences(p) {
  return p
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map(s => s.trim())
    .filter(Boolean)
}

const CLIP_LEN = 60,
  clip = s => (s.length > CLIP_LEN ? `${s.slice(0, CLIP_LEN - 1)}...` : s)

// ---------------------------------------------------------------------------
// The audit
// ---------------------------------------------------------------------------

/**
 * Audit one markdown document.
 * @param {string} raw - full file contents, front matter included or not
 * @param {object} [opts]
 * @param {object} [opts.config]     - user config merged over DEFAULT_CONFIG
 * @param {Array}  [opts.quarantine] - preloaded rows [{ phrase, note }]; overrides logPath
 * @returns {{ totalWords: number, findings: Array<{sev: string, cap: number, msg: string, line: number}> }}
 */
// eslint-disable-next-line max-params -- document + options object is the established API shape
export function auditRaw(raw, { config, quarantine } = {}) {
  const cfg = mergeConfig(DEFAULT_CONFIG, config || {}),
    C = cfg.caps,
    findings = [],
    lines = raw.split('\n'),
    lineAt = charIdx => raw.slice(0, charIdx).split('\n').length

  // Per-cap raw measurements, populated unconditionally (regardless of severity).
  // Returned alongside findings so the calibration script can derive caps from data.
  // eslint-disable-next-line one-var -- measures is conceptually a separate unit; readability wins
  const measures = {
    emDash: 0, encoding: 0, anaphoricTriads: 0, totalTriads: 0,
    quarantinedInstances: 0, shortRunWarns: 0, shortRunFails: 0,
    thisOpeners: 0, cheapTransitions: 0, pivots: 0,
    sentenceSdMin: Infinity, burstiness: null, glueRate: null
  }

  let body = raw, off = 0
  // eslint-disable-next-line max-params -- finding descriptor: severity, cap id, message, offset
  const add = (cap, sev, msg, charIdx) =>
    findings.push({ sev, cap, msg, line: charIdx == null ? 1 : lineAt(off + charIdx) })

  {
    if (lines[0]?.trim() === '---') {
      // eslint-disable-next-line max-params -- findIndex callbacks require 2 parameters by signature
      const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---')
      if (end > 0) {
        off = lines.slice(0, end + 1).join('\n').length + 1
        body = raw.slice(off)
      }
    }
  }

  // "quoted" mask of regions the author does not own typographically.
  const quoted = new Uint8Array(body.length)
  {
    const linesBody = body.split('\n')
    let at = 0
    for (const l of linesBody) {
      if (cfg.masks.blockQuotes && /^\s*>/.test(l)) quoted.fill(1, at, at + l.length)
      at += l.length + 1
    }
    const mark = (re) => {
      let m
      const rx = new RegExp(re.source, re.flags)
      while ((m = rx.exec(body))) quoted.fill(1, m.index, m.index + m[0].length)
    }
    if (cfg.masks.linkSpans) mark(/\[[^\]]*\]\([^)]*\)/g)
    if (cfg.masks.abbrElements) mark(/(<abbr[\s\S]*?<\/abbr>)(\s*\([^)\n]{0,120}\))?/g)
  }

  const paras = proseParagraphs(body),
    // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
    totalWords = paras.reduce((n, p) => n + words(p), 0),
    capFor = window => Math.max(1, Math.floor(totalWords / window)),
    permits = { ...DEFAULT_PERMITS, ...(cfg.quarantine.permits || {}) },
    quarantineRows = quarantine || loadQuarantine({ quarantineCfg: cfg.quarantine, cwd: process.cwd() }).rows

  // ---- Cap 1: em dashes and double-hyphen dashes (0 outside masked regions) ----
  {
    let i = body.indexOf('\u2014')
    while (i !== -1) {
      if (!quoted[i]) {
        add(1, 'FAIL', 'em dash (U+2014) found; restructure the sentence', i)
        measures.emDash++
      }
      i = body.indexOf('\u2014', i + 1)
    }
    const hyphenRun = /(?<=\S)\s--\s(?=\S)|(?<=[A-Za-z])--(?=[A-Za-z])/g
    let m
    const isCliFlag = idx => cfg.masks.cliFlags && (
      /\b(npm|node|npx|nuxt|git)\b[^;\n]{0,80}--\s/.test(body.slice(Math.max(0, idx - 90), idx + 4)) ||
      /`[^`\n]{0,80}--\s/.test(body.slice(Math.max(0, idx - 90), idx + 4)) ||
      /--\s*<?[a-zA-Z-]*>?$/.test(body.slice(idx, idx + 30))
    )
    while ((m = hyphenRun.exec(body))) {
      if (!quoted[m.index] && !isCliFlag(m.index))
        add(1, 'FAIL', 'double-hyphen dash used as punctuation', m.index)
    }
  }

  // ---- Cap 2: smart quotes, ellipsis character, NBSP, thin space ----
  {
    const chars = [
      ['\u2018', 'left single curly quote'], ['\u2019', 'right single curly quote'],
      ['\u201C', 'left double curly quote'], ['\u201D', 'right double curly quote'],
      ['\u2026', 'ellipsis character'], ['\u00A0', 'non-breaking space'], ['\u2009', 'thin space']
    ]
    for (const [ch, name] of chars) {
      let j = body.indexOf(ch)
      while (j !== -1) {
        if (!quoted[j]) {
          add(2, 'FAIL', `${name} (U+${ch.codePointAt(0).toString(16).padStart(4, '0')}) found`, j)
          measures.encoding++
        }
        j = body.indexOf(ch, j + 1)
      }
    }
  }

  // ---- Cap 3: triadic constructions, two signals (3a FAIL, 3b WARN) ----
  {
    const triadRe = /\b[\w'-]+(?:\s+[\w'-]+){0,6},\s+[\w'-]+(?:\s+[\w'-]+){0,6},\s+and\s+[\w'-]+(?:\s+[\w'-]+){0,6}/g,
      isNameList = s => s.replace(/,\s+and\s+/g, ', ').split(/,\s+/).every(el => /^[A-Z]/.test(el.trim())),
      isAnaphoric = (s) => {
        const heads = s.replace(/,\s+and\s+/g, ', ').split(/,\s+/).map(x => x.trim().split(/\s+/)[0].toLowerCase())
        return heads[0] === heads[1] || heads[1] === heads[2] || heads[0] === heads[2]
      },
      triads = []
    let m
    while ((m = triadRe.exec(body))) if (!isNameList(m[0])) triads.push({ text: m[0], index: m.index })
    const anaph = triads.filter(t => isAnaphoric(t.text)),
      anaphCap = capFor(C.anaphoricTriads.window)
    measures.anaphoricTriads = anaph.length
    measures.totalTriads = triads.length
    if (anaph.length > anaphCap) {
      for (const t of anaph.slice(anaphCap))
        add(3, 'FAIL', `anaphoric/parallel triad (cap ${anaphCap}/${C.anaphoricTriads.window}w, found ${anaph.length}): "${clip(t.text)}"`, t.index)
    }
    const triadCap = Math.max(1, Math.round((totalWords / C.totalTriads.window) * C.totalTriads.cap))
    if (triads.length > triadCap)
      add(3, 'WARN', `${triads.length} triadic constructions (${(triads.length / Math.max(1, totalWords) * C.totalTriads.window).toFixed(1)}/${C.totalTriads.window}w > cap ${triadCap}); keep only the argument-bearing ones`)
  }

  // ---- Caps 4/9: quarantined phrases ----
  {
    const lower = body.toLowerCase()
    for (const entry of quarantineRows) {
      const permit = permits[entry.phrase]
      let k = lower.indexOf(entry.phrase)
      while (k !== -1) {
        if (!quoted[k]) {
          const ctx = body.slice(Math.max(0, k - 40), k + entry.phrase.length + 40)
          if (!resolvePermit(permit, entry.note, ctx)) {
            add(4, 'FAIL', `quarantined phrase "${entry.phrase}"`, k)
            measures.quarantinedInstances++
            break
          }
        }
        k = lower.indexOf(entry.phrase, k + 1)
      }
    }
  }

  // ---- Cap 7: paragraphs opening with "This " ----
  {
    const thisOpens = paras.filter(x => /^This\s/.test(x)).length
    measures.thisOpeners = thisOpens
    if (thisOpens > capFor(C.thisOpeners.window))
      add(7, 'FAIL', `paragraphs opening with "This " over cap (${thisOpens} > ${capFor(C.thisOpeners.window)} per ${C.thisOpeners.window}w)`)
  }

  // ---- Cap 8: sentence-initial cheap transitions ----
  {
    const transRe = /(?:^|(?<=[.!?]\s))(So|That said|In short),\s/g,
      trans = []
    let m
    while ((m = transRe.exec(body))) trans.push(m)
    measures.cheapTransitions = trans.length
    if (trans.length > capFor(C.cheapTransitions.window)) {
      for (const t of trans.slice(capFor(C.cheapTransitions.window)))
        add(8, 'FAIL', `cheap transition "${t[1]}," over cap (${trans.length} > ${capFor(C.cheapTransitions.window)} per ${C.cheapTransitions.window}w)`, t.index)
    }
  }

  // ---- Cap 10: "not X; it is Y" pivot constructions ----
  {
    const pivotRe = /\bnot\s+(?:just\s+)?[^.;]{1,80}[;,]\s+it\s+is\s+/gi,
      pivots = []
    let m
    while ((m = pivotRe.exec(body))) pivots.push(m)
    measures.pivots = pivots.length
    if (pivots.length > capFor(C.pivot.window)) {
      for (const pv of pivots.slice(capFor(C.pivot.window)))
        add(10, 'FAIL', `"not X; it is Y" pivot over cap (${pivots.length} > ${capFor(C.pivot.window)} per ${C.pivot.window}w)`, pv.index)
    }
  }

  // ---- Cap 6: consecutive short sentences ----
  // Runs of up to 3 are a permitted closing beat ("It emerges from reflection.");
  // 4 warns, 5+ fails.
  for (const para of paras) {
    const sents = splitSentences(para)
    let run = 0
    for (const s of sents) {
      if (words(s) < C.shortRun.maxWords) {
        run++
        if (run === C.shortRun.warnAt) {
          add(6, 'WARN', `${C.shortRun.warnAt} consecutive short sentences (<${C.shortRun.maxWords} words): "${clip(s)}"`)
          measures.shortRunWarns++
        }
        if (run === C.shortRun.failAt) {
          add(6, 'FAIL', `${C.shortRun.failAt}+ consecutive short sentences (<${C.shortRun.maxWords} words): "${clip(s)}"`)
          measures.shortRunFails++
          run = 0
        }
      } else run = 0
    }
  }

  // ---- Cap 12 (warning): uniform sentence rhythm within a paragraph ----
  for (const para of paras) {
    const sents = splitSentences(para)
    if (sents.length >= 4) {
      const lens = sents.map(words),
        // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
        mean = lens.reduce((a, b) => a + b, 0) / lens.length,
        // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
        sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length)
      if (sd < measures.sentenceSdMin) measures.sentenceSdMin = sd
      if (sd < C.sentenceSd.min - C.sentenceSd.tolerance) {
        add(12, C.sentenceSd.severity === 'fail' ? 'FAIL' : 'WARN',
          `uniform sentence rhythm (sd ${sd.toFixed(1)} < ${C.sentenceSd.min}); lengths [${lens.join(', ')}]`)
      }
    }
  }

  // ---- Cap 13: burstiness floor (max/mean sentence length over the document) ----
  if (totalWords > C.burstiness.minWords) {
    const all = [],
      lens = []
    for (const para of paras)
      for (const s of splitSentences(para)) all.push(words(s))

    for (const n of all) if (n > 0) lens.push(n)
    if (lens.length > 0) {
      const maxLen = Math.max(...lens),
        // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
        meanLen = lens.reduce((a, b) => a + b, 0) / lens.length,
        burst = maxLen / meanLen
      measures.burstiness = burst
      if (burst < C.burstiness.min) {
        add(13, C.burstiness.severity === 'warn' ? 'WARN' : 'FAIL',
          `burstiness below floor (max/mean ${burst.toFixed(1)} < ${C.burstiness.min}); the draft never varies sentence length`)
      }
    }
  }

  // ---- Cap 14 (warning): hedge + transition glue density ----
  if (totalWords > C.glue.minWords) {
    const lower2 = body.toLowerCase(),
      list = [...cfg.glue.hedges, ...cfg.glue.transitions],
      // eslint-disable-next-line max-params -- reduce callbacks require 2 parameters by signature
      hits = list.reduce((a, w) => a + (lower2.split(w).length - 1), 0),
      rate = hits / totalWords * 1000
    measures.glueRate = rate
    if (rate > C.glue.cap) {
      add(14, C.glue.severity === 'fail' ? 'FAIL' : 'WARN',
        `hedge/transition density ${rate.toFixed(1)}/1k > ${C.glue.cap}; prefer stated causal relations to connective fillers`)
    }
  }

  return { totalWords, findings, measures }
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
 * Load a user config module: `config` export, default export, or the module itself.
 * @param {string} path
 * @param {string} cwd
 */
async function loadUserConfig({ path, cwd }) {
  const href = pathToFileURL(resolve(cwd, path)).href,
    mod = await import(href)
  return mod.config || mod.default || mod
}

const isMain = () =>
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href

/**
 * CLI entry. Returns a process exit code.
 * @param {string[]} argv
 * @returns {Promise<number>}
 */
async function main(argv) {
  const cwd = process.cwd()
  let targets = [], configPath = null, logOverride = null, failOnWarn = false, quiet = false
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-c' || a === '--config') configPath = argv[++i]
    else if (a === '--log') logOverride = argv[++i]
    else if (a === '--fail-on-warn') failOnWarn = true
    else if (a === '-q' || a === '--quiet') quiet = true
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node audit-style.mjs <file-or-directory>... [-c config.mjs] [--log style-audit.md] [--fail-on-warn] [-q]')
      return 0
    } else targets.push(a)
  }
  if (targets.length === 0) {
    console.error('Usage: node audit-style.mjs <file-or-directory>... [-c config.mjs] [--log style-audit.md] [--fail-on-warn] [-q]')
    return 2
  }

  const userConfig = configPath ? await loadUserConfig({ path: configPath, cwd }) : {}
  if (logOverride) userConfig.quarantine = { ...(userConfig.quarantine || {}), logPath: logOverride }
  const merged = mergeConfig(DEFAULT_CONFIG, userConfig),
    { rows } = loadQuarantine({ quarantineCfg: merged.quarantine, cwd })

  let fails = 0, warns = 0
  for (const target of targets) {
    for (const file of walk(target)) {
      const raw = readFileSync(file, 'utf8'),
        { totalWords, findings } = auditRaw(raw, { config: merged, quarantine: rows }),
        f = findings.filter(x => x.sev === 'FAIL'),
        w = findings.filter(x => x.sev === 'WARN')
      fails += f.length
      warns += w.length
      if (!quiet && findings.length) {
        console.log(`\n${relative(cwd, file)} (${totalWords} words)`)
        for (const x of findings) console.log(`  [${x.sev}] cap ${x.cap}${x.line ? ` (line ${x.line})` : ''}: ${x.msg}`)
      }
    }
  }
  if (!quiet) console.log(`\nAudit: ${fails} violation(s), ${warns} warning(s).`)
  return (fails > 0 || (failOnWarn && warns > 0)) ? 1 : 0
}

if (isMain()) {
  main(process.argv.slice(2))
    .then(code => process.exit(code))
    .catch((err) => {
      console.error(String(err))
      process.exit(2)
    })
}
