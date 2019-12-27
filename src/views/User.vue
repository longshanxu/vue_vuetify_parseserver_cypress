<!--
 * @Author: your name
 * @Date: 2019-11-14 18:16:42
 * @LastEditTime : 2019-12-27 15:04:44
 * @LastEditors  : Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \moch-vue\src\views\User.vue
 -->
<template>
  <v-container>
    <EchartsDemo>
      <!-- <template v-slot:header="slotProps">{{slotProps.lname}} + 12321</template> -->
      <template v-slot:header>header 被我改了</template>

      <template v-slot:body>被我改了 body</template>

      <template v-slot:footer="slotProps">{{slotProps.lname + slotProps.tname}} + 追加我要改的footer</template>
      
    </EchartsDemo>
  </v-container>
</template>
<script>
import EchartsDemo from "./echarts";
export default {
  components: {
    EchartsDemo
  },
  mounted:()=>{
    // $('#div1').html(123123);
  }
};
</script>

<style scoped>
</style>
