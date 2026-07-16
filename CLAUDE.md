# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Start dev server at http://localhost:3100
yarn build            # Type-check (tsc) then build to dist/
yarn build:netlify    # Build to netlify/ (root) and netlify/number-magic/ (GitHub Pages)
yarn preview          # Preview the production build locally
yarn lint             # ESLint check on src/, e2e/, and playwright.config.ts (no auto-fix — fails on any error)
yarn lint:fix         # ESLint with auto-fix on src/, e2e/, and playwright.config.ts
yarn format           # Prettier on src/ and index.html
yarn test:e2e         # Playwright E2E tests (starts its own dev server)
```

**Tests:** Vitest + Testing Library. Run `yarn test` (watch), `yarn test:run` (single pass), or `yarn coverage` (coverage report).

Tests are co-located with components (`src/components/**/*.test.tsx`) and utilities (`src/lib/index.test.ts`). Test environment setup lives in `tests/setup.ts`.

**E2E:** Playwright (`playwright.config.ts`), tests in `e2e/*.spec.ts`, excluded from Vitest's glob via `vitest.config.ts`'s `exclude`. Runs only in CI (`test.yml`), not pre-commit — browser install + startup is too slow for a hook.

## Status

**Modernization: complete.** The repo matches the standard baseline (Node 24, Yarn 4, Vite 8, TypeScript 5, ESLint 9 flat config, Vitest + Testing Library, `test.yml` CI, CLAUDE.md, branch protection).

**PR #12 merged** (2026-05-01) — follow-up items:

- `.github/CODEOWNERS` added (`* @craigmcn`)
- Sass `@import` → `@use 'variables' as *`; deprecated `darken()`/`desaturate()`/`lighten()` replaced with `color.adjust()` from `sass:color`
- `userEvent.click` test added for the "Play again" button in `Result.test.tsx`
- README rewritten with end-user usage and developer sections

**Branch protection** (2026-05-01):

- Required approvals: 0 → 1
- Owner bypass: `enforce_admins: false` (Craig can merge without a review)
- Dismiss stale reviews, require `test` status check, block force push + deletion

Open TODOs tracked as issues in the [number-magic GitHub Project](https://github.com/users/craigmcn/projects/8).

**GitHub Actions bump** (2026-07-16): `actions/checkout` and `actions/setup-node` bumped from v4 to v7 in `.github/workflows/test.yml`.

**Accessibility tooling** (2026-07-16): `eslint-plugin-jsx-a11y` (flat config `recommended`) added to `eslint.config.mjs`; `vitest-axe` added with an axe smoke test in `App.test.tsx` and the `toHaveNoViolations` matcher registered in `tests/setup.ts`.

**Playwright E2E** (2026-07-16): `@playwright/test` added; `e2e/number-magic.spec.ts` drives the real app end to end (all-yes and all-no paths), run against `yarn dev` via `webServer` in `playwright.config.ts`. CI caches the Chromium install and runs `yarn test:e2e` after unit tests/build.

## Architecture

This is a single-page React 19 + TypeScript app built with Vite 8. It implements a classic "number magic" card trick: the user picks a number 1–63 in their head; the app shows six cards and asks "is your number on this card?"; the sum of the first element of each "yes" card reveals the chosen number (binary representation).

**Core logic — `src/lib/index.ts`:**

- `NUMBERS`: Six arrays, each representing numbers with a specific bit set (bit 0 through bit 5).
- `sliceRandomElement<T>`: Picks a random element from an array and returns both the element and the remaining array. Used to randomise card presentation order.
- `DURATION`: CSS transition duration constant (450ms), shared between `App` and `ResultGrid`.

**Data flow:**

1. `Start` prompts the user to begin.
2. `App` orchestrates state: `current` (card being shown), `numberArray` (remaining cards), `magic` (first element of each "yes" card).
3. `NumberCard` displays the current card and accepts yes/no input.
4. After all cards, `Result` sums the collected magic numbers to reveal the chosen number.
5. `ResultGrid` shows all six cards with the result highlighted.

**Component tree:**

- `Header` — nav bar with settings toggle.
- `OffCanvas` — settings panel (manual/magic mode toggle, version display). Uses `react-transition-group` for animation and `usehooks-ts` `useOnClickOutside` to dismiss.
- `ErrorBoundary` — wraps the app; `ErrorHandler` renders the fallback UI.
- `Switch` — accessible toggle switch component.
- `Logo` — SVG logo component.

**Styling:** Sass (SCSS modules per component + `src/styles/` for global variables and base styles). AlbertCSS served via CDN in `index.html`.

**ESLint + Prettier conventions to follow:**

- Config: `eslint.config.mjs` (ESLint 9 flat config). No `.eslintrc`.
- Formatting is handled by Prettier (`.prettierrc`): single quotes, semi-colons, 2-space indent. Run `yarn format` to apply.
- ESLint handles code quality only — recommended rules from `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-testing-library` (test files only), plus:
  - Interfaces must be prefixed with `I` (e.g. `IOffCanvasProps`).
  - `react/jsx-no-bind` is enabled — don't pass inline arrow functions as JSX props; use `useCallback`.
  - `react/react-in-jsx-scope` is off — do not add `import React from 'react'` to new files.
  - `@typescript-eslint/member-ordering` is enabled — keep class/interface members in a consistent order.
  - `@typescript-eslint/no-explicit-any` is a warning — avoid `any`.

**React 19 note:** `useRef<T>(null)` now returns `RefObject<T | null>` (null is explicit in the type parameter). When passing a ref to a third-party hook that hasn't updated its types yet (e.g. `usehooks-ts` `useOnClickOutside`), a targeted cast to `RefObject<HTMLElement>` is acceptable.
