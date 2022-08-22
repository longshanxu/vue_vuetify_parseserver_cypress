<!--
 * @Author: Json.Xu
 * @Date: 2019-11-26 10:13:57
 * @LastEditTime: 2022-08-22 15:23:05
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\views\login\SignUp.vue
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
            <v-toolbar-title class="white--text">注册</v-toolbar-title>
          </v-col>
          <v-col cols="2">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-sheet id="scrolling-sheet" class="my-12">
        <v-container>
          <v-card class="mx-auto" flat v-show="sicode">
            <v-card-text>
              <v-form>
                <v-text-field
                  outlined
                  single-line
                  placeholder="请输入手机号码"
                  name="tel"
                  prepend-inner-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-text-field
                  outlined
                  single-line
                  placeholder="请输入验证码"
                  prepend-inner-icon="mdi-lock"
                  name="code"
                  type="password"
                >
                  <template v-slot:append>
                    <v-btn
                      text
                      color="primary"
                      height="24"
                      style="border-left:1px solid #ccc ;"
                    >获取验证码</v-btn>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" @click="signcode">下一步</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>
          <v-card class="mx-auto" flat v-show="sipwd">
            <v-card-text>
              <v-form>
                <v-text-field
                  outlined
                  single-line
                  placeholder="请输入密码（8-20位数字或字母）"
                  name="pwd"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                ></v-text-field>
                <v-text-field
                  outlined
                  single-line
                  placeholder="请输入密码（8-20位数字或字母）"
                  prepend-inner-icon="mdi-lock"
                  name="pwdagain"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" @click="signpwd">下一步</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>
          <v-card class="mx-auto" flat v-show="siname">
            <v-card-text>
              <v-form>
                <v-text-field
                  outlined
                  single-line
                  placeholder="请输入真实姓名便于创建/加入公司"
                  name="company"
                  prepend-inner-icon="mdi-account"
                  type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-card-text>
                <v-btn block color="primary" to="/elevator">下一步</v-btn>
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
      sicode: true,
      sipwd: false,
      siname: false
    };
  },
  methods: {
    signcode() {
      this.sicode = false;
      this.sipwd = true;
      this.siname = false;
    },
    signpwd() {
      this.sicode = false;
      this.sipwd = false;
      this.siname = true;
    }
    // signname() {

    // }
  }
};
</script>

<style scoped>
</style>