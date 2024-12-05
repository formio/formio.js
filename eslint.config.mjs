import globals from 'globals';
import pluginJs from '@eslint/js';
import mochaPlugin from 'eslint-plugin-mocha';

export default [
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    languageOptions: { globals: { ...globals.browser } },
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
