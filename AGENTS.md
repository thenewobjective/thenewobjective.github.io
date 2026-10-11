# Repository Agent Instructions

These instructions apply to all AI agents working in this repository (GitHub Copilot, Claude,
Cursor, and any other coding or writing assistant). Writing-process rules live in the
`extended-mind-writing` skill, not here; this file only names it.

## Which instructions win on conflict

1. Anything in the `extended-mind-writing` skill (`.github/skills/extended-mind-writing/`) overrides
   generic agent defaults and this file.
2. `AGENTS.md` (this file) overrides generic agent defaults.
3. If the user's explicit request in a conversation conflicts with the skill's rules, surface the
   conflict explicitly rather than silently choosing.

## Article writing

For any drafting or revising of essays, articles, or Markdown prose under `content/` or `.drafts/`,
open and follow the skill: `.github/skills/extended-mind-writing/SKILL.md`. It is the complete
procedure; this file adds nothing to it.

## Technical work (Nuxt 4 + Nuxt Content 3)

- This is a Nuxt 4 static site (`nuxt generate` output, GitHub Pages). Content lives in `content/`
  as Markdown with Nuxt Content front matter and MDC component syntax (`::prose-figure{...}`).
- Markdown files are wrapped at 120 characters (see `.vscode/settings.json` rulers and
  `.markdownlint.json`).
- Prefer ASCII punctuation in source files. No em dashes, smart quotes, or ellipsis characters.
- Run `npm run lint` and `npm run typecheck` after code changes.
- Do not commit to `main` without the user's explicit request; this deploys to production
  (GitHub Pages via `.github/workflows/deploy.yml`).
