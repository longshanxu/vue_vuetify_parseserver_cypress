<!--
 * @Author: Json.Xu
 * @Date: 2020-04-24 11:23:22
 * @LastEditTime: 2020-04-24 11:41:27
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css3.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="center">
      <div class="dot-1"></div>
      <div class="dot-2"></div>
      <div class="dot-3"></div>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$bezier: cubic-bezier(0.21, 0.98, 0.6, 0.99);

.center {
  position: absolute;
  height: 100px;
  width: 100px;
}
.dot-1 {
  position: absolute;
  z-index: 3;
  width: 30px;
  height: 30px;
  top: 30px;
  left: 30px;
  background: #fff;
  border-radius: 50%;
  animation-fill-mode: both;
  animation: jump-jump-1 2s $bezier infinite alternate;
}

.dot-2 {
  position: absolute;
  z-index: 2;
  width: 60px;
  height: 60px;
  top: 15px;
  left: 15px;
  background: #fff;
  border-radius: 50%;
  animation-fill-mode: both;
  animation: jump-jump-2 2s $bezier infinite alternate;
}

.dot-3 {
  position: absolute;
  z-index: 1;
  width: 90px;
  height: 90px;
  top: 0px;
  left: 0px;
  background: #fff;
  border-radius: 50%;
  animation-fill-mode: both;
  animation: jump-jump-3 2s $bezier infinite alternate;
}

@keyframes jump-jump-1 {
  0%,
  70% {
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.2);
    transform: scale(0);
  }

  100% {
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1);
  }
}

@keyframes jump-jump-2 {
  0%,
  40% {
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.2);
    transform: scale(0);
  }

  100% {
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1);
  }
}

@keyframes jump-jump-3 {
  0%,
  10% {
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.2);
    transform: scale(0);
  }

  100% {
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1);
  }
}
</style>