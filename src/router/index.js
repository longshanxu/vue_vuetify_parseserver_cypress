/*
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2021-04-14 15:03:24
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "sign" */ '../views/login/SignUp.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user_token')

//   if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
//     next('/')
//   }
//   next()
// })

export default router