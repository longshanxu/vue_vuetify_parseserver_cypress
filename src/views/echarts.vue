<!--
 * @Author: Json.Xu
 * @Date: 2019-11-18 15:17:49
 * @LastEditTime: 2019-11-27 20:07:15
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \moch-vue\src\views\echarts.vue
 -->
<template>
  <v-container>
    <!-- [1] 为 ECharts 准备一个具备大小 (宽高) 的 DOM -->
    <div id="chart" ref="chart" style="width: 300px; height: 300px"></div>
    <div class="close display-4">{{inittxt}}</div>
    <v-card class="mx-auto" :elevation="4">
      <v-card-text>
        <slot>This is alert box!</slot>
        <br />
        <slot name="header">header</slot>
        <br />
        <slot name="body">body</slot>
        <br />
        <slot name="footer" lname="我是传出去的数据" :tname="inittxt">footer</slot>
      </v-card-text>
    </v-card>

    <v-hover>
      <template v-slot="{ hover }">
        <v-card :elevation="hover ? 24 : 6" class="mx-auto pa-6">Prop based elevation</v-card>
      </template>
    </v-hover>
    <v-btn color="purple darken-3" dark fab small @click="isEditing = !isEditing">
      <v-icon v-if="isEditing">mdi-close</v-icon>
      <v-icon v-else>mdi-pencil</v-icon>
    </v-btn>
    <v-autocomplete
      label="测试自动完成组件"
      @change="changeauto"
      prepend-icon="mdi-close"
      filled
      rounded
      outlined
      multiple
      :items="testitems"
      item-text="name"
    ></v-autocomplete>

    <v-checkbox v-model="checkbox" color="success" loading light :label="checkbox.toString()"></v-checkbox>
    <v-switch v-model="switch1" loading dark></v-switch>

    <v-input :messages="['Messages']" append-icon="mdi-close" prepend-icon="mdi-phone">Default Slot</v-input>
    <v-slider
      v-model="volume"
      append-icon="mdi-zoom_out"
      prepend-icon="mdi-volumedown"
      label="Volume"
    ></v-slider>
    <v-menu offset-x bottom orgin="center center" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Dropdown</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card height="200px">
      <v-card-title class="blue white--text">
        <span class="headline">Menu</span>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text>6666</v-card-text>
    </v-card>
    <v-sheet height="400" class="overflow-hidden" style="position:relative">
      <v-card class="mx-auto" height="400" width="256">
        <v-navigation-drawer class="deep-purple accent-4" dark permanent>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Application</v-list-item-title>
                <v-list-item-subtitle>subtext</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block>注销</v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </v-card>
    </v-sheet>

    <v-sheet height="400" class="overflow-hidden" style="position: relative;">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-btn color="pink" dark @click.stop="drawer = !drawer">Toggle</v-btn>
        </v-row>
      </v-container>

      <v-navigation-drawer v-model="drawer" bottom absolute temporary>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>

    <v-toolbar color="primary" dark>
      <v-toolbar-title>您好!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>LINK1</v-btn>
        <v-btn text>LINK2</v-btn>
        <v-btn text>LINK2</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-card class="pa-4" flat height="300" img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg">
      <v-toolbar color="primary" dark dense floating>
        <v-toolbar-title>您好!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text>LINK1</v-btn>
          <v-btn text>LINK2</v-btn>
          <v-btn text>LINK2</v-btn>
        </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
    </v-card>

    <v-card class="mx-auto" max-width="344" outlined>
      <v-system-bar color="indigo darken-2">
        <v-spacer></v-spacer>
        <v-icon>mdi-window-minimize</v-icon>

        <v-icon>mdi-window-maximize</v-icon>

        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-app-bar dark color="pink">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>My test</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
          <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-img
        class="white--text align-end"
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Top One</v-card-title>
      </v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">headline 5</v-list-item-title>
          <v-list-item-subtitle>Gr eyhound divisely hello</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="red"></v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-btn text blue>Button1</v-btn>
        <v-btn text>Button2</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>i'm a thing</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto" max-width="300" tile>
      <v-list rounded two-line>
        <v-subheader inset>Reports</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-avatar>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-card max-width="600" class="mx-auto">
      <v-list two-line subheader>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-avatar>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card color="grey" class="mb-12" height="200"></v-card>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-card color="grey" class="mb-12" height="200"></v-card>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card color="grey" class="mb-12" height="200"></v-card>
        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :rules="[() => false]" step="4">
        Ad templates
        <small>Alert message</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-card>
      <v-tabs show-arrows>
        <v-tab v-for="i in 3" :key="i" :href="'#tab-' + i" v-model="model">Item {{ i }}</v-tab>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="i in 3" :key="i" :value="`tab-${i}`">
            <v-card flat>
              <v-card-text v-text="text"></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
    <v-card>
      <v-card-text>
        <v-badge>
          <template v-slot:badge>0</template>
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </v-card-text>
    </v-card>

    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator="{on}">
        <v-btn color="purple" dark v-on="on">Open</v-btn>
      </template>
      <v-sheet class="text-center" height="200">
        <v-btn class="mt-6" flat color="red" @click="sheet = !sheet">close</v-btn>
        <div>The basic</div>
      </v-sheet>
    </v-bottom-sheet>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="red" dark v-on="on">Click me</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <div class="text-center">
        <v-btn dark color="indigo" @click="snackbar = true">Open snack</v-btn>
      </div>
      <v-snackbar v-model="snackbar" vertical>
        {{text}}
        <v-btn color="red" text @click="snackbar=false">Close</v-btn>
      </v-snackbar>
    </v-card>

    <v-data-iterator :items="items" item-key="title" :items-per-page="4" :single-expand="true">
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col v-for="item in items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Expanded' : 'Closed'"
                class="pl-4 mt-0"
                @change="(v) => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense>
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.calories }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Fat:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.fat }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Carbs:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.carbs }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Protein:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.protein }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sodium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.sodium }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Calcium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.calcium }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Iron:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.iron }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <v-row justify="center">
      <v-date-picker v-model="picker" :day-format="date => date.split('-')[2]" locale="zh-cn" :event-color="date" :events="functionEvents"></v-date-picker>
    </v-row>
  </v-container>
</template>


<script>
import echarts from "echarts";

// 按需引入
// import echarts from 'echarts/lib/echarts'; // 引入基本模板
// import bar from 'echarts/lib/chart/bar';   // 引入柱状图组件
export default {
  data() {
    return {
      drawer: null,
      chart: null,
      inittxt: "非占位符----------",
      testitems: [{ name: "name1", value: "1" }, { name: "name2", value: "2" }],
      isEditing: null,
      checkbox: true,
      switch1: true,
      volume: 10,
      items: [
        { title: "Click Me1", icon: "mdi-view-dashboard" },
        { title: "Click Me2", icon: "mdi-image" },
        { title: "Click Me3", icon: "mdi-help-box" },
        { title: "Click Me4", icon: "mdi-view-dashboard" }
      ],
      show: false,
      e6: 1,
      model: "tab-2",
      text: "测试内容",
      sheet: false,
      snackbar: false,
      picker: new Date().toISOString().substr(0, 10)
    };
  },
  props: ["message"],
  computed: {},

  methods: {
    init(temp) {
      // 使用 ref 访问 DOM, 也可以使用 document.getElementById('chart')
      this.chart = echarts.init(this.$refs.chart);

      // [4] 设置 Echarts 图表数据
      this.chart.setOption({
        title: {
          text: temp
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    changeauto() {
      //console.log(333);
    },
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    }
  },
  mounted() {
    // [3] 基于准备好的 DOM，初始化 Echarts 实例
    this.init("ECharts 入门示例");
  }
};
</script>

<style lang="scss" scoped>
</style>