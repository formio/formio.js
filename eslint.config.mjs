import globals from 'globals';
import pluginJs from '@eslint/js';
import mochaPlugin from 'eslint-plugin-mocha';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'lib',
      'build',
      'coverage',
      'docs',
      '_layouts',
      '_site',
      '.circleci',
      '.github',
      '.husky',
      '.jekyll-cache',
      '.nyc_output',
      '.vscode',
    ],
  },
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node, global: 'writable' } },
  },
  pluginJs.configs.recommended,
  mochaPlugin.configs.flat.recommended,
  {
    rules: {
      'no-prototype-builtins': 'off',
      'no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^ignore' },
      ],
    },
  },
];
