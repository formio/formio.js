import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import mochaPlugin from "eslint-plugin-mocha";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  {
    ignores: [
      "dist/**/*",
      "lib/**/*",
      "coverage/**/*",
      ".github/**/*",
      "node_modules/**/*",
      "docs/**/*",
      "app/**/*",
      "_layouts/**/*",
      "resources/**/*",
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  mochaPlugin.configs.recommended,
  {
    rules: {
      "no-prototype-builtins": "off",
      "no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^ignore",
        },
      ],
    },
  },
];
