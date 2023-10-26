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
  routes,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    // savedPosition is only available for popstate navigations.
    if (savedPosition) return savedPosition

    //prevent scroll when router change in same page
    if (to.name === from.name) return {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      let position = { selector: to.hash }

      // specify offset of the element
      // if (to.hash === '#anchor2') {
      //   position.offset = { y: 100 }
      // }
      return position
    }

    // scroll to top by default
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title + '| example'
  next()
})

export default router
