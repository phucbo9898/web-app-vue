import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import { BootstrapVue } from 'bootstrap-vue'
import BlockUi from './store/modules/BlockUi'
import { getModule } from 'vuex-module-decorators'
import { Component } from 'vue-property-decorator'
// @ts-ignore
// import Vidle from 'v-idle'

Vue.use(BootstrapVue)
// Vue.use(Vidle)
const CommonModule = getModule(BlockUi, store)
Vue.prototype.$blockui = {
  show: () => {
    CommonModule.SET_ACTIVE(true)
  },
  hide: (addOverFlow?: boolean) => {
    CommonModule.SET_ACTIVE(false, addOverFlow)
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $blockui: any
  }
}

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
