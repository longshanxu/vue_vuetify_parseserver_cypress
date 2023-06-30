
///清理大小球数据
Parse.Cloud.define("doqiudata", async () => {
    var Money = Parse.Object.extend("Money");
    var queryMoneyResult = new Parse.Query(Money);
    // queryMoneyResult.equalTo("date", "2023-06-30");
    queryMoneyResult.equalTo("displayState", "完场");
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
        let AiDataObject = Parse.Object.extend("AiQiuData");
        let AiData = new AiDataObject();
  
        // AiData.set("home", object.get("home")); //主队
        // AiData.set("guest", object.get("guest")); //客队
        // AiData.set("league", object.get("league").indexOf(" ") > -1 ? object.get("league").split(" ")[1] : object.get("league"));  //联赛
        // AiData.set("time", object.get("matchTime").substr(10, 6)); //比赛时间
        // AiData.set("homeScore", object.get("homeScore")); //当前比赛 主队进球数
        // AiData.set("guestScore", object.get("guestScore")); //当前比赛 客队进球数
        let homeScroe =parseFloat( object.get("homeScore"));
        let guestScroe =parseFloat( object.get("guestScore"));
        
        if(homeScroe+guestScroe == parseFloat( object.get("qiushupankou1"))){
          AiData.set("result", 0);  //和预期盘口一样
        }
        else if(homeScroe+guestScroe >= parseFloat( object.get("qiushupankou1")) && homeScroe+guestScroe <= (parseFloat( object.get("qiushupankou1")) +2 )){
          AiData.set("result", 1);  //比预期盘口大，但没有超过2个
        }
        else if(homeScroe+guestScroe > parseFloat( object.get("qiushupankou1")) && homeScroe+guestScroe > (parseFloat( object.get("qiushupankou1")) +2 )){
          AiData.set("result", 2);  //比预期盘口大，有超过2个
        } 
        else if(homeScroe+guestScroe < parseFloat( object.get("qiushupankou1")) && (homeScroe+guestScroe != 0)){
          AiData.set("result", 3);  //比预期盘口小，但至少有一个球
        }else{
          AiData.set("result", 4);  //比预期盘口小，且没有球
        }
        
        // AiData.set("prevTime", object.get("liangduibisai")[0].toString().split(" ")[0]); //上一次比赛日期
        // AiData.set("prevHomeName", object.get("liangduibisai")[1]); //上一次比赛 主队
        // AiData.set("prevGuestName", object.get("liangduibisai")[2]); //上一次比赛 客队
        // AiData.set("prevHomeNameScore", object.get("liangduibisai")[3]); //上一次比赛 主队进球数
        // AiData.set("prevGuestNameScore", object.get("liangduibisai")[4]); //上一次比赛 客队进球数
  
        let prevHomeNameScore =parseFloat( object.get("liangduibisai")[3]);
        let prevGuestNameScore =parseFloat( object.get("liangduibisai")[4]);
  
        if(prevHomeNameScore+prevGuestNameScore > parseFloat( object.get("qiushupankou1"))){
          AiData.set("prevScore", 0);  //上一次比赛大于预期盘口
        }else{
          AiData.set("prevScore", 1);
        }
  
        // AiData.set("kailiforecast", object.get("kailiresult").join(",")); //凯利预测
        // AiData.set("ticaiforecast", object.get("ticairesult").join(",")); //体彩预测
        // AiData.set("homeRank", object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")); //主队排名
        // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")); //客队排名
        // AiData.set("winTouzhuE", object.get("touzhue")[0]); //散户押注主胜的金额
        // AiData.set("drawTouzhuE", object.get("touzhue")[1]); //散户押注平局的金额
        // AiData.set("loseTouzhuE", object.get("touzhue")[2]); //散户押注客胜的金额
        // AiData.set("sanhuWinXinli", object.get("sanhuxinli")[0].toString().replace("%","")); //散户感觉主胜心理
        // AiData.set("sanhuDrawXinli", object.get("sanhuxinli")[1].toString().replace("%","")); //散户感觉平局心理
        // AiData.set("sanhuLoseXinli", object.get("sanhuxinli")[2].toString().replace("%","")); //散户感觉客胜心理
        // AiData.set("zhuangjiaWinXinli", object.get("kaijuresult")[0].toString().replace("%","")); //庄家开盘主胜概率
        // AiData.set("zhuangjiaDrawXinli", object.get("kaijuresult")[1].toString().replace("%","")); //庄家开盘平局概率
        // AiData.set("zhuangjiaLoseXinli", object.get("kaijuresult")[2].toString().replace("%","")); //庄家开盘客胜概率
        // AiData.set("liangduiWinLishi", object.get("liangduilishi")[0].toString().replace("%","")); //两队历史主队概率
        // AiData.set("liangduiDrawLishi", object.get("liangduilishi")[1].toString().replace("%","")); //两队历史平局概率
        // AiData.set("liangduiLoseLishi", object.get("liangduilishi")[2].toString().replace("%","")); //两队历史客队概率
        // AiData.set("lishirangqiu", object.get("changguiyapan").split(":")[0]); //两队历史让球
        // AiData.set("zuijinrangqiu", object.get("changguiyapan").split(":")[1]); //两队最近让球
        // AiData.set("lishiqiushu", object.get("changguiqiushu").split(":")[0]); //两队历史平均球数
        let lishiqiushu = parseFloat( object.get("changguiqiushu").split(":")[0]);
        if(lishiqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("lishiqiushu", 0); //两队历史平均球数大于预期
        }else{
          AiData.set("lishiqiushu", 1);
        }
  
        // AiData.set("zuijinqiushu", object.get("changguiqiushu").split(":")[1]); //两队最近平均球数
        let zuijinqiushu = parseFloat( object.get("changguiqiushu").split(":")[1]);
        if(zuijinqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("zuijinqiushu", 0); //两队最近平均球数大于预期
        }else{
          AiData.set("zuijinqiushu", 1);
        }
  
        // AiData.set("zuijinhomeqiushu",object.get("qiushuAll")[0]); //主队最近4场总进球数
        // AiData.set("zuijinguestqiushu",object.get("qiushuAll")[2]); //客队最近4场总进球数 
        // let zuijinhomeqiushu = parseFloat( object.get("qiushuAll")[0]);
        // let zuijinguestqiushu = parseFloat( object.get("qiushuAll")[2]);
        // if((zuijinhomeqiushu + zuijinguestqiushu)/4 > parseFloat( object.get("qiushupankou1"))){
        //   AiData.set("zuifourqiushu", 0); //两队最近4场平均球数大于预期
        // }else{
        //   AiData.set("zuifourqiushu", 1); 
        // }
  
        // AiData.set("zuijinhomemaxqiushu",object.get("qiushuAll")[1]); //主队最近4场最大进球数
        // AiData.set("zuijinguestmaxqiushu",object.get("qiushuAll")[3]); //客队最近4场最大进球数
        let zuijinhomemaxqiushu = parseFloat( object.get("qiushuAll")[1]);
        let zuijinguestmaxqiushu = parseFloat( object.get("qiushuAll")[3]);
        if(zuijinhomemaxqiushu + zuijinguestmaxqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("zuifourmaxqiushu", 0); //两队最近4场最大球数大于预期
        }else{
          AiData.set("zuifourmaxqiushu", 1);
        }
  
        // AiData.set("zuijinhomediuqiushu",object.get("qiushuAll")[4]); //主队最近4场丢球数
        // AiData.set("zuijinguestdiuqiushu",object.get("qiushuAll")[5]); //客队最近4场丢球数
        // let zuijinhomediuqiushu = parseFloat( object.get("qiushuAll")[4]);
        // let zuijinguestdiuqiushu = parseFloat( object.get("qiushuAll")[5]);
        // if((zuijinhomediuqiushu + zuijinguestdiuqiushu)/4 > parseFloat( object.get("qiushupankou1"))){
        //   AiData.set("zuifourdiuqiushu", 0); //两队最近4场丢球数大于预期
        // }
        // else{
        //   AiData.set("zuifourdiuqiushu", 1);
        // }
  
  
        // AiData.set("homehistoryscore",object.get("yapantouzhu")[10]); //主客历史主队主场进球数
        // AiData.set("guesthistoryscore",object.get("yapantouzhu")[11]); //主客历史客队客场进球数
        let homehistoryscore = parseFloat( object.get("yapantouzhu")[10]);
        let guesthistoryscore = parseFloat( object.get("yapantouzhu")[11]);
        if(homehistoryscore + guesthistoryscore > parseFloat( object.get("qiushupankou1"))){
          AiData.set("historyscore", 0); //两队历史主客场进球数大于预期
        }else{
          AiData.set("historyscore", 1);
        }
  
        // AiData.set("fiveavgjinqiushu",object.get("qiushutouzhu")[2]); //主客最近5场平均进球数
        let fiveavgjinqiushu = parseFloat( object.get("qiushutouzhu")[2]);
        if(fiveavgjinqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("fiveavgjinqiushu", 0); //两队最近5场平均进球数大于预期
        }else{
          AiData.set("fiveavgjinqiushu", 1);
        }
  
        // AiData.set("fouravgdiuqiushu",object.get("qiushutouzhu")[3]); //主客最近4场平均丢球数
        let fouravgdiuqiushu = parseFloat( object.get("qiushutouzhu")[3]);
        if(fouravgdiuqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("fouravgdiuqiushu", 0); //两队最近4场平均丢球数大于预期
        }else{
          AiData.set("fouravgdiuqiushu", 1);
        }
  
  
        // AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
        let fouravgjinqiushu = (parseFloat( object.get("qiushuAll")[0]) + parseFloat( object.get("qiushuAll")[2]))/4;
        if(fouravgjinqiushu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("fouravgjinqiushu", 0); //两队最近4场平均进球数大于预期
        }else{
          AiData.set("fouravgjinqiushu", 1);
        }
      
       
        
        // AiData.set("qiushuqian",object.get("qiushupankou1")); //球数盘口前
        // AiData.set("qiushuhou",object.get("qiushupankou2")); //球数盘口后
  
        AiData.set("qiushuqian",object.get("qiushupankou1")); //让球前
        // AiData.set("rangqiuhou",object.get("yapanpankou2")); //让球后
        let qiushuqian = parseFloat( object.get("qiushupankou1"));
        let qiushuhou = parseFloat( object.get("qiushupankou2"));
        if(qiushuqian >= qiushuhou){
          AiData.set("rangqiupankou", 0); //大于就是降盘
        }else{
          AiData.set("rangqiupankou", 1);
        }
        // AiData.set("touzhuhomebili",object.get("yapantouzhu")[0]); //投注主队比例
        // AiData.set("touzhuguestbili",object.get("yapantouzhu")[1]); //投注客队比例
  
        // AiData.set("touzhudaqiubili",object.get("qiushutouzhu")[0]); //投注大球比例
        // AiData.set("touzhuxiaoqiubili",object.get("qiushutouzhu")[1]); //投注小球比例
        let touzhudaqiubili = parseFloat( object.get("qiushutouzhu")[0]);
        let touzhuxiaoqiubili = parseFloat( object.get("qiushutouzhu")[1]);
        if(touzhudaqiubili > touzhuxiaoqiubili){
          AiData.set("touzhudaqiubili", 0); //投注大球比例大于小球比例
        }else{
          AiData.set("touzhudaqiubili", 1);
        }
      
  
        // AiData.set("homeprevbisaidate",object.get("homezuijinbisai")[0].toString().split(" ")[0]); //主队上一场比赛日期
        // AiData.set("guestprevbisaidate",object.get("guestzuijinbisai")[0].toString().split(" ")[0]); //客队上一场比赛日期
        // AiData.set("homeprevbisaiscore", object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]); //主队上一场比赛进球
        // AiData.set("guestprevbisaiscore",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]); //客队上一场比赛进球
        let homeprevbisaiscore = parseFloat( object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
        let guestprevbisaiscore = parseFloat( object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
        if(homeprevbisaiscore + guestprevbisaiscore > parseFloat( object.get("qiushupankou1"))){
          AiData.set("prevbisaiscore", 0); //上一场比赛进球数大于预期
        }else{
          AiData.set("prevbisaiscore", 1);
        }
  
        // AiData.set("homeprevbisaijiqiu",object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]); //主队上一场比赛丢球
        // AiData.set("guestprevbisaijiqiu",object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]); //客队上一场比赛丢球
        let homeprevbisaijiqiu = parseFloat( object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        let guestprevbisaijiqiu = parseFloat( object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);      
        if(homeprevbisaijiqiu + guestprevbisaijiqiu > parseFloat( object.get("qiushupankou1"))){
          AiData.set("prevbisaijiqiu", 0); //上一场比赛丢球数大于预期
        }else{
          AiData.set("prevbisaijiqiu", 1);
        }
  
        // AiData.set("homeTwojinqiushu",object.get("liangduiqiushu")[0].toString().split("-")[0]); //主队最近2场进球数
        // AiData.set("guestTwojinqiushu",object.get("liangduiqiushu")[1].toString().split("-")[0]); //客队最近2场进球数
        let homeTwojinqiushu = parseFloat( object.get("liangduiqiushu")[0].toString().split("-")[0]);
        let guestTwojinqiushu = parseFloat( object.get("liangduiqiushu")[1].toString().split("-")[0]);
        if((homeTwojinqiushu + guestTwojinqiushu)/2 > parseFloat( object.get("qiushupankou1"))){
          AiData.set("Twojinqiushu", 0); //最近2场进球数大于预期
        }else{
          AiData.set("Twojinqiushu", 1);
        }
  
        // AiData.set("homeTwodiuqiushu",object.get("liangduiqiushu")[0].toString().split("-")[1]); //主队最近2场丢球数
        // AiData.set("guestTwodiuqiushu",object.get("liangduiqiushu")[1].toString().split("-")[1]); //客队最近2场丢球数
        let homeTwodiuqiushu = parseFloat( object.get("liangduiqiushu")[0].toString().split("-")[1]);
        let guestTwodiuqiushu = parseFloat( object.get("liangduiqiushu")[1].toString().split("-")[1]);
        if((homeTwodiuqiushu + guestTwodiuqiushu)/2 > parseFloat( object.get("qiushupankou1"))){
          AiData.set("Twodiuqiushu", 0); //最近2场丢球数大于预期
        }else{
          AiData.set("Twodiuqiushu", 1);
        }
       
        // console.log("homeTwoshuying",object.get("liangduiqiushu")[2]); //主队最近2场战绩
        // console.log("guestTwoshuying",object.get("liangduiqiushu")[3]); //客队最近2场战绩
        // console.log("homevsguestshuying",object.get("liangduiqiushu")[4]); //主客最近两场战绩
        // console.log("guestvshomeshuying",object.get("liangduiqiushu")[5]); //客主最近两场战绩
        await  AiData.save();
      count++;
        console.log("成功第", count, "条数据");
      }
    
    }
    console.log("成功条数:",count);
    return data;
  
  });
  