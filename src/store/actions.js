/*
 * @Author: song
 * @Date: 2019-11-15 13:50:40
 * @LastEditTime: 2019-11-25 17:01:17
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\src\store\actions.js
 */
import types from './mutation_types'

const actions = {
    //登录
    [types.SET_USERINFO_TOKEN](context,payload) {
      context.commit('SET_USERINFO_TOKEN',payload)
    },
}

export default actions;