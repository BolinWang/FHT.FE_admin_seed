// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'camelcase': [0, {
      'properties': 'always'
    }],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'space-before-function-paren': [2, 'never'],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
