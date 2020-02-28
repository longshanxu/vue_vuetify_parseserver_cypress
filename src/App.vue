<!--
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2020-02-28 11:28:12
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\App.vue
 -->
<template>
  <v-app id="app">
    <router-view />
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

