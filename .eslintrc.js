/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime: 2019-11-20 21:14:14
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
    jquery:true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true,

      }
    }
  ]
}
