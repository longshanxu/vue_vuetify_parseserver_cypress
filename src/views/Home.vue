<!--
 * @Author: Json.Xu
 * @Date: 2020-02-28 10:17:06
 * @LastEditTime: 2021-08-25 23:29:03
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver_cypress\src\views\Home.vue
 -->
<template>
  <v-container class="fill-height grey lighten-3 pa-0" fluid>
    <v-app-bar dark app fixed color="primary" dense>
      <v-icon @dblclick="cpu" color="green">mdi-crane</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">我命由我不由天</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="asyncData" color="red">mdi-hand-heart</v-icon>
      <template v-slot:extension>
        <v-row align="center" justify="center" class="mx-0">
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px"
            @click="status = 1"
            :class="status == 1 ? 'activeclass' : ''"
            >升盘</v-col
          >
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px"
            @click="status = 2"
            :class="status == 2 ? 'activeclass' : ''"
            >降盘</v-col
          >
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px"
            @click="status = 3"
            :class="status == 3 ? 'activeclass' : ''"
            >球数升</v-col
          >
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px"
            @click="status = 4"
            :class="status == 4 ? 'activeclass' : ''"
            >球数降</v-col
          >
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px"
            @click="status = 5"
            :class="status == 5 ? 'activeclass' : ''"
            >超100%</v-col
          >
          <v-col
            cols="2"
            class="px-0"
            style="text-align: center; font-size: 14px; color: yellow"
            @click="status = 0"
            >{{ count }}</v-col
          >
        </v-row>
      </template>
    </v-app-bar>
    <v-main class="fill-height grey lighten-3 align-start justify-start">
      <v-card
        class="pa-0 ma-2 cardclass"
        rounded
        v-for="(item, index) in datalist"
        :key="index"
      >
        <v-row dense class="ma-0">
          <v-col
            align-self="center"
            style="text-align: center; font-weight: 700"
            cols="4"
            >{{ item.home.substr(0, 6) }}</v-col
          >
          <v-col
            align-self="center"
            style="text-align: center; font-size: 12px"
            cols="4"
            >({{ item.league }})<br
          /></v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-weight: 700"
            cols="4"
            >{{ item.guest.substr(0, 6) }}</v-col
          >
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="4"
          >
            时间：
            <span style="font-size: 14px">{{
              item.matchTime.substr(10, 6)
            }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="4"
          >
            状态：
            <span style="font-size: 14px">{{ item.displayState }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="4"
          >
            比分：
            <span style="font-size: 14px" v-show="isshowbifen">{{
              item.homeScore + ":" + item.guestScore
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            散户心理:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="9"
          >
            <span style="font-size: 14px; color: #a60056">{{
              item.sanhuxinli &&
              item.sanhuxinli[0] +
                " ~ " +
                item.sanhuxinli[1] +
                " ~ " +
                item.sanhuxinli[2]
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            期望让球:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px"
              >{{ item.changguiyapan && item.changguiyapan + "^"
              }}{{
                item.changguiyapan &&
                parseFloat(
                  parseFloat(item.changguiyapan.split(":")[0]) +
                    parseFloat(item.changguiyapan.split(":")[1])
                ) / 2
              }}</span
            >
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            期望球数:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px"
              >{{ item.changguiqiushu && item.changguiqiushu + " ~ "
              }}{{
                item.changguiqiushu &&
                parseFloat(
                  parseFloat(item.changguiqiushu.split(":")[0]) +
                    parseFloat(item.changguiqiushu.split(":")[1])
                ) / 2
              }}</span
            >
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            球数统计:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; color: red"
            cols="9"
          >
            <span style="font-size: 14px"
              ><span style="color: blue">{{
                item.qiushuAll && (item.qiushuAll[0] - item.qiushuAll[2]) / 10
              }}</span>
              ===
              {{
                item.qiushuAll &&
                item.qiushuAll[0] +
                  " ( " +
                  item.qiushuAll[1] +
                  " ) " +
                  " ~ " +
                  item.qiushuAll[2] +
                  " ( " +
                  item.qiushuAll[3] +
                  " ) "
              }}
              <span style="color: green; padding: 0px 2px">
                =>
                {{
                  item.qiushuAll &&
                  (item.qiushuAll[0] +
                    item.qiushuAll[2] -
                    item.qiushuAll[1] -
                    item.qiushuAll[3]) /
                    10
                }}
              </span>
              =>
              {{
                item.qiushuAll && (item.qiushuAll[0] + item.qiushuAll[2]) / 10
              }}</span
            >
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            让球AI:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px; color: blue">{{
              item.yapanai && item.yapanai[0] + "% ~ " + item.yapanai[1] + "%"
            }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            球数AI:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; color: blue"
            cols="3"
          >
            <span style="font-size: 14px">{{
              item.qiushuai &&
              item.qiushuai[0] + "% ~ " + item.qiushuai[1] + "%"
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            让球前后:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
            class="px-0"
          >
            <span style="font-size: 14px"
              >{{ item.yapanpankou1 }} -> {{ item.yapanpankou2 }}</span
            >
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            球数前后:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px"
              >{{ item.qiushupankou1 }} -> {{ item.qiushupankou2 }}</span
            >
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; color: blue"
            cols="3"
          >
            手动让球:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
            class="px-0"
          >
            <v-icon size="16" color="blue" @click="jianpankou(item)"
              >mdi-battery-minus</v-icon
            >
            <span class="px-2"> {{ item.newpankou }} </span>
            <v-icon size="16" color="blue" @click="addpankou(item)"
              >mdi-battery-plus</v-icon
            >
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; color: blue"
            cols="3"
          >
            手动球数:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <v-icon size="16" color="blue" @click="jianqiushu(item)"
              >mdi-thermometer-minus</v-icon
            >

            <span class="px-2"> {{ item.newqiushu }}</span>

            <v-icon size="16" color="blue" @click="addqiushu(item)"
              >mdi-thermometer-plus</v-icon
            >
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            新让投注:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
            class="px-0"
          >
            {{
              item.newyapantouzhu &&
              item.newyapantouzhu[0] + " ~ " + item.newyapantouzhu[1]
            }}
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            新球投注:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            {{
              item.newqiushutouzhu &&
              item.newqiushutouzhu[0] + " ~ " + item.newqiushutouzhu[1]
            }}
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            让球投注:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
            class="px-0"
          >
            <span style="font-size: 14px; color: #a60056">{{
              item.yapantouzhu &&
              item.yapantouzhu[0] + "%" + " ~ " + item.yapantouzhu[1] + "%"
            }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            球数投注:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px; color: #a60056">{{
              item.qiushutouzhu &&
              item.qiushutouzhu[0] + "%" + " ~ " + item.qiushutouzhu[1] + "%"
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0 px-2 py-1" v-show="showtuijian">
          <v-btn
            rounded
            elevation="0"
            style="background-color: #90caf9; color: white"
            @click="opendialog(item)"
            >详情</v-btn
          >

          <v-btn
            rounded
            elevation="0"
            style="background-color: #90caf9; color: white; margin-left: 10px"
            @click="openUserdialog(item)"
            >方案</v-btn
          >

          <v-btn
            rounded
            elevation="0"
            style="background-color: #90caf9; color: white; margin-left: 10px"
            @click="openUserdialog1(item)"
            >南派</v-btn
          >
        </v-row>
      </v-card>
    </v-main>
    <v-dialog v-model="dialog" hide-overlay persistent fullscreen>
      <v-progress-linear
        indeterminate
        color="white"
        class="mb-0"
        v-show="linear"
      ></v-progress-linear>
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
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >比赛信息：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >开局概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test1 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >凯利：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >体彩：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test4 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >两队历史：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test5 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >散户心理：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test6 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: green"
              cols="5"
              >投注额：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test7 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >赔率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test8 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >欧盘转亚盘概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test11 &&
                item1.test11[0] + "%" + " - " + item1.test11[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >亚盘初始概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test9 &&
                item1.test9[0] +
                  "%" +
                  " - " +
                  item1.test9[1] +
                  "%" +
                  " 【 " +
                  item1.test9[2] +
                  " -> " +
                  item1.test9[3] +
                  " 】 " +
                  item1.test9[8]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >亚盘AI概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test10 &&
                item1.test10[0] + "%" + " ~ " + item1.test10[1] + "% "
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >亚盘基础数据：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test9 &&
                "【 " + item1.test9[6] + " ~ " + item1.test9[7] + " 】 "
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >亚盘返回率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test9 &&
                "【 " + item1.test9[4] + " -> " + item1.test9[5] + " 】 "
              }}
            </v-col></v-row
          >

          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: blue"
              cols="5"
              >亚盘投注情况：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test14 && item1.test14[0] + "% ~ " + item1.test14[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: green"
              cols="5"
              >亚盘投注额：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test14 &&
                parseInt(
                  item1.test14[0] *
                    (parseFloat(item1.test9[7].toString().split(",")[0]) + 1)
                ) +
                  "元 ~ " +
                  parseInt(
                    item1.test14[1] *
                      (parseFloat(item1.test9[7].toString().split(",")[1]) + 1)
                  ) +
                  "元"
              }}
            </v-col></v-row
          >

          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >球数初始概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test15 &&
                item1.test15[0] +
                  "%" +
                  " - " +
                  item1.test15[1] +
                  "%" +
                  " 【 " +
                  item1.test15[2] +
                  " -> " +
                  item1.test15[3] +
                  " 】 " +
                  item1.test15[8]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >球数变动后概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test16 && item1.test16[0] + "% ~ " + item1.test16[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >球数基础数据：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test15 &&
                "【 " + item1.test15[6] + " ~ " + item1.test15[7] + " 】 "
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >球数返回率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test9 &&
                "【 " + item1.test15[4] + " -> " + item1.test15[5] + " 】 "
              }}
            </v-col></v-row
          >

          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: blue"
              cols="5"
              >球数投注情况：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test17 && item1.test17[0] + "% ~ " + item1.test17[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: green"
              cols="5"
              >球数投注额：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test17 &&
                parseInt(
                  item1.test17[0] *
                    (parseFloat(item1.test15[7].toString().split(",")[0]) + 1)
                ) +
                  "元 ~ " +
                  parseInt(
                    item1.test17[1] *
                      (parseFloat(item1.test15[7].toString().split(",")[1]) + 1)
                  ) +
                  "元"
              }}
            </v-col></v-row
          >
          <!-- <v-row class="mx-0">{{ item1.test18 }}</v-row> -->
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >两队历史球数：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test19 &&
                item1.test19[0] +
                  " - " +
                  item1.test19[1] +
                  " ~ " +
                  item1.test19[2]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >两队最近球数：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test20 && item1.test20 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >用户期望球数：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test21 && item1.test21 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >用户期望让球：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test22 && item1.test22 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: blue"
              cols="5"
              >球数AI：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test23 && item1.test23 }}
            </v-col></v-row
          >
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="userdialog" hide-overlay persistent fullscreen>
      <v-progress-linear
        indeterminate
        color="white"
        class="mb-0"
        v-show="linear"
      ></v-progress-linear>
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
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              _____比赛信息 :
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              _____庄控概率 : {{ item1.test1 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              _____凯利看法 : {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              _____体彩看法 : {{ item1.test4 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              两队历史概率 : {{ item1.test5 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              散户心理概率 : {{ item1.test6 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              投注额压力位 : {{ item1.test7 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
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
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              让球投注压力 :
              {{
                item1.test14 && item1.test14[0] + "% ~ " + item1.test14[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              ___AI球数概率 :
              {{
                item1.test16 && item1.test16[0] + "% ~ " + item1.test16[1] + "%"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
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
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              用户期望球数 : {{ item1.test21 && item1.test21 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              用户期望让球 : {{ item1.test22 && item1.test22 }}
            </v-col></v-row
          >
          <br />
          <br />
          <br />
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              每一场都是心血，不能一直红，也不能一直黑，均码做公益！我们都是一场场分析，一场场实弹，风雨同舟！
            </v-col></v-row
          >
        </v-card>
        <v-row dense class="mx-0">
          <v-col
            align-self="center"
            style="text-align: left; font-size: 14px"
            cols="12"
          >
            <v-btn @click="copycopy">复制方案</v-btn>
          </v-col></v-row
        >
      </v-card>
    </v-dialog>
    <v-dialog v-model="userdialog1" hide-overlay persistent fullscreen>
      <v-progress-linear
        indeterminate
        color="white"
        class="mb-0"
        v-show="linear"
      ></v-progress-linear>
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
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="12"
            >
              十万场的数据心得 拥有自己的模型，
              致力于一级赛事。有长红，说明对口模型，有长黑，老庄也会瞎开，完全不尊重历史。
              每一场推荐，都是用自己的RMB，用心尽力！友情提醒：勿梭！
            </v-col></v-row
          >
          <br />
          <v-row dense class="ma-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >比赛队伍:</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test2 && item1.test2[1] + " vs " + item1.test2[2] }}
            </v-col>
          </v-row>
          <v-row dense class="ma-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >人流分割(100人)：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
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
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >精选凯利：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test3 }}
            </v-col>
          </v-row>
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >优选某彩：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test4 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >历史交锋战果：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test5 &&
                item1.test5[0].toString().replace("%", "%胜") +
                  "--" +
                  item1.test5[1].toString().replace("%", "%平") +
                  "--" +
                  item1.test5[2].toString().replace("%", "%负")
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >本场应有概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test6 &&
                item1.test6[0].toString().replace("%", "%胜") +
                  "--" +
                  item1.test6[1].toString().replace("%", "%平") +
                  "--" +
                  item1.test6[2].toString().replace("%", "%负")
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >资金分散位置：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
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
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >让球55开分布：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test10 &&
                item1.test10[0] +
                  "%能打出" +
                  " ~ " +
                  item1.test10[1] +
                  "%打不出"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: blue"
              cols="5"
              >本场让球资金55开方向：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test14 &&
                item1.test14[0] + "块打出 ~ " + item1.test14[1] + "块打不出"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: #a60056"
              cols="5"
              >本场球数55开：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test16 &&
                item1.test16[0] + "%出大 ~ " + item1.test16[1] + "%出小"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700; color: blue"
              cols="5"
              >本场球数资金分布：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test17 &&
                item1.test17[0] + "%压大 ~ " + item1.test17[1] + "%压小"
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >本场应有球数：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test21 && item1.test21.toString().replace(":", "到") }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >本场应该让球：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test22 && item1.test22.toString().replace(":", "到") }}
            </v-col></v-row
          >
        </v-card>
        <v-row dense class="mx-0">
          <v-col
            align-self="center"
            style="text-align: left; font-size: 14px"
            cols="12"
          >
            <v-btn @click="copycopy1">复制南派方案</v-btn>
          </v-col></v-row
        >
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="error" @click="asyncDataTrue"
          >同步</v-btn
        >
        <div class="py-3">
          这个同步很厉害大概需要{{ datalist.length * 3 }}秒
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-btn
      fab
      bottom
      right
      class="v-btn--example"
      @click="isshowbifen = !isshowbifen"
    >
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
    };
  },
  computed: {},

  methods: {
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
        date: "2021-08-25",
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
              console.log(this.item1);
            }
          }
        })
        .catch();
    },
    openUserdialog(item) {
      this.userdialog = true;
      this.linear = true;
      let data = {
        date: "2021-08-25",
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
        date: "2021-08-25",
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
      api.AsyncData().then().catch();
    },
    cpu() {
      api.cpu().then().catch();
    },
    loaddata() {
      const data = {
        date: "2021-08-25",
      };
      api
        .GetToday(data)
        .then((res) => {
          // debugger
          if (res.data.result.code == "200") {
            this.datalist = res.data.result.data;
            console.log(this.datalist);
            this.list = res.data.result.data;
          }
        })
        .catch();
    },
  },
  watch: {
    status(val) {
      if (val == 0) {
        this.count = 0;
        this.datalist = this.list;
      } else if (val == 1) {
        this.datalist = this.list.filter((item) => {
          if (item.yapanpankou1 != null && item.yapanpankou2 != null) {
            return item.yapanpankou1 < item.yapanpankou2;
          }
        });
        this.count = this.datalist.length;
      } else if (val == 2) {
        this.datalist = this.list.filter((item) => {
          if (item.yapanpankou1 != null && item.yapanpankou2 != null) {
            return item.yapanpankou1 > item.yapanpankou2;
          }
        });
        this.count = this.datalist.length;
      } else if (val == 3) {
        this.datalist = this.list.filter((item) => {
          if (item.yapanpankou1 != null && item.yapanpankou2 != null) {
            return item.qiushupankou1 < item.qiushupankou2;
          }
        });
        this.count = this.datalist.length;
      } else if (val == 4) {
        this.datalist = this.list.filter((item) => {
          if (item.qiushupankou1 != null && item.qiushupankou2 != null) {
            return item.qiushupankou1 > item.qiushupankou2;
          }
        });
        this.count = this.datalist.length;
      } else if (val == 5) {
        this.datalist = this.list.filter((item) => {
          if (item.qiushutouzhu) {
            return item.qiushutouzhu[0] > 90 || item.qiushutouzhu[1] > 90;
          }
        });
        this.count = this.datalist.length;
      }
    },
  },
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