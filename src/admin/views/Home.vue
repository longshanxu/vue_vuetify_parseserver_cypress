<!--
 * @Author: Json.Xu
 * @Date: 2020-02-28 10:17:06
 * @LastEditTime: 2021-01-02 10:11:43
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\views\Home.vue
 -->
<template>
  <v-container class="fill-height pa-0" fluid>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">Json.Xu</span>
      <v-spacer></v-spacer>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-list-item :key="i" link active-class="#FFCF44" :to="item.url">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content class="align-start fill-height">
        <router-view></router-view>
    </v-content>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      items: [
        { icon: "mdi-file-excel", text: "CSS第一套", url: "/admin/css1" },
        { icon: "mdi-cannabis", text: "CSS第二套",url:"/admin/css2" },
        { icon: "mdi-car-brake-retarder", text: "js7种设计模式",url:"/admin/js" },
        { icon: "mdi-car-clutch",text: "typescript",url:"/admin/typescript"  },
        { icon: "mdi-calendar-month",text: "jsmark",url:"/admin/jsmark"  },
        { icon: "mdi-led-on", text: "Settings" },
        { icon: "mdi-eye-outline", text: "Trash" },
        { icon: "mdi-wifi-strength-2-alert", text: "Help" },
        { icon: "mdi-laptop", text: "App downloads" },
        { icon: "mdi-ev-station", text: "Keyboard shortcuts" }
      ]
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style>
</style>