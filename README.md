# number-magic
A magic number guessing game

Find it at [Number Magic](https://www.craigmcn.com/number-magic/)

---

## VS Code settings

I needed to set the following in `.vscode/settings.json` to ensure that ESLint was reporting issues in the *Problems*
tab. YMMV

```json
{
  ...,
  "eslint.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.nodePath": ".yarn/sdks",
  "eslint.packageManager": "yarn",
  "eslint.validate": [
    "html",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "eslint.runtime": $(nvm which current),
  ...
}
```

I also needed to run `yarn dlx @yarnpkg/sdks`, which was very much not obvious in any help I could find. I still don't know if it was in addition to `yarn dlx @yarnpkg/sdks vscode`.
