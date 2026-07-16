import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { ignores: ["**/vite-env.d.ts"] },
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // TypeScript recommended + project overrides
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: true },
        },
      ],

      // React recommended + project overrides
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-bind": "error",
      "react/jsx-pascal-case": "error",

      // React Hooks recommended
      ...reactHooks.configs.recommended.rules,

      "no-console": "warn",
    },
  },
  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "tests/**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs["flat/react"].rules,
    },
  },
  {
    files: ["playwright.config.ts", "e2e/**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
];
