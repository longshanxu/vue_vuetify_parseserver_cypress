/*
 * @Author: song
 * @Date: 2019-11-15 13:50:40
 * @LastEditTime : 2020-01-02 13:32:14
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\src\store\mutations.js
 */
import types from './mutation_types'

const mutations = {
  //登录

  [types.SET_USER](state, payload) {

    state.user.name = payload.user.userName
    state.user.phone = payload.user.phone
    state.user.role = payload.user.role
    state.user.token = payload.user.token

  },
  [types.SET_LOADING](state, payload) {
    state.overlay = payload
  },
  [types.SET_SNACKBAR](state, payload) {
    state.snackbar = payload
  },
  [types.SET_SNACKBARMSG](state, payload) {
    state.snackbarmsg = payload
  }
}

export default mutations;