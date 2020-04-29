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
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">足球小伙</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" color="basil" grow light slider-color="primary">
          <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-today">今天</v-tab>
          <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-tomorrow">明天</v-tab>
          <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-yesterday">昨天</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content class="fill-height grey lighten-3 align-start justify-start">
      <a href="/admin">admin</a>
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item value="tab-today" class="grey lighten-3">
          <v-card class="ma-0 pa-0" flat slot v-for="(item,index) in datalist" :key="index">
            <v-row dense class="ma-0">
              <v-col align-self="center" style="text-align:center;font-weight:700" cols="4">{{item.home}}</v-col>
              <v-col align-self="center" style="text-align:center;" cols="4">({{item.league}})<br/>{{item.matchTime.substr(10,6)}}</v-col>
              <v-col align-self="center" style="text-align:center;font-weight:700" cols="4">{{item.guest}}</v-col>
            </v-row>
            <v-row dense class="ma-0" v-show="showtuijian">
              <v-col align-self="center" style="text-align:center;font-size:14px" cols="4">
                胜平负：
                <span style="font-size:16px">胜</span>
              </v-col>
              <v-col align-self="center" style="text-align:center;font-size:14px" cols="4">
                大小球：
                <span style="font-size:16px">大2</span>
              </v-col>
              <v-col align-self="center" style="text-align:center;font-size:14px" cols="4">
                比分：
                <span style="font-size:16px">2:1</span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-content>
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
      datalist: []
    };
  },
  computed: {},
  methods: {},
  mounted() {
    const data = {
      date: this.date
    };
    api
      .GetToday(data)
      .then(res => {
         // debugger
        if (res.data.result.code == "200") {
          this.datalist = res.data.result.data
        }
      })
      .catch();
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #039be5 !important;
}
.basil--text {
  color: #03a9f4 !important;
}
.tab {
  min-width: 58px !important;
}
</style>