/*
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2022-05-25 16:33:22
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\admin\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Index from '../views/Index'

Vue.use(VueRouter)

const routes = [{
  path: '/admin',
  component: Home,
  children: [
    { path: '', component: Index },
    {
      path: 'css1',
      name: 'css1',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '../views/CSS_Manager/CssManager1')
    },
    {
      path:'css2',
      name:'css2',
      component: () => import( /* webpackChunkName: "about" */ '../views/CSS_Manager/CssManager2')
    },
    {
      path:'js',
      name:'js',
      component: () => import( /* webpackChunkName: "about" */ '../views/CSS_Manager/JsManager')
    },
    {
      path:'typescript',
      name:'typescript',
      component: () => import( /* webpackChunkName: "about" */ '../views/CSS_Manager/Typrescript')
    },
    {
      path:'jsmark',
      name:'jsmark',
      component: () => import( /* webpackChunkName: "about" */ '../views/CSS_Manager/JsMark')
    }
  ]
}
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router