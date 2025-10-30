import mochaPlugin from 'eslint-plugin-mocha';
import { config } from '@formio/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: [
      'dist/**/*',
      'lib/**/*',
      'coverage/**/*',
      '.github/**/*',
      'node_modules/**/*',
      'docs/**/*',
      'app/**/*',
      '_layouts/**/*',
      'resources/**/*',
    ],
  },
  ...config,
  mochaPlugin.configs.recommended,
  {
    rules: {
      'no-prototype-builtins': 'off',
    },
  },
];
