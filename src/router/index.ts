import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutHome from '@/layouts/LayoutHome.vue'
import LayoutAbout from '@/layouts/LayoutAbout.vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      layout: LayoutHome,
      title: 'Home page'
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      layout: LayoutAbout,
      title: 'About page'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthLogin.vue'),
    meta: {
      layout: LayoutAuth,
      title: 'Login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title + '| example'
  next()
})

export default router
