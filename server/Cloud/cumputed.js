/*
 * @Author: Json.Xu
 * @Date: 2020-03-09 14:06:19
 * @LastEditTime: 2023-08-11 10:59:51
 * @LastEditors: longshanxu 623119632@qq.com
 * @Description:
 * @FilePath: \vue_vuetify_parseserver_cypress\server\Cloud\cumputed.js
 */
// 计算概率 胜平负的概率，依赖返回率，凯利 大小球的概率，依赖返回率， 亚盘的概率，依赖返回率 最近战绩和历史战绩 赔率转换成概率公式 概率 = 1 /
// 赔率
// * 赔付率 凯利 = 赔率 * 平博概率 赔付率大于凯利指数后 就是赔付差 3%是可以接受范围

/**************
 *
 * 返还率   = 1/(1/胜赔+1/平赔+1/负赔)
 * 概率     = 1/赔率X返还率
 * 凯利指数调整 = 赔率/平均赔率*平均返回率
 * 概率从某种意义上讲，就相当于投注的资金
 * 威廉和竞彩的三项数据差距 小的一面
 * 按5% 作为浮动机制
 * 一场800，胜平负400，大小球300，，半场300，比分100
 *
 * **************/

const colors = require("colors");
const { Object } = require("core-js");
const e = require("express");
const es5 = require("mathjs");
const math = require("mathjs");

Parse.Cloud.define("cpu", async (request) => {
  console.clear();
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var datetemp = year + "-" + month + "-" + day;
  if (month < 10) {
    datetemp = year + "-0" + month + "-0" + day;
  }

  datetemp = "2023-08-11";

  var tempMoney = Parse.Object.extend("Money");
  var query = new Parse.Query(tempMoney);
  query.equalTo("date", datetemp);
  query.ascending("matchTime");
  // query.descending("updatedAt") //matchTime,league
  // query.greaterThan("matchTime",new Date());
  query.limit(500);
  const items = await query.find();

  var OneResult = Parse.Object.extend("OneResult");
  var queryOneResult = new Parse.Query(OneResult);
  queryOneResult.equalTo("date", datetemp);
  queryOneResult.limit(500);
  const OneResultresults = await queryOneResult.find();

  for (var i = 0; i < OneResultresults.length; i++) {
    var object = OneResultresults[i];

    await object.destroy();
  }

  for (let index = 0; index < items.length; index++) {
    const element = items[index];

    let OneResult = Parse.Object.extend("OneResult");
    let oneresult = new OneResult();

    oneresult.set("date", datetemp);

    let matchId = element.get("matchId");

    oneresult.set("matchId", matchId);

    // if (matchId != "358430709") { continue; }

    const OddsMoney = Parse.Object.extend("OddsMoney");

    const query = new Parse.Query(OddsMoney);

    query.equalTo("matchId", matchId);
    query.descending("updatedAt");
    query.limit(1);

    const results = await query.first();

    if (results == undefined) {
      continue;
    }

    const home = element.get("home");
    const guest = element.get("guest");

    oneresult.set("home", home);
    oneresult.set("guest", guest);

    // 获取到赔率（odds），获取到概率(ratio),获取到返回率（returnRatio）,获取到凯利（kelly）
    // 以威廉的概率为基准线，进行第一轮的5%的浮动
    let finalitem = ["0%", "0%", "0%"];
    let justitem = ["33%", "33%", "33%"];
    let ouzhuanya = finalitem;

    let weilianitem = results.get("weilian");

    // 过滤体彩 if (results.get('ticai') == undefined) {     continue; }
    // if (weilianitem != undefined && weilianitem != null) {
    //     //带入威廉的概率
    //     finalitem = [weilianitem.ratio[0], weilianitem.ratio[1], weilianitem.ratio[2]];
    //     ouzhuanya = [weilianitem.ratio[0], weilianitem.ratio[1], weilianitem.ratio[2]];
    //     justitem = [weilianitem.ratio[0], weilianitem.ratio[1], weilianitem.ratio[2]];

    // } else {

    //     console.log("缺少威廉数据");
    //     continue
    // }

    // 进行第二轮bet365的5%的浮动

    let bet365item = results.get("bet365");

    if (bet365item != undefined && bet365item != null) {
      //如果威廉数据为空，带入bet365的数据

      //带入bet365的概率
      finalitem = [
        bet365item.ratio[0],
        bet365item.ratio[1],
        bet365item.ratio[2],
      ];
      ouzhuanya = [
        bet365item.ratio[0],
        bet365item.ratio[1],
        bet365item.ratio[2],
      ];
      // justitem = [bet365item.ratio[0], bet365item.ratio[1], bet365item.ratio[2]];
    } else {
      if (bet365item == undefined || bet365item == null) {
        console.log("缺少bet365的数据");
        // continue;
        bet365item = weilianitem;
        if (weilianitem != undefined && weilianitem != null) {
          //带入威廉的概率
          finalitem = [
            weilianitem.ratio[0],
            weilianitem.ratio[1],
            weilianitem.ratio[2],
          ];
          ouzhuanya = [
            weilianitem.ratio[0],
            weilianitem.ratio[1],
            weilianitem.ratio[2],
          ];
          // justitem = [weilianitem.ratio[0], weilianitem.ratio[1], weilianitem.ratio[2]];
        } else {
          console.log("缺少威廉数据");
          continue;
        }
      }
    }

    console.log("开局====:".red + finalitem);

    element.set("kaijuresult", Object.assign([], finalitem));
    oneresult.set("test1", Object.assign([], finalitem));
    //新的方案。欧盘转亚盘

    //进行第三轮bet10的5%的浮动
    let bet10item = results.get("bet10");
    let averageitem = results.get("average");
    let kailiresult = [];
    if (bet10item != undefined && bet10item != null) {
      bet10item.returnRatio = math.format(
        bet10item.returnRatio.replace("%", "") / 100,
        3
      );

      //计算凯利  赔率/平均赔率*平均返回率
      const k1 = math.format(
        (bet10item.odds[0] / averageitem.odds[0]) *
          parseFloat(averageitem.returnRatio.replace("%", "") / 100),
        4
      );
      const k2 = math.format(
        (bet10item.odds[1] / averageitem.odds[1]) *
          parseFloat(averageitem.returnRatio.replace("%", "") / 100),
        4
      );
      const k3 = math.format(
        (bet10item.odds[2] / averageitem.odds[2]) *
          parseFloat(averageitem.returnRatio.replace("%", "") / 100),
        4
      );

      if (parseFloat(bet10item.returnRatio) > parseFloat(k1)) {
        kailiresult.push("胜");
      }

      if (parseFloat(bet10item.returnRatio) > parseFloat(k2)) {
        kailiresult.push("平");
      }

      if (parseFloat(bet10item.returnRatio) > parseFloat(k3)) {
        kailiresult.push("负");
      }
    }

    //进行第四轮体彩的5%浮动，体彩是换一种方式进行对比，本身因为大抽水，导致赔率偏低，但是又要符合市场规律，很可能是要做出赔率。
    let ticaiitem = results.get("ticai");

    // if (ticaiitem == undefined) {     continue; }

    console.log(
      element.get("league") +
        "----" +
        home +
        "(" +
        element.get("homeRank") +
        ")" +
        "  vs  " +
        guest +
        "(" +
        element.get("guestRank") +
        ")" +
        "-----" +
        element.get("matchId") +
        "-----" +
        element.get("matchTime")
    );

    oneresult.set("test2", [
      element.get("league"),
      home + "(" + element.get("homeRank") + ")",
      guest + "(" + element.get("guestRank") + ")",
      element.get("matchTime"),
    ]);

    console.log("凯利:".red + kailiresult);

    oneresult.set("test3", kailiresult);

    element.set("kailiresult", kailiresult);

    let ticairesult = [];
    if (
      ticaiitem != undefined &&
      ticaiitem != null &&
      weilianitem != undefined &&
      weilianitem != null
    ) {
      //算出差距
      let chaju0 = math.abs(
        math.format(weilianitem.odds[0] - ticaiitem.odds[0], 3)
      );
      let chaju1 = math.abs(
        math.format(weilianitem.odds[1] - ticaiitem.odds[1], 3)
      );
      let chaju2 = math.abs(
        math.format(weilianitem.odds[2] - ticaiitem.odds[2], 3)
      );

      // if (chaju0 >= 0 && chaju1 >= 0 && chaju2 >= 0) {
      if (chaju0 <= chaju1 || chaju0 <= chaju2) {
        ticairesult.push("胜");
      }
      if (chaju1 <= chaju2 || chaju1 <= chaju0) {
        ticairesult.push("平");
      }

      if (chaju2 <= chaju1 || chaju2 <= chaju0) {
        ticairesult.push("负");
      }

      // }

      console.log("体彩:".red + ticairesult);

      oneresult.set("test4", ticairesult);
    }

    element.set("ticairesult", ticairesult);

    //进行第5轮的5%的浮动，主要是针对平局进行处理。
    const HistoryMoney = Parse.Object.extend("HistoryMoney");

    const historyquery = new Parse.Query(HistoryMoney);

    historyquery.equalTo("matchId", matchId);
    historyquery.descending("updatedAt"); //matchTime,league
    historyquery.limit(1);

    const historyitems = await historyquery.first();

    if (historyitems == undefined) {
      continue;
    }

    let historylist = historyitems.get("againstlist");

    finalitem = ["33%", "33%", "33%"];
    let liangduibisai = [];
    let homevsguest = 0; //主队和客队各赢多少
    let guestvshome = 0; //主队和客队各赢多少

    for (let index = 0; index < historylist.length; index++) {
      const element = historylist[index];
      if (index == 0) {
        liangduibisai = [
          element.matchTime,
          element.home,
          element.guest,
          element.goal[0],
          element.goal[1],
          element.league,
        ];
      }
      if (index < 2) {
        if (home == element.home && guest == element.guest) {
          // historycount ++;
          if (element.goal[0] > element.goal[1]) {
            homevsguest++;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            homevsguest += 0.7;
            guestvshome += 0.7;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] < element.goal[1]) {
            guestvshome++;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
        if (home == element.guest && guest == element.home) {
          if (element.goal[0] < element.goal[1]) {
            homevsguest++;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            homevsguest += 0.7;
            guestvshome += 0.7;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] > element.goal[1]) {
            guestvshome++;
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
      } else {
        break;
      }
    }

    for (let index = 0; index < historylist.length; index++) {
      const element = historylist[index];

      if (index < 3) {
        if (home == element.home && guest == element.guest) {
          // historycount ++;
          if (element.goal[0] > element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) + 16) +
              "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) - 8) + "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) - 8) + "%";
          }
          if (element.goal[0] == element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) - 8) + "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) + 16) +
              "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) - 8) + "%";
          }
          if (element.goal[0] < element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) - 8) + "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) - 8) + "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
        if (home == element.guest && guest == element.home) {
          if (element.goal[0] < element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) + 16) +
              "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) - 8) + "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) - 8) + "%";
          }
          if (element.goal[0] == element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) - 8) + "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) + 16) +
              "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) - 8) + "%";
          }
          if (element.goal[0] > element.goal[1]) {
            justitem[0] =
              math.evaluate(parseFloat(justitem[0].replace("%", "")) - 8) + "%";
            justitem[1] =
              math.evaluate(parseFloat(justitem[1].replace("%", "")) - 8) + "%";
            justitem[2] =
              math.evaluate(parseFloat(justitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
      } else {
        break;
      }
    }

    element.set("liangduibisai", liangduibisai);
    oneresult.set("test24", liangduibisai);
    console.log("两队历史:".green + Object.assign([], justitem));
    element.set("liangduilishi", Object.assign([], justitem));
    oneresult.set("test5", Object.assign([], finalitem));

    //进行第6轮的5 % 的浮动，主要是针对最近状态进行处理。
    let homelist = historyitems.get("homelist");

    //获取两队历史比赛，时间，队伍，比分，类型。
    let homezuijinbisai = [];
    let guestzuijinbisai = [];
    for (let index = 0; index < homelist.length; index++) {
      const element = homelist[index];
      if (index == 0) {
        homezuijinbisai = [
          element.matchTime,
          element.home,
          element.guest,
          element.goal[0],
          element.goal[1],
          element.league,
        ];
      }
      if (index < 2) {
        if (home == element.home) {
          // homecount++;
          if (element.goal[0] > element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] < element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
        if (home == element.guest) {
          if (element.goal[0] < element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] > element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
        }
        // console.log( "----------"+finalitem)
      } else {
        break;
      }
    }
    element.set("homezuijinbisai", homezuijinbisai);
    oneresult.set("test25", homezuijinbisai);
    let guestlist = historyitems.get("guestlist");

    for (let index = 0; index < guestlist.length; index++) {
      const element = guestlist[index];
      if (index == 0) {
        guestzuijinbisai = [
          element.matchTime,
          element.home,
          element.guest,
          element.goal[0],
          element.goal[1],
          element.league,
        ];
      }
      if (index < 2) {
        if (guest == element.home) {
          if (element.goal[0] > element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] < element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
        }
        if (guest == element.guest) {
          // guestcount++;
          if (element.goal[0] < element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) + 16) +
              "%";
          }
          if (element.goal[0] == element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) - 8) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) + 16) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
          if (element.goal[0] > element.goal[1]) {
            finalitem[0] =
              math.evaluate(parseFloat(finalitem[0].replace("%", "")) + 16) +
              "%";
            finalitem[1] =
              math.evaluate(parseFloat(finalitem[1].replace("%", "")) - 8) +
              "%";
            finalitem[2] =
              math.evaluate(parseFloat(finalitem[2].replace("%", "")) - 8) +
              "%";
          }
        }
        // console.log( "+++++++++"+ finalitem);
      } else {
        break;
      }
    }

    element.set("guestzuijinbisai", guestzuijinbisai);
    oneresult.set("test26", guestzuijinbisai);

    console.log("散户心理:".red + finalitem);

    oneresult.set("test6", Object.assign([], finalitem));
    finalitem.push(element.get("homeRank") + "~" + element.get("guestRank"));
    let temparray = finalitem;
    element.set("sanhuxinli", temparray);

    if (bet365item != null && bet365item != undefined) {
      console.log(
        "投注额:" +
          math.format(
            bet365item.odds[0] * parseFloat(finalitem[0].replace("%", "")),
            3
          ) +
          "," +
          math.format(
            bet365item.odds[1] * parseFloat(finalitem[1].replace("%", "")),
            3
          ) +
          "," +
          math.format(
            bet365item.odds[2] * parseFloat(finalitem[2].replace("%", "")),
            3
          )
      );
      console.log(
        "赔率:" +
          bet365item.odds[0] +
          "," +
          bet365item.odds[1] +
          "," +
          bet365item.odds[2]
      );
      element.set("touzhue", [
        math.format(
          bet365item.odds[0] * parseFloat(finalitem[0].replace("%", "")),
          3
        ),
        math.format(
          bet365item.odds[1] * parseFloat(finalitem[1].replace("%", "")),
          3
        ),
        math.format(
          bet365item.odds[2] * parseFloat(finalitem[2].replace("%", "")),
          3
        ),
      ]);
      oneresult.set("test7", [
        math.format(
          bet365item.odds[0] * parseFloat(finalitem[0].replace("%", "")),
          3
        ),
        math.format(
          bet365item.odds[1] * parseFloat(finalitem[1].replace("%", "")),
          3
        ),
        math.format(
          bet365item.odds[2] * parseFloat(finalitem[2].replace("%", "")),
          3
        ),
      ]);
      oneresult.set("test8", bet365item.odds);
    }

    // 进行第7轮的50%的浮动，主要是针对让球进行处理。让球为55开的几率，赢或者不赢，也有可能是走盘，走盘还是要看大小球
    const PankouMoney = Parse.Object.extend("PankouMoney");

    const pankoumoney = new Parse.Query(PankouMoney);

    pankoumoney.equalTo("matchId", matchId);
    pankoumoney.descending("updatedAt"); //matchTime,league
    pankoumoney.limit(1);

    const pankoumoneyitem = await pankoumoney.first();
    let yapanitem = ["0%", "0%"];
    let qiuitem = ["0%", "0%"];
    let homeqiushu = 0; //主队进球数
    let guestqiushu = 0; //客队进球数
    let homezuijinqiushu = 0; //主队最近进球数
    let guestzuijinqiushu = 0; //客队最近进球数
    let homehistoryqiushu = 0; //主队历史主场作战能力
    let guesthistoryqiushu = 0; //客队历史客场作战能力
    let homelianying = 0; //主队连赢
    let guestlianying = 0; //客队连赢

    if (pankoumoneyitem != undefined && pankoumoneyitem != null) {
      const bet365pankou = pankoumoneyitem.get("bet365pankou");
      const bet10pankou = pankoumoneyitem.get("bet10pankou");
      const bet365qiu = pankoumoneyitem.get("bet365qiu");
      const bet10qiu = pankoumoneyitem.get("bet10qiu");

      //两队历史来增加亚盘的让球性,二场比赛的球数，
      //主队的总进球+客队的总进球。主队的丢球+客队的丢球。
      //两队历史球数对拼

      for (let index = 0; index < historylist.length; index++) {
        const element = historylist[index];
        if (index < 2) {
          if (home == element.home && guest == element.guest) {
            homeqiushu += element.goal[0];
            guestqiushu += element.goal[1];
          }
          if (home == element.guest && guest == element.home) {
            homeqiushu += element.goal[1];
            guestqiushu += element.goal[0];
          }
        } else {
          break;
        }
      }

      for (let index = 0; index < historylist.length; index++) {
        const element = historylist[index];

        if (home == element.home && guest == element.guest) {
          homehistoryqiushu += element.goal[0];
          guesthistoryqiushu += element.goal[1];
          break;
        }
      }

      //降盘是为了能 更容易的买大球，升盘，为了更容易的买小球

      //主队最近进球数。
      //主队最近丢球，客队最近丢球。
      let homediuqiu = 0;
      let guestdiuqiu = 0;

      for (let index = 0; index < homelist.length; index++) {
        const element = homelist[index];
        if (index < 2) {
          if (home == element.home) {
            homezuijinqiushu += element.goal[0];
            homediuqiu += element.goal[1];
            if (element.goal[0] > element.goal[1]) {
              homelianying++;
            }
            if (element.goal[0] == element.goal[1]) {
              homelianying += 0.7;
            }
          }
          if (home == element.guest) {
            homezuijinqiushu += element.goal[1];
            homediuqiu += element.goal[0];
            if (element.goal[0] < element.goal[1]) {
              homelianying++;
            }
            if (element.goal[0] == element.goal[1]) {
              homelianying += 0.7;
            }
          }
        } else {
          break;
        }
      }

      //客队最近进球数。
      for (let index = 0; index < guestlist.length; index++) {
        const element = guestlist[index];
        if (index < 2) {
          if (guest == element.home) {
            guestzuijinqiushu += element.goal[0];
            guestdiuqiu += element.goal[1];
            if (element.goal[0] > element.goal[1]) {
              guestlianying++;
            }
            if (element.goal[0] == element.goal[1]) {
              guestlianying += 0.7;
            }
          }
          if (guest == element.guest) {
            guestzuijinqiushu += element.goal[1];
            guestdiuqiu += element.goal[0];
            if (element.goal[0] < element.goal[1]) {
              guestlianying++;
            }
            if (element.goal[0] == element.goal[1]) {
              guestlianying += 0.7;
            }
          }
        } else {
          break;
        }
      }

      //获取主队最多进球数及近10场总进球数
      let homezuidajinqiushu = 0;
      let home10jinqiu = 0;
      let home10diuqiu = 0;

      let home5jinqiu = 0;
      let home5zuidajinqiu = 0;

      for (let index = 0; index < homelist.length; index++) {
        const element = homelist[index];
        if (index < 4) {
          if (home == element.home) {
            home10jinqiu += element.goal[0];
            home10diuqiu += element.goal[1];
            if (homezuidajinqiushu < element.goal[0]) {
              homezuidajinqiushu = element.goal[0];
            }
          }
          if (home == element.guest) {
            home10jinqiu += element.goal[1];
            home10diuqiu += element.goal[0];
            if (homezuidajinqiushu < element.goal[1]) {
              homezuidajinqiushu = element.goal[1];
            }
          }
        }
        if (index < 5) {
          if (home == element.home) {
            home5jinqiu += element.goal[0];
            if (home5zuidajinqiu < element.goal[0]) {
              home5zuidajinqiu = element.goal[0];
            }
          }
          if (home == element.guest) {
            home5jinqiu += element.goal[1];
            if (home5zuidajinqiu < element.goal[1]) {
              home5zuidajinqiu = element.goal[1];
            }
          }
        }
      }

      //获取主队最多进球数及近10场总进球数
      let guestzuidajinqiushu = 0;
      let guest10jinqiu = 0;
      let guest10diuqiu = 0;

      let guest5jinqiu = 0;
      let guest5zuidajinqiu = 0;
      for (let index = 0; index < guestlist.length; index++) {
        const element = guestlist[index];
        if (index < 4) {
          if (guest == element.home) {
            guest10jinqiu += element.goal[0];
            guest10diuqiu += element.goal[1];
            if (guestzuidajinqiushu < element.goal[0]) {
              guestzuidajinqiushu = element.goal[0];
            }
          }
          if (guest == element.guest) {
            guest10jinqiu += element.goal[1];
            guest10diuqiu += element.goal[0];
            if (guestzuidajinqiushu < element.goal[1]) {
              guestzuidajinqiushu = element.goal[1];
            }
          }
        }

        if (index < 5) {
          if (guest == element.home) {
            guest5jinqiu += element.goal[0];
            if (guest5zuidajinqiu < element.goal[0]) {
              guest5zuidajinqiu = element.goal[0];
            }
          }
          if (guest == element.guest) {
            guest5jinqiu += element.goal[1];
            if (guest5zuidajinqiu < element.goal[1]) {
              guest5zuidajinqiu = element.goal[1];
            }
          }
        }
      }

      //亚盘

      let temparray = [0, 0];
      if (
        bet365pankou != undefined &&
        bet10pankou != undefined &&
        bet365qiu != undefined &&
        bet10qiu != undefined
      ) {
        //firstOdds,odds,firstPankou,pankou,firstReturnRatio,returnRatio //大小球一样
        const pankou1 = parseFloat(changepankou(bet10pankou.firstPankou));
        const pankou2 = parseFloat(changepankou(bet10pankou.pankou));

        let bet10firstratio = math.format(
          bet10pankou.firstReturnRatio.replace("%", "") / 100,
          3
        );

        let bet10firstodds0 = parseFloat(bet10pankou.firstOdds[0]) + 1;
        let bet10firstodds1 = parseFloat(bet10pankou.firstOdds[1]) + 1;

        firstyapanitem = [
          math.format(bet10firstratio / bet10firstodds0, 2) * 100,
          math.format(bet10firstratio / bet10firstodds1, 2) * 100,
        ];

        // let bet365ratio = math.format(bet365pankou.returnRatio.replace('%', '') / 100, 3);

        let bet10ratio = math.format(
          bet10pankou.returnRatio.replace("%", "") / 100,
          3
        );

        let bet365odds0 = parseFloat(bet365pankou.odds[0]) + 1;
        let bet365odds1 = parseFloat(bet365pankou.odds[1]) + 1;

        let bet10odds0 = parseFloat(bet10pankou.odds[0]) + 1;
        let bet10odds1 = parseFloat(bet10pankou.odds[1]) + 1;

        yapanitem = [50, 50];

        //降返回率 是不打算赔付高概率的一面
        console.log(
          "亚盘初始概率:" +
            math.format(firstyapanitem[0], 2) +
            "%-" +
            firstyapanitem[1] +
            "%" +
            " <=> 盘口:" +
            pankou1 +
            "," +
            pankou2 +
            " 返回率:" +
            bet10firstratio +
            " => ".green +
            bet10ratio
        );

        // pankou2

        oneresult.set("test9", [
          math.format(firstyapanitem[0], 2),
          math.format(firstyapanitem[1], 2),
          pankou1,
          pankou2,
          bet10firstratio,
          bet10ratio,
          bet365pankou.odds,
          bet10pankou.odds,
          parseFloat(changepankou(bet365pankou.pankou)),
        ]);

        let x0 = math.abs(math.format(bet365odds0 - bet10odds0, 2));
        let x1 = math.abs(math.format(bet365odds1 - bet10odds1, 2));

        if (parseFloat(x0) > parseFloat(x1)) {
          //说明看好 右边
          yapanitem = [yapanitem[0] - 25, yapanitem[1] + 25];
        }

        if (parseFloat(x0) < parseFloat(x1)) {
          //说明看好 左边
          yapanitem = [yapanitem[0] + 25, yapanitem[1] - 25];
        }
        if (parseFloat(x0) == parseFloat(x1)) {
          if (bet365odds0 <= bet365odds1) {
            yapanitem = [yapanitem[0] + 25, yapanitem[1] - 25];
          } else {
            yapanitem = [yapanitem[0] - 25, yapanitem[1] + 25];
          }
        }

        //第七轮，第一次不变盘处理数据
        if (pankou1 == pankou2) {
          if (bet365odds0 <= bet365odds1) {
            yapanitem = [yapanitem[0] + 25, yapanitem[1] - 25];
          } else {
            yapanitem = [yapanitem[0] - 25, yapanitem[1] + 25];
          }
        }
        //降盘
        if (pankou1 > pankou2) {
          // yapanitem = [yapanitem[0] - 5, yapanitem[1] + 5];
          let chaibie = pankou1 - pankou2;
          let temp = math.abs(chaibie) / 0.25;
          yapanitem = [yapanitem[0] - temp * 25, yapanitem[1] + temp * 25];
        }
        //升盘
        if (pankou1 < pankou2) {
          // yapanitem = [yapanitem[0] + 5, yapanitem[1] - 5];
          let chaibie = pankou1 - pankou2;
          let temp = math.abs(chaibie) / 0.25;
          yapanitem = [yapanitem[0] + temp * 25, yapanitem[1] - temp * 25];
        }

        console.log(
          "亚盘AI概率:".white +
            yapanitem[0] +
            "%-" +
            yapanitem[1] +
            "%" +
            " <=> 盘口:".red +
            pankou1 +
            "," +
            pankou2
        );

        element.set("yapanpankou1", pankou1);
        element.set("yapanpankou2", pankou2);

        element.set("yapanai", [
          math.format(yapanitem[0], 2),
          math.format(yapanitem[1], 2),
        ]);

        oneresult.set("test10", [
          math.format(yapanitem[0], 2),
          math.format(yapanitem[1], 2),
          pankou1,
          pankou2,
        ]);

        //在这里转换欧盘概率。

        if (pankou2 > 0) {
          temparray[0] = parseFloat(ouzhuanya[0].replace("%", ""));
          temparray[1] =
            parseFloat(ouzhuanya[1].replace("%", "")) +
            parseFloat(ouzhuanya[2].replace("%", ""));

          let temp = (pankou2 / 0.25) * 4;

          //计算大于0，增加概率

          console.log(
            "欧盘转亚盘后的概率:".green +
              (temparray[0] + temp) +
              "%," +
              (temparray[1] - temp) +
              "%"
          );

          temparray = [temparray[0] + temp, temparray[1] - temp];
        }

        if (pankou2 == 0) {
          temparray[0] =
            parseFloat(ouzhuanya[0].replace("%", "")) +
            parseFloat(ouzhuanya[1].replace("%", ""));
          temparray[1] = parseFloat(ouzhuanya[2].replace("%", ""));

          console.log(
            "欧盘转亚盘后的概率:".green +
              temparray[0] +
              "%," +
              temparray[1] +
              "%"
          );

          // oneresult.set("test12", temparray);
        }

        if (pankou2 < 0) {
          temparray[0] =
            parseFloat(ouzhuanya[0].replace("%", "")) +
            parseFloat(ouzhuanya[1].replace("%", ""));
          temparray[1] = parseFloat(ouzhuanya[2].replace("%", ""));

          let temp = (math.abs(pankou2) / 0.25) * 4;

          //计算大于0，增加概率

          console.log(
            "欧盘转亚盘后的概率:".green +
              (temparray[0] - temp) +
              "%," +
              (temparray[1] + temp) +
              "%"
          );

          // oneresult.set("test13", [(temparray[0] - temp), (temparray[1] + temp)]);
          temparray = [temparray[0] - temp, temparray[1] + temp];
        }

        oneresult.set("test11", temparray);
      }

      //亚盘投注情况

      if (
        bet365pankou != undefined &&
        bet10pankou != undefined &&
        bet365qiu != undefined &&
        bet10qiu != undefined
      ) {
        //散户投注数据。

        let bet10odds0 = parseFloat(changeqiu(bet10qiu.firstPankou));
        let bet10odds1 = parseFloat(changeqiu(bet10qiu.pankou));

        let qiupan = bet10odds0;

        if (bet10odds1 - bet10odds0 > 0.25 || bet10odds1 - bet10odds0 < -0.25) {
          qiupan = bet10odds1;
        }

        const pankou1 = parseFloat(changepankou(bet10pankou.firstPankou));
        const pankou2 = parseFloat(changepankou(bet10pankou.pankou));

        let qiushupankou = pankou1;

        if (pankou2 - pankou1 > 0.25 || pankou2 - pankou1 < -0.25) {
          qiushupankou = pankou2;
        }

        let chaibieitem = [50, 50];

        let tempjiange = math.format(chaibieitem[1] / (qiupan / 0.25), 2);

        let chaibie1 =
          ((homeqiushu - guestqiushu) / 2 +
            (homezuijinqiushu - guestzuijinqiushu) / 2) /
            2 -
          qiushupankou;

        if (
          (((homeqiushu - guestqiushu) / 2 +
            (homezuijinqiushu - guestzuijinqiushu) / 2) /
            2 >
            0 &&
            qiushupankou < 0) ||
          (((homeqiushu - guestqiushu) / 2 +
            (homezuijinqiushu - guestzuijinqiushu) / 2) /
            2 <
            0 &&
            qiushupankou > 0)
        ) {
          chaibie1 =
            ((homeqiushu - guestqiushu) / 2 +
              (homezuijinqiushu - guestzuijinqiushu) / 2) /
              2 +
            qiushupankou;
        }

        if (chaibie1 < 0) {
          let temp = math.abs(chaibie1) / 0.25;

          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }

        if (chaibie1 > 0) {
          let temp = math.abs(chaibie1) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        let chaibie2 = (homeqiushu - guestqiushu) / 2 - qiushupankou;

        if (
          ((homeqiushu - guestqiushu) / 2 > 0 && qiushupankou < 0) ||
          ((homeqiushu - guestqiushu) / 2 < 0 && qiushupankou > 0)
        ) {
          chaibie2 = (homeqiushu - guestqiushu) / 2 + qiushupankou;
        }

        if (chaibie2 < 0) {
          let temp = math.abs(chaibie2) / 0.25;

          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }

        if (chaibie2 > 0) {
          let temp = math.abs(chaibie2) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        let chaibie3 =
          (homezuijinqiushu - guestzuijinqiushu) / 2 - qiushupankou;

        if (
          ((homezuijinqiushu - guestzuijinqiushu) / 2 > 0 &&
            qiushupankou < 0) ||
          ((homezuijinqiushu - guestzuijinqiushu) / 2 < 0 && qiushupankou > 0)
        ) {
          chaibie3 = (homezuijinqiushu - guestzuijinqiushu) / 2 - qiushupankou;
        }

        if (chaibie3 < 0) {
          let temp = math.abs(chaibie3) / 0.25;
          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }
        if (chaibie3 > 0) {
          let temp = math.abs(chaibie3) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        let chaibieitem1 = chaibieitem;

        let chabibie4 = (home10jinqiu - guest10jinqiu) / 4 - qiushupankou;

        if (
          ((home10jinqiu - guest10jinqiu) / 4 > 0 && qiushupankou < 0) ||
          ((home10jinqiu - guest10jinqiu) / 4 < 0 && qiushupankou > 0)
        ) {
          chabibie4 = (home10jinqiu - guest10jinqiu) / 4 + qiushupankou;
        }

        let chabibie5 = (home10diuqiu - guest10diuqiu) / 4 - qiushupankou;

        // if (((home10diuqiu - guest10diuqiu) / 4 > 0 && qiushupankou < 0) || ((home10diuqiu - guest10diuqiu) / 4 < 0 && qiushupankou > 0)) {
        //     chabibie5 = (home10diuqiu - guest10diuqiu) / 4 + qiushupankou;
        // }

        let chabibie6 =
          (home5jinqiu -
            home5zuidajinqiu -
            (guest5jinqiu - guest5zuidajinqiu)) /
            4 -
          qiushupankou;

        if (
          ((home5jinqiu -
            home5zuidajinqiu -
            (guest5jinqiu - guest5zuidajinqiu)) /
            4 >
            0 &&
            qiushupankou < 0) ||
          ((home5jinqiu -
            home5zuidajinqiu -
            (guest5jinqiu - guest5zuidajinqiu)) /
            4 <
            0 &&
            qiushupankou > 0)
        ) {
          chabibie6 =
            (home5jinqiu -
              home5zuidajinqiu -
              (guest5jinqiu - guest5zuidajinqiu)) /
              4 +
            qiushupankou;
        }

        if (chabibie4 < 0) {
          let temp = math.abs(chabibie4) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange,
            chaibieitem1[1] + temp * tempjiange,
          ];
        }
        if (chabibie4 > 0) {
          let temp = math.abs(chabibie4) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange,
            chaibieitem1[1] - temp * tempjiange,
          ];
        }

        if (chabibie5 > 0) {
          let temp = math.abs(chabibie5) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange,
            chaibieitem1[1] + temp * tempjiange,
          ];
        }
        if (chabibie5 < 0) {
          let temp = math.abs(chabibie5) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange,
            chaibieitem1[1] - temp * tempjiange,
          ];
        }

        if (chabibie6 < 0) {
          let temp = math.abs(chabibie6) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange,
            chaibieitem1[1] + temp * tempjiange,
          ];
        }
        if (chabibie6 > 0) {
          let temp = math.abs(chabibie6) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange,
            chaibieitem1[1] - temp * tempjiange,
          ];
        }

        console.log(
          "亚盘投注情况-----:" +
            math.format(chaibieitem[0], 2) +
            "%," +
            math.format(chaibieitem[1], 2) +
            "%"
        );

        // element.set('yapantouzhu', [math.format(chaibieitem1[0], 2), math.format(chaibieitem1[1], 2), math.format(chaibieitem1[0], 2), math.format(chaibieitem1[1], 2),(homeqiushu - guestqiushu),(homezuijinqiushu - guestzuijinqiushu),(home10jinqiu - guest10jinqiu),(home10diuqiu - guest10diuqiu),pankou1,pankou2]);
        // console.log([math.format(chaibieitem1[0], 2), math.format(chaibieitem1[1], 2), math.format(chaibieitem1[0], 2), math.format(chaibieitem1[1], 2),(homeqiushu - guestqiushu)/2,(homezuijinqiushu - guestzuijinqiushu)/2,(home10jinqiu - guest10jinqiu)/4,(home10diuqiu - guest10diuqiu)/4,pankou1,pankou2]);
        element.set("yapantouzhu", [
          math.format(chaibieitem1[0], 2),
          math.format(chaibieitem1[1], 2),
          math.format(chaibieitem1[0], 2),
          math.format(chaibieitem1[1], 2),
          (homeqiushu - guestqiushu) / 2,
          (homezuijinqiushu - guestzuijinqiushu) / 2,
          (home10jinqiu - guest10jinqiu) / 4,
          (home10diuqiu - guest10diuqiu) / 4,
          pankou1,
          pankou2,
          homehistoryqiushu,
          guesthistoryqiushu,
        ]);

        oneresult.set("test14", [
          math.format(chaibieitem[0], 2),
          math.format(chaibieitem[1], 2),
        ]);
      }

      //球数
      if (
        bet365pankou != undefined &&
        bet10pankou != undefined &&
        bet365qiu != undefined &&
        bet10qiu != undefined
      ) {
        //firstOdds,odds,firstPankou,pankou,firstReturnRatio,returnRatio //大小球一样
        const pankou1 = parseFloat(changeqiu(bet10qiu.firstPankou));
        const pankou2 = parseFloat(changeqiu(bet10qiu.pankou));

        let bet10firstratio = math.format(
          bet10qiu.firstReturnRatio.replace("%", "") / 100,
          3
        );

        let bet10firstodds0 = parseFloat(bet10qiu.firstOdds[0]) + 1;
        let bet10firstodds1 = parseFloat(bet10qiu.firstOdds[1]) + 1;

        // let bet365ratio = math.format(bet365qiu.returnRatio.replace('%', '') / 100, 3);

        let bet10ratio = math.format(
          bet10qiu.returnRatio.replace("%", "") / 100,
          3
        );

        let bet365odds0 = parseFloat(bet365qiu.odds[0]) + 1;
        let bet365odds1 = parseFloat(bet365qiu.odds[1]) + 1;

        let bet10odds0 = parseFloat(bet10qiu.odds[0]) + 1;
        let bet10odds1 = parseFloat(bet10qiu.odds[1]) + 1;

        qiuitem = [50, 50];

        firstqiuitem = [
          math.format(bet10firstratio / bet10firstodds0, 2) * 100,
          math.format(bet10firstratio / bet10firstodds1, 2) * 100,
        ];

        console.log(
          "球数初始概率:" +
            math.format(firstqiuitem[0], 2) +
            "%-" +
            firstqiuitem[1] +
            "%" +
            " <=> 盘口:" +
            pankou1 +
            "," +
            pankou2 +
            " 返回率:" +
            bet10firstratio +
            " => ".green +
            bet10ratio
        );

        oneresult.set("test15", [
          math.format(firstqiuitem[0], 2),
          math.format(firstqiuitem[1], 2),
          pankou1,
          pankou2,
          bet10firstratio,
          bet10ratio,
          bet365qiu.odds,
          bet10qiu.odds,
          parseFloat(changeqiu(bet365qiu.pankou)),
        ]);

        let x0 = math.abs(math.format(bet365odds0 - bet10odds0, 2));
        let x1 = math.abs(math.format(bet365odds1 - bet10odds1, 2));

        if (parseFloat(x0) > parseFloat(x1)) {
          //说明看好 右边
          qiuitem = [qiuitem[0] - 25, qiuitem[1] + 25];
        }

        if (parseFloat(x0) < parseFloat(x1)) {
          //说明看好 左边
          qiuitem = [qiuitem[0] + 25, qiuitem[1] - 25];
        }
        if (parseFloat(x0) == parseFloat(x1)) {
          if (bet365odds0 <= bet365odds1) {
            qiuitem = [qiuitem[0] + 25, qiuitem[1] - 25];
          } else {
            qiuitem = [qiuitem[0] - 25, qiuitem[1] + 25];
          }
        }

        //第七轮，第一次不变盘处理数据
        if (pankou1 == pankou2) {
          if (bet365odds0 <= bet365odds1) {
            qiuitem = [qiuitem[0] + 25, qiuitem[1] - 25];
          } else {
            qiuitem = [qiuitem[0] - 25, qiuitem[1] + 25];
          }
        }

        //降盘
        if (pankou1 > pankou2) {
          let chaibie = pankou1 - pankou2;
          let temp = math.abs(chaibie) / 0.25;
          qiuitem = [qiuitem[0] - temp * 25, qiuitem[1] + temp * 25];
        }
        //升盘
        if (pankou1 < pankou2) {
          let chaibie = pankou1 - pankou2;
          let temp = math.abs(chaibie) / 0.25;
          qiuitem = [qiuitem[0] + temp * 25, qiuitem[1] - temp * 25];
        }

        console.log(
          "球数AI:".white +
            qiuitem[0] +
            "%-" +
            qiuitem[1] +
            "%" +
            " <=> 盘口:".red +
            pankou1 +
            "," +
            pankou2
        );

        element.set("qiushupankou1", pankou1);
        element.set("qiushupankou2", pankou2);

        oneresult.set("test16", [
          math.format(qiuitem[0], 2),
          math.format(qiuitem[1], 2),
          pankou1,
          pankou2,
        ]);

        element.set("qiushuai", [qiuitem[0], qiuitem[1]]);
      }

      //球数投注
      if (
        bet365pankou != undefined &&
        bet10pankou != undefined &&
        bet365qiu != undefined &&
        bet10qiu != undefined
      ) {
        // let bet365ratio = math.format(bet10qiu.returnRatio.replace('%', '') / 100, 3);

        let bet10odds0 = parseFloat(changeqiu(bet10qiu.firstPankou));
        let bet10odds1 = parseFloat(changeqiu(bet10qiu.pankou));

        let qiushupankou = bet10odds0;

        if (bet10odds1 - bet10odds0 > 0.25 || bet10odds1 - bet10odds0 < -0.25) {
          qiushupankou = bet10odds1;
        }

        // let chaibie = changguiqiushu - qiushupankou ;

        // let chaibieitem = [
        //     math.format(bet365ratio / bet365odds0, 2) * 100,
        //     math.format(bet365ratio / bet365odds1, 2) * 100
        // ]

        // console.log(chaibieitem);

        let chaibieitem = [50, 50];

        let tempjiange = math.format(
          chaibieitem[1] / (math.abs(qiushupankou) / 0.25),
          2
        );

        let shixiangailv = "";

        let chaibie2 = (homeqiushu + guestqiushu) / 2 - qiushupankou;

        let chaibie3 =
          (homezuijinqiushu + guestzuijinqiushu) / 2 - qiushupankou;

        let chabibie4 = (home10jinqiu + guest10jinqiu) / 4 - qiushupankou;

        let chabibie5 = (home10diuqiu + guest10diuqiu) / 4 - qiushupankou;

        let chabibie6 =
          (home5jinqiu + guest5jinqiu - home5zuidajinqiu - guest5zuidajinqiu) /
            4 -
          qiushupankou;

        console.log("==================", chabibie6);

        //判定拿小球算还是拿大球算

        if (historylist.length <= 1) {
          shixiangailv = "no@two";
        }

        shixiangailv +=
          (home5jinqiu + guest5jinqiu - home5zuidajinqiu - guest5zuidajinqiu) /
          4;

        if (chabibie6 > 0) {
          let temp = math.abs(chabibie6) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        if (chabibie4 > 0) {
          let temp = math.abs(chabibie4) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        if (chabibie5 > 0) {
          let temp = math.abs(chabibie5) / 0.25;
          chaibieitem = [
            chaibieitem[0] + temp * tempjiange,
            chaibieitem[1] - temp * tempjiange,
          ];
        }

        if (chabibie6 < 0) {
          let temp = math.abs(chabibie6) / 0.25;
          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }

        if (chabibie4 < 0) {
          let temp = math.abs(chabibie4) / 0.25;
          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }

        if (chabibie5 < 0) {
          let temp = math.abs(chabibie5) / 0.25;
          chaibieitem = [
            chaibieitem[0] - temp * tempjiange,
            chaibieitem[1] + temp * tempjiange,
          ];
        }

        let chaibieitem1 = chaibieitem;

        let tempjiange1 = tempjiange;

        let chaibie21 = (homeqiushu + guestqiushu) / 2 - qiushupankou;

        if (chaibie21 > 0) {
          let temp = math.abs(chaibie21) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange1,
            chaibieitem1[1] - temp * tempjiange1,
          ];
        }
        if (chaibie21 < 0) {
          let temp = math.abs(chaibie21) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange1,
            chaibieitem1[1] + temp * tempjiange1,
          ];
        }
        let chaibie31 =
          (homezuijinqiushu + guestzuijinqiushu) / 2 - qiushupankou;

        if (chaibie31 > 0) {
          let temp = math.abs(chaibie31) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange1,
            chaibieitem1[1] - temp * tempjiange1,
          ];
        }
        if (chaibie31 < 0) {
          let temp = math.abs(chaibie31) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange1,
            chaibieitem1[1] + temp * tempjiange1,
          ];
        }

        let chaibie41 =
          ((homezuijinqiushu + guestzuijinqiushu) / 2 +
            (homeqiushu + guestqiushu) / 2) /
            2 -
          qiushupankou;

        if (chaibie41 > 0) {
          let temp = math.abs(chaibie41) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] + temp * tempjiange1,
            chaibieitem1[1] - temp * tempjiange1,
          ];
        }
        if (chaibie41 < 0) {
          let temp = math.abs(chaibie41) / 0.25;
          chaibieitem1 = [
            chaibieitem1[0] - temp * tempjiange1,
            chaibieitem1[1] + temp * tempjiange1,
          ];
        }

        // shixiangailv += "==>" + math.format(chaibieitem1[0], 2) + "%~" + math.format(chaibieitem1[1], 2) + "%";

        console.log(
          "散户球数投注情况:" +
            "-------".yellow +
            math.format(chaibieitem[0], 2) +
            "%," +
            math.format(chaibieitem[1], 2) +
            "%"
        );
        element.set("qiushutouzhu", [
          math.format(chaibieitem[0], 2),
          math.format(chaibieitem[1], 2),
          shixiangailv,
          (home10diuqiu + guest10diuqiu) / 4,
          math.format(chaibieitem1[0], 2),
          math.format(chaibieitem1[1], 2),
        ]);
        oneresult.set("test17", [
          math.format(chaibieitem[0], 2),
          math.format(chaibieitem[1], 2),
        ]);
      }

      console.log(
        "两队历史记录球数：".red +
          homeqiushu +
          "  ,  " +
          guestqiushu +
          " 约 :  ".green +
          (homeqiushu + guestqiushu) / 2
      );
      console.log(
        "两队最近战绩球数：".red +
          homezuijinqiushu +
          "（" +
          homediuqiu +
          "）" +
          "  ,  " +
          guestzuijinqiushu +
          "（" +
          guestdiuqiu +
          "）" +
          " 约 :  " +
          (homezuijinqiushu + guestzuijinqiushu) / 2
      );
      // console.log("两队历史亚盘球数：".white + (homeqiushu + guestqiushu) / 2);
      // console.log("两队最近亚盘球数：".white + (homezuijinqiushu + guestzuijinqiushu) / 2);
      oneresult.set("test19", [
        homeqiushu,
        guestqiushu,
        (homeqiushu + guestqiushu) / 2,
      ]);
      oneresult.set("test20", [
        homezuijinqiushu + "（" + homediuqiu + "）",
        guestzuijinqiushu + "（" + guestdiuqiu + "）",
        (homezuijinqiushu + guestzuijinqiushu) / 2,
      ]);
      element.set("liangduiqiushu", [
        homezuijinqiushu +"-"+ homediuqiu ,
        guestzuijinqiushu +"-"+ guestdiuqiu ,
        homelianying,
        guestlianying,
        homevsguest,
        guestvshome,
      ]);

      console.log(
        "用户期望让球：".yellow +
          (homeqiushu - guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu - guestzuijinqiushu) / 2
      );
      element.set(
        "changguiyapan",
        (homeqiushu - guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu - guestzuijinqiushu) / 2
      );
      oneresult.set(
        "test22",
        (homeqiushu - guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu - guestzuijinqiushu) / 2
      );

      console.log(
        "用户期望球数：".yellow +
          (homeqiushu + guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu + guestzuijinqiushu) / 2
      );
      element.set(
        "changguiqiushu",
        (homeqiushu + guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu + guestzuijinqiushu) / 2
      );

      oneresult.set(
        "test21",
        (homeqiushu + guestqiushu) / 2 +
          " : " +
          (homezuijinqiushu + guestzuijinqiushu) / 2
      );

      console.log(
        "主客队十场数据：".white +
          home10jinqiu +
          " ( " +
          homezuidajinqiushu +
          " )" +
          " , " +
          guest10jinqiu +
          " ( " +
          guestzuidajinqiushu +
          " ) "
      );

      element.set("qiushuAll", [
        home10jinqiu,
        homezuidajinqiushu,
        guest10jinqiu,
        guestzuidajinqiushu,
        home10diuqiu,
        guest10diuqiu,
      ]);

      oneresult.set(
        "test23",
        home10jinqiu +
          " ( " +
          homezuidajinqiushu +
          " )" +
          " , " +
          guest10jinqiu +
          " ( " +
          guestzuidajinqiushu +
          " ) "
      );

      // console.log("两队历史亚盘让球：".white + (homeqiushu - guestqiushu) / 2);
    }

    console.log("\n");

    element.save();
    oneresult.save();
  }
});

//转换
function changepankou(temp) {
  if (temp == "平手") {
    return 0;
  } else if (temp == "平手/半球") {
    return 0.25;
  } else if (temp == "半球") {
    return 0.5;
  } else if (temp == "半球/一球") {
    return 0.75;
  } else if (temp == "一球") {
    return 1;
  } else if (temp == "一球/一球半") {
    return 1.25;
  } else if (temp == "一球半") {
    return 1.5;
  } else if (temp == "一球半/二球") {
    return 1.75;
  } else if (temp == "二球") {
    return 2;
  } else if (temp == "二球/二球半") {
    return 2.25;
  } else if (temp == "二球半") {
    return 2.5;
  } else if (temp == "二球半/三球") {
    return 2.75;
  } else if (temp == "三球") {
    return 3.25;
  } else if (temp == "三球/三球半") {
    return 3.25;
  } else if (temp == "三球半") {
    return 3.5;
  } else if (temp == "三球半/四球") {
    return 3.75;
  } else if (temp == "四球") {
    return 4;
  } else if (temp == "受平手") {
    return 0;
  } else if (temp == "受平手/半球") {
    return -0.25;
  } else if (temp == "受半球") {
    return -0.5;
  } else if (temp == "受半球/一球") {
    return -0.75;
  } else if (temp == "受一球") {
    return -1;
  } else if (temp == "受一球/一球半") {
    return -1.25;
  } else if (temp == "受一球半") {
    return -1.5;
  } else if (temp == "受一球半/二球") {
    return -1.75;
  } else if (temp == "受二球") {
    return -2;
  } else if (temp == "受二球/二球半") {
    return -2.25;
  } else if (temp == "受二球半") {
    return -2.5;
  } else if (temp == "受二球半/三球") {
    return -2.75;
  } else {
    console.log("没有匹配到亚盘盘口".red);
  }
}

function changeqiu(temp) {
  if (temp == "一球") {
    return 1;
  } else if (temp == "一球半") {
    return 1.5;
  } else if (temp == "一球半/二球") {
    return 1.75;
  } else if (temp == "二球") {
    return 2;
  } else if (temp == "二球/二球半") {
    return 2.25;
  } else if (temp == "二球半") {
    return 2.5;
  } else if (temp == "二球半/三球") {
    return 2.75;
  } else if (temp == "三球") {
    return 3;
  } else if (temp == "三球/三球半") {
    return 3.25;
  } else if (temp == "三球半") {
    return 3.5;
  } else if (temp == "三球半/四球") {
    return 3.75;
  } else if (temp == "四球") {
    return 4;
  } else if (temp == "四球/四球半") {
    return 4.25;
  } else if (temp == "四球半") {
    return 4.5;
  } else if (temp == "四球半/五球") {
    return 4.75;
  } else if (temp == "五球") {
    return 5;
  } else {
    console.log("没有匹配到大小球".red);
  }
}

///全量数据
Parse.Cloud.define("dodata", async () => {
  var Money = Parse.Object.extend("Money");
  var queryMoneyResult = new Parse.Query(Money);
  queryMoneyResult.ascending("matchTime");
  queryMoneyResult.limit(50000);
  const MoneyResult = await queryMoneyResult.find();
  let count = 0;
  var data = [];
  for (var i = 0; i < MoneyResult.length; i++) {
    var object = MoneyResult[i];
   
    if(object.get("liangduibisai") && object.get("liangduibisai").length > 0 && object.get("qiushutouzhu")  && object.get("qiushutouzhu")[2].indexOf("no@two") == -1 
    && object.get("yapanpankou2") != null &&  object.get("yapanpankou1") != null && object.get("qiushupankou1") != null && object.get("qiushupankou2") != null)
    {
      let AiDataObject = Parse.Object.extend("AiData");
      let AiData = new AiDataObject();

      AiData.set("home", object.get("home")); //主队
      AiData.set("guest", object.get("guest")); //客队
      AiData.set("league", object.get("league").indexOf(" ") > -1 ? object.get("league").split(" ")[1] : object.get("league"));  //联赛
      AiData.set("time", object.get("matchTime").substr(10, 6)); //比赛时间
      AiData.set("homeScore", object.get("homeScore")); //当前比赛 主队进球数
      AiData.set("guestScore", object.get("guestScore")); //当前比赛 客队进球数
      if(object.get("homeScore") == object.get("guestScore")){
        AiData.set("result", 0);
      }
      else if(object.get("homeScore") > object.get("guestScore")){
        AiData.set("result", 1);
      }
      else if(object.get("homeScore") < object.get("guestScore")){
        AiData.set("result", 2);
      }
      AiData.set("prevTime", object.get("liangduibisai")[0].toString().split(" ")[0]); //上一次比赛日期
      AiData.set("prevHomeName", object.get("liangduibisai")[1]); //上一次比赛 主队
      AiData.set("prevGuestName", object.get("liangduibisai")[2]); //上一次比赛 客队
      AiData.set("prevHomeNameScore", object.get("liangduibisai")[3]); //上一次比赛 主队进球数
      AiData.set("prevGuestNameScore", object.get("liangduibisai")[4]); //上一次比赛 客队进球数
      AiData.set("kailiforecast", object.get("kailiresult").join(",")); //凯利预测
      AiData.set("ticaiforecast", object.get("ticairesult").join(",")); //体彩预测
      AiData.set("homeRank", object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")); //主队排名
      AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")); //客队排名
      AiData.set("winTouzhuE", object.get("touzhue")[0]); //散户押注主胜的金额
      AiData.set("drawTouzhuE", object.get("touzhue")[1]); //散户押注平局的金额
      AiData.set("loseTouzhuE", object.get("touzhue")[2]); //散户押注客胜的金额
      AiData.set("sanhuWinXinli", object.get("sanhuxinli")[0].toString().replace("%","")); //散户感觉主胜心理
      AiData.set("sanhuDrawXinli", object.get("sanhuxinli")[1].toString().replace("%","")); //散户感觉平局心理
      AiData.set("sanhuLoseXinli", object.get("sanhuxinli")[2].toString().replace("%","")); //散户感觉客胜心理
      AiData.set("zhuangjiaWinXinli", object.get("kaijuresult")[0].toString().replace("%","")); //庄家开盘主胜概率
      AiData.set("zhuangjiaDrawXinli", object.get("kaijuresult")[1].toString().replace("%","")); //庄家开盘平局概率
      AiData.set("zhuangjiaLoseXinli", object.get("kaijuresult")[2].toString().replace("%","")); //庄家开盘客胜概率
      AiData.set("liangduiWinLishi", object.get("liangduilishi")[0].toString().replace("%","")); //两队历史主队概率
      AiData.set("liangduiDrawLishi", object.get("liangduilishi")[1].toString().replace("%","")); //两队历史平局概率
      AiData.set("liangduiLoseLishi", object.get("liangduilishi")[2].toString().replace("%","")); //两队历史客队概率
      AiData.set("lishirangqiu", object.get("changguiyapan").split(":")[0]); //两队历史让球
      AiData.set("zuijinrangqiu", object.get("changguiyapan").split(":")[1]); //两队最近让球
      AiData.set("lishiqiushu", object.get("changguiqiushu").split(":")[0]); //两队历史平均球数
      AiData.set("zuijinqiushu", object.get("changguiqiushu").split(":")[1]); //两队最近平均球数
      AiData.set("zuijinhomeqiushu",object.get("qiushuAll")[0]); //主队最近4场总进球数
      AiData.set("zuijinguestqiushu",object.get("qiushuAll")[2]); //客队最近4场总进球数
      AiData.set("zuijinhomemaxqiushu",object.get("qiushuAll")[1]); //主队最近4场最大进球数
      AiData.set("zuijinguestmaxqiushu",object.get("qiushuAll")[3]); //客队最近4场最大进球数
      AiData.set("zuijinhomediuqiushu",object.get("qiushuAll")[4]); //主队最近4场丢球数
      AiData.set("zuijinguestdiuqiushu",object.get("qiushuAll")[5]); //客队最近4场丢球数
      AiData.set("homehistoryscore",object.get("yapantouzhu")[10]); //主客历史主队主场进球数
      AiData.set("guesthistoryscore",object.get("yapantouzhu")[11]); //主客历史客队客场进球数
      AiData.set("fiveavgjinqiushu",object.get("qiushutouzhu")[2]); //主客最近5场平均进球数
      AiData.set("fouravgdiuqiushu",object.get("qiushutouzhu")[3]); //主客最近4场平均丢球数
      AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
      AiData.set("rangqiuqian",object.get("yapanpankou1")); //让球前
      AiData.set("rangqiuhou",object.get("yapanpankou2")); //让球后
      AiData.set("qiushuqian",object.get("qiushupankou1")); //球数盘口前
      AiData.set("qiushuhou",object.get("qiushupankou2")); //球数盘口后
      AiData.set("touzhuhomebili",object.get("yapantouzhu")[0]); //投注主队比例
      AiData.set("touzhuguestbili",object.get("yapantouzhu")[1]); //投注客队比例
      AiData.set("touzhudaqiubili",object.get("qiushutouzhu")[0]); //投注大球比例
      AiData.set("touzhuxiaoqiubili",object.get("qiushutouzhu")[1]); //投注小球比例
      AiData.set("homeprevbisaidate",object.get("homezuijinbisai")[0].toString().split(" ")[0]); //主队上一场比赛日期
      AiData.set("guestprevbisaidate",object.get("guestzuijinbisai")[0].toString().split(" ")[0]); //客队上一场比赛日期
      AiData.set("homeprevbisaiscore", object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]); //主队上一场比赛进球
      AiData.set("guestprevbisaiscore",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]); //客队上一场比赛进球
      AiData.set("homeprevbisaijiqiu",object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]); //主队上一场比赛丢球
      AiData.set("guestprevbisaijiqiu",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]); //客队上一场比赛丢球
      AiData.set("homeTwojinqiushu",object.get("liangduiqiushu")[0].toString().split("-")[0]); //主队最近2场进球数
      AiData.set("guestTwojinqiushu",object.get("liangduiqiushu")[1].toString().split("-")[0]); //客队最近2场进球数
      AiData.set("homeTwodiuqiushu",object.get("liangduiqiushu")[0].toString().split("-")[1]); //主队最近2场丢球数
      AiData.set("guestTwodiuqiushu",object.get("liangduiqiushu")[1].toString().split("-")[1]); //客队最近2场丢球数
      AiData.set("homeTwoshuying",object.get("liangduiqiushu")[2]); //主队最近2场战绩
      AiData.set("guestTwoshuying",object.get("liangduiqiushu")[3]); //客队最近2场战绩
      AiData.set("homevsguestshuying",object.get("liangduiqiushu")[4]); //主客最近两场战绩
      AiData.set("guestvshomeshuying",object.get("liangduiqiushu")[5]); //客主最近两场战绩
      await  AiData.save();
    count++;
      console.log("成功第", count, "条数据");
    }
   
    // if(object.get("liangduibisai") && object.get("liangduibisai").length > 0 && object.get("qiushutouzhu")  && object.get("qiushutouzhu")[2].indexOf("no@two") == -1){
    //   console.log("home", object.get("home")); //主队
    //   console.log("guest", object.get("guest")); //客队
    //   console.log("league", object.get("league").indexOf(" ") > -1 ? object.get("league").split(" ")[1] : object.get("league"));  //联赛
    //   console.log("time", object.get("matchTime").substr(10, 6)); //比赛时间
    //   console.log("homeScore", object.get("homeScore")); //当前比赛 主队进球数
    //   console.log("guestScore", object.get("guestScore")); //当前比赛 客队进球数
    //   console.log("prevTime", object.get("liangduibisai")[0].toString().split(" ")[0]); //上一次比赛日期
    //   console.log("prevHomeName", object.get("liangduibisai")[1]); //上一次比赛 主队
    //   console.log("prevGuestName", object.get("liangduibisai")[2]); //上一次比赛 客队
    //   console.log("prevHomeNameScore", object.get("liangduibisai")[3]); //上一次比赛 主队进球数
    //   console.log("prevGuestNameScore", object.get("liangduibisai")[4]); //上一次比赛 客队进球数
    //   console.log("kailiforecast", object.get("kailiresult").join(",")); //凯利预测
    //   console.log("ticaiforecast", object.get("ticairesult").join(",")); //体彩预测
    //   console.log("homeRank", object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
    //   console.log("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名
    //   console.log("winTouzhuE", object.get("touzhue")[0]); //散户押注主胜的金额
    //   console.log("drawTouzhuE", object.get("touzhue")[1]); //散户押注平局的金额
    //   console.log("loseTouzhuE", object.get("touzhue")[2]); //散户押注客胜的金额
    //   console.log("sanhuWinXinli", object.get("sanhuxinli")[0]); //散户感觉主胜心理
    //   console.log("sanhuDrawXinli", object.get("sanhuxinli")[1]); //散户感觉平局心理
    //   console.log("sanhuLoseXinli", object.get("sanhuxinli")[2]); //散户感觉客胜心理
    //   console.log("zhuangjiaWinXinli", object.get("kaijuresult")[0]); //庄家开盘主胜概率
    //   console.log("zhuangjiaDrawXinli", object.get("kaijuresult")[1]); //庄家开盘平局概率
    //   console.log("zhuangjiaLoseXinli", object.get("kaijuresult")[2]); //庄家开盘客胜概率
    //   console.log("liangduiWinLishi", object.get("liangduilishi")[0]); //两队历史主队概率
    //   console.log("liangduiDrawLishi", object.get("liangduilishi")[1]); //两队历史平局概率
    //   console.log("liangduiLoseLishi", object.get("liangduilishi")[2]); //两队历史客队概率
    //   console.log("lishirangqiu", object.get("changguiyapan").split(":")[0]); //两队历史让球
    //   console.log("zuijinrangqiu", object.get("changguiyapan").split(":")[1]); //两队最近让球
    //   console.log("lishiqiushu", object.get("changguiqiushu").split(":")[0]); //两队历史平均球数
    //   console.log("zuijinqiushu", object.get("changguiqiushu").split(":")[1]); //两队最近平均球数
    //   console.log("zuijinhomeqiushu",object.get("qiushuAll")[0]); //主队最近4场总进球数
    //   console.log("zuijinguestqiushu",object.get("qiushuAll")[2]); //客队最近4场总进球数
    //   console.log("zuijinhomemaxqiushu",object.get("qiushuAll")[1]); //主队最近4场最大进球数
    //   console.log("zuijinguestmaxqiushu",object.get("qiushuAll")[3]); //客队最近4场最大进球数
    //   console.log("zuijinhomediuqiushu",object.get("qiushuAll")[4]); //主队最近4场丢球数
    //   console.log("zuijinguestdiuqiushu",object.get("qiushuAll")[5]); //客队最近4场丢球数
    //   console.log("homehistoryscore",object.get("yapantouzhu")[10]); //主客历史主队主场进球数
    //   console.log("guesthistoryscore",object.get("yapantouzhu")[11]); //主客历史客队客场进球数
    //   console.log("fiveavgjinqiushu",object.get("qiushutouzhu")[2]); //主客最近5场平均进球数
    //   console.log("fouravgdiuqiushu",object.get("qiushutouzhu")[3]); //主客最近4场平均丢球数
    //   console.log("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
    //   console.log("rangqiuqian",object.get("yapanpankou1")); //让球前
    //   console.log("rangqiuhou",object.get("yapanpankou2")); //让球后
    //   console.log("qiushuqian",object.get("qiushupankou1")); //球数盘口前
    //   console.log("qiushuhou",object.get("qiushupankou2")); //球数盘口后
    //   console.log("touzhuhomebili",object.get("yapantouzhu")[0]); //投注主队比例
    //   console.log("touzhuguestbili",object.get("yapantouzhu")[1]); //投注客队比例
    //   console.log("touzhudaqiubili",object.get("qiushutouzhu")[0]); //投注大球比例
    //   console.log("touzhuxiaoqiubili",object.get("qiushutouzhu")[1]); //投注小球比例
    //   console.log("homeprevbisaidate",object.get("homezuijinbisai")[0].toString().split(" ")[0]); //主队上一场比赛日期
    //   console.log("guestprevbisaidate",object.get("guestzuijinbisai")[0].toString().split(" ")[0]); //客队上一场比赛日期
    //   console.log("homeprevbisaiscore", object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]); //主队上一场比赛进球
    //   console.log("guestprevbisaiscore",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]); //客队上一场比赛进球
    //   console.log("homeprevbisaijiqiu",object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]); //主队上一场比赛丢球
    //   console.log("guestprevbisaijiqiu",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]); //客队上一场比赛丢球
    //   console.log("homeTwojinqiushu",object.get("liangduiqiushu")[0].toString().split("-")[0]); //主队最近2场进球数
    //   console.log("guestTwojinqiushu",object.get("liangduiqiushu")[1].toString().split("-")[0]); //客队最近2场进球数
    //   console.log("homeTwodiuqiushu",object.get("liangduiqiushu")[0].toString().split("-")[1]); //主队最近2场丢球数
    //   console.log("guestTwodiuqiushu",object.get("liangduiqiushu")[1].toString().split("-")[1]); //客队最近2场丢球数
    //   console.log("homeTwoshuying",object.get("liangduiqiushu")[2]); //主队最近2场战绩
    //   console.log("guestTwoshuying",object.get("liangduiqiushu")[3]); //客队最近2场战绩
    //   console.log("homevsguestshuying",object.get("liangduiqiushu")[4]); //主客最近两场战绩
    //   console.log("guestvshomeshuying",object.get("liangduiqiushu")[5]); //客主最近两场战绩

    // }
    
   

    


    // data.push(object);
  }
  console.log("成功条数:",count);
  return data;
});








/******************************
 *
 * cleandata
 * loaddata
 * doqiudata
 *
 ******************************/