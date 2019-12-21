/*
 * @Author: your name
 * @Date: 2019-11-01 16:36:40
 * @LastEditTime: 2019-11-22 17:33:11
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \MOCH-VUE\src\vuex\test_vuex.js
 */
import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations';
import actions from './actions';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const state = {
  userInfo : "",
}
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  strict: process.env.NODE_ENV !== 'production', //非开发环境不启用,任何不是以mutations触发的状态的变更,都会有警告
  plugins: [createPersistedState()]
})

export default store