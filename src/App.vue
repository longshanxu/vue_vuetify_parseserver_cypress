<!--
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2019-11-26 20:22:46
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \moch-vue\src\App.vue
 -->
<template>
  <v-app id="app">
    <v-content fluid fill-height>
      <!-- <div id="nav">
        <router-link :to="{name:'user',params:{username:'333'}}">Go To User</router-link>
      </div>-->
      <router-view />
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
  mounted() {
    
  },
  methods: {
  }
};
</script>
<style scoped>
</style>

