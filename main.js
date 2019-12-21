/*
 * @Author: Json.Xu
 * @Date: 2019-11-29 16:27:10
 * @LastEditTime: 2019-11-29 16:27:57
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify\main.js
 */
Parse
  .Cloud
  .define("getgamebytoday", (request, response) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var datetemp = year + "-" + month + "-" + day;
    if (month < 10) {
      datetemp = year + "-0" + month + "-" + day;
    }
});