/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
    },
    ignores: ['dist/', 'node_modules/'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
];
