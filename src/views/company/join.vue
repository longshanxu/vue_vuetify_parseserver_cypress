<!--
 * @Author: Json.Xu
 * @Date: 2019-11-26 17:23:18
 * @LastEditTime: 2019-11-28 14:55:31
 * @LastEditors: Json.Xu
 * @Description:    
 * @FilePath: \moch-vue-mobile\src\views\company\join.vue
 -->
<template>
  <v-container class="pa-0">
    <v-card class="overflow-hidden" flat>
      <v-app-bar fixed dark color="primary" class="pa-0" dense scroll-target="#scrolling-sheet">
        <v-row align="center" justify="center" dense>
          <v-col cols="2">
            <router-link to="/login">
              <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </router-link>
          </v-col>
          <v-col cols="8" style="text-align:center">
            <v-toolbar-title class="white--text">{{text}}</v-toolbar-title>
          </v-col>
          <v-col cols="2">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-sheet id="scrolling-sheet" class="my-12">
        <v-container>
          <v-card class="mx-auto" flat v-show="showchoise">
            <v-card-text class="pb-0">
              <v-img
                class="white--text align-center"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                style="margin-top:0px"
              ></v-img>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" @click="joincompany">{{text}}</v-btn>
                <br />
                <v-btn block outlined color="primary" to="/create">创建公司</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>

          <v-card class="mx-auto" flat v-show="showCom">
            <v-card-text class="pb-0">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field class="textcenter" outlined single-line></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field class="textcenter" outlined single-line></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field class="textcenter" outlined single-line></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field class="textcenter" outlined single-line></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">请输入公司4位数代码</v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" @click="showfinished">下一步</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>

          <v-card class="mx-auto" flat v-show="showfinish">
            <v-card-text class="pb-0">
              <v-img
                class="white--text align-center"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                style="margin-top:0px"
              ></v-img>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" to="/elevator">完成</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>
          <v-footer fixed>
            <v-btn text color="primary" class="mx-auto">
              <span style="color:grey">注册代表您已阅读并同意</span>《佳格维保协议》
            </v-btn>
          </v-footer>
        </v-container>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: "加入已有公司",
      showCom: false,
      showfinish: false,
      showchoise: true
    };
  },
  methods: {
    joincompany() {
      this.showchoise = !this.showchoise;
      this.showCom = !this.showCom;
    },
    showfinished() {
      this.showfinish = !this.showfinish;
      this.showCom = !this.showCom;
    }
  }
};
</script>

<style scoped>
.textcenter >>> input {
  text-align: center;
}
</style>