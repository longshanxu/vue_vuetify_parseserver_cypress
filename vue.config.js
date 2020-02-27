/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime: 2020-02-27 17:15:55
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
    port: 80, // 端口
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