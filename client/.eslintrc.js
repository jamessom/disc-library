module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'airbnb-base',
  ],
  plugins: ['vue', 'prettier'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
