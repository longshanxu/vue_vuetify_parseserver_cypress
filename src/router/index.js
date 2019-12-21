/*
 * @Author: your name
 * @Date: 2019-11-04 19:00:51
 * @LastEditTime: 2019-11-28 14:05:51
 * @LastEditors: Json.Xu
 * @Description: In User Settings Edit
 * @FilePath: \moch-vue\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//import Index from '../views/Login.vue'
import Index from '../views/login//Login'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login/SignUp.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Forget.vue')
  },
  {
    path: '/join',
    name: 'join',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/company/join.vue')
  },
  {
    path: '/create',
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/company/create.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/elevatorcreate',
    name: 'elevatorcreate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/elevator/elevatorCreate.vue')
  },
  {
    path: '/elevator',
    name: 'elevator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/elevator/elevatorlist.vue'),
    children: [{
        path: "tab1",
        component: () => import( /* webpackChunkName: "about" */ '../views/elevator/elevatortabs/tab1.vue')
      },
      {
        path: "tab2",
        component: () => import( /* webpackChunkName: "about" */ '../views/elevator/elevatortabs/tab2.vue')
      }
    ]
  },
]

const router = new VueRouter({
  //mode: 'history',
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