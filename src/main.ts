import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/scss/index.scss'
import './validations/validation'
import { Component } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { BootstrapVue } from 'bootstrap-vue'
import BlockUi from './store/modules/BlockUi'
import { getModule } from 'vuex-module-decorators'
// @ts-ignore
// import Vidle from 'v-idle'
// Vue.use(Vidle)
const CommonModule = getModule(BlockUi, store)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.use(BootstrapVue)

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
  i18n,
  render: h => h(App)
}).$mount('#app')
