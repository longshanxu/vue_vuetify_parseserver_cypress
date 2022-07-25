/*
 * @Author: Json.Xu
 * @Date: 2019-11-14 20:27:02
 * @LastEditTime: 2022-07-24 09:16:06
 * @LastEditors: Json.Xu
 * @Description: 所有的调用接口的方法存放在此
 * @FilePath: \vue_vuetify_parseserver\src\api\AxiosService.js
 */
import axios from "axios"
import store from "../store/index"
// import router from "../router/index.js"

const apiService = axios.create({
  // baseURL: 'http://qunji.shenzhuo.vip:12122/parse',
  baseURL: 'http://192.168.80.125/parse',
  headers: { 
    'X-Parse-Application-Id': "JsonApp",
    'X-Parse-REST-API-Key': "JsonRestKey"
  },
});

apiService.interceptors.request.use(config => {
  // Do something before request is sent
  // Show 
  store.dispatch("SET_LOADING", true)
  return config

}, error => {
  // Do something with request error
  //////console.log(error) // for debug
  Promise.reject(error)
})

// 添加响应拦截器
apiService.interceptors.response.use(
  response => {
    store.dispatch("SET_LOADING", false)
    // if (response.data.result.code == "200") {
    //   // const msg = response.data.result.msg;
    //   // store.dispatch("SET_SNACKBARMSG", msg)
    //   // store.dispatch("SET_SNACKBAR", true)
    // }
    // if (response.data.result.code == "500") {
    //   const msg = response.data.result.msg;
    //   store.dispatch("SET_SNACKBARMSG", msg)
    //   store.dispatch("SET_SNACKBAR", true)
    // }
    return response
  },
  error => {
    store.dispatch("SET_LOADING", false)
    return Promise.reject(error)
  }
)


export default {
  ///获取今日比赛数据
  GetToday(data) {
    return apiService.post("/functions/GetToday", data);
  },

  GetResults(data){
    return apiService.post("/functions/GetResults", data);
  },

  AsyncData(){
    return apiService.post("/functions/AsyncData");
  },


  cpu(){
    return apiService.post("/functions/cpu");
  }
}