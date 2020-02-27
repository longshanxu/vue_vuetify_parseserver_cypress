/*
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2020-02-27 17:23:57
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \vue_vuetify_parseserver\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//import Index from '../views/Login.vue'
import Index from '../views/Login'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login/SignUp.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user_token')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router