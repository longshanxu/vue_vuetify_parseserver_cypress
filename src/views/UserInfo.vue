<!--
 * @Author: wayneYF
 * @Date: 2019-11-14 18:16:42
 * @LastEditTime: 2019-11-27 17:52:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \moch-vue\src\views\User.vue
 -->
<template>
  <v-container>
   
      <!-- <template v-slot:header="slotProps">{{slotProps.lname}} + 12321</template> -->
      <template v-slot:header>header 被我改了</template>

      <template v-slot:body>被我改了 body</template>

      <template v-slot:footer="slotProps">{{slotProps.lname + slotProps.tname}} + 追加我要改的footer</template> 
  </v-container>
</template>
<script>
</script>

<style scoped>
</style>
