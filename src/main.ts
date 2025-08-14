import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/scss/index.scss'
import './validations/validation'
import '@/globalComponent'
import { Component } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap';
import BlockUi from './store/modules/BlockUi'
import { getModule } from 'vuex-module-decorators'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swiper, { Autoplay, Pagination, Navigation } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

// @ts-ignore
// import Vidle from 'v-idle'
// Vue.use(Vidle)
const CommonModule = getModule(BlockUi, store)

Swiper.use([Autoplay, Pagination, Navigation])
Vue.use(VueAwesomeSwiper)
Vue.use(VueSweetalert2)
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToaSts: 10,
  newestOnTop: true
})
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

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
