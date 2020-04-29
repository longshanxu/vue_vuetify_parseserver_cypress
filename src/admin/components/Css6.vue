<!--
 * @Author: Json.Xu
 * @Date: 2020-04-27 13:13:49
 * @LastEditTime: 2020-04-27 13:25:27
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css6.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="center">
      <input type="radio" id="check-1" name="rd" />
      <label class="circle" for="check-1" id="c1"></label>
      <input type="radio" id="check-2" name="rd" />
      <label class="circle" for="check-2" id="c2"></label>
      <input type="radio" id="check-3" name="rd" />
      <label class="circle" for="check-3" id="c3"></label>
      <div class="active"></div>
      <div class="bg"></div>
    </div>
  </v-row>
</template>
 
 <script>
export default {};
</script>
 
 <style lang="scss" scoped>
.center {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 400px;
  height: 400px;
}

input[type="radio"] {
  display: none;
}

.circle {
  box-sizing: border-box;
  position: absolute;
  z-index: 5;
  top: 175px;
  left: 115px;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

#c2 {
  left: 175px;
}

#c3 {
  left: 235px;
}

.active {
  position: absolute;
  z-index: 10;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  top: 180px;
  left: 120px;
  transition: all 1s ease;
}

#check-1:checked ~ .active {
  transform: translateX(0px);
}
#check-2:checked ~ .active {
  transform: translateX(60px);
}
#check-3:checked ~ .active {
  transform: translateX(120px);
}

.bg {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 0;
  left: 0;
  background: #3498db;
  border-left: 400px solid #9b59b6;
  border-right: 400px solid #1abc9c;
  transition: all 1s ease;
  transform: translateX(0px);
}

#check-1:checked ~ .bg {
  transform: translateX(0px);
}
#check-2:checked ~ .bg {
  transform: translateX(-400px);
}
#check-3:checked ~ .bg {
  transform: translateX(-800px);
}
</style>
