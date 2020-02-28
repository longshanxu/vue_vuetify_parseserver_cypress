/*
 * @Author: Json.Xu
 * @Date: 2019-11-14 20:27:02
 * @LastEditTime: 2020-02-28 11:50:52
 * @LastEditors: Json.Xu
 * @Description: 所有的调用接口的方法存放在此
 * @FilePath: \vue_vuetify_parseserver\src\api\AxiosService.js
 */
import axios from "axios"

const apiService = axios.create({
  baseURL: 'http://localhost:8632/parse',
  headers: {

    'Accept': 'application/json',
    'X-Parse-REST-API-Key': "JsonRestKey",
    'X-Parse-Application-Id': "JsonApp"
    //'Content-Type': 'application/json'
    //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },

});


apiService.interceptors.request.use(config => {
  // Do something before request is sent
  // Show 

  store.dispatch("SET_LOADING", true)
  //console.log("axios:" + store.state.userInfo.token)
  if (localStorage.getItem("vuex") != null && store.state.user.token) {
    //config.withCredentials = true 
    config.headers['Authorization'] = store.state.user.token
  }
  return config
}, error => {
  // Do something with request error
  ////console.log(error) // for debug
  Promise.reject(error)
})

// 添加响应拦截器
apiService.interceptors.response.use(
  response => {
    store.dispatch("SET_LOADING", false)
    //401 为后台定义的无token的状态码,可定义成其他的
    if (response.data.code == "401") {
      // 清空stroe里的值

      let user = {
        role: "",
        userName: "",
        token: "",
        phone: ""
      };
      store.dispatch({
        type: "SET_USER",
        user
      }).then(() => {

        //这里需要拦截 其他请求 防止login 重复被replace
        if (router.currentRoute.fullPath.indexOf("login") < 0) {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })

        }
      }).catch();

    }

    if (response.data.code == "1") {
      const msg = response.data.msg;
      if (msg.indexOf("查询") < 0) {
        store.dispatch("SET_SNACKBARMSG", msg)
        store.dispatch("SET_SNACKBAR", true)
      }


    }
    if (response.data.code == "0") {
      const msg = response.data.msg;
      if (msg.indexOf("查询") < 0) {
        store.dispatch("SET_SNACKBARMSG", msg)
        store.dispatch("SET_SNACKBAR", true)
      }
    }
    return response
  },
  error => {
    store.dispatch("SET_LOADING", false)
    return Promise.reject(error)
  }
)


export default {

  helloworld() {
    return apiService.post("/functions/hello");
  }

}