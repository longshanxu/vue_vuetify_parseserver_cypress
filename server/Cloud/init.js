/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime: 2020-02-28 13:47:03
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\init.js
 */
const fs = require('fs');
const httprequest = require("request");

//https://image2.vipc.cn/vipc-sport/image/5b56a240f98b90001070a124
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
            // fs.exists(path, function (exists) {
            // if (exists) {

            let imageBuffer = httpResponse.buffer;
            fs.writeFile("./public/footballimg/123.png", imageBuffer, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('Saved success');
            });

            //     }
            // });

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


//https://vipc.cn/i/live/football/date/today/next
//https://vipc.cn/i/live/football/date/2020-02-27/next


Parse
    .Cloud
    .define("GetTodayMoney", async (request) => {
        try {
            const options = {
                url: 'https://vipc.cn/i/live/football/date/today/next',
                headers: {
                    'User-Agent': 'request'
                },
                gzip: true
            };


            httprequest(options, async function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let data = await JSON.parse(body);
                    for (let index = 0; index < data.items.length; index++) {
                        const element = data.items[index];

                        var tempMoney = Parse.Object.extend("Money");
                        var query = new Parse.Query(tempMoney);
                        query.equalTo("date", element.date);
                        query.limit(200);
                        const results = await query.find();
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];

                            await object.destroy();
                        }

                        for (let j = 0; j < element.matches.length; j++) {
                            const temp = element.matches[j];
                            let Todaymoney = Parse
                                .Object
                                .extend("Money");
                            let money = new Todaymoney();

                            money.set("date", element.date);
                            money.set("dateDesc", element.dateDesc);
                            money.set("matchId", temp.model.matchId); //全局唯一ID
                            money.set("home", temp.model.home); //主队名称
                            money.set("guest", temp.model.guest); //客队名称
                            money.set("league", temp.model.league); //比赛名称
                            money.set("matchTime", temp.model.matchTime); //开赛日期
                            money.set("homeScore", temp.model.homeScore); //主队得分
                            money.set("guestScore", temp.model.guestScore); //客队得分
                            money.set("homeLogo", temp.model.homeLogo); //主队logo
                            money.set("guestLogo", temp.model.guestLogo); //客队logo
                            money.set("displayState", temp.model.displayState); //当前状态
                            money.save();
                        }

                    }


                }
            });
            return {
                code: 200,
                msg: "获取数据成功"
            }

        } catch (error) {
            return {
                code: 200,
                msg: "获取数据失败"
            }
        }

    });


    
