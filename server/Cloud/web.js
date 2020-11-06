/*
 * @Author: Json.Xu
 * @Date: 2020-02-28 13:29:07
 * @LastEditTime: 2020-02-28 14:31:12
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\web.js
 */
Parse
    .Cloud
    .define("GetToday", async (request) => {

        try {
            if (request.params.date != "" && request.params.date != undefined && request.params.date != null) {
                var tempMoney = Parse.Object.extend("Money");
                var query = new Parse.Query(tempMoney);
                query.equalTo("date", request.params.date);
                query.limit(200);
                query.ascending("matchTime") //matchTime,league
                const results = await query.find();

               
                let data =[];
                for (let index = 0; index < results.length; index++) {
                    const element = results[index];
                    const temp = {
                        //"date": element.attributes.date,
                        //"dateDesc": element.attributes.dateDesc,
                        "matchId": element.attributes.matchId, //全局唯一ID
                        "home": element.attributes.home, //主队名称
                        "guest": element.attributes.guest, //客队名称
                        "league": element.attributes.league, //比赛名称
                        "matchTime": element.attributes.matchTime, //开赛日期
                        "homeScore": element.attributes.homeScore, //主队得分
                        "guestScore": element.attributes.guestScore, //客队得分
                        //"homeLogo": element.attributes.homeLogo, //主队logo
                        //"guestLogo": element.attributes.guestLogo, //客队logo
                        "displayState": element.attributes.displayState, //当前状态
                    }
                    data.push(temp);

                }
                return {
                    code: 200,
                    msg: "获取数据成功",
                    data: data
                }
            } else {
                return {
                    code: 500,
                    msg: "获取数据失败"
                }
            }

        } catch (error) {
            return {
                code: 500,
                msg: "获取数据失败"
            }
        }

    });


Parse
    .Cloud
    .define("GetResults", async (request) => {

        try {
            if (request.params.date != "" && request.params.date != undefined && request.params.date != null) {
                var tempMoney = Parse.Object.extend("OneResult");
                var query = new Parse.Query(tempMoney);
                query.equalTo("date", request.params.date);
                query.equalTo("matchId", request.params.matchId);
                query.limit(1);
                const results = await query.find();

               
                let data =[];
                for (let index = 0; index < results.length; index++) {
                    const element = results[index];
                    let temp = {
                        "date": element.attributes.date,
                        "matchId": element.attributes.matchId, //全局唯一ID
                        "home": element.attributes.home, //主队名称
                        "test1": element.attributes.test1, //客队名称
                        "test2": element.attributes.test2, //客队名称
                        "test3": element.attributes.test3, //客队名称
                        "test4": element.attributes.test4, //客队名称
                        "test5": element.attributes.test5, //客队名称
                        "test6": element.attributes.test6, //客队名称
                        "test7": element.attributes.test7, //客队名称
                        "test8": element.attributes.test8, //客队名称
                        "test9": element.attributes.test9, //客队名称
                        "test10": element.attributes.test10, //客队名称
                        "test11": element.attributes.test11, //客队名称
                        "test12": element.attributes.test12, //客队名称
                        "test13": element.attributes.test13, //客队名称
                        "test14": element.attributes.test14, //客队名称
                        "test15": element.attributes.test15, //客队名称
                        "test16": element.attributes.test16, //客队名称
                        "test17": element.attributes.test17, //客队名称
                        "test18": element.attributes.test18, //客队名称
                        "test19": element.attributes.test19, //客队名称
                        "test20": element.attributes.test20, //客队名称
                        "test21": element.attributes.test21, //客队名称
                        "test22": element.attributes.test22, //客队名称
                    }
                    data.push(temp);

                }
                return {
                    code: 200,
                    msg: "获取数据成功",
                    data: data
                }
            } else {
                return {
                    code: 500,
                    msg: "获取数据失败"
                }
            }

        } catch (error) {
            return {
                code: 500,
                msg: "获取数据失败"
            }
        }

    });
