<!--
 * @Author: Json.Xu
 * @Date: 2019-11-26 17:23:46
 * @LastEditTime: 2019-11-27 10:01:53
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue-mobile\src\views\company\create.vue
 -->
<template>
  <v-container class="pa-0 grey lighten-3" style="height:100%">
    <v-card class="overflow-hidden grey lighten-3" flat fill-height>
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
            <v-toolbar-title class="white--text">创建公司</v-toolbar-title>
          </v-col>
          <v-col cols="2">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-sheet id="scrolling-sheet" class="my-12">
        <v-container class="pa-0" fluid>
          <v-card class="mx-auto pa-0 grey lighten-3" flat v-show="showcreate">
            <v-card-text class="pa-0" style="margin-top:12px;background-color:white">
              <v-row align="center" justify="center" dense>
                <v-col cols="3" style="text-align:center;color:black">公司名称</v-col>
                <v-col cols="9">
                  <v-text-field
                    class="textboder"
                    height="48"
                    style="padding-top:0px;margin-top:0px"
                    hide-details
                    single-line
                    placeholder="请输入公司名称"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text class="pa-0" style="margin-top:12px;background-color:white">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>营业执照</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-row align="center" justify="center" class="pa-4">
                <v-col cols="6">
                  <v-file-input label="上传图片" full-width height="120" outlined single-line></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-file-input label="上传图片" full-width height="120" outlined single-line></v-file-input>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text class="pa-0" style="margin-top:12px;background-color:white">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>维修保养资格证</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-row align="center" justify="center" class="pa-4">
                <v-col cols="6">
                  <v-file-input label="上传图片" full-width height="120" outlined single-line></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-file-input label="上传图片" full-width height="120" outlined single-line></v-file-input>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text class="py-0" style="margin-top:12px;background-color:white">
              <v-row align="center" justify="center">
                <v-col cols="9" style="text-align:center;color:black">
                  <v-list-item-content>
                    <v-list-item-title>维修保养资格证</v-list-item-title>
                  </v-list-item-content>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="ishow"></v-switch>
                </v-col>
              </v-row>
              <v-card flat v-show="ishow">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-lock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>电梯量化评分</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-card-text>
                    <v-btn color="primary" text outlined>A1</v-btn>
                    <v-btn color="grey" text outlined>A2</v-btn>
                    <v-btn color="grey" text outlined>B</v-btn>
                    <v-btn color="grey" text outlined>C</v-btn>
                  </v-card-text>
                </v-card-actions>
              </v-card>
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
                <v-btn block color="primary" to="/login">完成</v-btn>
              </v-card-text>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            ishow:false,
            showfinish:false,
            showcreate:true
        }
    },
    methods:{
        showfinished(){
            this.showfinish=true
            this.showcreate=false
        }
    }
    
};
</script>

<style scoped>
div.v-input__slot:before {
  border-style: none !important;
}
div.v-input__slot:after {
  border-style: none !important;
}
</style>