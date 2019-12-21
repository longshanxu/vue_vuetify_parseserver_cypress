<!--
 * @Author: Json.Xu
 * @Date: 2019-11-28 13:57:46
 * @LastEditTime: 2019-11-29 12:39:57
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue-mobile\src\views\elevator\elevatorDetail.vue
 -->
<template>
  <v-container class="pa-0 grey lighten-3" style="height:100%">
    <v-card class="overflow-hidden grey lighten-3" flat fill-height>
      <v-app-bar fixed dark color="primary" class="pa-0" dense scroll-target="#scrolling-sheet">
        <v-row align="center" justify="center" dense>
          <v-col cols="2">
            <router-link to="/elevator">
              <v-icon left>mdi-arrow-left</v-icon>
            </router-link>
          </v-col>
          <v-col cols="8" style="text-align:center">
            <v-toolbar-title class="white--text">电梯详情</v-toolbar-title>
          </v-col>
          <v-col cols="2" style="text-align:right">
            <v-btn icon>
              <v-icon>mdi-credit-card-scan</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-card>
    <v-sheet id="scrolling-sheet" class="my-12">
      <v-container class="pa-0" fluid>
        <v-card class="mx-auto pa-0 grey lighten-3" flat>
          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;注册代码
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写注册代码"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;电梯类型
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="直梯"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;电梯型号
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="请填写电梯型号"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;品牌
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="选择品牌"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;设备用途
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="选择设备用途"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="6" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;电梯GPS位置
              </v-col>
              <v-col cols="6">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="电梯GPS位置"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="6" style="text-align:left;color:black">电梯位置信息补充</v-col>
              <v-col cols="6">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写补充信息"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;出厂编号
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写出厂编号"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">出厂日期</v-col>
              <v-col cols="9">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="textboder1 textboder"
                      height="48"
                      style="padding-top:0px;margin-top:0px"
                      hide-details
                      solo
                      flat
                      append-icon="mdi-greater-than"
                      v-model="date"
                      label="选择出厂日期"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                    :day-format="date => date.split('-')[2]"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="6" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;电梯维保负责人
              </v-col>
              <v-col cols="6">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="选择人员"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="6" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;首次计划保养时间
              </v-col>
              <v-col cols="6">
                 <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="textboder1 textboder"
                      height="48"
                      style="padding-top:0px;margin-top:0px"
                      hide-details
                      solo
                      flat
                      append-icon="mdi-greater-than"
                      v-model="date2"
                      label="选择保养日期"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date2"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save2"
                    :day-format="date2 => date2.split('-')[2]"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;年检日期
              </v-col>
              <v-col cols="9">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="textboder1 textboder"
                      height="48"
                      style="padding-top:0px;margin-top:0px"
                      hide-details
                      solo
                      flat
                      append-icon="mdi-greater-than"
                      v-model="date1"
                      label="选择年检日期"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date1"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save1"
                    :day-format="date1 => date1.split('-')[2]"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">安装单位</v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写安装单位名称"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">改造单位</v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写改造单位"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="4" style="text-align:left;color:black">曳引绳根数</v-col>
              <v-col cols="8">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写曳引绳根数"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">曳引绳直径(mm)</v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写曳引绳直径"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">门锁型号</v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写门锁型号"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;电梯载重(kg)
              </v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写电梯载重"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;提升高度(m)
              </v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写提升高度"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">电动机功率(kW)</v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写电动机功率"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;额定速度(m/s)
              </v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写额定速度"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;层/站/门
              </v-col>
              <v-col cols="9">
                 <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写层/站/门"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="5" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;安全钳类型
              </v-col>
              <v-col cols="7">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="选择安全钳类型"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="3" style="text-align:left;color:black">钢带(n)</v-col>
              <v-col cols="9">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="填写钢带"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="pa-0 pl-4" style="margin-top:12px;background-color:white">
            <v-row align="center" justify="center" dense>
              <v-col cols="6" style="text-align:left;color:black">
                <v-icon color="red" size="12">mdi-star</v-icon>&nbsp;&nbsp;所属项目
              </v-col>
              <v-col cols="6">
                <v-text-field
                  class="textboder"
                  height="48"
                  style="padding-top:0px;margin-top:0px"
                  hide-details
                  solo
                  flat
                  placeholder="选择项目"
                  append-icon="mdi-greater-than"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-row align="center" justify="center" dense>
              <v-col cols="8" style="text-align:left;color:black">是否按需维保</v-col>
              <v-col cols="4" style="text-align:right">
                <v-switch inset v-model="switchweibo" hide-details flat style="display:inline-flex;width:60px"></v-switch>
              </v-col>
            </v-row>
          </v-card-text>

          <v-row align="center" justify="center" class="mt-4">
            <v-col cols="7" style="text-align:left;color:grey">该电梯是否购买安全责任保险</v-col>
            <v-col cols="5" >
              <v-radio-group hide-details class="mt-0" v-model="row" row >
                <v-radio label="是" value="1"></v-radio>
                <v-radio label="否" value="0"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-card-actions class="pt-0">
            <v-card-text>
              <v-btn block color="primary">添加</v-btn>
            </v-card-text>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      row: "0",
      switchweibo: true,
      date: null,
      menu: false,
      date1: null,
      menu1: false,
       date2: null,
      menu2: false
    };
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    save1(date) {
      this.$refs.menu1.save(date);
    },
    save2(date) {
      this.$refs.menu2.save(date);
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu1(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  }
};
</script>

<style scoped>
.textboder >>> input {
  text-align: right !important;
}
.textboder1 >>> label {
  right: 0 !important;
  left: auto !important;
}
</style>