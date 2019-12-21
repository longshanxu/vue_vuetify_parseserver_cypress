<!--
 * @Author: Json.Xu
 * @Date: 2019-11-27 10:08:10
 * @LastEditTime: 2019-11-29 13:09:07
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue-mobile\src\views\elevator\elevatorlist.vue
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
            <v-toolbar-title class="white--text">电梯列表</v-toolbar-title>
          </v-col>
          <v-col cols="2" style="text-align:right">
              <v-btn icon to='/elevatorcreate'>
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
          </v-col>
        </v-row>
        <template v-slot:extension>
          <v-tabs v-model="tab" color="basil" grow light slider-color="primary">
            <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-all">全部</v-tab>
            <v-tab
              style="width:58px;min-width:58px"
              class="px-0"
              href="#tab-baoyang"
              to="/elevator/tab1"
              exact
            >保养超期</v-tab>
            <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-weixiu">待维修</v-tab>
            <v-tab style="width:58px;min-width:58px" class="px-0" href="#tab-nianjian">临近年检</v-tab>
            <!-- <v-tab style="width:58px;min-width:58px" class="px-0" @click.stop="showmodel" >
           
            </v-tab>-->

            <v-btn text color="grey" @click.stop="showmodel" height="48">
              <v-icon right>mdi-filter-outline</v-icon>筛选
            </v-btn>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet id="scrolling-sheet" style="margin-top:96px" class="grey lighten-3">
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-all">
            <v-container fluid>
              <!-- 搜索框 -->
              <v-btn block color="grey" outlined rounded to="/search" text>
                <v-icon left>mdi-magnify</v-icon>请输入注册代码/项目/位置
              </v-btn>
              <v-card class="mt-2">
                <v-subheader>
                  <v-icon color="green">mdi-note-text-outline</v-icon>注册代码:BY201911131855
                </v-subheader>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content class="py-0">
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
                  <v-list-item-content class="py-0">
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
                  <v-list-item-content class="py-0">
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
            </v-container>
          </v-tab-item>
          <v-tab-item value="/elevator/tab1">
            <router-view></router-view>
          </v-tab-item>
          <v-tab-item value="tab-weixiu">待维修</v-tab-item>
          <v-tab-item value="tab-nianjian">临近年检</v-tab-item>
        </v-tabs-items>
      </v-sheet>
    </v-card>
    <v-navigation-drawer v-model="drawer" right absolute temporary>
      <v-card flat tile  class="fill-height">
        <v-card-title>所属项目</v-card-title>
        <v-card-text>
          <v-select :items="itemsProject" label="选择项目" solo></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>电梯品牌</v-card-title>
        <v-card-text>
          <v-select :items="itemsPinpai" label="选择品牌" solo></v-select>
        </v-card-text>

      
          <v-card-actions style="justify-content:center">
            <v-btn outlined color="primary" @click="showmodel">取消</v-btn>
            <v-btn color="primary" @click="showmodel">确定</v-btn>
          </v-card-actions>
      
      </v-card>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      drawer: false,
      itemsProject: ["项目一", "项目二", "项目三", "项目四"],
      itemsPinpai: ["品牌一", "品牌二", "品牌三", "品牌四"]
    };
  },
  methods: {
    showmodel() {
      //打开侧边栏
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #039be5 !important;
}
.basil--text {
  color: #03a9f4 !important;
}
.tab {
  min-width: 58px !important;
}
</style>