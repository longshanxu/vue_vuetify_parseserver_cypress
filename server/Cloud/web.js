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