/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime : 2020-01-13 11:58:13
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\vue.config.js
 */
const webpack = require("webpack");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
      '/' :
      '/'
  ,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 80, // 端口
    proxy: 'http://localhost:8632',
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }
}