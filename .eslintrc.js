/**
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    curly: 'off',
    'no-alert': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
      },
    ],
  },
};
