

/*
 * @Author: Json.Xu
 * @Date: 2020-01-06 11:54:03
 * @LastEditTime: 2021-01-24 19:52:56
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
//https://vipc.cn/i/live/football/date/2021-01-24/prev
//https://vipc.cn/i/live/football/date/2021-01-24/next

Parse
    .Cloud
    .define("GetTodayMoney", async (request) => {

        GetTodayMoney();
    });

//获取历史数据 两队数据 主队最近数据 客队最近数据

Parse
    .Cloud
    .define("GetHistoryByID", async (request) => {


    });



//获取赔率 平均赔率 威廉 bet365 bet10 体彩  常用的4个赔率 

Parse
    .Cloud
    .define("GetOddsByID", async (request) => {


    });

//获取盘口 亚盘 大小球 bet365 bet10 常用的2个赔率
//https://vipc.cn/i/match/football/196814419/odds/pankou

Parse
    .Cloud
    .define("GetPankouByID", async (request) => {

    });

// https://vipc.cn/i/match/football/217731699
async function GetTodayMoney() {
    try {


        var datetemp = "2021-01-24";

        var tempMoney = Parse.Object.extend("Money");
        var query4 = new Parse.Query(tempMoney);
        query4.equalTo("date", datetemp);
        query4.limit(200);

        const results = await query4.find();

        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            await object.destroy();
        }
        // https://vipc.cn/i/live/football/date/today/next
        const options = {
            url: 'https://vipc.cn/i/live/football/date/2021-01-24/prev',
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
                        money.set("homeRank", temp.model.homeRank); //主队排名
                        money.set("guestRank", temp.model.guestRank); //客队排名
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
}

//获取竞彩热度

async function GetHistoryByID(matchId, datetemp, proxiedRequest) {
    try {

        var historyMoney = Parse.Object.extend("HistoryMoney");

        // 代理服务器

        const options = {
            url: 'https://vipc.cn/i/match/football/' + matchId + '/history',
            headers: {
                'User-Agent': 'request'
            },
            gzip: true,
        };

        proxiedRequest.get(options, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = await JSON.parse(body);
                let money = new historyMoney();
                money.set("date", datetemp);
                money.set("matchId", matchId); //全局唯一ID
                money.set("home", data.recent.home.summary); //主队历史记录
                money.set("guest", data.recent.guest.summary); //客队历史记录
                money.set("against", data.against.summary); //两队对比记录
                money.set("againstlist", data.against.list); //两队对比记录
                money.set("homelist", data.recent.home.list); //两队对比记录
                money.set("guestlist", data.recent.guest.list); //两队对比记录
                money.save();
            }
        }).on("error", function (err) {
            // console.log(err);
            if (matchId != null && matchId.length < 10) {

                if (count.indexOf(matchId) == -1) {
                    console.log("+++++++++++++++++++++++" + matchId);
                    count.push(matchId)
                }

            }
        })

    } catch (error) {
        return {
            code: 200,
            msg: "获取数据失败"
        }
    }
}

async function GetOddsByID(matchId, datetemp, proxiedRequest) {
    try {

        //清楚当天数据
        var OddsMoney = Parse.Object.extend("OddsMoney");


        const options = {
            url: 'https://vipc.cn/i/match/football/' + matchId + '/odds/euro',
            headers: {
                'User-Agent': 'request'
            },
            gzip: true
        };
        // httprequest(options, async function (error, response, body) {
        //     if (!error && response.statusCode == 200) {

        //     }
        // });

        proxiedRequest.get(options, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = await JSON.parse(body);
                let money = new OddsMoney();
                money.set("matchId", matchId);           //全局唯一ID

                money.set("date", datetemp);
                for (let index = 0; index < data.odds.length; index++) {
                    const element = data.odds[index];
                    if (element.companyName == "平均欧赔" || element.companyName == "竞彩" || element.companyName == "威廉希尔" || element.companyName == "Bet365" || element.companyName == "10BET") {

                        if (element.companyId == "") {
                            money.set("average", element);    //平均欧赔
                        }
                        if (element.companyId == "115") {
                            money.set("weilian", element);    //威廉
                        }
                        if (element.companyId == "281") {
                            money.set("bet365", element);    //bet365
                        }
                        if (element.companyId == "16") {
                            money.set("bet10", element);     //bet10
                        }
                        if (element.companyId == "-1") {
                            money.set("ticai", element);    //体彩
                        }

                    }

                }
                money.save();
            }
        }).on("error", function (err) {
            if (matchId != null && matchId.length < 10) {
                if (count.indexOf(matchId) == -1) {
                    console.log("++++++++++++++++++++++++++" + matchId);
                    count.push(matchId)
                }

            }
            // console.log(err);
        });



    } catch (error) {
        return {
            code: 200,
            msg: "获取数据失败"
        }
    }
}

async function GetPankouByID(matchId, datetemp, proxiedRequest) {
    try {

        var PankouMoney = Parse.Object.extend("PankouMoney");

        //重新获取当天数据
        // https://vipc.cn/i/match/football/205132990/odds/pankou/
        const options = {
            url: 'https://vipc.cn/i/match/football/' + matchId + '/odds/pankou',
            headers: {
                'User-Agent': 'request'
            },
            gzip: true
        };

        proxiedRequest.get(options, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = await JSON.parse(body);
                let money = new PankouMoney();
                money.set("matchId", matchId);           //全局唯一ID
                money.set("date", datetemp);
                //firstOdds,odds,firstPankou,pankou,firstReturnRatio,returnRatio //大小球一样
                for (let index = 0; index < data.asia.length; index++) {
                    const element = data.asia[index];
                    if (element.companyName == "Bet365" || element.companyName == "10BET" || element.companyName == "平博") {
                        if (element.companyId == "8") {
                            money.set("bet365pankou", element);    //bet365
                        }
                        if (element.companyId == "22") {
                            money.set("bet10pankou", element);     //bet10
                        }
                        if (element.companyId == "47") {
                            money.set("avgpankou", element);     //平博
                        }

                    }

                }

                for (let index = 0; index < data.dxq.length; index++) {
                    const element = data.dxq[index];
                    if (element.companyName == "Bet365" || element.companyName == "10BET" || element.companyName == "平博") {
                        if (element.companyId == "8") {
                            money.set("bet365qiu", element);    //bet365
                        }
                        if (element.companyId == "22") {
                            money.set("bet10qiu", element);     //bet10
                        }
                        if (element.companyId == "47") {
                            money.set("avgqiu", element);     //平博
                        }

                    }

                }
                money.save();

            }
        }).on("error", function (err) {
            if (matchId != null && matchId.length < 10) {
                if (count.indexOf(matchId) == -1) {
                    console.log("++++++++++++++++++++++++++++" + matchId);
                    count.push(matchId)
                }

            }
        });


    } catch (error) {
        return {
            code: 200,
            msg: "获取数据失败"
        }
    }

}


Parse
    .Cloud
    .define("clearAllData", async (request) => {
        clearAllData();
        // GetTodayMoney();
    })


async function clearAllData() {
    //清空比赛信息
    var datetemp = "2021-01-24";

    var OneResult = Parse.Object.extend("OneResult");
    var queryOneResult = new Parse.Query(OneResult);
    queryOneResult.equalTo("date", datetemp);
    queryOneResult.limit(300);

    const OneResultresults = await queryOneResult.find();

    for (var i = 0; i < OneResultresults.length; i++) {
        var object = OneResultresults[i];

        await object.destroy();
    }
    //清空其他信息

    var historyMoney = Parse.Object.extend("HistoryMoney");
    var query3 = new Parse.Query(historyMoney);
    query3.equalTo("date", datetemp);
    query3.limit(300);
    const finditems = await query3.find();

    for (let index = 0; index < finditems.length; index++) {
        const element = finditems[index];
        await element.destroy();
    }


    var OddsMoney = Parse.Object.extend("OddsMoney");
    var query2 = new Parse.Query(OddsMoney);
    query2.equalTo("date", datetemp);
    query2.limit(300);
    const finditems1 = await query2.find();

    for (let index = 0; index < finditems1.length; index++) {
        const element = finditems1[index];
        await element.destroy();
    }

    var PankouMoney = Parse.Object.extend("PankouMoney");
    var query1 = new Parse.Query(PankouMoney);
    query1.equalTo("date", datetemp);
    query1.limit(300);
    const results1 = await query1.find();
    for (var i = 0; i < results1.length; i++) {
        var object = results1[i];

        await object.destroy();
    }


}

//one by one 
Parse
    .Cloud
    .define("OneByOne", async (request) => {

        OneByOne();
    })

let count = [];
async function OneByOne() {
    count = [];
    console.clear();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var datetemp = year + "-" + month + "-" + day;
    if (month < 10) {
        datetemp = year + "-0" + month + "-0" + day;
    }

    datetemp = "2021-01-24"

    var tempMoney = Parse
        .Object
        .extend("Money");
    var query = new Parse.Query(tempMoney);
    query.equalTo("date", datetemp);
    query.notEqualTo("displayState", "完场")
    query.ascending("matchTime") //matchTime,league
    // query.greaterThan("matchTime",new Date());
    query.limit(500);
    const items = await query.find();
    let templength = items.length;

    const proxyHost = "forward.apeyun.com";
    const proxyPort = 9082;
    // 代理隧道验证信息
    const proxyUser = "2120101000101920323";
    const proxyPass = "Pi427XJyRbxMXuSA";

    const proxyUrl = "http://" + proxyUser + ":" + proxyPass + "@" + proxyHost + ":" + proxyPort;

    const proxiedRequest = httprequest.defaults({ 'proxy': proxyUrl });

    for (let index = 0; index < items.length; index++) {

        const element = items[index];
        let mamatchId = element.get('matchId');

        //每2秒 一条一条拿数据

        if (index == 0) {
            console.log("一共" + templength + "条数据");
        }

        setTimeout(() => {

            console.log("正在获取第" + index + "条数据");


            // GetHistoryByID(mamatchId, datetemp, proxiedRequest);

            // GetPankouByID(mamatchId,datetemp, proxiedRequest);  

            GetOddsByID(mamatchId, datetemp, proxiedRequest);

            if (index == templength - 1) {
                console.log("获取赔率数据完毕");

                for (let index = 0; index < items.length; index++) {

                    const element = items[index];
                    let mamatchId = element.get('matchId');

                    //每2秒 一条一条拿数据

                    if (index == 0) {
                        console.log("一共" + templength + "条数据");
                    }

                    setTimeout(() => {

                        console.log("正在获取第" + index + "条数据");


                        GetHistoryByID(mamatchId, datetemp, proxiedRequest);

                        // GetPankouByID(mamatchId,datetemp, proxiedRequest);  

                        // GetOddsByID(mamatchId,datetemp, proxiedRequest);  

                        if (index == templength - 1) {
                            console.log("获取历史数据完毕");

                            for (let index = 0; index < items.length; index++) {

                                const element = items[index];
                                let mamatchId = element.get('matchId');

                                //每2秒 一条一条拿数据

                                if (index == 0) {
                                    console.log("一共" + templength + "条数据");
                                }

                                setTimeout(() => {

                                    console.log("正在获取第" + index + "条数据");


                                    // GetHistoryByID(mamatchId, datetemp, proxiedRequest);

                                    GetPankouByID(mamatchId, datetemp, proxiedRequest);

                                    // GetOddsByID(mamatchId, datetemp, proxiedRequest);

                                    if (index == templength - 1) {
                                        console.log("获取盘口数据完毕");
                                    }

                                }, index * 1100);
                            }
                        }

                    }, index * 1100);

                }
            }

        }, index * 1100);


    }

    setTimeout(() => {
        if(count.length>0){

            console.log("执行遗漏的数据------------------");
            for (let index = 0; index < count.length; index++) {

                const element = items[index];
                let mamatchId = element;
        
                //每2秒 一条一条拿数据
        
                if (index == 0) {
                    console.log("一共" + count.length + "条数据");
                }
        
                setTimeout(() => {
        
                    console.log("正在获取第" + index + "条数据");
        
        
                    // GetHistoryByID(mamatchId, datetemp, proxiedRequest);
        
                    // GetPankouByID(mamatchId,datetemp, proxiedRequest);  
        
                    GetOddsByID(mamatchId, datetemp, proxiedRequest);
        
                    if (index == count.length - 1) {
                        console.log("获取赔率数据完毕");
        
                        for (let index = 0; index < count.length; index++) {
        
                            const element = count[index];
                            let mamatchId = element
        
                            //每2秒 一条一条拿数据
        
                            if (index == 0) {
                                console.log("一共" + count.length + "条数据");
                            }
        
                            setTimeout(() => {
        
                                console.log("正在获取第" + index + "条数据");
        
        
                                GetHistoryByID(mamatchId, datetemp, proxiedRequest);
        
                                // GetPankouByID(mamatchId,datetemp, proxiedRequest);  
        
                                // GetOddsByID(mamatchId,datetemp, proxiedRequest);  
        
                                if (index == count.length - 1) {
                                    console.log("获取历史数据完毕");
        
                                    for (let index = 0; index < count.length; index++) {
        
                                        const element = count[index];
                                        let mamatchId = element;
        
                                        //每2秒 一条一条拿数据
        
                                        if (index == 0) {
                                            console.log("一共" + count.length + "条数据");
                                        }
        
                                        setTimeout(() => {
        
                                            console.log("正在获取第" + index + "条数据");
        
        
                                            // GetHistoryByID(mamatchId, datetemp, proxiedRequest);
        
                                            GetPankouByID(mamatchId, datetemp, proxiedRequest);
        
                                            // GetOddsByID(mamatchId, datetemp, proxiedRequest);
        
                                            if (index == count.length - 1) {
                                                console.log("获取盘口数据完毕");
                                            }
        
                                        }, index * 1100);
                                    }
                                }
        
                            }, index * 1100);
        
                        }
                    }
        
                }, index * 1100);
        
        
            }
        }
    }, items.length * 3 * 1200);
}

module.exports = {
    OneByOne,
    clearAllData,
    GetTodayMoney
}

/******************************
 *
 * GetTodayMoney
 * GetHistoryByID
 * GetOddsByID
 * GetPankouByID
 * clearAllData
 *
 ******************************/
