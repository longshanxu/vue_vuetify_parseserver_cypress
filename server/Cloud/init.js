/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime: 2020-02-25 16:37:53
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\init.js
 */

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
        const options = {
            url: 'https://vipc.cn/i/live/football/date/today/next',
            headers: {
                'User-Agent': 'request'
            },
            gzip: true
        };
        httprequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let items = JSON.parse(body);
                //获取今天的数据，及明天的数据。
                //插入数据的时候，删除当天的数据
                //匹配字段
                //matchId  ID
                //home     主队名称
                //guest     客队名称
                //league    比赛名称
                //matchTime 开赛日期
                //homeScore 主队得分
                //guestScore    客队得分
                //homeLogo  主队logo
                //guestLogo 客队logo
                //displayState  当前状态
                return {
                    code: 200,
                    msg: "获取数据成功"
                }
            }else{
                return {
                    code: 200,
                    msg: "获取数据失败"
                }
            }
        });
      

    });