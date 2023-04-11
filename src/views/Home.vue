<!--
 * @Author: Json.Xu
 * @Date: 2020-02-28 10:17:06
 * @LastEditTime: 2023-04-11 10:34:51
 * @LastEditors: longshanxu 623119632@qq.com
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver_cypress\src\views\Home.vue
 -->
<template>
  <v-container class="fill-height grey lighten-3 pa-0" fluid>
    <v-app-bar dark app fixed color="primary" dense>
      <v-icon @dblclick="cpu" color="green">mdi-crane</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">只此一眼，便是万年
        {{ count == 0 ? "" : "( " + count + " )" }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="asyncData" color="red">mdi-hand-heart</v-icon>
      <template v-slot:extension>
        <v-tabs v-model="currentItem" center-active slider-color="white" show-arrows @change="changevalue">
          <v-tab i="0">初衷</v-tab>
          <v-tab i="9">某彩</v-tab>
          <v-tab i="10">北单</v-tab>
          <v-tab i="11">碾压局</v-tab>
          <v-tab i="12">闹0区</v-tab>
          <v-tab i="13">极端场</v-tab>
          <v-tab i="14">态盘</v-tab>
          <v-tab i="15">裂球</v-tab>
          <v-tab i="16">爆冷</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main class="fill-height grey lighten-3 align-start justify-start">
      <v-card class="pa-0 ma-2 cardclass" rounded v-for="(item, index) in datalist" :key="index">
        <v-row dense class="ma-0">
          <v-col style="text-align: center; font-weight: 700" cols="4">{{
            item.home && item.home.substr(0, 6)
          }}</v-col>
          <v-col style="text-align: center; font-size: 12px" cols="4">({{ item.league }})<br />
          </v-col>
          <v-col style="text-align: center; font-weight: 700" cols="4">{{ item.guest.substr(0, 6) }}
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px" cols="4">
            时间：
            <span style="font-size: 14px">{{
              item.matchTime.substr(10, 6)
            }}</span>
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="4">
            状态：
            <span style="font-size: 14px">{{ item.displayState }}</span>
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="4">
            比分：
            <span style="font-size: 14px" v-show="isshowbifen">{{
              item.homeScore + ":" + item.guestScore
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            两队交战:
          </v-col>
          <v-col style="text-align: left; font-size: 14px" cols="9" class="px-0">
            <span style="color:red">{{
              item.sanhuxinli && item.sanhuxinli[4]
            }}</span>
            <br />
            <span style="font-size: 14px">
              {{
                item.liangduibisai &&
                item.liangduibisai.length > 0 &&
                item.liangduibisai[0].toString().split(" ")[0] +
                "(" +
                item.liangduibisai[5] +
                ")," +
                item.liangduibisai[1].substr(0, 3) +
                " VS " +
                item.liangduibisai[2].substr(0, 3) +
                "," +
                item.liangduibisai[3] +
                ":" +
                item.liangduibisai[4]
              }}
            </span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px" cols="3">
            凯利预测:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0">
            <span style="font-size: 14px">{{ item.kailiresult }} </span>
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            体彩预测:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            <span style="font-size: 14px">{{ item.ticairesult }}</span>
          </v-col>
        </v-row>

        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            心理数据:
          </v-col>
          <v-col style="text-align: right; font-size: 14px" cols="9">
            <span>
              {{ item.sanhuxinli && item.sanhuxinli[3] + "_________" }}
              {{
                item.touzhue &&
                '[ "' +
                item.touzhue[0] +
                '", "' +
                item.touzhue[1] +
                '", "' +
                item.touzhue[2] +
                '" ]'
              }}
            </span>
            <br />
            <span style=" color: #a60056">
              散户心理:
              {{
                item.sanhuxinli &&
                '[ "' +
                item.sanhuxinli[0] +
                '", "' +
                item.sanhuxinli[1] +
                '", "' +
                item.sanhuxinli[2] +
                '" ]'
              }}
            </span>
            <br />
            <span> 开局心理: {{ item.kaijuresult }} </span>
            <br />
            <span style=" color: green">
              两队历史: {{ item.liangduilishi }}
            </span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            期望让球:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            <span style="font-size: 14px">{{ item.changguiyapan && item.changguiyapan + "^"
            }}{{
  item.changguiyapan &&
  parseFloat(
    parseFloat(item.changguiyapan.split(":")[0]) +
    parseFloat(item.changguiyapan.split(":")[1])
  ) / 2
}}</span>
          </v-col>
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            期望球数:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            <span style="font-size: 14px">{{ item.changguiqiushu && item.changguiqiushu + " ~ "
            }}{{
  item.changguiqiushu &&
  parseFloat(
    parseFloat(item.changguiqiushu.split(":")[0]) +
    parseFloat(item.changguiqiushu.split(":")[1])
  ) / 2
}}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            球数统计:
          </v-col>
          <v-col style="text-align: center; font-size: 14px; color: red" cols="9">
            <span style="font-size: 14px"><span style="color: blue">{{
              item.qiushuAll && (item.qiushuAll[0] - item.qiushuAll[2]) / 4
            }}</span>
              ===
              {{
                item.qiushuAll &&
                item.qiushuAll[0] +
                " ( " +
                item.qiushuAll[1] +
                " ) " +
                item.qiushuAll[4] +
                " ~ " +
                item.qiushuAll[2] +
                " ( " +
                item.qiushuAll[3] +
                " ) " +
                item.qiushuAll[5]
              }}
            </span>
            <br />
            <span style="font-size: 14px"><span style="color: blue">
                {{
                  item.yapantouzhu &&
                  item.yapantouzhu[4] +
                  "!" +
                  item.yapantouzhu[5] +
                  "!" +
                  item.yapantouzhu[6] +
                  "!" +
                  item.yapantouzhu[7] +
                  "!" +
                  item.yapantouzhu[8] +
                  "!" +
                  item.yapantouzhu[9] +
                  "~" +
                  item.yapantouzhu[10] +
                  "~" +
                  item.yapantouzhu[11]
                }}
              </span></span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            实现程度:
          </v-col>
          <v-col style="text-align: right; font-size: 14px; color: red" cols="9">
            <span style="font-size: 14px">
              <span style="color: green; padding: 0px 2px">
                ({{ item.qiushutouzhu && item.qiushutouzhu[2] }})（5场平均进球）
              </span>
              <br />
              <span style="color: red; padding: 0px 2px">
                {{ item.qiushutouzhu && item.qiushutouzhu[3] }} （4场平均丢球）
              </span>
              <br />
              <span style="color: green; padding: 0px 2px">
                {{
                  item.qiushuAll && (item.qiushuAll[0] + item.qiushuAll[2]) / 4
                }}
                （4场平均进球）</span>
            </span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px" cols="3">
            让球前后:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0">
            <span style="font-size: 14px">{{ item.yapanpankou1 }} -> {{ item.yapanpankou2 }}</span>
          </v-col>
        <v-col style="text-align: center; font-size: 14px" cols="3">
          球数前后:
        </v-col>
        <v-col style="text-align: center; font-size: 14px" cols="3">
          <span style="font-size: 14px">{{ item.qiushupankou1 }} -> {{ item.qiushupankou2 }}</span>
        </v-col>
      </v-row>
      <!-- <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; color: blue" cols="3">
            手动让球:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0">
            <v-icon size="16" color="blue" @click="jianpankou(item)">mdi-battery-minus</v-icon>
            <span class="px-2"> {{ item.newpankou }} </span>
            <v-icon size="16" color="blue" @click="addpankou(item)">mdi-battery-plus</v-icon>
          </v-col>
          <v-col style="text-align: center; font-size: 14px; color: blue" cols="3">
            手动球数:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            <v-icon size="16" color="blue" @click="jianqiushu(item)">mdi-thermometer-minus</v-icon>

            <span class="px-2"> {{ item.newqiushu }}</span>

            <v-icon size="16" color="blue" @click="addqiushu(item)">mdi-thermometer-plus</v-icon>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px" cols="3">
            新让投注:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0">
            {{
                item.newyapantouzhu &&
                item.newyapantouzhu[0] + " ~ " + item.newyapantouzhu[1]
            }}
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            新球投注:
                        </v-col>
                        <v-col style="text-align: center; font-size: 14px" cols="3">
                          {{
                              item.newqiushutouzhu &&
                              item.newqiushutouzhu[0] + " ~ " + item.newqiushutouzhu[1]
                          }}
                        </v-col>
                      </v-row> -->
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            让球投注:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0">
            <span style="font-size: 14px; color: #a60056">{{
              item.yapantouzhu &&
              item.yapantouzhu[0] + "%" + " ~ " + item.yapantouzhu[1] + "%"
            }}
              <br />
              {{ item.yapantouzhu && item.yapantouzhu[12] }}
            </span>
          </v-col>
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            球数投注:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3">
            <span style="font-size: 14px; color: #a60056">{{
              item.qiushutouzhu &&
              item.qiushutouzhu[0] + "%" + " ~ " + item.qiushutouzhu[1] + "%"
            }}</span>
            <br />
            <span style="font-size: 14px; color: #a60056">{{
              item.qiushutouzhu && item.qiushutouzhu[6]
            }}</span>
          </v-col>
        </v-row>

        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            主队交战:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0"
            v-if="item.homezuijinbisai && item.homezuijinbisai.length > 0">
            <div style="font-size: 14px; color: blue">
              {{ item.homezuijinbisai[0].toString().split(" ")[0] }}
            </div>
            <div style="font-size: 14px">
              {{ "(" + item.homezuijinbisai[5] + ")" }}
            </div>
            <div style="font-size: 12px; color: red">
              {{
                item.homezuijinbisai[1].substr(0, 3) +
                "VS" +
                item.homezuijinbisai[2].substr(0, 3)
              }}
            </div>
            <div style="font-size: 18px">
              {{ item.homezuijinbisai[3] + ":" + item.homezuijinbisai[4] }}
            </div>
            <div style="font-size: 18px;color:red">
              {{ item.liangduiqiushu && item.liangduiqiushu[0] }}
              {{ item.liangduiqiushu && item.liangduiqiushu[2] }}
            </div>
            <div style="font-size: 18px;color:green">
              {{ item.liangduiqiushu && item.liangduiqiushu[4] }}
            </div>
          </v-col>
          <v-col style="text-align: center; font-size: 14px; font-weight: 500" cols="3">
            客队交战:
          </v-col>
          <v-col style="text-align: center; font-size: 14px" cols="3" class="px-0"
            v-if="item.guestzuijinbisai && item.guestzuijinbisai.length > 0">
            <div style="font-size: 14px; color: blue">
              {{ item.guestzuijinbisai[0].toString().split(" ")[0] }}
            </div>
            <div style="font-size: 14px">
              {{ "(" + item.guestzuijinbisai[5] + ")" }}
            </div>
            <div style="font-size: 12px; color: green">
              {{
                item.guestzuijinbisai[1].substr(0, 3) +
                "VS" +
                item.guestzuijinbisai[2].substr(0, 3)
              }}
            </div>
            <div style="font-size: 18px">
              {{ item.guestzuijinbisai[3] + ":" + item.guestzuijinbisai[4] }}
            </div>
            <div style="font-size: 18px;color:red">
              {{ item.liangduiqiushu && item.liangduiqiushu[1] }}
              {{ item.liangduiqiushu && item.liangduiqiushu[3] }}
            </div>
            <div style="font-size: 18px;color:green">
              {{ item.liangduiqiushu && item.liangduiqiushu[5] }}
            </div>
          </v-col>
        </v-row>
        <v-row dense class="ma-0 px-2 py-1" v-show="showtuijian">
          <v-btn rounded elevation="0" style="background-color: #90caf9; color: white" @click="opendialog(item)">详情
          </v-btn>

          <v-btn rounded elevation="0" style="background-color: #90caf9; color: white; margin-left: 10px"
            @click="openUserdialog(item)">方案</v-btn>

          <v-btn rounded elevation="0" style="background-color: #90caf9; color: white; margin-left: 10px"
            @click="openUserdialog1(item)">南派</v-btn>
        </v-row>
      </v-card>
    </v-main>
    <v-dialog v-model="dialog" hide-overlay persistent fullscreen>
      <v-progress-linear indeterminate color="white" class="mb-0" v-show="linear"></v-progress-linear>
      <v-card style="background-color: #e5e5e5; overflow-y: auto">
        <v-toolbar flat dark color="red">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>分析数据详情</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="ma-2 cardclass" rounded>
          <v-row dense class="ma-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">比赛信息：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">开局概率：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test1 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">凯利：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">体彩：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test4 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">两队历史：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test5 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">散户心理：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test6 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: green" cols="5">投注额：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test7 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">赔率：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test8 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: #a60056" cols="5">欧盘转亚盘概率：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test11 &&
                item1.test11[0] + "%" + " - " + item1.test11[1] + "%"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: #a60056" cols="5">亚盘返回率：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test9 &&
                "【 " + item1.test9[4] + " -> " + item1.test9[5] + " 】 "
              }}
            </v-col>
          </v-row>

          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: blue" cols="5">亚盘投注情况：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test14 && item1.test14[0] + "% ~ " + item1.test14[1] + "%"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: green" cols="5">亚盘投注额：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test14 &&
                parseInt(
                  item1.test14[0] *
                  (parseFloat(item1.test9[7].toString().split(",")[0]) + 1)
                ) +
                "元 ~ " +
                parseInt(
                  item1.test14[1] *
                  (parseFloat(item1.test9[7].toString().split(",")[1]) +
                    1)
                ) +
                "元"
              }}
            </v-col>
          </v-row>

          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: #a60056" cols="5">球数返回率：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test9 &&
                "【 " + item1.test15[4] + " -> " + item1.test15[5] + " 】 "
              }}
            </v-col>
          </v-row>

          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: blue" cols="5">球数投注情况：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test17 && item1.test17[0] + "% ~ " + item1.test17[1] + "%"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: green" cols="5">球数投注额：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test17 &&
                parseInt(
                  item1.test17[0] *
                  (parseFloat(item1.test15[7].toString().split(",")[0]) + 1)
                ) +
                "元 ~ " +
                parseInt(
                  item1.test17[1] *
                  (parseFloat(item1.test15[7].toString().split(",")[1]) +
                    1)
                ) +
                "元"
              }}
            </v-col>
          </v-row>
          <!-- <v-row class="mx-0">{{ item1.test18 }}</v-row> -->
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">两队历史球数：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test19 &&
                item1.test19[0] +
                " - " +
                item1.test19[1] +
                " ~ " +
                item1.test19[2]
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">两队最近球数：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test20 && item1.test20 }}
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="userdialog" hide-overlay persistent fullscreen>
      <v-progress-linear indeterminate color="white" class="mb-0" v-show="linear"></v-progress-linear>
      <v-card style="background-color: #e5e5e5; overflow-y: auto">
        <v-toolbar flat dark color="red">
          <v-btn icon dark @click="userdialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>方案详情</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="ma-2 cardclass" rounded id="copyid">
          <v-row dense class="ma-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              _____比赛信息 :
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              _____庄控概率 : {{ item1.test1 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              _____凯利看法 : {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              _____体彩看法 : {{ item1.test4 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              两队历史概率 : {{ item1.test5 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              散户心理概率 : {{ item1.test6 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              投注额压力位 : {{ item1.test7 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              ___AI让球概率 :
              {{
                item1.test10 &&
                item1.test10[0] +
                "%" +
                " ~ " +
                item1.test10[1] +
                "% " +
                " ( " +
                item1.test9[3] +
                " )"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              让球投注压力 :
              {{
                item1.test14 && item1.test14[0] + "% ~ " + item1.test14[1] + "%"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              ___AI球数概率 :
              {{
                item1.test16 && item1.test16[0] + "% ~ " + item1.test16[1] + "%"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              球数投注压力:
              {{
                item1.test17 &&
                item1.test17[0] +
                "% ~ " +
                item1.test17[1] +
                "%" +
                " ( " +
                item1.test15[3] +
                " )"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              用户期望球数 : {{ item1.test21 && item1.test21 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12">
              用户期望让球 : {{ item1.test22 && item1.test22 }}
            </v-col>
          </v-row>
          <br />
          主推：
          <br />
          比分：

          <br />
          <br />
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12"> </v-col>
          </v-row>
        </v-card>
        <v-row dense class="mx-0">
          <v-col style="text-align: left; font-size: 14px" cols="12">
            <v-btn @click="copycopy">复制方案</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="userdialog1" hide-overlay persistent fullscreen>
      <v-progress-linear indeterminate color="white" class="mb-0" v-show="linear"></v-progress-linear>
      <v-card style="background-color: #e5e5e5; overflow-y: auto">
        <v-toolbar flat dark color="red">
          <v-btn icon dark @click="userdialog1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>方案详情</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="ma-2 cardclass" rounded id="copyid1">
          <v-row dense class="mx-0">
            <v-col style="text-align: left; font-size: 14px" cols="12"> </v-col>
          </v-row>
          <br />
          （南）一手：
          <br />
          （派）比分：
          <br />
          <br />

          <v-row dense class="ma-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">比赛队伍:</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">人流分割(100人)：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test1 &&
                item1.test1[0].toString().replace("%", "选胜") +
                "--" +
                item1.test1[1].toString().replace("%", "选平") +
                "--" +
                item1.test1[2].toString().replace("%", "选负")
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">精选凯利：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">优选某彩：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test4 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">历史交锋战果：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test5 &&
                item1.test5[0].toString().replace("%", "%胜") +
                "--" +
                item1.test5[1].toString().replace("%", "%平") +
                "--" +
                item1.test5[2].toString().replace("%", "%负")
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">本场应有概率：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test6 &&
                item1.test6[0].toString().replace("%", "%胜") +
                "--" +
                item1.test6[1].toString().replace("%", "%平") +
                "--" +
                item1.test6[2].toString().replace("%", "%负")
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">资金分散位置：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test7 &&
                item1.test7[0].toString() +
                "块胜" +
                "--" +
                item1.test7[1].toString() +
                "块平" +
                "--" +
                item1.test7[2].toString() +
                "块负"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: #a60056" cols="5">让球55开分布：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test10 &&
                item1.test10[0] +
                "%能打出" +
                " ~ " +
                item1.test10[1] +
                "%打不出"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: blue" cols="5">本场让球资金55开方向：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test14 &&
                item1.test14[0] + "块打出 ~ " + item1.test14[1] + "块打不出"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: #a60056" cols="5">本场球数55开：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test16 &&
                item1.test16[0] + "%出大 ~ " + item1.test16[1] + "%出小"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700; color: blue" cols="5">本场球数资金分布：
            </v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{
                item1.test17 &&
                item1.test17[0] + "%压大 ~ " + item1.test17[1] + "%压小"
              }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">本场应有球数：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test21 && item1.test21.toString().replace(":", "到") }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col style="text-align: right; font-weight: 700" cols="5">本场应该让球：</v-col>
            <v-col style="text-align: left; font-size: 14px" cols="7">
              {{ item1.test22 && item1.test22.toString().replace(":", "到") }}
            </v-col>
          </v-row>
        </v-card>
        <v-row dense class="mx-0">
          <v-col style="text-align: left; font-size: 14px" cols="12">
            <v-btn @click="copycopy1">复制南派方案</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="error" @click="asyncDataTrue">同步</v-btn>

        <v-btn class="mt-6" text color="info" @click="cancelasyncDataTrue">取消</v-btn>
        <div class="py-3">
          这个同步很厉害大概需要{{ datalist.length * 3 }}秒
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-btn fab bottom right class="v-btn--example" @click="isshowbifen = !isshowbifen">
      <v-icon color="red">mdi-usb-port</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import api from "../api/AxiosService";
export default {
  data() {
    return {
      tab: null,
      showtuijian: true,
      date: new Date().toISOString().substr(0, 10),
      datalist: [],
      list: [],
      detaillist: [],
      item1: {},
      dialog: false,
      linear: false,
      sheet: false,
      status: 0,
      count: 0,
      qiushuvalue: 0,
      userdialog: false,
      userdialog1: false,
      isshowbifen: true,
      currentItem: 0,
    };
  },
  computed: {},

  methods: {
    changevalue() {
      let val = this.currentItem;
      if (val == 0) {
        this.count = 0;
        this.datalist = this.list;
        console.log("初衷");
      } else if (val == 1) {
        this.datalist = this.list.filter((item) => {
          if (item.league != null) {
            return item.league.indexOf("周") > -1;
          }
        });
        this.count = this.datalist.length;
        console.log("某彩");
      } else if (val == 2) {
        this.datalist = this.list.filter((item) => {
          if (item.league != null) {
            return item.league.indexOf("北") > -1;
          }
        });
        this.count = this.datalist.length;
        console.log("北单");
      } else if (val == 3) {
        this.datalist = this.list.filter((item) => {
          if (
            item.qiushutouzhu &&
            item.liangduibisai &&
            item.touzhue &&
            item.changguiqiushu &&
            item.qiushuAll &&
            item.qiushupankou1 &&
            item.qiushupankou2 &&
            item.liangduilishi
          ) {
            if (
              item.qiushutouzhu[2].indexOf("no") > -1 ||
              item.liangduibisai.length <= 0
            ) {
              return false;
            }

            if (
              item.yapantouzhu[4] > 0 &&
              item.yapantouzhu[5] > 0 &&
              item.yapantouzhu[8] > 0 &&
              item.yapantouzhu[9] > 0 &&
              item.yapantouzhu[8] <= item.yapantouzhu[9] &&
              item.liangduiqiushu[5] < 1 &&
              item.liangduiqiushu[4] < 2
            ) {
              return true;
            }
          }
          return false;
        });
        this.count = this.datalist.length;
        console.log("碾压局");
      } else if (val == 4) {
        this.datalist = this.list.filter((item) => {
          if (
            item.qiushutouzhu &&
            item.liangduibisai &&
            item.touzhue &&
            item.changguiqiushu &&
            item.qiushuAll &&
            item.qiushupankou1 &&
            item.qiushupankou2 &&
            item.liangduilishi
          ) {
            if (
              item.qiushutouzhu[2].indexOf("no") > -1 ||
              item.liangduibisai.length <= 0
            ) {
              return false;
            }

            if (item.yapantouzhu[4] < 0 && item.yapantouzhu[8] == 0) {
              if (item.yapantouzhu[8] >= item.yapantouzhu[9]) {
                return true;
              }

              if (item.yapantouzhu[9] - item.yapantouzhu[8] >= 0.5) {
                return true;
              }
            }
          }
          return false;
        });
        this.count = this.datalist.length;
        console.log("闹0区");
      } else if (val == 5) {
        this.datalist = this.list.filter((item) => {
          if (item.yapantouzhu && item.sanhuxinli) {
            if (
              item.sanhuxinli[0].replace("%", "") > 80 ||
              item.sanhuxinli[1].replace("%", "") > 80 ||
              item.sanhuxinli[2].replace("%", "") > 80
            ) {
              if (item.yapantouzhu[0] >= 100 || item.yapantouzhu[1] >= 100) {
                // if (item.qiushutouzhu[0] >= 100 || item.qiushutouzhu[1] >= 100) {

                if (
                  item.yapantouzhu[9] >= 0.75 ||
                  item.yapantouzhu[9] <= -0.75
                ) {
                  if (
                    item.liangduiqiushu[4] == 2 ||
                    item.liangduiqiushu[5] == 2
                  ) {
                    return true;
                  }
                }

                // }
              }
            }
          }

          return false;
        });
        this.count = this.datalist.length;
        console.log("极端场");
      } else if (val == 6) {
        this.datalist = this.list.filter((item) => {
          if (
            item.qiushutouzhu &&
            item.liangduibisai &&
            item.touzhue &&
            item.changguiqiushu &&
            item.qiushuAll &&
            item.qiushupankou1 &&
            item.qiushupankou2 &&
            item.liangduilishi &&
            item.liangduiqiushu &&
            item.sanhuxinli
          ) {
            if (
              item.qiushutouzhu[2].indexOf("no") > -1 ||
              item.liangduibisai.length <= 0
            ) {
              return false;
            }
            if (
              item.liangduibisai[0]
                .toString()
                .split(" ")[0]
                .indexOf("2020") > -1 ||
              item.liangduibisai[0]
                .toString()
                .split(" ")[0]
                .indexOf("2021") > -1 ||
              item.liangduibisai[0]
                .toString()
                .split(" ")[0]
                .indexOf("2022") > -1 ||
              item.liangduibisai[0]
                .toString()
                .split(" ")[0]
                .indexOf("2023") > -1
            ) {
              // item.sanhuxinli[4] = "";
              // let ss = (item.yapantouzhu[4] + item.yapantouzhu[5]) / 2;
              if (
                item.yapantouzhu[4] > 0 &&
                item.yapantouzhu[8] < 0 &&
                item.yapantouzhu[9] < 0 &&
                item.liangduiqiushu[5] < 1 &&
                item.liangduiqiushu[4] < 2 &&
                item.yapantouzhu[8] <= item.yapantouzhu[9]
              ) {
                return true;
              }

              if (
                item.yapantouzhu[4] < 0 &&
                item.yapantouzhu[8] > 0 &&
                item.yapantouzhu[9] > 0 &&
                item.liangduiqiushu[4] < 1 &&
                item.liangduiqiushu[5] < 2 &&
                item.yapantouzhu[8] <= item.yapantouzhu[9]
              ) {
                return true;
              }
            }
          }

          return false;
        });
        this.count = this.datalist.length;
        console.log("态盘");
      } else if (val == 7) {
        console.log("裂球");
        this.datalist = this.list.filter((item) => {
          if (
            item.qiushutouzhu &&
            item.liangduibisai &&
            item.touzhue &&
            item.changguiqiushu &&
            item.qiushuAll &&
            item.qiushupankou1 &&
            item.qiushupankou2 &&
            item.liangduilishi &&
            item.sanhuxinli
          ) {
            if (
              item.qiushutouzhu[2].indexOf("no") > -1 ||
              item.liangduibisai.length <= 0
            ) {
              return false;
            }
            // const numbers = item.sanhuxinli[3].match(/\d+/g); // 匹配所有数字
            // console.log(numbers); // 输出 ["3", "27"]
            // console.log(item.sanhuxinli[3]); // 输出 ["3", "27"]
            // if(numbers[0] < numbers[1]){
            //   return false;
            // }

            if (
              item.yapantouzhu[4] > 0 &&
              item.yapantouzhu[8] < 0 &&
              item.yapantouzhu[9] < 0 &&
              item.liangduiqiushu[4] > 1
            ) {
              return true;
            }

            if (
              item.yapantouzhu[4] < 0 &&
              item.yapantouzhu[8] > 0 &&
              item.yapantouzhu[9] > 0 &&
              item.liangduiqiushu[5] > 1
            ) {
              return true;
            }
          }
          return false;
        });
        this.count = this.datalist.length;
      } else if (val == 8) {
        console.log("爆冷");
        this.datalist = this.list.filter((item) => {
          if (
            item.qiushutouzhu &&
            item.liangduibisai &&
            item.touzhue &&
            item.changguiqiushu &&
            item.qiushuAll &&
            item.qiushupankou1 &&
            item.qiushupankou2 &&
            item.liangduilishi &&
            item.sanhuxinli
          ) {
            if (
              item.qiushutouzhu[2].indexOf("no") > -1 ||
              item.liangduibisai.length <= 0
            ) {
              return false;
            }
            const numbers = item.sanhuxinli[3].match(/\d+/g); // 匹配所有数字
            // console.log(numbers); // 输出 ["3", "27"]
            // console.log(item.sanhuxinli[3]); // 输出 ["3", "27"]

            if (
              item.yapantouzhu[4] > 0 &&
              // item.yapantouzhu[5] < 0 &&
          
              item.yapantouzhu[9] < -0.25 &&
              item.yapantouzhu[8] <= item.yapantouzhu[9] &&
              parseInt( numbers[0]) < parseInt(numbers[1])
              
            ) {
              return true;
            }

            if (
              item.yapantouzhu[4] < 0 &&
              // item.yapantouzhu[5] > 0 &&
              item.yapantouzhu[9] > 0.25 &&
              item.yapantouzhu[8] <= item.yapantouzhu[9] &&
              parseInt( numbers[0]) > parseInt(numbers[1])
            ) {
              return true;
            }
          }
          return false;
        });
        this.count = this.datalist.length;
      }
    },
    copycopy() {
      const range = document.createRange();
      range.selectNode(document.getElementById("copyid"));

      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    },
    copycopy1() {
      const range = document.createRange();
      range.selectNode(document.getElementById("copyid1"));

      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    },
    addqiushu(val) {
      val.newqiushu += 0.25;

      let temp = 100 / (val.qiushupankou2 / 0.25);
      val.newqiushutouzhu[0] =
        parseInt(val.newqiushutouzhu[0]) - parseInt(temp);
      val.newqiushutouzhu[1] =
        parseInt(val.newqiushutouzhu[1]) + parseInt(temp);
      val.qiushuai[0] = parseInt(val.qiushuai[0]) - 25;
      val.qiushuai[1] = parseInt(val.qiushuai[1]) + 25;
    },
    jianqiushu(val) {
      val.newqiushu -= 0.25;
      let temp = 100 / (val.qiushupankou2 / 0.25);
      val.newqiushutouzhu[0] =
        parseInt(val.newqiushutouzhu[0]) + parseInt(temp);
      val.newqiushutouzhu[1] =
        parseInt(val.newqiushutouzhu[1]) - parseInt(temp);
      val.qiushuai[0] = parseInt(val.qiushuai[0]) + 25;
      val.qiushuai[1] = parseInt(val.qiushuai[1]) - 25;
    },
    addpankou(val) {
      val.newpankou += 0.25;
      let temp = 100 / (val.qiushupankou2 / 0.25);
      val.newyapantouzhu[0] = parseInt(val.newyapantouzhu[0]) - parseInt(temp);
      val.newyapantouzhu[1] = parseInt(val.newyapantouzhu[1]) + parseInt(temp);

      val.yapanai[0] = parseInt(val.yapanai[0]) - 25;
      val.yapanai[1] = parseInt(val.yapanai[1]) + 25;
    },
    jianpankou(val) {
      val.newpankou -= 0.25;
      let temp = 100 / (val.qiushupankou2 / 0.25);
      val.newyapantouzhu[0] = parseInt(val.newyapantouzhu[0]) + parseInt(temp);
      val.newyapantouzhu[1] = parseInt(val.newyapantouzhu[1]) - parseInt(temp);
      val.yapanai[0] = parseInt(val.yapanai[0]) + 25;
      val.yapanai[1] = parseInt(val.yapanai[1]) - 25;
    },
    opendialog(item) {
      this.dialog = true;
      this.linear = true;
      let data = {
        date: "2023-04-11",
        matchId: item.matchId,
      };
      api
        .GetResults(data)
        .then((res) => {
          // debugger
          this.linear = false;
          if (res.data.result.code == "200") {
            this.detaillist = res.data.result.data;
            if (this.detaillist.length > 0) {
              this.item1 = this.detaillist[0];
            }
          }
        })
        .catch();
    },
    openUserdialog(item) {
      this.userdialog = true;
      this.linear = true;
      let data = {
        date: "2023-04-11",
        matchId: item.matchId,
      };
      api
        .GetResults(data)
        .then((res) => {
          // debugger
          this.linear = false;
          if (res.data.result.code == "200") {
            this.detaillist = res.data.result.data;
            if (this.detaillist.length > 0) {
              this.item1 = this.detaillist[0];
            }
          }
        })
        .catch();
    },
    openUserdialog1(item) {
      this.userdialog1 = true;
      this.linear = true;
      let data = {
        date: "2023-04-11",
        matchId: item.matchId,
      };
      api
        .GetResults(data)
        .then((res) => {
          this.linear = false;
          if (res.data.result.code == "200") {
            this.detaillist = res.data.result.data;
            if (this.detaillist.length > 0) {
              this.item1 = this.detaillist[0];
            }
          }
        })
        .catch();
    },
    asyncData() {
      this.sheet = true;
    },
    asyncDataTrue() {
      this.sheet = false;
      api
        .AsyncData()
        .then()
        .catch();
    },
    cancelasyncDataTrue() {
      this.sheet = false;
    },
    asyncGameData() {
      this.sheet = false;
      api
        .AsyncGameData()
        .then()
        .catch();
    },
    cpu() {
      api
        .cpu()
        .then()
        .catch();
    },
    loaddata() {
      const data = {
        date: "2023-04-11",
      };
      api
        .GetToday(data)
        .then((res) => {
          // debugger
          if (res.data.result.code == "200") {
            this.datalist = res.data.result.data;
            this.list = res.data.result.data;
          }
        })
        .catch();
    },
  },
  watch: {},
  mounted() {
    this.loaddata();
  },
};
</script>

<style>
.v-btn--example {
  bottom: 0;
  right: 0;
  position: fixed !important;
  margin: 0 16px 16px 0;
}

.cardclass {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 8px;
}

.activeclass {
  background-color: #64b5f6;
}
</style>
