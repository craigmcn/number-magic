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

## Explicit game phase and error recovery (2026-10-08)

- **Game phase (#27):** `App` used `started`, `current`, `numberArray` and `loading`, and found out the game
  was over only because `sliceRandomElement([])` returned `undefined` typed as `number[]`. The card swap
  and the overlay were two independent timers with the same duration, and the swap timer was never cleared.
  Now a pure `gameReducer` with a discriminated `phase` drives everything from one cleared timer,
  `sliceRandomElement` is replaced by a pre-shuffled deck, and `noUncheckedIndexedAccess` is on (it flagged
  exactly the old bug).
- **Error boundaries (#32):** boundaries used to wrap leaves (one per result card) with none at the root
  and no way to recover. Now there's one at the root and one around the game area, with "Start over".

## Menu accessibility (2026-10-08)

- **#30:** the always-mounted, off-screen settings panel was keyboard-reachable while closed, had no
  Escape handling or focus management, and the menu button exposed no state. It's now `inert` while
  closed, a non-modal dialog labelled "Menu", focuses its close button on open, and returns focus to the
  menu button on Escape or close. Covered by unit tests, an axe check with the menu open, and an e2e
  keyboard walk-through (jsdom doesn't implement `inert`, so only Chromium proves the tab order).

## Type-check coverage and test hygiene (2026-10-08)

- **#28:** `tsconfig.json` only covered `src` and `tests`, so `e2e/` and the config files were never
  type-checked (`playwright.config.ts` didn't even compile without `@types/node`), and `tsconfig.node.json`
  was an orphan. Now a solution `tsconfig.json` references app and node projects, `yarn build` runs
  `tsc -b`, and `noUnusedLocals`/`noUnusedParameters` are on.
- **#33:** three tests used `/[/w]/` (a typo that matched only `/` or `w`); they now check for digits. The
  test asserting V8's `TypeError` text is gone. `NUMBERS` is generated from bit arithmetic (identical to the
  old 192-number table) and tested on the property the trick relies on. Dead `packages/template` exclude removed.

## Favicons (2026-10-08)

- **#31:** the repo had no `public/` folder, so its root-absolute icon links borrowed craigmcn.com's icons
  and 404'd on the Netlify deploys. The icons are now in `public/` (copied from craigmcn.com), with a
  manifest of our own (named, `#005b99` theme, relative icon paths). The `favicon-194x194.png` link was
  dropped: it 404s on craigmcn.com too. Checked against a served `yarn build:netlify` at `/` and
  `/number-magic/`: every icon link and manifest icon returns 200.
