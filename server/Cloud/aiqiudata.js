
///清理大小球数据
Parse.Cloud.define("doqiudata", async () => {
    var Money = Parse.Object.extend("Money");
    var queryMoneyResult = new Parse.Query(Money);
    // queryMoneyResult.equalTo("date", "2023-08-11");
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
  //  console.log( object.get("home")+" VS "+ object.get("guest")); 
  
   let homeScore = parseFloat(object.get("homeScore"));
   let guestScore = parseFloat(object.get("guestScore"));

 

   if((homeScore + guestScore) > parseFloat(object.get("qiushupankou1"))){
     AiData.set("qiuresult",1);  //结果大于球数盘口
    //  console.log("结果大于球数盘口：1");
   }
  else if((homeScore + guestScore) < parseFloat(object.get("qiushupankou1"))){
    AiData.set("qiuresult",0);   //结果小于球数盘口
    // console.log("结果小于球数盘口：0");
  }else{
    AiData.set("qiuresult",2);  //结果等于球数盘口
    // console.log("结果等于球数盘口：2");
  }
   


  

   let league = object.get("league");
   if(league.indexOf("杯") > -1){
     AiData.set("league", 1);
     //console.log("比赛类型："+ object.get("league")+"-1"); 
   }else{
     AiData.set("league", 0);
     //console.log("比赛类型："+ object.get("league")+"-0"); 
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
     //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-0"); 
   }
   else if(prevHomeNameScore > prevGuestNameScore){
     AiData.set("prevresult", 1);
     //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-1"); 
   }
   else if(prevHomeNameScore < prevGuestNameScore){
     AiData.set("prevresult", 2);
     //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-2"); 
   }
   // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
   // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名

   if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
     continue;
   }
   // if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) && parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString())

   if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) > parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, ""))){
     AiData.set("Rank",1);
     //console.log("排名："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"~"+object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"-1");
   }else{
     AiData.set("Rank",0);
     //console.log("排名："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"~"+object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"-0");
   }

   // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
   // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
   // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
   let winTouzhuE = parseFloat(object.get("touzhue")[0]);
   let drawTouzhuE = parseFloat(object.get("touzhue")[1]);
   let loseTouzhuE = parseFloat(object.get("touzhue")[2]);
   if(winTouzhuE >= drawTouzhuE && winTouzhuE >= loseTouzhuE){
     AiData.set("maxtouzhu",0);
     //console.log("最大投注：主胜0");
   } else if(drawTouzhuE >= winTouzhuE && drawTouzhuE >= loseTouzhuE){ 
     AiData.set("maxtouzhu",1);
     //console.log("最大投注：平局1");
   } else if(loseTouzhuE >= winTouzhuE && loseTouzhuE >= drawTouzhuE){
     AiData.set("maxtouzhu",2);
     //console.log("最大投注：客胜2");
   }

   if(winTouzhuE <= drawTouzhuE && winTouzhuE <= loseTouzhuE){
     AiData.set("mintouzhu",0);
     //console.log("最小投注：主胜0");
   } else if(drawTouzhuE <= winTouzhuE && drawTouzhuE <= loseTouzhuE){ 
     AiData.set("mintouzhu",1);
     //console.log("最小投注：平局1");
   } else if(loseTouzhuE <= winTouzhuE && loseTouzhuE <= drawTouzhuE){
     AiData.set("mintouzhu",2);
     //console.log("最小投注：客胜2");
   }

   // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
   // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
   // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理

   let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
   let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
   let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));

   if(sanhuWinXinli >= sanhuDrawXinli && sanhuWinXinli >= sanhuLoseXinli){
     if(sanhuWinXinli == 33 &&  sanhuDrawXinli == 33){
       AiData.set("maxxinli",1);
       //console.log("散户感觉平局心理1");
     }else{
       AiData.set("maxxinli",0);
       //console.log("散户感觉主胜心理0");
     }
   }else if(sanhuDrawXinli >= sanhuWinXinli && sanhuDrawXinli >= sanhuLoseXinli){
     AiData.set("maxxinli",1);
     //console.log("散户感觉平局心理1");
   }else if(sanhuLoseXinli >= sanhuWinXinli && sanhuLoseXinli >= sanhuDrawXinli){
     AiData.set("maxxinli",2);
     //console.log("散户感觉客胜心理2");
   }

   if(sanhuWinXinli <= sanhuDrawXinli && sanhuWinXinli <= sanhuLoseXinli){
     if(sanhuWinXinli == 33 &&  sanhuDrawXinli == 33){
       AiData.set("minxinli",1);
       //console.log("散户感觉平局心理1");
     }else{
       AiData.set("minxinli",0);
       //console.log("散户感觉最不可能主胜心理0");
     }
   }else if(sanhuDrawXinli <= sanhuWinXinli && sanhuDrawXinli <= sanhuLoseXinli){
     AiData.set("minxinli",1);
     //console.log("散户感觉平局心理1");
   }else if(sanhuLoseXinli <= sanhuWinXinli && sanhuLoseXinli <= sanhuDrawXinli){
     AiData.set("minxinli",2);
     //console.log("散户感觉最不可能客胜心理2");
   }

   // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
   // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
   // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率

   let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
   let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
   let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));

   if(zhuangjiaWinXinli >= zhuangjiaDrawXinli && zhuangjiaWinXinli >= zhuangjiaLoseXinli){
     AiData.set("maxkaiju",0);
     //console.log("庄家开盘主胜概率0");
   }else if(zhuangjiaDrawXinli >= zhuangjiaWinXinli && zhuangjiaDrawXinli >= zhuangjiaLoseXinli){
     AiData.set("maxkaiju",1);
     //console.log("庄家开盘平局概率1");
   }else if(zhuangjiaLoseXinli >= zhuangjiaWinXinli && zhuangjiaLoseXinli >= zhuangjiaDrawXinli){
     AiData.set("maxkaiju",2);
     //console.log("庄家开盘客胜概率2");
   }


   // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
   // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
   // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率

   let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
   let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
   let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));

   if(liangduiWinLishi >= liangduiDrawLishi && liangduiWinLishi >= liangduiLoseLishi){
     if(liangduiWinLishi == 33 && liangduiDrawLishi == 33 ){
       AiData.set("maxlishi",1);
       //console.log("两队历史平局概率1");
     }
     else{
       AiData.set("maxlishi",0);
       //console.log("两队历史主队概率0");
     }
   }else if(liangduiDrawLishi >= liangduiWinLishi && liangduiDrawLishi >= liangduiLoseLishi){
     AiData.set("maxlishi",1);
     //console.log("两队历史平局概率1");
   }else if(liangduiLoseLishi >= liangduiWinLishi && liangduiLoseLishi >= liangduiDrawLishi){
     AiData.set("maxlishi",2);
     //console.log("两队历史客队概率2");
   }

   AiData.set("home_lishirangqiu", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史让球
   // console.log("两队历史让球" + parseFloat(object.get("changguiyapan").split(":")[0]));


   AiData.set("home_zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球
   // console.log("两队最近让球" + parseFloat(object.get("changguiyapan").split(":")[1]));

   
   AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
   // console.log("两队历史平均球数",parseFloat(object.get("changguiqiushu").split(":")[0]));
   AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
   // console.log("两队最近平均球数",parseFloat(object.get("changguiqiushu").split(":")[1]));
   

   AiData.set("home_zuijinqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
   // console.log("主队最近4场总进球数",parseFloat(object.get("qiushuAll")[0]));

   AiData.set("away_zuijinqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
   // console.log("客队最近4场总进球数",parseFloat(object.get("qiushuAll")[2]));

   AiData.set("home_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
   // console.log("主队最近4场最大进球数",parseFloat(object.get("qiushuAll")[1]));

   AiData.set("away_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数
   // console.log("客队最近4场最大进球数",parseFloat(object.get("qiushuAll")[3]));


   AiData.set("home_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
   // console.log("主队最近4场丢球数",parseFloat(object.get("qiushuAll")[4]));
   AiData.set("away_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数
   // console.log("客队最近4场丢球数",parseFloat(object.get("qiushuAll")[5]));


   // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
   // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
   let homehistoryscore = parseFloat(object.get("yapantouzhu")[10]);
   let guesthistoryscore = parseFloat(object.get("yapantouzhu")[11]);

   if(homehistoryscore == guesthistoryscore){
     AiData.set("historyscore",0);
     //console.log("主客历史平局0");
   }else if(homehistoryscore > guesthistoryscore){
     AiData.set("historyscore",1);
     //console.log("主客历史主胜1");
   }else{
     AiData.set("historyscore",2);
     //console.log("主客历史客胜2");
   }
   

   AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
   // console.log("主客最近5场平均进球数",parseFloat(object.get("qiushutouzhu")[2]));
  
   AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
   // console.log("主客最近4场平均丢球数",parseFloat(object.get("qiushutouzhu")[3]));

   AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
   // console.log("主客最近4场平均进球数",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4);
   

   AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
   AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2"))); //让球前
   //console.log("让球前",parseFloat(object.get("yapanpankou1")));
   //console.log("让球后",parseFloat(object.get("yapanpankou2")));


   AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
   AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2"))); //球数盘口前
   //console.log("球数盘口前",parseFloat(object.get("qiushupankou1")));
   //console.log("球数盘口后",parseFloat(object.get("qiushupankou2")));

   
   // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
   // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例

   let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
   let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);

   if(touzhuhomebili > touzhuguestbili){
     AiData.set("touzhuhome",1);
     //console.log("亚盘投注主队比例",1);
   }else{
     AiData.set("touzhuhome",0);
     //console.log("亚盘投注主队比例",0);
   }

   // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
   // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例

   let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
   let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);

   if(touzhudaqiubili > touzhuxiaoqiubili){
     AiData.set("touzhudaqiu",1)
   }else{ 
     AiData.set("touzhudaqiu",0)
   }

   // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
   // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
   let homeprevbisaiscore1 =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
   let homeprevbisaiscore2 = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
   if(homeprevbisaiscore1 == homeprevbisaiscore2){
     AiData.set("home_prevbisaiscore",0);
      //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-0");
   }else if (homeprevbisaiscore1 > homeprevbisaiscore2){
     AiData.set("home_prevbisaiscore",1);
     //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-1");
   }else if (homeprevbisaiscore1 < homeprevbisaiscore2){
     AiData.set("home_prevbisaiscore",2);
     //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-2");
   }
   
   let guestzuijinbisai1 =  parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
   let guestzuijinbisai2 = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
   if(guestzuijinbisai1 == guestzuijinbisai2){
     AiData.set("away_prevbisaiscore",0);
     //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-0");
   }else if (guestzuijinbisai1 > guestzuijinbisai2){
     AiData.set("away_prevbisaiscore",1);
     //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-1");
   }else if (guestzuijinbisai1 < guestzuijinbisai2){
     AiData.set("away_prevbisaiscore",2);
     //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-2");
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


   AiData.set("home_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
     // console.log("主队最近2场进球数"+parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]));

   AiData.set("away_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
     // console.log("客队最近2场进球数"+parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0]));


   AiData.set("home_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
   // console.log("主队最近2场丢球数"+parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]));
   AiData.set("away_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
   // console.log("客队最近2场丢球数"+parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1]));

   AiData.set("home_Twoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
   //console.log("主队最近两场情况",object.get("liangduiqiushu")[2]);
   AiData.set("away_Twoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩
   //console.log("客队最近两场情况",object.get("liangduiqiushu")[3]);
   AiData.set("home_zuijinvs",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场战绩
   //console.log("主客最近两场情况主场",parseFloat(object.get("liangduiqiushu")[4]));
   AiData.set("away_zuijinvs",parseFloat(object.get("liangduiqiushu")[5])); //客主最近两场战绩
   //console.log("主客最近两场情况客场",parseFloat(object.get("liangduiqiushu")[5]));
   
   //console.log("主客最近两场情况",object.get("liangduiqiushu")[4]);

   //console.log("-----------------------\r\n\r\n");
        await  AiData.save();
      count++;
        console.log("成功第", count, "条数据");
      }
    
    }
    console.log("成功条数:",count);
    return data;
  
});


Parse.Cloud.define("loadqiudata", async () => {


  var CastDataResult = Parse.Object.extend("ForeCastQiuData");
  var queryCastDataResult = new Parse.Query(CastDataResult);
  queryCastDataResult.limit(500);
  const OneResultresults = await queryCastDataResult.find();

  for (let i = 0; i < OneResultresults.length; i++) {
    var object = OneResultresults[i];

    await object.destroy();
  }

  var Money = Parse.Object.extend("Money");
  var queryMoneyResult = new Parse.Query(Money);
  queryMoneyResult.equalTo("date", "2023-08-11");
  queryMoneyResult.ascending("matchTime");
  queryMoneyResult.limit(500);
  const MoneyResult = await queryMoneyResult.find();
  let count = 0;
  var data = [];
  for (var i = 0; i < MoneyResult.length; i++) {
    var object = MoneyResult[i];
   
    if(object.get("liangduibisai") && object.get("liangduibisai").length > 0 && object.get("qiushutouzhu")  && object.get("qiushutouzhu")[2].indexOf("no@two") == -1 
    && object.get("yapanpankou2") != null &&  object.get("yapanpankou1") != null && object.get("qiushupankou1") != null && object.get("qiushupankou2") != null)
    {
      let AiDataObject = Parse.Object.extend("ForeCastQiuData");
      let AiData = new AiDataObject();
      AiData.set("home1", object.get("home")); //主队
      AiData.set("guest2", object.get("guest")); //客队
      //console.log( object.get("home") + " VS " + object.get("guest"));
      let league = object.get("league");
      if(league.indexOf("杯") > -1){
        AiData.set("league", 1);
        //console.log("比赛类型："+ object.get("league")+"-1"); 
      }else{
        AiData.set("league", 0);
        //console.log("比赛类型："+ object.get("league")+"-0"); 
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
        //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-0"); 
      }
      else if(prevHomeNameScore > prevGuestNameScore){
        AiData.set("prevresult", 1);
        //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-1"); 
      }
      else if(prevHomeNameScore < prevGuestNameScore){
        AiData.set("prevresult", 2);
        //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-2"); 
      }
      // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
      // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名

      if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
        continue;
      }
      // if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) && parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString())

      if(parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")) > parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, ""))){
        AiData.set("Rank",1);
        //console.log("排名："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"~"+object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"-1");
      }else{
        AiData.set("Rank",0);
        //console.log("排名："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"~"+object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "")+"-0");
      }

      // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
      // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
      // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
      let winTouzhuE = parseFloat(object.get("touzhue")[0]);
      let drawTouzhuE = parseFloat(object.get("touzhue")[1]);
      let loseTouzhuE = parseFloat(object.get("touzhue")[2]);
      if(winTouzhuE >= drawTouzhuE && winTouzhuE >= loseTouzhuE){
        AiData.set("maxtouzhu",0);
        //console.log("最大投注：主胜0");
      } else if(drawTouzhuE >= winTouzhuE && drawTouzhuE >= loseTouzhuE){ 
        AiData.set("maxtouzhu",1);
        //console.log("最大投注：平局1");
      } else if(loseTouzhuE >= winTouzhuE && loseTouzhuE >= drawTouzhuE){
        AiData.set("maxtouzhu",2);
        //console.log("最大投注：客胜2");
      }

      if(winTouzhuE <= drawTouzhuE && winTouzhuE <= loseTouzhuE){
        AiData.set("mintouzhu",0);
        //console.log("最小投注：主胜0");
      } else if(drawTouzhuE <= winTouzhuE && drawTouzhuE <= loseTouzhuE){ 
        AiData.set("mintouzhu",1);
        //console.log("最小投注：平局1");
      } else if(loseTouzhuE <= winTouzhuE && loseTouzhuE <= drawTouzhuE){
        AiData.set("mintouzhu",2);
        //console.log("最小投注：客胜2");
      }

      // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
      // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
      // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理

      let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
      let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
      let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));

      if(sanhuWinXinli >= sanhuDrawXinli && sanhuWinXinli >= sanhuLoseXinli){
        if(sanhuWinXinli == 33 &&  sanhuDrawXinli == 33){
          AiData.set("maxxinli",1);
          //console.log("散户感觉平局心理1");
        }else{
          AiData.set("maxxinli",0);
          //console.log("散户感觉主胜心理0");
        }
      }else if(sanhuDrawXinli >= sanhuWinXinli && sanhuDrawXinli >= sanhuLoseXinli){
        AiData.set("maxxinli",1);
        //console.log("散户感觉平局心理1");
      }else if(sanhuLoseXinli >= sanhuWinXinli && sanhuLoseXinli >= sanhuDrawXinli){
        AiData.set("maxxinli",2);
        //console.log("散户感觉客胜心理2");
      }

      if(sanhuWinXinli <= sanhuDrawXinli && sanhuWinXinli <= sanhuLoseXinli){
        if(sanhuWinXinli == 33 &&  sanhuDrawXinli == 33){
          AiData.set("minxinli",1);
          //console.log("散户感觉平局心理1");
        }else{
          AiData.set("minxinli",0);
          //console.log("散户感觉最不可能主胜心理0");
        }
      }else if(sanhuDrawXinli <= sanhuWinXinli && sanhuDrawXinli <= sanhuLoseXinli){
        AiData.set("minxinli",1);
        //console.log("散户感觉平局心理1");
      }else if(sanhuLoseXinli <= sanhuWinXinli && sanhuLoseXinli <= sanhuDrawXinli){
        AiData.set("minxinli",2);
        //console.log("散户感觉最不可能客胜心理2");
      }

      // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
      // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
      // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率

      let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
      let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
      let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));

      if(zhuangjiaWinXinli >= zhuangjiaDrawXinli && zhuangjiaWinXinli >= zhuangjiaLoseXinli){
        AiData.set("maxkaiju",0);
        //console.log("庄家开盘主胜概率0");
      }else if(zhuangjiaDrawXinli >= zhuangjiaWinXinli && zhuangjiaDrawXinli >= zhuangjiaLoseXinli){
        AiData.set("maxkaiju",1);
        //console.log("庄家开盘平局概率1");
      }else if(zhuangjiaLoseXinli >= zhuangjiaWinXinli && zhuangjiaLoseXinli >= zhuangjiaDrawXinli){
        AiData.set("maxkaiju",2);
        //console.log("庄家开盘客胜概率2");
      }


      // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
      // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
      // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率

      let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
      let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
      let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));

      if(liangduiWinLishi >= liangduiDrawLishi && liangduiWinLishi >= liangduiLoseLishi){
        if(liangduiWinLishi == 33 && liangduiDrawLishi == 33 ){
          AiData.set("maxlishi",1);
          //console.log("两队历史平局概率1");
        }
        else{
          AiData.set("maxlishi",0);
          //console.log("两队历史主队概率0");
        }
      }else if(liangduiDrawLishi >= liangduiWinLishi && liangduiDrawLishi >= liangduiLoseLishi){
        AiData.set("maxlishi",1);
        //console.log("两队历史平局概率1");
      }else if(liangduiLoseLishi >= liangduiWinLishi && liangduiLoseLishi >= liangduiDrawLishi){
        AiData.set("maxlishi",2);
        //console.log("两队历史客队概率2");
      }

      AiData.set("home_lishirangqiu", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史让球
      // console.log("两队历史让球" + parseFloat(object.get("changguiyapan").split(":")[0]));


      AiData.set("home_zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球
      // console.log("两队最近让球" + parseFloat(object.get("changguiyapan").split(":")[1]));

      
      AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
      // console.log("两队历史平均球数",parseFloat(object.get("changguiqiushu").split(":")[0]));
      AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
      // console.log("两队最近平均球数",parseFloat(object.get("changguiqiushu").split(":")[1]));
      

      AiData.set("home_zuijinqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
      // console.log("主队最近4场总进球数",parseFloat(object.get("qiushuAll")[0]));

      AiData.set("away_zuijinqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
      // console.log("客队最近4场总进球数",parseFloat(object.get("qiushuAll")[2]));

      AiData.set("home_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
      // console.log("主队最近4场最大进球数",parseFloat(object.get("qiushuAll")[1]));

      AiData.set("away_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数
      // console.log("客队最近4场最大进球数",parseFloat(object.get("qiushuAll")[3]));


      AiData.set("home_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
      // console.log("主队最近4场丢球数",parseFloat(object.get("qiushuAll")[4]));
      AiData.set("away_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数
      // console.log("客队最近4场丢球数",parseFloat(object.get("qiushuAll")[5]));


      // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
      // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
      let homehistoryscore = parseFloat(object.get("yapantouzhu")[10]);
      let guesthistoryscore = parseFloat(object.get("yapantouzhu")[11]);

      if(homehistoryscore == guesthistoryscore){
        AiData.set("historyscore",0);
        //console.log("主客历史平局0");
      }else if(homehistoryscore > guesthistoryscore){
        AiData.set("historyscore",1);
        //console.log("主客历史主胜1");
      }else{
        AiData.set("historyscore",2);
        //console.log("主客历史客胜2");
      }
      

      AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
      // console.log("主客最近5场平均进球数",parseFloat(object.get("qiushutouzhu")[2]));
     
      AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
      // console.log("主客最近4场平均丢球数",parseFloat(object.get("qiushutouzhu")[3]));

      AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
      // console.log("主客最近4场平均进球数",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4);
      

      AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
      AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2"))); //让球前
      //console.log("让球前",parseFloat(object.get("yapanpankou1")));
      //console.log("让球后",parseFloat(object.get("yapanpankou2")));


      AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
      AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2"))); //球数盘口前
      //console.log("球数盘口前",parseFloat(object.get("qiushupankou1")));
      //console.log("球数盘口后",parseFloat(object.get("qiushupankou2")));

      
      // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
      // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例

      let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
      let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);

      if(touzhuhomebili > touzhuguestbili){
        AiData.set("touzhuhome",1);
        //console.log("亚盘投注主队比例",1);
      }else{
        AiData.set("touzhuhome",0);
        //console.log("亚盘投注主队比例",0);
      }

      // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
      // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例

      let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
      let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);

      if(touzhudaqiubili > touzhuxiaoqiubili){
        AiData.set("touzhudaqiu",1)
      }else{ 
        AiData.set("touzhudaqiu",0)
      }

      // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
      // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
      let homeprevbisaiscore1 =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
      let homeprevbisaiscore2 = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
      if(homeprevbisaiscore1 == homeprevbisaiscore2){
        AiData.set("home_prevbisaiscore",0);
         //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-0");
      }else if (homeprevbisaiscore1 > homeprevbisaiscore2){
        AiData.set("home_prevbisaiscore",1);
        //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-1");
      }else if (homeprevbisaiscore1 < homeprevbisaiscore2){
        AiData.set("home_prevbisaiscore",2);
        //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-2");
      }
      
      let guestzuijinbisai1 =  parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
      let guestzuijinbisai2 = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
      if(guestzuijinbisai1 == guestzuijinbisai2){
        AiData.set("away_prevbisaiscore",0);
        //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-0");
      }else if (guestzuijinbisai1 > guestzuijinbisai2){
        AiData.set("away_prevbisaiscore",1);
        //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-1");
      }else if (guestzuijinbisai1 < guestzuijinbisai2){
        AiData.set("away_prevbisaiscore",2);
        //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-2");
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


      AiData.set("home_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
        // console.log("主队最近2场进球数"+parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]));

      AiData.set("away_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
        // console.log("客队最近2场进球数"+parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0]));


      AiData.set("home_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
      // console.log("主队最近2场丢球数"+parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]));
      AiData.set("away_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
      // console.log("客队最近2场丢球数"+parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1]));

      AiData.set("home_Twoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
      //console.log("主队最近两场情况",object.get("liangduiqiushu")[2]);
      AiData.set("away_Twoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩
      //console.log("客队最近两场情况",object.get("liangduiqiushu")[3]);
      AiData.set("home_zuijinvs",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场战绩
      //console.log("主客最近两场情况主场",parseFloat(object.get("liangduiqiushu")[4]));
      AiData.set("away_zuijinvs",parseFloat(object.get("liangduiqiushu")[5])); //客主最近两场战绩
      //console.log("主客最近两场情况客场",parseFloat(object.get("liangduiqiushu")[5]));
      
      //console.log("主客最近两场情况",object.get("liangduiqiushu")[4]);

      //console.log("-----------------------\r\n\r\n");
      await  AiData.save();
    count++;
      console.log("成功第", count, "条数据");
    }
  
  }
  console.log("成功条数:",count);
  return data;

});

  