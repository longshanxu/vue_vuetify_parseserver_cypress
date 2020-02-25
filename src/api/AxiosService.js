/*
 * @Author: Json.Xu
 * @Date: 2019-11-14 20:27:02
 * @LastEditTime : 2020-01-13 13:16:29
 * @LastEditors  : Json.Xu
 * @Description: 所有的调用接口的方法存放在此
 * @FilePath: \moch-vue\src\api\AxiosService.js
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



export default {

  helloworld() {
    return apiService.post("/functions/hello");
  }

}