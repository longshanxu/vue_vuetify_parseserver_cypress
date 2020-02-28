/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime: 2020-02-28 14:19:18
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\vue.config.js
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
    port: 90, // 端口
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