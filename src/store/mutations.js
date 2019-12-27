/*
 * @Author: song
 * @Date: 2019-11-15 13:50:40
 * @LastEditTime : 2019-12-27 15:05:07
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\src\store\mutations.js
 */
import types from './mutation_types'
//import axios from 'axios'
import apiservices from '../api/AxiosService'

const mutations = {
    //登录
    [types.SET_USERINFO_TOKEN] (state, payload) {
      state.userInfo = payload.token
      localStorage.setItem('user_token', payload.token)
      apiservices.defaults.headers.common['Authorization'] = payload.token
    },
    
}

export default mutations;