# Number Magic

A classic number magic card trick, in your browser.

[craigmcn.com/number-magic](https://www.craigmcn.com/number-magic/)

[![Test](https://github.com/craigmcn/number-magic/actions/workflows/test.yml/badge.svg)](https://github.com/craigmcn/number-magic/actions/workflows/test.yml)

Think of a number between 1 and 63. The app shows you six cards and asks whether your number appears on each one. After all six cards, it reveals your number — the trick is pure binary arithmetic: each "yes" card contributes a power of 2, and their sum is your number.

The **Magic** switch in the menu (☰) is on by default and reveals your number. Switch it off and the app shows your "yes" cards instead, for you to add up yourself.

---

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) built with [Vite](https://vitejs.dev/)
- [Font Awesome](https://fontawesome.com/) for icons
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

## Testing

Vitest + Testing Library for component, hook and utility tests; Playwright for end-to-end tests.

```bash
yarn test        # watch mode
yarn test:run    # single pass
yarn coverage    # single pass with coverage report
yarn test:e2e    # Playwright end-to-end tests
```

## Deployment

Deployed on Netlify. `yarn build:netlify` builds the same app into two directories:

- `netlify/` — root deployment
- `netlify/number-magic/` — subdirectory deployment, served at [craigmcn.com/number-magic](https://www.craigmcn.com/number-magic/)
