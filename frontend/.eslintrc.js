/* eslint-env node */
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest'
  ],
  'rules': {
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/prop-types': 0
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}