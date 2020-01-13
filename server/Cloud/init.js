/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime : 2020-01-13 11:09:07
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\init.js
 */
const fs = require('fs');
Parse
    .Cloud
    .define("hello", async (request) => {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var datetemp = year + "-" + month + "-" + day;
        if (month < 10) {
            datetemp = year + "-0" + month + "-0" + day;
        }


        Parse.Cloud.httpRequest({
            url: 'https://image2.vipc.cn/vipc-sport/image/5b56a25bf98b90001070a198',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept-Encoding': 'gzip,deflate, br'
            },
            gzip: true

        }).then(function (httpResponse) {
            // success
            fs.exists(path, function (exists) {
                if (exists) {

                    let imageBuffer = httpResponse.buffer;
                    fs.writeFile("../../public/123.png", imageBuffer, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log('Saved success');
                    });
                    
                }
            });

            console.log(imageBuffer);
            
        }, function (httpResponse) {
            // error
            console.error('Request failed with response code ' + httpResponse.status);
        });

        return {
            code: 200,
            time: datetemp
        }
    });