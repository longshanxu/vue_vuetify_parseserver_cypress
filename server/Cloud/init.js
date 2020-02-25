/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime : 2020-01-06 15:08:29
 * @LastEditors  : Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\init.js
 */

//https://image2.vipc.cn/vipc-sport/image/5b56a240f98b90001070a124
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
      

        Parse
        .Cloud
        .httpRequest({
            url: 'https://image2.vipc.cn/vipc-sport/image/5b56a240f98b90001070a124',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept-Encoding': 'gzip,deflate, br'
            },
            gzip: true
        })
        .then(function (httpResponse) {
            let LiveGame = Parse.Object.extend("LiveGame");
            let live = new LiveGame();
            // httpResponse.data
            // console.log(httpResponse.data);
            live.set("date", datetemp);
            live.set("matchId", datetemp);
            live.set("home", datetemp);
            live.set("guest", datetemp);
            live.set("league", datetemp);
            live.set("matchTime", datetemp);
            live.set("homeScore", datetemp);
            live.set("guestScore", datetemp);
            live.set("homeLogo", datetemp);
            live.set("guestLogo", datetemp);
            live.set("date", datetemp);
            live.save();
            // response.success({"code": "200"});
        }, function (httpResponse) {
            // error
            // response.error('Request failed with response code ' + httpResponse.status);
        });

        return {
            code: 200,
            time :datetemp
        }

    });