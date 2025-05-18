import eslint from '@eslint/js';
import globals from 'globals';
import tseslint, { ConfigWithExtends } from 'typescript-eslint';
import eslintPrettier from 'eslint-plugin-prettier';
import importSort from 'eslint-plugin-simple-import-sort';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const ignores = [
  'dist',
  'build',
  '**/*.js',
  '**/*.mjs',
  '**/*.d.ts',
  'eslint.config.ts',
  'commitlint.config.js',
  'apps/frontend/monitor/src/components/ui/**/*',
  'packages/browser-utils/src/metrics/**/*',
];

const frontendMonitorConfig: ConfigWithExtends = {
  files: ['apps/frontend/monitor/**/*.{ts,tsx}'],
  ignores: ['apps/frontend/monitor/src/components/ui/**/*'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'error',
  },
};

const backendMonitorConfig: ConfigWithExtends = {
  files: ['apps/backend/**/*.ts'],
  languageOptions: {
    globals: {
      ...globals.node, // global
      ...globals.jest,
    },
    parser: tseslint.parser,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'error',
  },
};

module.exports = tseslint.config(
  {
    ignores,
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      prettier: eslintPrettier,
      'simple-import-sort': importSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  frontendMonitorConfig,
  backendMonitorConfig,
);
