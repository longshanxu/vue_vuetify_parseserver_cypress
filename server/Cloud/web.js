/*
 * @Author: Json.Xu
 * @Date: 2020-02-28 13:29:07
 * @LastEditTime: 2023-06-30 20:17:16
 * @LastEditors: longshanxu 623119632@qq.com
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver_cypress\server\Cloud\web.js
 */

const init = require("./init");

Parse
    .Cloud
    .define("GetToday", async (request) => {

        try {
            if (request.params.date != "" && request.params.date != undefined && request.params.date != null) {
                var tempMoney = Parse.Object.extend("Money");
                var query = new Parse.Query(tempMoney);
                var datetemp = "2023-06-30";
                query.equalTo("date", datetemp);
                query.equalTo("date", request.params.date);
                query.notEqualTo("displayState", "完场")
                // query.equalTo("displayState", "完场")
                query.limit(500);
                query.ascending("matchTime") //matchTime,league
                const results = await query.find();


                let data = [];
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
                        sanhuxinli: element.attributes.sanhuxinli, //散户心理
                        yapanpankou1: element.attributes.yapanpankou1, //让球前
                        yapanpankou2: element.attributes.yapanpankou2, //让球后
                        newpankou: element.attributes.yapanpankou2, //让球后
                        qiushupankou1: element.attributes.qiushupankou1, //球数前
                        qiushupankou2: element.attributes.qiushupankou2, //球数后
                        newqiushu: element.attributes.qiushupankou2, //球数后
                        changguiqiushu: element.attributes.changguiqiushu, //常规球数
                        changguiyapan: element.attributes.changguiyapan, //常规让球
                        yapantouzhu: element.attributes.yapantouzhu, //亚盘投注
                        newyapantouzhu: element.attributes.yapantouzhu, //亚盘投注
                        qiushutouzhu: element.attributes.qiushutouzhu, //球数投注
                        newqiushutouzhu: element.attributes.qiushutouzhu, //球数投注
                        qiushuai: element.attributes.qiushuai, //球数AI
                        yapanai: element.attributes.yapanai, //亚盘AI
                        qiushuAll: element.attributes.qiushuAll,
                        liangduibisai: element.attributes.liangduibisai, //两队最近一场比赛
                        homezuijinbisai: element.attributes.homezuijinbisai, //主队最近一场比赛
                        guestzuijinbisai: element.attributes.guestzuijinbisai,//客队最近一场比赛
                        kailiresult: element.attributes.kailiresult, //凯利结果
                        ticairesult: element.attributes.ticairesult, //提赔结果，
                        kaijuresult: element.attributes.kaijuresult, 
                        liangduilishi: element.attributes.liangduilishi, //两队历史
                        touzhue:element.attributes.touzhue,//投注额
                        liangduiqiushu:element.attributes.liangduiqiushu,//两队球数
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


                let data = [];
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
                        // "test18": element.attributes.test18, //客队名称
                        "test19": element.attributes.test19, //客队名称
                        "test20": element.attributes.test20, //客队名称
                        "test21": element.attributes.test21, //客队名称
                        "test22": element.attributes.test22, //客队名称
                        "test23": element.attributes.test23, //客队名称
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
    .define("AsyncData", async (request) => {

        try {

            //先清除数据。
            init.clearAllData() ;
            setTimeout(() => {
                init.GetTodayMoney();
                setTimeout(() => {
                    // init.OneByOne();
                    init.GetDataByTen();
                }, 10000);
            }, 10000);

            //获取数据。
            return {
                code: 200,
                msg: "获取数据成功"
            }

        } catch (error) {
            return {
                code: 500,
                msg: "获取数据失败",
                data: error
            }
        }

    });


    Parse
    .Cloud
    .define("AsyncGameData", async (request) => {

        try {
            init.GetTodayMoney();


            //获取数据。
            return {
                code: 200,
                msg: "获取数据成功"
            }

        } catch (error) {
            return {
                code: 500,
                msg: "获取数据失败",
                data: error
            }
        }

    });
