<!--
 * @Author: Json.Xu
 * @Date: 2019-12-30 14:43:49
 * @LastEditTime: 2022-07-05 15:40:33
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\components\LoadingCard.vue
 -->
<template>
  <v-card class="text-center mx-auto">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64">请稍等</v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      top
      :color="colorinfo"
      multi-line
      :timeout="timeout"
    >{{snackbarmsg}}</v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      timeout: 2000,
      colorinfo: "info",
    };
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.$store.dispatch("SET_SNACKBAR", value);
      }
    },
    snackbarmsg: {
      get() {
        return this.$store.state.snackbarmsg;
      }
    },
    overlay:{
      get() {
        return this.$store.state.overlay;
      }
    },
  }
};
</script>

<style scoped>
</style>