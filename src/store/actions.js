/*
 * @Author: song
 * @Date: 2019-11-15 13:50:40
 * @LastEditTime : 2019-12-30 18:00:47
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\src\store\actions.js
 */
import types from './mutation_types'

const actions = {
  //设置用户名和密码
  [types.SET_USER](context, payload) {
    context.commit('SET_USER', payload)
  },
  //设置阴影
  [types.SET_LOADING](context, payload) {
    context.commit('SET_LOADING', payload)
  },
  //设置提示框
  [types.SET_SNACKBAR](context, payload) {
    context.commit('SET_SNACKBAR', payload)
  },
  [types.SET_SNACKBARMSG](context, payload) {
    context.commit('SET_SNACKBARMSG', payload)
  },
}

export default actions;