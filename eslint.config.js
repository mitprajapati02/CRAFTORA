import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        allowImportExportEverywhere: true,
        requireConfigFile: false,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      'react': eslintPluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React & Hooks
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/no-danger': 'off',
      'react/prop-types': 'off',
      'react/no-array-index-key': 'off',
      'react/destructuring-assignment': 'off',
      'react/no-access-state-in-setstate': 'off',
      'react-hooks/exhaustive-deps': 'off',

      // Best Practices
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'eol-last': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'if', next: '*' },
      ],
      'no-console': 'warn',
      'linebreak-style': 'off',
      'no-alert': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
      'object-curly-newline': 'off',
      'class-methods-use-this': 'off',
      'no-underscore-dangle': 'off',
      'prefer-template': 'off',
      'import/no-unresolved': 'off',
      'import/no-cycle': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/alt-text': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
    },
  },
];
