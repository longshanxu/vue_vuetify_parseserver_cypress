<!--
 * @Author: Json.Xu
 * @Date: 2020-02-28 10:17:06
 * @LastEditTime: 2020-04-23 14:51:56
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\views\Home.vue
 -->
<template>
  <v-container class="fill-height grey lighten-3 pa-0" fluid>
    <v-app-bar dark app fixed color="primary" dense>
      <v-icon @click="cpu" color="green">mdi-crane</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">我命由我不由天</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="asyncData" color="red">mdi-hand-heart</v-icon>
    </v-app-bar>
    <v-main class="fill-height grey lighten-3 align-start justify-start">
      <v-card
        class="pa-0 ma-2"
        rounded
        v-for="(item, index) in datalist"
        :key="index"
        @click="opendialog(item)"
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
            <span style="font-size: 16px">{{
              item.matchTime.substr(10, 6)
            }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="4"
          >
            状态：
            <span style="font-size: 16px">{{ item.displayState }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="4"
          >
            比分：
            <span style="font-size: 16px">{{
              item.homeScore + ":" + item.guestScore
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            散户心理:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="9"
          >
            <span style="font-size: 16px">{{
              item.sanhuxinli &&
              item.sanhuxinli[0] +
                " - " +
                item.sanhuxinli[1] +
                " - " +
                item.sanhuxinli[2]
            }}</span>
          </v-col>
        </v-row>
        <v-row dense class="ma-0" v-show="showtuijian">
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            常规让球:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 16px">{{ item.changguiyapan }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            常规球数:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 16px">{{ item.changguiqiushu }}</span>
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
            <span style="font-size: 16px">{{
              item.yapanpankou1
            }} -> {{item.yapanpankou2}}</span>
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
            <span style="font-size: 16px">{{
              item.qiushupankou1 
            }} -> {{item.qiushupankou2}}</span>
          </v-col>
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
      <v-card tile>
        <v-toolbar flat dark color="red">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>分析数据详情</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- <v-row
          v-show="this.detaillist.length == 0"
          justify="center"
          align="center"
          class="mx-0"
        >
          数据将在<span style="color: red; padding: 0px 10px"
            >{{ this.datalist.length * 3 }}
          </span>
          秒后完成，请耐心等待。
        </v-row> -->
        <v-card class="ma-2" rounded>
          <v-row class="mx-0">{{ item1.test1 }}</v-row>
          <v-row class="mx-0">{{ item1.test2 }}</v-row>
          <v-row class="mx-0">{{ item1.test3 }}</v-row>
          <v-row class="mx-0">{{ item1.test4 }}</v-row>
          <v-row class="mx-0">{{ item1.test5 }}</v-row>
          <v-row class="mx-0">{{ item1.test6 }}</v-row>
          <v-row class="mx-0">{{ item1.test7 }}</v-row>
          <v-row class="mx-0">{{ item1.test8 }}</v-row>
          <v-row class="mx-0">{{ item1.test9 }}</v-row>
          <v-row class="mx-0">{{ item1.test10 }}</v-row>
          <v-row class="mx-0">{{ item1.test11 }}</v-row>
          <v-row class="mx-0">{{ item1.test12 }}</v-row>
          <v-row class="mx-0">{{ item1.test13 }}</v-row>
          <v-row class="mx-0">{{ item1.test14 }}</v-row>
          <v-row class="mx-0">{{ item1.test15 }}</v-row>
          <v-row class="mx-0">{{ item1.test16 }}</v-row>
          <v-row class="mx-0">{{ item1.test17 }}</v-row>
          <!-- <v-row class="mx-0">{{ item1.test18 }}</v-row> -->
          <v-row class="mx-0">{{ item1.test19 }}</v-row>
          <v-row class="mx-0">{{ item1.test20 }}</v-row>
          <v-row class="mx-0">{{ item1.test21 }}</v-row>
          <v-row class="mx-0">{{ item1.test22 }}</v-row>
        </v-card>
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
      detaillist: [],
      item1: {},
      dialog: false,
      linear: false,
      sheet: false,
    };
  },
  computed: {},
  methods: {
    opendialog(item) {
      this.dialog = true;
      this.linear = true;
      let data = {
        date: "2021-01-02",
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
  },
  mounted() {
    const data = {
      date: "2021-01-02",
    };
    api
      .GetToday(data)
      .then((res) => {
        // debugger
        if (res.data.result.code == "200") {
          this.datalist = res.data.result.data;
        }
      })
      .catch();
  },
};
</script>

<style>
</style>