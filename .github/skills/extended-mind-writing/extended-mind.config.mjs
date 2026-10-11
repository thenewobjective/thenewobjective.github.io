/**
 * Example user configuration for the Extended Mind pipeline.
 *
 * Copy this file, rename it, and calibrate the caps against YOUR corpus before
 * relying on it. The values here match audit-style.mjs defaults (this site's
 * calibration) so both files document the same starting point.
 *
 * Usage: node audit-style.mjs draft.md -c ./extended-mind.config.mjs
 *        (or rename the file; the -c path is what matters)
 */

export const config = {
  caps: {
    // severity: 'fail' | 'warn' | 'off'
    emDashes: { severity: 'fail' },
    encoding: { severity: 'fail' },
    anaphoricTriads: { cap: 1, window: 1200, severity: 'fail' },
    totalTriads: { cap: 9, window: 1200, severity: 'warn' },
    quarantine: { severity: 'fail' },
    shortRun: { maxWords: 8, warnAt: 4, failAt: 5 },
    thisOpeners: { cap: 1, window: 500, severity: 'fail' },
    cheapTransitions: { cap: 1, window: 1000, severity: 'fail' },
    pivot: { cap: 1, window: 1500, severity: 'fail' },
    sentenceSd: { min: 5, tolerance: 0.05, severity: 'warn' },
    burstiness: { min: 1.9, minWords: 800, severity: 'fail' },
    glue: { cap: 6, minWords: 500, severity: 'warn' }
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
  masks: { blockQuotes: true, linkSpans: true, abbrElements: true, cliFlags: true },
  quarantine: {
    // Resolve relative to the directory you invoke node from.
    logPath: './style-audit.md',
    fallback: [],
    permits: {
      // DATA shape: phrase -> [{ when, then }] (see DEFAULT_PERMITS in audit-style.mjs).
      // Example: allow "leverage" only before tooling nouns.
      // leverage: [{ when: /tooling/i, then: /\bleverage\s+(the\s+)?existing\s+tooling\b/i }]
    }
  }
}

/*
 * If you want a stylometry sidecar for your own calibration workflow:
 *   node stylometry.mjs my-essays/ --corpus > my-fingerprint.json
 * and set caps accordingly (e.g. sentenceSd.min near the corpus sd's floor,
 * burstiness.min just under your corpus minimum).
 */
