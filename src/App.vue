<!--
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2021-01-12 11:14:22
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\App.vue
 -->
<template>
  <v-app id="app" style="background:#E5E5E5">
    <router-view></router-view>
    <LoadingCard></LoadingCard>
  </v-app>
</template>


<script>
import LoadingCard from "./components/LoadingCard";
export default {
  name: "App",
  components: {
    LoadingCard
  },
  data: () => ({}),
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>

