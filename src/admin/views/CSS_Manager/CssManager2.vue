<!--
 * @Author: Json.Xu
 * @Date: 2020-04-27 14:20:54
 * @LastEditTime: 2020-05-18 09:59:45
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\views\CSS_Manager\CssManager2.vue
 -->
<template>
  <v-container class="pa-0 " fluid style="height:100%"> 
    <v-card class="ma-4">
      <v-row>
        <v-col cols="4">
          <Css7></Css7>
        </v-col>
        <v-col cols="4">
          <Css8></Css8>
        </v-col>
        <v-col cols="4">
          <Css9></Css9>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <Css10></Css10>
        </v-col>
        <v-col cols="4">
          <Css11></Css11>
        </v-col>
        <v-col cols="4">
          <Css12></Css12>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

import Css7 from "../../components/Css7";
import Css8 from "../../components/Css8";
import Css9 from "../../components/Css9";
import Css10 from "../../components/Css10";
import Css11 from "../../components/Css11";
import Css12 from "../../components/Css12";
export default {
  components: {
    Css7,Css8,Css9,Css10,Css11,Css12
  },
  methods: {
    toggle() {}
  }
};
</script>
<style scoped>
</style>
