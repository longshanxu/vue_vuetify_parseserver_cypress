<!--
 * @Author: Json.Xu
 * @Date: 2020-04-24 09:06:10
 * @LastEditTime: 2022-08-22 11:26:00
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\views\CSS_Manager\CssManager1.vue
 -->
<template>
  <v-container class="pa-0" fluid>
    <v-card class="ma-4">
      <v-row>
        <v-col cols="4">
          <Css1></Css1>
        </v-col>
        <v-col cols="4">
          <Css2></Css2>
        </v-col>
        <v-col cols="4">
          <Css3></Css3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <Css4></Css4>
        </v-col>
        <v-col cols="4">
          <Css5></Css5>
        </v-col>
        <v-col cols="4">
          <Css6></Css6>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Css1 from "../../components/Css1";
import Css2 from "../../components/Css2";
import Css3 from "../../components/Css3";
import Css4 from "../../components/Css4";
import Css5 from "../../components/Css5";
import Css6 from "../../components/Css6";
export default {
  components: {
    Css1,
    Css2,
    Css3,
    Css4,
    Css5,
    Css6
  },
  methods: {
    toggle() {}
  }
};
</script>
<style scoped>
</style>

 