/*
 * @Author: song
 * @Date: 2019-11-18 18:35:10
 * @LastEditTime: 2023-04-10 20:48:56
 * @LastEditors: longshanxu 623119632@qq.com
 * @Description: 
 * @FilePath: \moch-vue\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vconsole from 'vconsole';
new Vconsole();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
