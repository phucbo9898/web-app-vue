import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/Auth'
import UserInfo from './modules/UserInfo'
import BlockUi from './modules/BlockUi'
import CartProductStore from './modules/CartProductStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    userInfor: UserInfo,
    blockUi: BlockUi,
    cartProductStore: CartProductStore
  },
  plugins: [
    createPersistedState({
      paths: ['auth', 'userInfor', 'cartProductStore'],
      storage: window.localStorage
    })
  ]
})

export default store
