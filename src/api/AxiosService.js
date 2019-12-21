/*
 * @Author: Json.Xu
 * @Date: 2019-11-14 20:27:02
 * @LastEditTime: 2019-11-28 10:19:47
 * @LastEditors: Json.Xu
 * @Description: 所有的调用接口的方法存放在此
 * @FilePath: \moch-vue\src\api\AxiosService.js
 */
import axios from "axios"
//import store from "../store/index"

const apiService =  axios.create({
    baseURL:'http://47.100.213.68:61088/monitorsDemo1118/',
    //withCredentials:true,
    headers: {

        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        //'Authorization':store.state.userInfo
    },

});


apiService.interceptors.request.use(config => {
    // Do something before request is sent
    if (localStorage.getItem("user_token") != null) {
      config.headers['Authorization'] = localStorage.getItem("user_token")
    }
    return config
  }, error => {
    // Do something with request error
    //console.log(error) // for debug
    Promise.reject(error)
  })



export default{
    //登录
    setUserToken(){
        const params = new URLSearchParams();
        params.append('name', 'tdfsaa');
        params.append('password', '18786gd');
        return apiService.post("User/login",params)
    },
    getUserRole(){
     // console.log(apiService);
        const name = 'tdfsaa'
        return apiService.get("User/role"+"/"+name);
    },
    

}