/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime : 2020-01-06 15:08:29
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\init.js
 */
Parse
    .Cloud
    .define("hello", async(request) => {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var datetemp = year + "-" + month + "-" + day;
        if (month < 10) {
            datetemp = year + "-0" + month + "-0" + day;
        }
        return {
            code: 200,
            time :datetemp
        }
    });