/*
 * @Author: Json.Xu
 * @Date: 2020-03-09 14:06:19
 * @LastEditTime: 2020-06-30 19:48:55
 * @LastEditors: Json.Xu
 * @Description:
 * @FilePath: \vue_vuetify_parseserver\server\Cloud\cumputed.js
 */
// 计算概率 胜平负的概率，依赖返回率，凯利 大小球的概率，依赖返回率， 亚盘的概率，依赖返回率 最近战绩和历史战绩 赔率转换成概率公式 概率 = 1 /
// 赔率
// * 赔付率 凯利 = 赔率 * 平博概率 赔付率大于凯利指数后 就是赔付差 3%是可以接受范围

/**************
 *
 * 返还率   = 1/(1/胜赔+1/平赔+1/负赔)
 * 概率     = 1/赔率X返还率
 * 凯利指数 = 赔率X平均概率
 * 概率从某种意义上讲，就相当于投注的资金
 * 威廉和竞彩的三项数据差距 小的一面
 * 按5% 作为浮动机制
 *
 * **************/

const colors = require('colors');
const math = require('mathjs')

Parse
    .Cloud
    .define("cpu", async(request) => {

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var datetemp = year + "-" + month + "-" + day;
        if (month < 10) {
            datetemp = year + "-0" + month + "-0" + day;
        }

        datetemp = "2020-06-30"

        var tempMoney = Parse
            .Object
            .extend("Money");
        var query = new Parse.Query(tempMoney);
        query.equalTo("date", datetemp);
        query.ascending("matchTime") //matchTime
        query.limit(500);
        const items = await query.find();

        for (let index = 0; index < items.length; index++) {

            const element = items[index];
            let matchId = element.get('matchId');

            //if (matchId != "201576984") {     continue; }

            const OddsMoney = Parse
                .Object
                .extend("OddsMoney");

            const query = new Parse.Query(OddsMoney);

            query.equalTo("matchId", matchId);

            query.limit(1);

            const results = await query.first();

            if (results == undefined) {
                continue;
            }

            const home = element.get('home');
            const guest = element.get('guest');

            // 获取到赔率（odds），获取到概率(ratio),获取到返回率（returnRatio）,获取到凯利（kelly）
            // 以威廉的概率为基准线，进行第一轮的5%的浮动
            let finalitem = ['0%', '0%', '0%'];

            let weilianitem = results.get('weilian');

            // 过滤体彩
            // if (results.get('ticai') == undefined) {
            //     continue;
            // }
            if (weilianitem != undefined && weilianitem != null) {
                //带入威廉的概率
                finalitem = [weilianitem.ratio[0], weilianitem.ratio[1], weilianitem.ratio[2]];

            } else {
                console.log("缺少威廉数据");
            }

            // 进行第二轮bet365的5%的浮动

            let bet365item = results.get('bet365');

            if (bet365item != undefined && bet365item != null) {
                //如果威廉数据为空，带入bet365的数据
                if (weilianitem == undefined || weilianitem == null) {
                    //带入bet365的概率
                    finalitem = [bet365item.ratio[0], bet365item.ratio[1], bet365item.ratio[2]];
                }
            } else {
                console.log("缺少bet365的数据");
                continue;
            }

            console.log(element.get('league') + "----" + home + '  vs  ' + guest + "-----" + element.get('matchId') + "-----" + element.get('matchTime'));
            //进行第三轮bet10的5%的浮动
            let bet10item = results.get('bet10');

            if (bet10item != undefined && bet10item != null) {

                bet10item.returnRatio = math.format(bet10item.returnRatio.replace('%', '') / 100, 3);

                if (parseFloat(bet10item.returnRatio) > parseFloat(bet10item.kelly[0])) {
                    finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                } else {
                    finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                }

                if (parseFloat(bet10item.returnRatio) > parseFloat(bet10item.kelly[1])) {
                    finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                } else {
                    finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                }

                if (parseFloat(bet10item.returnRatio) > parseFloat(bet10item.kelly[1])) {
                    finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                } else {
                    finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                }
            }

            //进行第四轮体彩的5%浮动，体彩是换一种方式进行对比，本身因为大抽水，导致赔率偏低，但是又要符合市场规律，很可能是要做出赔率。
            let ticaiitem = results.get('ticai');

            if (ticaiitem != undefined && ticaiitem != null) {
                //算出差距
                let chaju0 = math.format(weilianitem.odds[0] - ticaiitem.odds[0], 3);
                let chaju1 = math.format(weilianitem.odds[1] - ticaiitem.odds[1], 3);
                let chaju2 = math.format(weilianitem.odds[2] - ticaiitem.odds[2], 3);

                if (chaju0 < 0) {
                    finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 10) + '%';
                    finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                    finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                }
                if (chaju1 < 0) {
                    finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                    finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 10) + '%';
                    finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                }
                if (chaju2 < 0) {
                    finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                    finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                    finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 10) + '%';
                }

                if (chaju0 > 0 && chaju1 > 0 && chaju2 > 0) {
                    if (chaju0 <= chaju1 || chaju0 <= chaju2) {
                        finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                    } else {
                        finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                    }
                    if (chaju1 <= chaju2 || chaju1 <= chaju0) {
                        finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                    } else {
                        finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                    }

                    if (chaju2 <= chaju1 || chaju2 <= chaju0) {
                        finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                    } else {
                        finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                    }

                }
            }

            console.log('结局:'.red + finalitem);

            //进行第5轮的5%的浮动，主要是针对平局进行处理。
            const HistoryMoney = Parse
                .Object
                .extend("HistoryMoney");

            const historyquery = new Parse.Query(HistoryMoney);

            historyquery.equalTo("matchId", matchId);

            historyquery.limit(1);

            const historyitems = await historyquery.first();

            let historylist = historyitems.get('againstlist')

            for (let index = 0; index < historylist.length; index++) {
                const element = historylist[index];
                if (element.matchTime > '2018-06-06') {
                    if (home == element.home && guest == element.guest) {
                        if (element.goal[0] > element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                        }
                        if (element.goal[0] == element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                        }
                        if (element.goal[0] < element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                        }
                    }
                    if (home == element.guest && guest == element.home) {
                        if (element.goal[0] < element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) + 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                        }
                        if (element.goal[0] == element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) + 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) - 5) + '%';
                        }
                        if (element.goal[0] > element.goal[1]) {
                            finalitem[0] = math.evaluate(parseFloat(finalitem[0].replace('%', '')) - 5) + '%';
                            finalitem[1] = math.evaluate(parseFloat(finalitem[1].replace('%', '')) - 5) + '%';
                            finalitem[2] = math.evaluate(parseFloat(finalitem[2].replace('%', '')) + 5) + '%';
                        }
                    }
                }

            }

            console.log('结局:'.red + finalitem);
            if (parseFloat(finalitem[1].replace('%', '')) >= 30 && parseFloat(finalitem[1].replace('%', '')) <= 40) {
                console.log('结局:'.green + "平\n");
            } else if (parseFloat(finalitem[0].replace('%', '')) <= parseFloat(-15) || parseFloat(finalitem[1].replace('%', '')) <= parseFloat(-15) || parseFloat(finalitem[2].replace('%', '')) <= parseFloat(-15)) {
                if (parseFloat(finalitem[0].replace('%', '')) <= -15) 
                    console.log("胜");
                if (parseFloat(finalitem[1].replace('%', '')) <= -15) 
                    console.log("平");
                if (parseFloat(finalitem[2].replace('%', '')) <= -15) 
                    console.log("负");
                }
            else {
                if (parseFloat(finalitem[0].replace('%', '')) >= parseFloat(finalitem[2].replace('%', ''))) {
                    console.log('结局:'.green + "胜\n");
                }
                if (parseFloat(finalitem[0].replace('%', '')) < parseFloat(finalitem[2].replace('%', ''))) {
                    console.log('结局:'.green + "负\n");
                }
            }

        }

    });

//console.log(math.format(1/3,2));