/*
 * @Author: your name
 * @Date: 2019-11-05 10:00:22
 * @LastEditTime: 2020-04-23 17:16:50
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\admin\plugins\vuetify.js
 */
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';
import { preset } from 'vue-cli-plugin-vuetify-preset-rally/preset'
// import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    preset,
    theme: { dark: true },
});
