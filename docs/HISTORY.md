# Number Magic — engineering history

Narrative log of past features and fixes, moved out of `CLAUDE.md` on 2026-10-08 so that file stays
current-state only. This file is **not** auto-loaded; read it when you need the "why" behind something
`CLAUDE.md` doesn't cover. Git log and PRs are the authoritative record either way.

## Modernization (2026-05-01)

The repo was brought up to the standard baseline: Node 24, Yarn 4, Vite 8, TypeScript 5, ESLint 9 flat
config, Vitest + Testing Library, `test.yml` CI, CLAUDE.md, branch protection.

**PR #12 follow-ups:**

- `.github/CODEOWNERS` added (`* @craigmcn`)
- Sass `@import` → `@use 'variables' as *`; deprecated `darken()`/`desaturate()`/`lighten()` replaced with `color.adjust()` from `sass:color`
- `userEvent.click` test added for the "Play again" button in `Result.test.tsx`
- README rewritten with end-user usage and developer sections

**Branch protection:**

- Required approvals: 0 → 1
- Owner bypass: `enforce_admins: false` (Craig can merge without a review)
- Dismiss stale reviews, require `test` status check, block force push + deletion

## Tooling roll-outs (2026-07-16)

- **GitHub Actions bump:** `actions/checkout` and `actions/setup-node` v4 → v7 in `.github/workflows/test.yml`.
- **Accessibility tooling:** `eslint-plugin-jsx-a11y` (flat config `recommended`) in `eslint.config.mjs`; `vitest-axe` with an axe smoke test in `App.test.tsx`, `toHaveNoViolations` registered in `tests/setup.ts`.
- **Playwright E2E:** `e2e/number-magic.spec.ts` drives the real app end to end against `yarn dev` via `webServer`. CI caches the Chromium install and runs `yarn test:e2e` after unit tests and build.

## Architect review and Magic-mode fixes (2026-10-08)

A full-codebase review produced issues #25–#34. The first batch:

- **Magic switch inverted (#25):** the "Magic" switch was bound to the stored `manual` flag, so it showed
  off in magic mode (present since OffCanvas was added). It's now bound to magic mode, and `Switch` is a
  controlled component.
- **One hook, namespaced key (#29):** `useMagicMode()` replaces the separate `useLocalStorage("manual")`
  / `useReadLocalStorage("manual")` calls. Every app on `craigmcn.com` shares one origin and one
  `localStorage`, so the key is now `number-magic:magic`; an existing `manual: true` choice carries over.
- **1–63, not 1–64 (#26):** 64 is on no card, so `Result` used to fake it with `magic || 64`. The start
  screen now says 1–63, and an all-"no" round shows "Your number wasn't on any card" in both modes.
- **Node 25+ `localStorage`:** Node's built-in Web Storage global shadows jsdom's and is `undefined`
  without `--localstorage-file`. Tests passed before only because `usehooks-ts` swallows storage errors.
  `vitest.config.ts` now passes `--no-experimental-webstorage` to workers.
