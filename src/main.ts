import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import { BootstrapVue } from 'bootstrap-vue'
import { getModule } from 'vuex-module-decorators'
import { Component } from 'vue-property-decorator'
// @ts-ignore
// import Vidle from 'v-idle'

Vue.use(BootstrapVue)
// Vue.use(Vidle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
