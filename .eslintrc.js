module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-memo', 'simple-import-sort', '@typescript-eslint'],
  rules: {
    'react-memo/require-memo': 'error',
    'react-memo/require-usememo': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  overrides: [
    {
      files: '*.spec.tsx',
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react-memo/require-usememo': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
