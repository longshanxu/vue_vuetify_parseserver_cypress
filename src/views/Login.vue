<!--
 * @Author: Json.Xu
 * @Date: 2019-11-15 11:15:24
 * @LastEditTime: 2022-11-03 21:03:22
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\views\Login.vue
 -->
 <template>
  <v-container class="pa-0">
      <v-img
        class="white--text align-center"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        style="margin-top:0px"
      >
        <v-card-title>您好!</v-card-title>
      </v-img>
    <v-card class="ma-5" >
      <v-card class="mx-auto" style="margin-top:-80px">
        <v-card-text  class="pb-0">
          <v-form>
            <v-text-field
              outlined
              single-line
              label="请输入手机号码"
              name="用户名"
              prepend-inner-icon="mdi-account"
              type="text"
            />
            <v-text-field
              outlined
              single-line
              label="请输入密码"
              name="密码"
              prepend-inner-icon="mdi-lock"
              type="password"
            />
            <v-row>
              <v-spacer />
              <v-btn text color="primary">忘记密码?</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-card-text>
            <v-btn block color="primary">登录</v-btn>
            <br />
            <v-btn block outlined color="primary" to="/signup">注册</v-btn>
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
//import api from "../api/AxiosService";

export default {
  props: {
    source: String
  },
  methods: {
    login() {
      // var aa = "777";
      // this.$store.dispatch({ type: "UPDATEMESSAGE", aa });
      // api
      //   .setUserToken()
      //   .then(res => {
      //     var token = res.data.data.token;
      //     this.$store.dispatch({
      //       type: "SET_USERINFO_TOKEN",
      //       token
      //     })
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },

    getuserrole() {
      ////console.log(this.$store.state.message);
      // api
      //   .getUserRole()
      //   .then(res => {
      //     //console.log(res);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    }
  }
};
</script>
      
<style scoped>
</style>