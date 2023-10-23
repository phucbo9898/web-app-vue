import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/Auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: Auth
  },
  plugins: [
    createPersistedState({
      paths: ['auth'],
      storage: window.sessionStorage
    })
  ]
})

export default store
