///清理数据
Parse.Cloud.define("cleandata", async () => {
    var Money = Parse.Object.extend("Money");
    var queryMoneyResult = new Parse.Query(Money);
    queryMoneyResult.equalTo("date", "2023-06-30");
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
        let AiDataObject = Parse.Object.extend("AiData");
        let AiData = new AiDataObject();
  
        // console.log("home", object.get("home")); //主队为1
        // console.log("guest", object.get("guest")); //客队为2
        // console.log("homeScore", parseFloat(object.get("homeScore"))); //当前比赛 主队进球数
        // console.log("guestScore", parseFloat(object.get("guestScore"))); //当前比赛 客队进球数
  
        let homeScore = parseFloat(object.get("homeScore"));
        let guestScore = parseFloat(object.get("guestScore"));
  
        if(homeScore== guestScore){
          AiData.set("result", 0);
        }
        else if(homeScore > guestScore){
          AiData.set("result", 1);
        }
        else if(homeScore < guestScore){
          AiData.set("result", 2);
        }
  
        // AiData.set("league", object.get("league").indexOf(" ") > -1 ? object.get("league").split(" ")[1] : object.get("league")); 
        let league = object.get("league");
        if(league.indexOf("杯") > -1){
          AiData.set("league", 1);
        }else{
          AiData.set("league", 0);
        }

        let matchId = object.get("matchId");
        AiData.set("matchId", matchId);

        let matchTime = object.get("matchTime");
        AiData.set("matchTime", matchTime);
        
        let date = object.get("date");
        AiData.set("date", date);
  
        // AiData.set("prevHomeNameScore", parseFloat(object.get("liangduibisai")[3])); //上一次比赛 主队进球数
        // AiData.set("prevGuestNameScore", parseFloat(object.get("liangduibisai")[4])); //上一次比赛 客队进球数
        let prevHomeNameScore = object.get("liangduibisai")[1] == object.get("home") ? object.get("liangduibisai")[3] :object.get("liangduibisai")[4];
        let prevGuestNameScore = object.get("liangduibisai")[2] == object.get("guest") ? object.get("liangduibisai")[4] :object.get("liangduibisai")[3];
        if(prevHomeNameScore == prevGuestNameScore){
          AiData.set("prevresult", 0);
        }
        else if(prevHomeNameScore > prevGuestNameScore){
          AiData.set("prevresult", 1);
        }
        else if(prevHomeNameScore < prevGuestNameScore){
          AiData.set("prevresult", 2);
        }
        // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
        // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名
  
        if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
          continue;
        }
        // if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) && parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString())
  
        if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) > parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, ""))){
          AiData.set("Rank",1);
        }else{
          AiData.set("Rank",0);
        }
  
        // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
        // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
        // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
        let winTouzhuE = parseFloat(object.get("touzhue")[0]);
        let drawTouzhuE = parseFloat(object.get("touzhue")[1]);
        let loseTouzhuE = parseFloat(object.get("touzhue")[2]);
        if(winTouzhuE >= drawTouzhuE && winTouzhuE >= loseTouzhuE){
          AiData.set("maxtouzhu",0);
        } else if(drawTouzhuE >= winTouzhuE && drawTouzhuE >= loseTouzhuE){ 
          AiData.set("maxtouzhu",1);
        } else if(loseTouzhuE >= winTouzhuE && loseTouzhuE >= drawTouzhuE){
          AiData.set("maxtouzhu",2);
        }
  
        if(winTouzhuE <= drawTouzhuE && winTouzhuE <= loseTouzhuE){
          AiData.set("mintouzhu",0);
        } else if(drawTouzhuE <= winTouzhuE && drawTouzhuE <= loseTouzhuE){ 
          AiData.set("mintouzhu",1);
        } else if(loseTouzhuE <= winTouzhuE && loseTouzhuE <= drawTouzhuE){
          AiData.set("mintouzhu",2);
        }
  
        // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
        // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
        // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理
  
        let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
        let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
        let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));
  
        if(sanhuWinXinli >= sanhuDrawXinli && sanhuWinXinli >= sanhuLoseXinli){
          if(sanhuDrawXinli == 33){
            AiData.set("maxxinli",1);
          }else{
            AiData.set("maxxinli",0);
          }
        }else if(sanhuDrawXinli >= sanhuWinXinli && sanhuDrawXinli >= sanhuLoseXinli){
          AiData.set("maxxinli",1);
        }else if(sanhuLoseXinli >= sanhuWinXinli && sanhuLoseXinli >= sanhuDrawXinli){
          AiData.set("maxxinli",2);
        }
  
        if(sanhuWinXinli <= sanhuDrawXinli && sanhuWinXinli <= sanhuLoseXinli){
          if(sanhuDrawXinli == 33){
            AiData.set("minxinli",1);
          }else{
            AiData.set("minxinli",0);
          }
        }else if(sanhuDrawXinli <= sanhuWinXinli && sanhuDrawXinli <= sanhuLoseXinli){
          AiData.set("minxinli",1);
        }else if(sanhuLoseXinli <= sanhuWinXinli && sanhuLoseXinli <= sanhuDrawXinli){
          AiData.set("minxinli",2);
        }
  
        // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
        // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
        // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率
  
        let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
        let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
        let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));
  
        if(zhuangjiaWinXinli >= zhuangjiaDrawXinli && zhuangjiaWinXinli >= zhuangjiaLoseXinli){
          AiData.set("maxkaiju",0);
        }else if(zhuangjiaDrawXinli >= zhuangjiaWinXinli && zhuangjiaDrawXinli >= zhuangjiaLoseXinli){
          AiData.set("maxkaiju",1);
        }else if(zhuangjiaLoseXinli >= zhuangjiaWinXinli && zhuangjiaLoseXinli >= zhuangjiaDrawXinli){
          AiData.set("maxkaiju",2);
        }
  
  
        // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
        // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
        // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率
  
        let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
        let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
        let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));
  
        if(liangduiWinLishi >= liangduiDrawLishi && liangduiWinLishi >= liangduiLoseLishi){
          if(liangduiWinLishi == 33){
            AiData.set("maxlishi",1);
          }
          else{
            AiData.set("maxlishi",0);
          }
        }else if(liangduiDrawLishi >= liangduiWinLishi && liangduiDrawLishi >= liangduiLoseLishi){
          AiData.set("maxlishi",1);
        }else if(liangduiLoseLishi >= liangduiWinLishi && liangduiLoseLishi >= liangduiDrawLishi){
          AiData.set("maxlishi",2);
        }
  
        // AiData.set("lishirangqiu", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史让球
        // if(parseFloat(object.get("changguiyapan").split(":")[0]) > 0){
        //   AiData.set("lishirangqiu", 1);
        // }else{
        //   AiData.set("lishirangqiu", 0);
        // }
        // AiData.set("zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球
        // if(parseFloat(object.get("changguiyapan").split(":")[1]) > 0){
        //   AiData.set("zuijinrangqiu", 1);
        // }else{
        //   AiData.set("zuijinrangqiu", 0);
        // }
        
        // AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
        // AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
        
        let lishiqiushu = parseFloat(object.get("changguiqiushu").split(":")[0]);
        let zuijinqiushu = parseFloat(object.get("changguiqiushu").split(":")[1]);
  
        if(lishiqiushu <= zuijinqiushu){
          AiData.set("jiaqiu",1);
        }else{
          AiData.set("jiaqiu",0);
        }
  
        // AiData.set("zuijinhomeqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
        // AiData.set("zuijinguestqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
        // if(parseFloat(object.get("qiushuAll")[0]) > parseFloat(object.get("qiushuAll")[2])){
        //   AiData.set("zuijinqiushu",1);
        // }else{ 
        //   AiData.set("zuijinqiushu",0);
        // }
  
        // AiData.set("zuijinhomemaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
        // AiData.set("zuijinguestmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数
        // if(parseFloat(object.get("qiushuAll")[1]) > parseFloat(object.get("qiushuAll")[3])){
        //   AiData.set("zuijinmaxqiushu",1);
        // }else{
        //   AiData.set("zuijinmaxqiushu",0);
        // }
  
        // AiData.set("zuijinhomediuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
        // AiData.set("zuijinguestdiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数
  
        // if(parseFloat(object.get("qiushuAll")[4])> parseFloat(object.get("qiushuAll")[5])){
        //   AiData.set("zuijindiuqiushu",1);
        // }else{
        //   AiData.set("zuijindiuqiushu",0);
        // }
  
  
        // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
        // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
  
        // AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
        // AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
  
        // AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
        AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
        AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2")) >= parseFloat(object.get("yapanpankou1")) ? 1: 0); //让球后 升盘1 降盘0
  
        // AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
        // AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2")) >= parseFloat(object.get("qiushupankou1")) ? 1: 0); //球数盘口后 升盘1 降盘0
        
        // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
        // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例
  
        let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
        let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);
  
        if(touzhuhomebili > touzhuguestbili){
          AiData.set("touzhuhome",1);
        }else{
          AiData.set("touzhuhome",0);
        }
  
        // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
        // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例
  
        // let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
        // let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);
  
        // if(touzhudaqiubili > touzhuxiaoqiubili){
        //   AiData.set("touzhudaqiu",1)
        // }else{ 
        //   AiData.set("touzhudaqiu",0)
        // }
  
        // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
        // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
        let homeprevbisaiscore =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
        let guestprevbisaiscore = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
        if(homeprevbisaiscore == guestprevbisaiscore){
          AiData.set("prevbisaiscore",0);
        }else if (homeprevbisaiscore > guestprevbisaiscore){
          AiData.set("prevbisaiscore",1);
        }else if (homeprevbisaiscore < guestprevbisaiscore){
          AiData.set("prevbisaiscore",2);
        }
        
        // AiData.set("homeprevbisaijiqiu",parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3])); //主队上一场比赛丢球
        // AiData.set("guestprevbisaijiqiu",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3])); //客队上一场比赛丢球
        // let homeprevbisaijiqiu = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        // let guestprevbisaijiqiu = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        // if(homeprevbisaijiqiu >= guestprevbisaijiqiu){
        //   AiData.set("prevbisaijiqiu",1);
        // }else{
        //   AiData.set("prevbisaijiqiu",0);
        // }
  
  
        // AiData.set("homeTwojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
        // AiData.set("guestTwojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
        // if(parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]) >= parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])){
        //   AiData.set("Twojinqiushu",1);
        // }else{
        //   AiData.set("Twojinqiushu",0);
        // }
  
  
  
        // AiData.set("homeTwodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
        // AiData.set("guestTwodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
        // if(parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]) >= parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])){
        //   AiData.set("Twodiuqiushu",1);
        // }else{
        //   AiData.set("Twodiuqiushu",0);
        // }
  
        // AiData.set("homeTwoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
        // AiData.set("guestTwoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩
  
        if(parseFloat(object.get("liangduiqiushu")[2]) >= parseFloat(object.get("liangduiqiushu")[3])){
          AiData.set("Twoshuying",1);
        }else{
          AiData.set("Twoshuying",0);
        }
  
        // AiData.set("homevsguestshuying",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场战绩
        // AiData.set("guestvshomeshuying",parseFloat(object.get("liangduiqiushu")[5])); //客主最近两场战绩
  
        if(parseFloat(object.get("liangduiqiushu")[4]) >= parseFloat(object.get("liangduiqiushu")[5])){
          AiData.set("vsguestshuying",1);
        }else{
          AiData.set("vsguestshuying",0);
        }
        // console.log("-----------------------\r\r\r");
        await  AiData.save();
      count++;
        console.log("成功第", count, "条数据");
      }
    }
    console.log("成功条数:",count);
    return data;
  });


  ///加载需要决策的数据
Parse.Cloud.define("loaddata", async () => {

    var CastDataResult = Parse.Object.extend("ForeCastData");
    var queryCastDataResult = new Parse.Query(CastDataResult);
    queryCastDataResult.limit(500);
    const OneResultresults = await queryCastDataResult.find();
  
    for (let i = 0; i < OneResultresults.length; i++) {
      var object = OneResultresults[i];
  
      await object.destroy();
    }
  
    var Money = Parse.Object.extend("Money");
    var queryMoneyResult = new Parse.Query(Money);
    queryMoneyResult.equalTo("date", "2023-06-30");
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
        let AiDataObject = Parse.Object.extend("ForeCastData");
        let AiData = new AiDataObject();
  
        AiData.set("home1", object.get("home")); //主队
        AiData.set("guest2", object.get("guest")); //客队
        AiData.set("prediction",undefined);
        // console.log("home", object.get("home")); //主队为1
        // console.log("guest", object.get("guest")); //客队为2
        // console.log("homeScore", parseFloat(object.get("homeScore"))); //当前比赛 主队进球数
        // console.log("guestScore", parseFloat(object.get("guestScore"))); //当前比赛 客队进球数
        // if(object.get("homeScore") ==object.get("guestScore")){
        //   AiData.set("result", 0);
        // }
        // else if(object.get("homeScore") > object.get("guestScore")){
        //   AiData.set("result", 1);
        // }
        // else if(object.get("homeScore") < object.get("guestScore")){
        //   AiData.set("result", 2);
        // }
        // AiData.set("prevHomeNameScore", parseFloat(object.get("liangduibisai")[3])); //上一次比赛 主队进球数
        // AiData.set("prevGuestNameScore", parseFloat(object.get("liangduibisai")[4])); //上一次比赛 客队进球数
        
        let league = object.get("league");
        if(league.indexOf("杯") > -1){
          AiData.set("league", 1);
        }else{
          AiData.set("league", 0);
        }

        let matchId = object.get("matchId");
        AiData.set("matchId", matchId);

        let matchTime = object.get("matchTime");
        AiData.set("matchTime", matchTime);
        
        let date = object.get("date");
        AiData.set("date", date);
  
        
        let prevHomeNameScore = object.get("liangduibisai")[1] == object.get("home") ? object.get("liangduibisai")[3] :object.get("liangduibisai")[4];
        let prevGuestNameScore = object.get("liangduibisai")[2] == object.get("guest") ? object.get("liangduibisai")[4] :object.get("liangduibisai")[3];
        if(prevHomeNameScore == prevGuestNameScore){
          AiData.set("prevresult", 0);
        }
        else if(prevHomeNameScore > prevGuestNameScore){
          AiData.set("prevresult", 1);
        }
        else if(prevHomeNameScore < prevGuestNameScore){
          AiData.set("prevresult", 2);
        }
        // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
        // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名
  
        if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
          continue;
        }
  
      
        // if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) && parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString())
  
        if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) > parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, ""))){
          AiData.set("Rank",1);
        }else{
          AiData.set("Rank",0);
        }
  
        // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
        // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
        // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
        let winTouzhuE = parseFloat(object.get("touzhue")[0]);
        let drawTouzhuE = parseFloat(object.get("touzhue")[1]);
        let loseTouzhuE = parseFloat(object.get("touzhue")[2]);
        if(winTouzhuE >= drawTouzhuE && winTouzhuE >= loseTouzhuE){
          AiData.set("maxtouzhu",0);
        } else if(drawTouzhuE >= winTouzhuE && drawTouzhuE >= loseTouzhuE){ 
          AiData.set("maxtouzhu",1);
        } else if(loseTouzhuE >= winTouzhuE && loseTouzhuE >= drawTouzhuE){
          AiData.set("maxtouzhu",2);
        }
  
        if(winTouzhuE <= drawTouzhuE && winTouzhuE <= loseTouzhuE){
          AiData.set("mintouzhu",0);
        } else if(drawTouzhuE <= winTouzhuE && drawTouzhuE <= loseTouzhuE){ 
          AiData.set("mintouzhu",1);
        } else if(loseTouzhuE <= winTouzhuE && loseTouzhuE <= drawTouzhuE){
          AiData.set("mintouzhu",2);
        }
  
        // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
        // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
        // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理
  
        let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
        let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
        let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));
  
        if(sanhuWinXinli >= sanhuDrawXinli && sanhuWinXinli >= sanhuLoseXinli){
          if(sanhuDrawXinli == 33){
            AiData.set("maxxinli",1);
          }else{
            AiData.set("maxxinli",0);
          }
        }else if(sanhuDrawXinli >= sanhuWinXinli && sanhuDrawXinli >= sanhuLoseXinli){
          AiData.set("maxxinli",1);
        }else if(sanhuLoseXinli >= sanhuWinXinli && sanhuLoseXinli >= sanhuDrawXinli){
          AiData.set("maxxinli",2);
        }
  
        if(sanhuWinXinli <= sanhuDrawXinli && sanhuWinXinli <= sanhuLoseXinli){
          if(sanhuDrawXinli == 33){
            AiData.set("minxinli",1);
          }else{
            AiData.set("minxinli",0);
          }
        }else if(sanhuDrawXinli <= sanhuWinXinli && sanhuDrawXinli <= sanhuLoseXinli){
          AiData.set("minxinli",1);
        }else if(sanhuLoseXinli <= sanhuWinXinli && sanhuLoseXinli <= sanhuDrawXinli){
          AiData.set("minxinli",2);
        }
  
        // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
        // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
        // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率
  
        let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
        let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
        let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));
  
        if(zhuangjiaWinXinli >= zhuangjiaDrawXinli && zhuangjiaWinXinli >= zhuangjiaLoseXinli){
          AiData.set("maxkaiju",0);
        }else if(zhuangjiaDrawXinli >= zhuangjiaWinXinli && zhuangjiaDrawXinli >= zhuangjiaLoseXinli){
          AiData.set("maxkaiju",1);
        }else if(zhuangjiaLoseXinli >= zhuangjiaWinXinli && zhuangjiaLoseXinli >= zhuangjiaDrawXinli){
          AiData.set("maxkaiju",2);
        }
  
  
        // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
        // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
        // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率
  
        let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
        let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
        let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));
  
        if(liangduiWinLishi >= liangduiDrawLishi && liangduiWinLishi >= liangduiLoseLishi){
          if(liangduiWinLishi == 33){
            AiData.set("maxlishi",1);
          }
          else{
            AiData.set("maxlishi",0);
          }
        }else if(liangduiDrawLishi >= liangduiWinLishi && liangduiDrawLishi >= liangduiLoseLishi){
          AiData.set("maxlishi",1);
        }else if(liangduiLoseLishi >= liangduiWinLishi && liangduiLoseLishi >= liangduiDrawLishi){
          AiData.set("maxlishi",2);
        }
  
        // AiData.set("lishirangqiu", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史让球
        // if(parseFloat(object.get("changguiyapan").split(":")[0]) > 0){
        //   AiData.set("lishirangqiu", 1);
        // }else{
        //   AiData.set("lishirangqiu", 0);
        // }
        // AiData.set("zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球
        // if(parseFloat(object.get("changguiyapan").split(":")[1]) > 0){
        //   AiData.set("zuijinrangqiu", 1);
        // }else{
        //   AiData.set("zuijinrangqiu", 0);
        // }
        
        // AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
        // AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
        
        let lishiqiushu = parseFloat(object.get("changguiqiushu").split(":")[0]);
        let zuijinqiushu = parseFloat(object.get("changguiqiushu").split(":")[1]);
  
        if(lishiqiushu <= zuijinqiushu){
          AiData.set("jiaqiu",1);
        }else{
          AiData.set("jiaqiu",0);
        }
  
        // AiData.set("zuijinhomeqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
        // AiData.set("zuijinguestqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
        // if(parseFloat(object.get("qiushuAll")[0]) > parseFloat(object.get("qiushuAll")[2])){
        //   AiData.set("zuijinqiushu",1);
        // }else{ 
        //   AiData.set("zuijinqiushu",0);
        // }
  
        // AiData.set("zuijinhomemaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
        // AiData.set("zuijinguestmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数
        // if(parseFloat(object.get("qiushuAll")[1]) > parseFloat(object.get("qiushuAll")[3])){
        //   AiData.set("zuijinmaxqiushu",1);
        // }else{
        //   AiData.set("zuijinmaxqiushu",0);
        // }
  
        // AiData.set("zuijinhomediuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
        // AiData.set("zuijinguestdiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数
  
        // if(parseFloat(object.get("qiushuAll")[4])> parseFloat(object.get("qiushuAll")[5])){
        //   AiData.set("zuijindiuqiushu",1);
        // }else{
        //   AiData.set("zuijindiuqiushu",0);
        // }
  
  
        // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
        // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
  
        // AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
        // AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
  
        // AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
        AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
        AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2")) >= parseFloat(object.get("yapanpankou1")) ? 1: 0); //让球后 升盘1 降盘0
  
        // AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
        // AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2")) >= parseFloat(object.get("qiushupankou1")) ? 1: 0); //球数盘口后 升盘1 降盘0
        
        // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
        // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例
  
        let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
        let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);
  
        if(touzhuhomebili > touzhuguestbili){
          AiData.set("touzhuhome",1);
        }else{
          AiData.set("touzhuhome",0);
        }
  
        // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
        // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例
  
        // let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
        // let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);
  
        // if(touzhudaqiubili > touzhuxiaoqiubili){
        //   AiData.set("touzhudaqiu",1)
        // }else{ 
        //   AiData.set("touzhudaqiu",0)
        // }
  
        // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
        // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
        let homeprevbisaiscore =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
        let guestprevbisaiscore = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
        if(homeprevbisaiscore == guestprevbisaiscore){
            AiData.set("prevbisaiscore",0);
          }else if (homeprevbisaiscore > guestprevbisaiscore){
            AiData.set("prevbisaiscore",1);
          }else if (homeprevbisaiscore < guestprevbisaiscore){
            AiData.set("prevbisaiscore",2);
          }
        
        // AiData.set("homeprevbisaijiqiu",parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3])); //主队上一场比赛丢球
        // AiData.set("guestprevbisaijiqiu",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3])); //客队上一场比赛丢球
        // let homeprevbisaijiqiu = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        // let guestprevbisaijiqiu = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        // if(homeprevbisaijiqiu >= guestprevbisaijiqiu){
        //   AiData.set("prevbisaijiqiu",1);
        // }else{
        //   AiData.set("prevbisaijiqiu",0);
        // }
  
  
        // AiData.set("homeTwojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
        // AiData.set("guestTwojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
        // if(parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]) >= parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])){
        //   AiData.set("Twojinqiushu",1);
        // }else{
        //   AiData.set("Twojinqiushu",0);
        // }
  
  
  
        // AiData.set("homeTwodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
        // AiData.set("guestTwodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
        // if(parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]) >= parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])){
        //   AiData.set("Twodiuqiushu",1);
        // }else{
        //   AiData.set("Twodiuqiushu",0);
        // }
  
        // AiData.set("homeTwoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
        // AiData.set("guestTwoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩
  
        if(parseFloat(object.get("liangduiqiushu")[2]) >= parseFloat(object.get("liangduiqiushu")[3])){
          AiData.set("Twoshuying",1);
        }else{
          AiData.set("Twoshuying",0);
        }
  
        // AiData.set("homevsguestshuying",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场战绩
        // AiData.set("guestvshomeshuying",parseFloat(object.get("liangduiqiushu")[5])); //客主最近两场战绩
  
        if(parseFloat(object.get("liangduiqiushu")[4]) >= parseFloat(object.get("liangduiqiushu")[5])){
          AiData.set("vsguestshuying",1);
        }else{
          AiData.set("vsguestshuying",0);
        }
        await  AiData.save();
      count++;
        console.log("成功加载第", count, "条数据");
      }
     
      }
    console.log("成功条数:",count);
    return data;
  });