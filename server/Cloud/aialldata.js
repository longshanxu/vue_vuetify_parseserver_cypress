///清理数据
Parse.Cloud.define("cleandata", async () => {
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
        let AiDataObject = Parse.Object.extend("AiData");
        let AiData = new AiDataObject();

        //console.log( object.get("home")+" VS "+ object.get("guest")); 
  
        let homeScore = parseFloat(object.get("homeScore"));
        let guestScore = parseFloat(object.get("guestScore"));

        //这个result是针对盘口进行的判定，输赢是指让球方
      
          if(homeScore == guestScore){
            AiData.set("result", 1);
            //console.log("比赛结果："+homeScore+":"+guestScore +"-1" ); 
          }
          else if(homeScore > guestScore){
            AiData.set("result", 3);
            //console.log("比赛结果："+homeScore+":"+guestScore+"-3"); 
          }
          else if(homeScore < guestScore){
            AiData.set("result", 0);
            //console.log("比赛结果："+homeScore+":"+guestScore+"-0"); 
          }
        
       
  
        // let league = object.get("league");
        // if(league.indexOf("杯") > -1){
        //   AiData.set("league", 1);
        //   //console.log("比赛类型："+ object.get("league")+"-1"); 
        // }else{
        //   AiData.set("league", 0);
        //   //console.log("比赛类型："+ object.get("league")+"-0"); 
        // }

        let matchId = object.get("matchId");
        AiData.set("matchId", matchId);

        let matchTime = object.get("matchTime");
        AiData.set("matchTime", matchTime);
        
        let date = object.get("date");
        AiData.set("date", date);


        let kailiresult = object.get("kailiresult"); 
        if(kailiresult && kailiresult.length>0){
          let temp = 0;
          for (let index = 0; index < kailiresult.length; index++) {
            const element = kailiresult[index];
            if(element == "胜"){
              temp+=3;
            }else if(element == "平"){
              temp+=1;
            }else if(element == "负"){
              temp+=0;
            }
          }
          AiData.set("kailiresult",temp);
          //console.log("拿到凯利的值",temp);
        }else{
          AiData.set("kailiresult",-1);
          //console.log("没有拿到凯利的值",-1);
        }
  
        // AiData.set("prevHomeNameScore", parseFloat(object.get("liangduibisai")[3])); //上一次比赛 主队进球数
        // AiData.set("prevGuestNameScore", parseFloat(object.get("liangduibisai")[4])); //上一次比赛 客队进球数
        let prevHomeNameScore = object.get("liangduibisai")[1] == object.get("home") ? object.get("liangduibisai")[3] :object.get("liangduibisai")[4];
        let prevGuestNameScore = object.get("liangduibisai")[2] == object.get("guest") ? object.get("liangduibisai")[4] :object.get("liangduibisai")[3];
       
     
        if(prevHomeNameScore == prevGuestNameScore){
          AiData.set("prevresult", 1);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-1"); 
        }
        else if(prevHomeNameScore > prevGuestNameScore){
          AiData.set("prevresult", 3);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-3"); 
        }
        else if(prevHomeNameScore < prevGuestNameScore){
          AiData.set("prevresult", 0);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-0"); 
        }
        // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
        // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名
  
        if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
          continue;
        }

        // let homeRank = parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));
        // let guestRank = parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));

        // AiData.set("Rank", homeRank-guestRank); //主客队的排名差

      
        // if(isNaN(homeRank-guestRank)){
        //   //console.log("主客队的排名差："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));
        // }
        // //console.log("主客队的排名差："+ (homeRank-guestRank));
  
        // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
        // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
        // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
        let winTouzhuE = parseInt(object.get("touzhue")[0]);
        let drawTouzhuE = parseInt(object.get("touzhue")[1]);
        let loseTouzhuE = parseInt(object.get("touzhue")[2]);
     
        AiData.set("winTouzhuE",winTouzhuE);
        //console.log("散户押注主胜的金额"+winTouzhuE);
    
        AiData.set("drawTouzhuE", drawTouzhuE);
        //console.log("散户押注平局的金额"+drawTouzhuE);
      
        AiData.set("loseTouzhuE", loseTouzhuE);
        //console.log("散户押注客胜的金额"+loseTouzhuE);

  
        // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
        // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
        // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理
  
        // let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
        // let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
        // let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));
  
        // AiData.set("sanhuWinXinli", sanhuWinXinli);
        // //console.log("散户感觉主胜心理"+sanhuWinXinli);
        // AiData.set("sanhuDrawXinli", sanhuDrawXinli);
        // //console.log("散户感觉平局心理"+sanhuDrawXinli);
        // AiData.set("sanhuLoseXinli", sanhuLoseXinli);
        // //console.log("散户感觉客胜心理"+sanhuLoseXinli);

  
        // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
        // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
        // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率
  
        let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
        let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
        let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));
        
        AiData.set("zhuangjiaWinXinli", zhuangjiaWinXinli);
        //console.log("庄家开盘主胜概率"+zhuangjiaWinXinli);
        AiData.set("zhuangjiaDrawXinli", zhuangjiaDrawXinli);
        //console.log("庄家开盘平局概率"+zhuangjiaDrawXinli);
        AiData.set("zhuangjiaLoseXinli", zhuangjiaLoseXinli);
        //console.log("庄家开盘客胜概率"+zhuangjiaLoseXinli);
  
  
        // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
        // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
        // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率
  
        let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
        let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
        let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));
        
        AiData.set("liangduiWinLishi", liangduiWinLishi);
        //console.log("两队历史主队概率"+liangduiWinLishi);
        AiData.set("liangduiDrawLishi", liangduiDrawLishi);
        //console.log("两队历史平局概率"+liangduiDrawLishi);
        AiData.set("liangduiLoseLishi", liangduiLoseLishi);
        //console.log("两队历史客队概率"+liangduiLoseLishi);

        // let hebingWin = sanhuWinXinli - zhuangjiaWinXinli 
        // let hebingDraw = sanhuDrawXinli - zhuangjiaDrawXinli 
        // let hebingLose = sanhuLoseXinli - zhuangjiaLoseXinli 

        // AiData.set("hebingWin", hebingWin);
        // //console.log("合并主胜概率"+hebingWin);
        // AiData.set("hebingDraw", hebingDraw);
        // //console.log("合并平局概率"+hebingDraw);
        // AiData.set("hebingLose", hebingLose);
        // //console.log("合并客胜概率"+hebingLose);

  
        AiData.set("lishirangqiuchai", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史球数差
        //console.log("历史让球数差",parseFloat(object.get("changguiyapan").split(":")[0]));
        // AiData.set("home_zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球

        
        AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
        //console.log("历史平均球数",parseFloat(object.get("changguiqiushu").split(":")[0]));
        // AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
        
  
        // AiData.set("home_zuijinqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
        // AiData.set("away_zuijinqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
        
        // let fourjinqiucha = parseFloat(object.get("qiushuAll")[0]) - parseFloat(object.get("qiushuAll")[2]);
        // AiData.set("fourjinqiucha",fourjinqiucha); //主客队最近4场总进球数差

  
        // AiData.set("home_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
        // AiData.set("away_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数

        // let fourmaxqiucha = parseFloat(object.get("qiushuAll")[1]) - parseFloat(object.get("qiushuAll")[3]);
        // AiData.set("fourmaxqiucha",fourmaxqiucha); //主客队最近4场最大进球数差


  
        // AiData.set("home_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
        // AiData.set("away_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数

        // let fourdiuqiucha = parseFloat(object.get("qiushuAll")[4]) - parseFloat(object.get("qiushuAll")[5]);
        // AiData.set("fourdiuqiucha",fourdiuqiucha); //主客队最近4场丢球数差
  
  
        // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
        // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
        // let homehistoryscore = parseFloat(object.get("yapantouzhu")[10]);
        // let guesthistoryscore = parseFloat(object.get("yapantouzhu")[11]);

        // if(homehistoryscore == guesthistoryscore){
        //   AiData.set("historyscore",1);
        //   //console.log("主客历史平局1");
        // }else if(homehistoryscore > guesthistoryscore){
        //   AiData.set("historyscore",3);
        //   //console.log("主客历史主胜3");
        // }else{
        //   AiData.set("historyscore",0);
        //   //console.log("主客历史客胜0");
        // }
        
        
  
        // AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
        // //console.log("主客最近5场平均进球数",parseFloat(object.get("qiushutouzhu")[2]));
       
        // AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
        // //console.log("主客最近4场平均丢球数",parseFloat(object.get("qiushutouzhu")[3]));
  
        // AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
        // //console.log("主客最近4场平均进球数",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4);
        

        AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
        //console.log("让球前",parseFloat(object.get("yapanpankou1")));
        // AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2"))); //让球前

        let rangqiuqian = parseFloat(object.get("yapanpankou1"));
        let rangqiuhou = parseFloat(object.get("yapanpankou2"));

        AiData.set("rangqiufangxiang",rangqiuqian > 0 ? 1 : 2); //让球方向
        //console.log("让球方向",rangqiuqian > 0 ? 1 : 2);
     
        AiData.set("rangqiuchai",Math.abs(rangqiuqian - rangqiuhou));
        //console.log("让球差",Math.abs(rangqiuqian - rangqiuhou));

        if(rangqiuqian > rangqiuhou){
          AiData.set("panstate", 0); //让球
          //console.log("降盘",1);
        }else if (rangqiuqian == rangqiuhou){
          AiData.set("panstate", 1); //让球
          //console.log("没变",2);
        }else{
          AiData.set("panstate", 2); //让球
          //console.log("升盘",2);
        }


        AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
        //console.log("球数盘口前",parseFloat(object.get("qiushupankou1")));
        // AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2"))); //球数盘口前

        let qiushuqian = parseFloat(object.get("yapanpankou1"));
        let qiushuhou = parseFloat(object.get("yapanpankou2"));


        
        if(qiushuqian > qiushuhou){
          AiData.set("qiustate", 0); //让球
          //console.log("球数降盘",1);
        }else if (qiushuqian == qiushuhou){
          AiData.set("qiustate", 1); //让球
          //console.log("球数没变",2);
        }else{
          AiData.set("qiustate", 2); //让球
          //console.log("球数升盘",2);
        }
       

        
        // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
        // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例
  
        // let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
        // let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);

        // AiData.set("home_touzhu",touzhuhomebili);
        // AiData.set("guest_touzhu",touzhuguestbili);

        // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
        // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例
  
        // let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
        // let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);
        
        // AiData.set("daqiubili",touzhudaqiubili);
        // AiData.set("xiaoqiubili",touzhuxiaoqiubili);

  
        // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
        // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
        let homeprevbisaiscore1 =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
        let homeprevbisaiscore2 = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        let homescoreprev = 0;
        if(homeprevbisaiscore1 == homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",1);
          homescoreprev = 1;
           //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-1");
        }else if (homeprevbisaiscore1 > homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",3);
          homescoreprev = 3;
          //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-3");
        }else if (homeprevbisaiscore1 < homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",0);
          homescoreprev = 0;
          //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-0");
        }


        
        let guestzuijinbisai1 =  parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
        let guestzuijinbisai2 = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        
        let guestscoreprev = 0;
        if(guestzuijinbisai1 == guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",1);
          guestscoreprev = 1;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-1");
        }else if (guestzuijinbisai1 > guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",3);
          guestscoreprev = 3;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-3");
        }else if (guestzuijinbisai1 < guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",0);
          guestscoreprev = 0;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-0");
        }

        AiData.set("scoreprev",homescoreprev - guestscoreprev); //上一场比赛主客队胜负差
        //console.log("上一场比赛主客队胜负差",homescoreprev - guestscoreprev);


        // // AiData.set("homeprevbisaijiqiu",parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3])); //主队上一场比赛丢球
        // // AiData.set("guestprevbisaijiqiu",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3])); //客队上一场比赛丢球
        // let homeprevbisaijiqiu = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        // let guestprevbisaijiqiu = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        
        // AiData.set("bisaidiuqiustate",homeprevbisaijiqiu - guestprevbisaijiqiu); //主客队上一场比赛丢球差
        // //console.log("主客队上一场比赛丢球差",homeprevbisaijiqiu - guestprevbisaijiqiu);

  
        // AiData.set("home_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
        // AiData.set("away_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
               
        // let home_Twojinqiushu = parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]);
        // let away_Twojinqiushu = parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0]);
        // AiData.set("Twojinqiushustate",home_Twojinqiushu - away_Twojinqiushu); //主客队最近2场进球差
      
  
        // AiData.set("home_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
        // AiData.set("away_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
       
        // let home_Twodiuqiushu = parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]);
        // let away_Twodiuqiushu = parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1]);
        // AiData.set("Twodiuqiushustate",home_Twodiuqiushu - away_Twodiuqiushu); //主客队最近2场丢球差
       
        // AiData.set("home_Twoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
        // AiData.set("away_Twoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩

        let home_Twoshuying = object.get("liangduiqiushu")[2];
        let away_Twoshuying = object.get("liangduiqiushu")[3];
        AiData.set("Twoshuyingstate", parseFloat((home_Twoshuying - away_Twoshuying).toFixed(1))); //主客最近两场战绩差
        //console.log("主客最近两场战绩差",(home_Twoshuying - away_Twoshuying).toFixed(1));

        
        // AiData.set("home_zuijinvs",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场情况主场差
       // AiData.set("away_zuijinvs",parseFloat(object.get("liangduiqiushu")[5])); //主客最近两场情况客场差
     
        let home_zuijinvs = object.get("liangduiqiushu")[4];
        let away_zuijinvs = object.get("liangduiqiushu")[5];
        AiData.set("zuijinvsstate",home_zuijinvs - away_zuijinvs); //主客最近两场主客场战绩差
        //console.log("主客最近两场主客场战绩差",home_zuijinvs - away_zuijinvs);
 
        //console.log("-----------------------\r\n\r\n");

        await  AiData.save();

        count++;
        console.log("成功第", count, "条数据");
      }
    }
    console.log("成功条数:",count);
    return data;
  });


  //加载需要决策的数据
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
    queryMoneyResult.equalTo("date", "2023-08-11");
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
        //console.log( object.get("home") + " VS " + object.get("guest"));

        
        // let league = object.get("league");
        // if(league.indexOf("杯") > -1){
        //   AiData.set("league", 1);
        //   //console.log("比赛类型："+ object.get("league")+"-1"); 
        // }else{
        //   AiData.set("league", 0);
        //   //console.log("比赛类型："+ object.get("league")+"-0"); 
        // }

        let matchId = object.get("matchId");
        AiData.set("matchId", matchId);

        let matchTime = object.get("matchTime");
        AiData.set("matchTime", matchTime);
        
        let date = object.get("date");
        AiData.set("date", date);


        let kailiresult = object.get("kailiresult"); 
        if(kailiresult && kailiresult.length>0){
          let temp = 0;
          for (let index = 0; index < kailiresult.length; index++) {
            const element = kailiresult[index];
            if(element == "胜"){
              temp+=3;
            }else if(element == "平"){
              temp+=1;
            }else if(element == "负"){
              temp+=0;
            }
          }
          AiData.set("kailiresult",temp);
          //console.log("拿到凯利的值",temp);
        }else{
          AiData.set("kailiresult",-1);
          //console.log("没有拿到凯利的值",-1);
        }
  
        // AiData.set("prevHomeNameScore", parseFloat(object.get("liangduibisai")[3])); //上一次比赛 主队进球数
        // AiData.set("prevGuestNameScore", parseFloat(object.get("liangduibisai")[4])); //上一次比赛 客队进球数
        let prevHomeNameScore = object.get("liangduibisai")[1] == object.get("home") ? object.get("liangduibisai")[3] :object.get("liangduibisai")[4];
        let prevGuestNameScore = object.get("liangduibisai")[2] == object.get("guest") ? object.get("liangduibisai")[4] :object.get("liangduibisai")[3];
       
     
        if(prevHomeNameScore == prevGuestNameScore){
          AiData.set("prevresult", 1);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-1"); 
        }
        else if(prevHomeNameScore > prevGuestNameScore){
          AiData.set("prevresult", 3);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-3"); 
        }
        else if(prevHomeNameScore < prevGuestNameScore){
          AiData.set("prevresult", 0);
          //console.log("上一场比赛结果："+ prevHomeNameScore+":"+prevGuestNameScore+"-0"); 
        }
        // AiData.set("homeRank",object.get("sanhuxinli")[3].toString().split("~")[0]); //主队排名
        // AiData.set("guestRank", object.get("sanhuxinli")[3].toString().split("~")[1]); //客队排名
  
        if(object.get("sanhuxinli")[3].toString().split("~")[0] == "" || object.get("sanhuxinli")[3].toString().split("~")[1] == ""){
          continue;
        }

        // let homeRank = parseFloat(object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));
        // let guestRank = parseFloat(object.get("sanhuxinli")[3].toString().split("~")[1].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));

        // AiData.set("Rank", homeRank-guestRank); //主客队的排名差

      
        // if(isNaN(homeRank-guestRank)){
        //   //console.log("主客队的排名差："+ object.get("sanhuxinli")[3].toString().split("~")[0].toString().replace(/[\u4e00-\u9fa5-]/g, "").replace(/[a-zA-Z]/g, ""));
        // }
        // //console.log("主客队的排名差："+ (homeRank-guestRank));
  
        // AiData.set("winTouzhuE", parseFloat(object.get("touzhue")[0]) > 130 ? 180 : 33); //散户押注主胜的金额
        // AiData.set("drawTouzhuE", parseFloat(object.get("touzhue")[1]) > 130 ? 180 : 33); //散户押注平局的金额
        // AiData.set("loseTouzhuE", parseFloat(object.get("touzhue")[2]) > 130 ? 180 : 33); //散户押注客胜的金额
        let winTouzhuE = parseInt(object.get("touzhue")[0]);
        let drawTouzhuE = parseInt(object.get("touzhue")[1]);
        let loseTouzhuE = parseInt(object.get("touzhue")[2]);
     
        AiData.set("winTouzhuE",winTouzhuE);
        //console.log("散户押注主胜的金额"+winTouzhuE);
    
        AiData.set("drawTouzhuE", drawTouzhuE);
        //console.log("散户押注平局的金额"+drawTouzhuE);
      
        AiData.set("loseTouzhuE", loseTouzhuE);
        //console.log("散户押注客胜的金额"+loseTouzhuE);

  
        // AiData.set("sanhuWinXinli", parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""))); //散户感觉主胜心理
        // AiData.set("sanhuDrawXinli", parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""))); //散户感觉平局心理
        // AiData.set("sanhuLoseXinli", parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""))); //散户感觉客胜心理
  
        // let sanhuWinXinli = parseFloat(object.get("sanhuxinli")[0].toString().replace("%",""));
        // let sanhuDrawXinli = parseFloat(object.get("sanhuxinli")[1].toString().replace("%",""));
        // let sanhuLoseXinli = parseFloat(object.get("sanhuxinli")[2].toString().replace("%",""));
  
        // AiData.set("sanhuWinXinli", sanhuWinXinli);
        // //console.log("散户感觉主胜心理"+sanhuWinXinli);
        // AiData.set("sanhuDrawXinli", sanhuDrawXinli);
        // //console.log("散户感觉平局心理"+sanhuDrawXinli);
        // AiData.set("sanhuLoseXinli", sanhuLoseXinli);
        // //console.log("散户感觉客胜心理"+sanhuLoseXinli);

  
        // AiData.set("zhuangjiaWinXinli", parseFloat(object.get("kaijuresult")[0].toString().replace("%",""))); //庄家开盘主胜概率
        // AiData.set("zhuangjiaDrawXinli", parseFloat(object.get("kaijuresult")[1].toString().replace("%",""))); //庄家开盘平局概率
        // AiData.set("zhuangjiaLoseXinli", parseFloat(object.get("kaijuresult")[2].toString().replace("%",""))); //庄家开盘客胜概率
  
        let zhuangjiaWinXinli = parseFloat(object.get("kaijuresult")[0].toString().replace("%",""));
        let zhuangjiaDrawXinli = parseFloat(object.get("kaijuresult")[1].toString().replace("%",""));
        let zhuangjiaLoseXinli = parseFloat(object.get("kaijuresult")[2].toString().replace("%",""));
        
        AiData.set("zhuangjiaWinXinli", zhuangjiaWinXinli);
        //console.log("庄家开盘主胜概率"+zhuangjiaWinXinli);
        AiData.set("zhuangjiaDrawXinli", zhuangjiaDrawXinli);
        //console.log("庄家开盘平局概率"+zhuangjiaDrawXinli);
        AiData.set("zhuangjiaLoseXinli", zhuangjiaLoseXinli);
        //console.log("庄家开盘客胜概率"+zhuangjiaLoseXinli);
  
  
        // AiData.set("liangduiWinLishi", parseFloat(object.get("liangduilishi")[0].toString().replace("%",""))); //两队历史主队概率
        // AiData.set("liangduiDrawLishi", parseFloat(object.get("liangduilishi")[1].toString().replace("%",""))); //两队历史平局概率
        // AiData.set("liangduiLoseLishi", parseFloat(object.get("liangduilishi")[2].toString().replace("%",""))); //两队历史客队概率
  
        let liangduiWinLishi = parseFloat(object.get("liangduilishi")[0].toString().replace("%",""));
        let liangduiDrawLishi = parseFloat(object.get("liangduilishi")[1].toString().replace("%",""));
        let liangduiLoseLishi = parseFloat(object.get("liangduilishi")[2].toString().replace("%",""));
        
        AiData.set("liangduiWinLishi", liangduiWinLishi);
        //console.log("两队历史主队概率"+liangduiWinLishi);
        AiData.set("liangduiDrawLishi", liangduiDrawLishi);
        //console.log("两队历史平局概率"+liangduiDrawLishi);
        AiData.set("liangduiLoseLishi", liangduiLoseLishi);
        //console.log("两队历史客队概率"+liangduiLoseLishi);

        // let hebingWin = sanhuWinXinli - zhuangjiaWinXinli 
        // let hebingDraw = sanhuDrawXinli - zhuangjiaDrawXinli 
        // let hebingLose = sanhuLoseXinli - zhuangjiaLoseXinli 

        // AiData.set("hebingWin", hebingWin);
        // //console.log("合并主胜概率"+hebingWin);
        // AiData.set("hebingDraw", hebingDraw);
        // //console.log("合并平局概率"+hebingDraw);
        // AiData.set("hebingLose", hebingLose);
        // //console.log("合并客胜概率"+hebingLose);

  
        AiData.set("lishirangqiuchai", parseFloat(object.get("changguiyapan").split(":")[0])); //两队历史球数差
        //console.log("历史让球数差",parseFloat(object.get("changguiyapan").split(":")[0]));
        // AiData.set("home_zuijinrangqiu", parseFloat(object.get("changguiyapan").split(":")[1])); //两队最近让球

        
        AiData.set("lishiqiushu", parseFloat(object.get("changguiqiushu").split(":")[0])); //两队历史平均球数
        //console.log("历史平均球数",parseFloat(object.get("changguiqiushu").split(":")[0]));
        // AiData.set("zuijinqiushu", parseFloat(object.get("changguiqiushu").split(":")[1])); //两队最近平均球数
        
  
        // AiData.set("home_zuijinqiushu",parseFloat(object.get("qiushuAll")[0])); //主队最近4场总进球数
        // AiData.set("away_zuijinqiushu",parseFloat(object.get("qiushuAll")[2])); //客队最近4场总进球数
        
        // let fourjinqiucha = parseFloat(object.get("qiushuAll")[0]) - parseFloat(object.get("qiushuAll")[2]);
        // AiData.set("fourjinqiucha",fourjinqiucha); //主客队最近4场总进球数差

  
        // AiData.set("home_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[1])); //主队最近4场最大进球数
        // AiData.set("away_zuijinmaxqiushu",parseFloat(object.get("qiushuAll")[3])); //客队最近4场最大进球数

        // let fourmaxqiucha = parseFloat(object.get("qiushuAll")[1]) - parseFloat(object.get("qiushuAll")[3]);
        // AiData.set("fourmaxqiucha",fourmaxqiucha); //主客队最近4场最大进球数差


  
        // AiData.set("home_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[4])); //主队最近4场丢球数
        // AiData.set("away_zuijindiuqiushu",parseFloat(object.get("qiushuAll")[5])); //客队最近4场丢球数

        // let fourdiuqiucha = parseFloat(object.get("qiushuAll")[4]) - parseFloat(object.get("qiushuAll")[5]);
        // AiData.set("fourdiuqiucha",fourdiuqiucha); //主客队最近4场丢球数差
  
  
        // AiData.set("homehistoryscore",parseFloat(object.get("yapantouzhu")[10])); //主客历史主队主场进球数
        // AiData.set("guesthistoryscore",parseFloat(object.get("yapantouzhu")[11])); //主客历史客队客场进球数
        // let homehistoryscore = parseFloat(object.get("yapantouzhu")[10]);
        // let guesthistoryscore = parseFloat(object.get("yapantouzhu")[11]);

        // if(homehistoryscore == guesthistoryscore){
        //   AiData.set("historyscore",1);
        //   //console.log("主客历史平局1");
        // }else if(homehistoryscore > guesthistoryscore){
        //   AiData.set("historyscore",3);
        //   //console.log("主客历史主胜3");
        // }else{
        //   AiData.set("historyscore",0);
        //   //console.log("主客历史客胜0");
        // }
        
        
  
        // AiData.set("fiveavgjinqiushu",parseFloat(object.get("qiushutouzhu")[2])); //主客最近5场平均进球数
        // //console.log("主客最近5场平均进球数",parseFloat(object.get("qiushutouzhu")[2]));
       
        // AiData.set("fouravgdiuqiushu",parseFloat(object.get("qiushutouzhu")[3])); //主客最近4场平均丢球数
        // //console.log("主客最近4场平均丢球数",parseFloat(object.get("qiushutouzhu")[3]));
  
        // AiData.set("fouravgjinqiushu",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4); //主客最近4场平均进球数
        // //console.log("主客最近4场平均进球数",(object.get("qiushuAll")[0] + object.get("qiushuAll")[2])/4);
        

        AiData.set("rangqiuqian",parseFloat(object.get("yapanpankou1"))); //让球前
        //console.log("让球前",parseFloat(object.get("yapanpankou1")));
        // AiData.set("rangqiuhou",parseFloat(object.get("yapanpankou2"))); //让球前

        let rangqiuqian = parseFloat(object.get("yapanpankou1"));
        let rangqiuhou = parseFloat(object.get("yapanpankou2"));

        AiData.set("rangqiufangxiang",rangqiuqian > 0 ? 1 : 2); //让球方向
        //console.log("让球方向",rangqiuqian > 0 ? 1 : 2);
     
        AiData.set("rangqiuchai",Math.abs(rangqiuqian - rangqiuhou));
        //console.log("让球差",Math.abs(rangqiuqian - rangqiuhou));

        if(rangqiuqian > rangqiuhou){
          AiData.set("panstate", 0); //让球
          //console.log("降盘",1);
        }else if (rangqiuqian == rangqiuhou){
          AiData.set("panstate", 1); //让球
          //console.log("没变",2);
        }else{
          AiData.set("panstate", 2); //让球
          //console.log("升盘",2);
        }


        AiData.set("qiushuqian",parseFloat(object.get("qiushupankou1"))); //球数盘口前
        //console.log("球数盘口前",parseFloat(object.get("qiushupankou1")));
        // AiData.set("qiushuhou",parseFloat(object.get("qiushupankou2"))); //球数盘口前

        let qiushuqian = parseFloat(object.get("yapanpankou1"));
        let qiushuhou = parseFloat(object.get("yapanpankou2"));


        
        if(qiushuqian > qiushuhou){
          AiData.set("qiustate", 0); //让球
          //console.log("球数降盘",1);
        }else if (qiushuqian == qiushuhou){
          AiData.set("qiustate", 1); //让球
          //console.log("球数没变",2);
        }else{
          AiData.set("qiustate", 2); //让球
          //console.log("球数升盘",2);
        }
       

        
        // AiData.set("touzhuhomebili",parseFloat(object.get("yapantouzhu")[0]) >= 80 ? 1 : 0); //投注主队比例
        // AiData.set("touzhuguestbili",parseFloat(object.get("yapantouzhu")[1]) >= 80 ? 1 : 0); //投注客队比例
  
        // let touzhuhomebili = parseFloat(object.get("yapantouzhu")[0]);
        // let touzhuguestbili = parseFloat(object.get("yapantouzhu")[1]);

        // AiData.set("home_touzhu",touzhuhomebili);
        // AiData.set("guest_touzhu",touzhuguestbili);

        // AiData.set("touzhudaqiubili",parseFloat(object.get("qiushutouzhu")[0])>= 100 ? 1 : 0); //投注大球比例
        // AiData.set("touzhuxiaoqiubili",parseFloat(object.get("qiushutouzhu")[1])>= 100 ? 1 : 0); //投注小球比例
  
        // let touzhudaqiubili = parseFloat(object.get("qiushutouzhu")[0]);
        // let touzhuxiaoqiubili = parseFloat(object.get("qiushutouzhu")[1]);
        
        // AiData.set("daqiubili",touzhudaqiubili);
        // AiData.set("xiaoqiubili",touzhuxiaoqiubili);

  
        // AiData.set("homeprevbisaiscore", parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4])); //主队上一场比赛进球
        // AiData.set("guestprevbisaiscore",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4])); //客队上一场比赛进球
        let homeprevbisaiscore1 =  parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[3] :object.get("homezuijinbisai")[4]);
        let homeprevbisaiscore2 = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        let homescoreprev = 0;
        if(homeprevbisaiscore1 == homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",1);
          homescoreprev = 1;
           //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-1");
        }else if (homeprevbisaiscore1 > homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",3);
          homescoreprev = 3;
          //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-3");
        }else if (homeprevbisaiscore1 < homeprevbisaiscore2){
          // AiData.set("home_prevbisaiscore",0);
          homescoreprev = 0;
          //console.log("主队上一场比赛"+homeprevbisaiscore1+":"+homeprevbisaiscore2+"-0");
        }


        
        let guestzuijinbisai1 =  parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[3] :object.get("guestzuijinbisai")[4]);
        let guestzuijinbisai2 = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        
        let guestscoreprev = 0;
        if(guestzuijinbisai1 == guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",1);
          guestscoreprev = 1;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-1");
        }else if (guestzuijinbisai1 > guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",3);
          guestscoreprev = 3;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-3");
        }else if (guestzuijinbisai1 < guestzuijinbisai2){
          // AiData.set("away_prevbisaiscore",0);
          guestscoreprev = 0;
          //console.log("客队上一场比赛"+guestzuijinbisai1+":"+guestzuijinbisai2+"-0");
        }

        AiData.set("scoreprev",homescoreprev - guestscoreprev); //上一场比赛主客队胜负差
        //console.log("上一场比赛主客队胜负差",homescoreprev - guestscoreprev);


        // // AiData.set("homeprevbisaijiqiu",parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3])); //主队上一场比赛丢球
        // // AiData.set("guestprevbisaijiqiu",parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3])); //客队上一场比赛丢球
        // let homeprevbisaijiqiu = parseFloat(object.get("homezuijinbisai")[1] == object.get("home") ? object.get("homezuijinbisai")[4] :object.get("homezuijinbisai")[3]);
        // let guestprevbisaijiqiu = parseFloat(object.get("guestzuijinbisai")[1] == object.get("guest") ? object.get("guestzuijinbisai")[4] :object.get("guestzuijinbisai")[3]);
        
        // AiData.set("bisaidiuqiustate",homeprevbisaijiqiu - guestprevbisaijiqiu); //主客队上一场比赛丢球差
        // //console.log("主客队上一场比赛丢球差",homeprevbisaijiqiu - guestprevbisaijiqiu);

  
        // AiData.set("home_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0])); //主队最近2场进球数
        // AiData.set("away_Twojinqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0])); //客队最近2场进球数
               
        // let home_Twojinqiushu = parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[0]);
        // let away_Twojinqiushu = parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[0]);
        // AiData.set("Twojinqiushustate",home_Twojinqiushu - away_Twojinqiushu); //主客队最近2场进球差
      
  
        // AiData.set("home_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1])); //主队最近2场丢球数
        // AiData.set("away_Twodiuqiushu",parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1])); //客队最近2场丢球数
       
        // let home_Twodiuqiushu = parseFloat(object.get("liangduiqiushu")[0].toString().split("-")[1]);
        // let away_Twodiuqiushu = parseFloat(object.get("liangduiqiushu")[1].toString().split("-")[1]);
        // AiData.set("Twodiuqiushustate",home_Twodiuqiushu - away_Twodiuqiushu); //主客队最近2场丢球差
       
        // AiData.set("home_Twoshuying",parseFloat(object.get("liangduiqiushu")[2])); //主队最近2场战绩
        // AiData.set("away_Twoshuying",parseFloat(object.get("liangduiqiushu")[3])); //客队最近2场战绩

        let home_Twoshuying = object.get("liangduiqiushu")[2];
        let away_Twoshuying = object.get("liangduiqiushu")[3];
        AiData.set("Twoshuyingstate", parseFloat((home_Twoshuying - away_Twoshuying).toFixed(1))); //主客最近两场战绩差
        //console.log("主客最近两场战绩差",(home_Twoshuying - away_Twoshuying).toFixed(1));

        
        // AiData.set("home_zuijinvs",parseFloat(object.get("liangduiqiushu")[4])); //主客最近两场情况主场差
       // AiData.set("away_zuijinvs",parseFloat(object.get("liangduiqiushu")[5])); //主客最近两场情况客场差
     
        let home_zuijinvs = object.get("liangduiqiushu")[4];
        let away_zuijinvs = object.get("liangduiqiushu")[5];
        AiData.set("zuijinvsstate",home_zuijinvs - away_zuijinvs); //主客最近两场主客场战绩差
        //console.log("主客最近两场主客场战绩差",home_zuijinvs - away_zuijinvs);
 
        //console.log("-----------------------\r\n\r\n");


        await  AiData.save();
      count++;
        console.log("成功加载第", count, "条数据");
      }
     
      }
    console.log("成功条数:",count);
    return data;
  });