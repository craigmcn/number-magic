# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Narrative history of past features and fixes lives in [docs/HISTORY.md](docs/HISTORY.md), not here.
> That file isn't auto-loaded, so read it only when you need the "why" behind something not covered below.
>
> **When checkpointing a completed feature or fix:** append the dated write-up to `docs/HISTORY.md`. Only
> touch the sections below if the change affects them directly (a new module, a changed invariant, a new
> build step). This file describes _current state_, not a per-feature log.

## Commands

```bash
yarn dev              # Start dev server at http://localhost:3100
yarn build            # Type-check (tsc) then build to dist/
yarn build:netlify    # Build to netlify/ (root) and netlify/number-magic/ (GitHub Pages)
yarn preview          # Preview the production build locally
yarn lint             # ESLint check on src/, e2e/, and playwright.config.ts (no auto-fix — fails on any error)
yarn lint:fix         # ESLint with auto-fix on src/, e2e/, and playwright.config.ts
yarn format           # Prettier on the whole repo (format:check to verify only)
yarn test:e2e         # Playwright E2E tests (starts its own dev server)
```

**Tests:** Vitest + Testing Library. Run `yarn test` (watch), `yarn test:run` (single pass), or `yarn coverage` (coverage report).

Tests are co-located with components (`src/components/**/*.test.tsx`), hooks (`src/hooks/*.test.ts`) and utilities (`src/lib/index.test.ts`). Test environment setup lives in `tests/setup.ts`, which also clears `localStorage` after every test.

`vitest.config.ts` passes `--no-experimental-webstorage` to test workers: on Node 25+ Node's own `localStorage` global shadows jsdom's and is `undefined` without a backing file.

**E2E:** Playwright (`playwright.config.ts`), tests in `e2e/*.spec.ts`, excluded from Vitest's glob via `vitest.config.ts`'s `exclude`. Runs only in CI (`test.yml`), not pre-commit — browser install + startup is too slow for a hook.

## Status

The repo matches the standard baseline (Node 24, Yarn 4, Vite 8, TypeScript 5, ESLint 9 flat config, Vitest + Testing Library, Playwright, `test.yml` CI, branch protection). Open TODOs are tracked as issues in the [number-magic GitHub Project](https://github.com/users/craigmcn/projects/8).

## Architecture

This is a single-page React 19 + TypeScript app built with Vite 8. It implements a classic "number magic" card trick: the user picks a number 1–63 in their head; the app shows six cards and asks "is your number on this card?"; the sum of the first element of each "yes" card reveals the chosen number (binary representation). The cards can only add up to 63, so the range is 1–63, not 1–64.

**Core logic — `src/lib/` (all re-exported from `src/lib/index.ts`):**

- `NUMBERS`: Six arrays, each representing numbers with a specific bit set (bit 0 through bit 5).
- `DURATION`: CSS transition duration constant (450ms), shared between `App` and `NumberCard`.
- `game.ts`: `gameReducer` + `GameState`, a discriminated union on `phase: 'start' | 'card' | 'transitioning' | 'result'`. `current`/`remaining` exist only in the card phases, so there is no "empty card" state. The reducer is pure: actions that don't fit the current phase return the same state. `shuffle` (random sort keys) orders the deck, which is passed in with the `start` action so randomness stays out of the reducer.
- `tsconfig.json` enables `noUncheckedIndexedAccess`; the old design relied on an unchecked `array[0]` of an empty array to end the game.

**Data flow:**

1. `Start` prompts the user to begin.
2. `App` holds the game in `useReducer(gameReducer)`. An answer moves to `transitioning`; a single effect timer (cleared on cleanup) dispatches `advance` after `DURATION` (100ms on the last card), which shows the next card or the result.
3. `NumberCard` displays the current card; its overlay fades in while the phase is `transitioning`, and the yes/no buttons are disabled then.
4. After all cards, `Result` sums the collected magic numbers. In magic mode it reveals the number; with Magic off it shows the "yes" cards (`ResultGrid`) for the player to add up. If every answer was "no" it shows a "wasn't on any card" message in both modes.
5. `ResultGrid` shows only the "yes" cards, one `ResultCard` each.

**Settings — `src/hooks/useMagicMode.ts`:** the Magic setting (`true` = reveal the number) is stored under the namespaced `localStorage` key `number-magic:magic`, because every app on `craigmcn.com` shares one origin. Both `OffCanvas` (writes) and `Result` (reads) use this hook; `usehooks-ts` keeps the two in sync. It reads the old un-namespaced `manual` key once as a default.

**Component tree:**

- `Header` — nav bar with settings toggle.
- `OffCanvas` — settings panel (Magic switch, version display). Uses `react-transition-group` for animation and `usehooks-ts` `useOnClickOutside` to dismiss.
- `ErrorBoundary` — two instances only: one at the root (`index.tsx`) and one around the game area in `App`, whose `onReset` resets the game. `ErrorHandler` renders the message and a "Start over" button (`resetErrorBoundary`). No `onError`: React 19's `createRoot` already logs caught errors.
- `Switch` — controlled toggle switch (`checked` is required). Its styled slider covers the checkbox, so e2e tests click the label.
- `Logo` — SVG logo component.

**Styling:** Sass (SCSS modules per component + `src/styles/` for global variables and base styles). AlbertCSS served via CDN in `index.html`.

**ESLint + Prettier conventions to follow:**

- Config: `eslint.config.mjs` (ESLint 9 flat config). No `.eslintrc`.
- Formatting is handled by Prettier with all defaults (`.prettierrc` is `{}`: double quotes, semicolons, 2-space indent). Run `yarn format` to apply.
- ESLint handles code quality only — recommended rules from `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-testing-library` (test files only), plus:
  - Interfaces must be prefixed with `I` (e.g. `IOffCanvasProps`).
  - `react/jsx-no-bind` is enabled — don't pass inline arrow functions as JSX props; use `useCallback`.
  - `react/react-in-jsx-scope` is off — do not add `import React from 'react'` to new files.
  - `@typescript-eslint/member-ordering` is enabled — keep class/interface members in a consistent order.
  - `@typescript-eslint/no-explicit-any` is a warning — avoid `any`.

**React 19 note:** `useRef<T>(null)` now returns `RefObject<T | null>` (null is explicit in the type parameter). When passing a ref to a third-party hook that hasn't updated its types yet (e.g. `usehooks-ts` `useOnClickOutside`), a targeted cast to `RefObject<HTMLElement>` is acceptable.
