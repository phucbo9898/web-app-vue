import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutHome from '@/layouts/LayoutHome.vue'
import LayoutAbout from '@/layouts/LayoutAbout.vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutSetting from '@/layouts/LayoutSetting.vue'
import VueMeta from "vue-meta";
import store from '@/store'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      layout: LayoutHome,
      title: 'Home page',
      requireAuth: false
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
      title: 'About page',
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/AuthLogin.vue'),
    meta: {
      layout: LayoutAuth,
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/AuthRegister.vue'),
    meta: {
      layout: LayoutAuth,
      title: 'Register'
    }
  },
  {
    path: '/setting',
    redirect: '/setting',
    component: LayoutSetting,
    meta: {
      title: 'Setting Account',
      requiresAuth: true
    },
    children: [
      {
        path: 'account-information',
        name: 'account-information',
        component: () => import('@/views/Setting/SettingAccount.vue'),
        meta: {
          title: 'Account information',
          requiresAuth: true
        }
      },
      {
        path: 'change-profile',
        name: 'change-profile',
        component: () => import('@/views/Setting/SettingInformation.vue'),
        meta: {
          title: 'Change the profile',
          requiresAuth: true
        }
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('@/views/Setting/SettingChangePassword.vue'),
        meta: {
          title: 'Change the password',
          requiresAuth: true
        }
      },
      {
        path: 'change-email',
        name: 'change-email',
        component: () => import('@/views/Setting/SettingChangeEmail.vue'),
        meta: {
          title: 'Change the email',
          requiresAuth: true
        }
      },
      {
        path: 'change-language',
        name: 'change-language',
        component: () => import('@/views/Setting/SettingLanguage.vue'),
        meta: {
          title: 'Change the language',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/verify',
    name: 'verify-email',
    component: () => import('@/views/Setting/VerifyEmail.vue'),
    meta: {
      layout: LayoutAuth,
      title: 'Verify email',
      requiresAuth: false
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
  let token = store.state.auth.token
  if (to.matched.some(record => record.meta.requireAuth) && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  next()
})

export default router
