/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime: 2021-02-19 20:47:11
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\vue.config.js
 */

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ?
  //   '/' :
  //   '/'
  // ,
  publicPath: './',
  // lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap:false,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port:90, // 端口
    disableHostCheck: true,
    // inline:false
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // admin: 'src/admin/admin.js',
  }
}