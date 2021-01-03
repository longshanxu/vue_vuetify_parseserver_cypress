<!--
 * @Author: Json.Xu
 * @Date: 2020-02-28 10:17:06
 * @LastEditTime: 2021-01-03 14:43:47
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\views\Home.vue
 -->
<template>
  <v-container class="fill-height grey lighten-3 pa-0" fluid>
    <v-app-bar dark app fixed color="primary" dense>
      <v-icon @dblclick="cpu" color="green">mdi-crane</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">我命由我不由天</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="asyncData" color="red">mdi-hand-heart</v-icon>
    </v-app-bar>
    <v-main class="fill-height grey lighten-3 align-start justify-start">
      <v-card
        class="pa-0 ma-2 cardclass"
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
            <span style="font-size: 14px">{{
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
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            常规让球:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px">{{ item.changguiyapan }}</span>
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px; font-weight: 500"
            cols="3"
          >
            常规球数:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px">{{ item.changguiqiushu }}</span>
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
            style="text-align: center; font-size: 14px"
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
            <span style="font-size: 14px"
              >{{  item.yapantouzhu && item.yapantouzhu[0] +"%" +" ~ "+ item.yapantouzhu[1]  +"%"}}</span
            >
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            球数投注:
          </v-col>
          <v-col
            align-self="center"
            style="text-align: center; font-size: 14px"
            cols="3"
          >
            <span style="font-size: 14px"
              >{{ item.qiushutouzhu && item.qiushutouzhu[0] +"%" +" ~ "+ item.qiushutouzhu[1]  +"%"}}</span
            >
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
      <v-card style="background-color: #e5e5e5;overflow-y: auto;">
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
              style="text-align: right; font-weight: 700"
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
                  "-" +
                  item1.test9[1] +
                  " " +
                  item1.test9[2] +
                  ":" +
                  item1.test9[3]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0">
            <v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >亚盘变动后概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test10 &&
                item1.test10[0] +
                  "-" +
                  item1.test10[1] +
                  " " +
                  item1.test10[2] +
                  ":" +
                  item1.test10[3]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >欧盘转亚盘概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test11 && item1.test11 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >亚盘投注情况：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test14 && item1.test14 }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
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
                  "-" +
                  item1.test15[1] +
                  " " +
                  item1.test15[2] +
                  ":" +
                  item1.test15[3]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >球数变动后概率：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{
                item1.test16 &&
                item1.test16[0] +
                  "-" +
                  item1.test16[1] +
                  " " +
                  item1.test16[2] +
                  ":" +
                  item1.test16[3]
              }}
            </v-col></v-row
          >
          <v-row dense class="mx-0"
            ><v-col
              align-self="center"
              style="text-align: right; font-weight: 700"
              cols="5"
              >球数投注情况：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test17 && item1.test17 }}
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
              {{ item1.test19 && item1.test19 }}
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
              >两队常规球数：</v-col
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
              >两队常规让球：</v-col
            >
            <v-col
              align-self="center"
              style="text-align: left; font-size: 14px"
              cols="7"
            >
              {{ item1.test22 && item1.test22 }}
            </v-col></v-row
          >
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
        date: "2021-01-03",
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
      date: "2021-01-03",
    };
    api
      .GetToday(data)
      .then((res) => {
        // debugger
        if (res.data.result.code == "200") {
          this.datalist = res.data.result.data;
          console.log(this.datalist);
        }
      })
      .catch();
  },
};
</script>

<style>
.cardclass {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 8px;
}
</style>