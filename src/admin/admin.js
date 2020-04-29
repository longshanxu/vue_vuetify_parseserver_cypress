/*
 * @Author: song
 * @Date: 2019-11-18 18:35:10
 * @LastEditTime: 2020-04-23 11:25:06
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\admin.js
 */
import Vue from 'vue'
import Admin from './Admin.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(Admin)
}).$mount('#admin')
