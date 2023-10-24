import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/Auth'
import UserInfo from './modules/UserInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    userInfor: UserInfo
  },
  plugins: [
    createPersistedState({
      paths: ['auth', 'userInfor'],
      storage: window.sessionStorage
    })
  ]
})

export default store
