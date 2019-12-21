/*
 * @Author: Json.Xu
 * @Date: 2019-11-12 17:51:18
 * @LastEditTime: 2019-11-29 14:13:09
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\vue.config.js
 */
const webpack = require("webpack");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
      '/kettyAPP/' :
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