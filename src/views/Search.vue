<!--
 * @Author: Json.Xu
 * @Date: 2019-11-27 16:24:26
 * @LastEditTime: 2019-11-27 21:31:52
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue-mobile\src\views\elevator\Search.vue
 -->
<template>
  <v-container class="grey lighten-3" style="height:100%">
    <v-card class="grey lighten-3" flat>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="10">
          <v-text-field
            hide-details
            prepend-inner-icon="mdi-magnify"
            outlined
            placeholder="请输入注册代码/项目/位置"
            clearable
            @change="seachresult"
            @click:clear="clearResult"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn text color="primary" to="/elevator">取消</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card  v-show="showkeys" class="grey lighten-3" flat>
      <v-subheader style="color:black">关键字</v-subheader>

      <v-row>
        <v-col class="py-0">
          <v-chip outlined class="ma-2">电梯失灵</v-chip>
          <v-chip outlined class="ma-2">保养超期</v-chip>
          <v-chip outlined class="ma-2">华大科创楼</v-chip>
          <v-chip outlined class="ma-2">电梯失灵</v-chip>
          <v-chip outlined class="ma-2">临近年检</v-chip>
          <v-chip outlined class="ma-2">电梯失灵</v-chip>
          <v-chip outlined class="ma-2">待维修</v-chip>
          <v-chip outlined class="ma-2">华大科创楼</v-chip>
          <v-chip outlined class="ma-2">电梯失灵</v-chip>
          <v-chip outlined class="ma-2">临近年检</v-chip>
        </v-col>
      </v-row>
    </v-card>
    <v-card flat v-show="showresult">
      <v-card class="mt-2">
        <v-subheader>
          <v-icon color="green">mdi-note-text-outline</v-icon>注册代码:BY201911131855
        </v-subheader>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">
                  <v-icon color="red">mdi-note-text-outline</v-icon>当前状态 :
                </div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">
                  <v-icon color="green">mdi-note-text-outline</v-icon>保养超期
                </div>
                <div class="d-inline">
                  <v-icon color="yellow">mdi-note-text-outline</v-icon>待维修
                </div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pt-0">
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">电梯位置 :</div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">2号楼1号楼</div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pt-0">
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">所属项目 :</div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">华大科创楼</div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
          <v-card class="mt-2">
        <v-subheader>
          <v-icon color="green">mdi-note-text-outline</v-icon>注册代码:BY201911131855
        </v-subheader>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">
                  <v-icon color="red">mdi-note-text-outline</v-icon>当前状态 :
                </div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">
                  <v-icon color="green">mdi-note-text-outline</v-icon>保养超期
                </div>
                <div class="d-inline">
                  <v-icon color="yellow">mdi-note-text-outline</v-icon>待维修
                </div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pt-0">
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">电梯位置 :</div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">2号楼1号楼</div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pt-0">
            <v-row class="px-0" align="center" justify="center" dense>
              <v-col cols="4" class="px-0" style="text-align:right">
                <div style="color:grey;margin-right:8px">所属项目 :</div>
              </v-col>
              <v-col cols="8" class="px-0">
                <div class="d-inline">华大科创楼</div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showresult: false,
      showkeys: true
    };
  },
  methods: {
    seachresult() {
      this.showresult = true;
      this.showkeys = false;
    },
    clearResult() {
        //console.log("3333");
      this.showresult = false;
      this.showkeys = true;
    }
  }
};
</script>

<style scoped>
</style>