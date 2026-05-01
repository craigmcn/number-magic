# Number Magic

A classic number magic card trick, in your browser.

[craigmcn.com/number-magic](https://www.craigmcn.com/number-magic/)

[![Test](https://github.com/craigmcn/number-magic/actions/workflows/test.yml/badge.svg)](https://github.com/craigmcn/number-magic/actions/workflows/test.yml)

Think of a number between 1 and 63. The app shows you six cards and asks whether your number appears on each one. After all six cards, it reveals your number — the trick is pure binary arithmetic: each "yes" card contributes a power of 2, and their sum is your number.

A **magic mode** toggle (via the settings panel ⚙) reveals the answer automatically; in **manual mode** you add up the "yes" cards yourself.

---

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) built with [Vite](https://vitejs.dev/)
- [Font Awesome](https://fontawesome.com/) for icons
- [AlbertCSS](https://albertcss.craigmcn.com/) for base styling
- [Sass](https://sass-lang.com/) (SCSS modules) for component styles

## Development

```bash
yarn install
yarn dev        # dev server at http://localhost:3100
yarn build      # type-check + build to dist/
yarn lint       # ESLint (read-only — fails on any error)
yarn lint:fix   # ESLint with auto-fix
yarn format     # Prettier
```

VS Code SDK integrations for ESLint and TypeScript are committed in `.yarn/sdks/` and configured in `.vscode/settings.json` — no extra setup needed.

## Testing

Vitest + Testing Library. 25 tests across component and utility tests.

```bash
yarn test        # watch mode
yarn test:run    # single pass
yarn coverage    # single pass with coverage report
```

## Deployment

Deployed on Netlify. The build outputs to two directories simultaneously:

- `dist/` — root deployment
- `dist/number-magic/` — subdirectory deployment at `/number-magic/` on the parent domain
