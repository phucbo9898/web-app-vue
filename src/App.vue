<template>
  <div id="app">
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
    <BlockView :active="$store.state.blockUi.active" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthService from "./services/AuthService";
import BlockView from "@/components/BlockView.vue";
import store from "./store";
import Auth from "./store/modules/Auth";
const AuthModule = getModule(Auth, store)

@Component({ components: { BlockView } })
export default class App extends Vue {
  async logout() {
    await AuthService.logout()
      .then(response => {
        if (response.status === 200) {
          AuthModule.SET_TOKEN_NULL()
          this.$router.push({ name: 'login'})
        }
      })
      .catch(error => {
        console.log(error);
        
      })
    sessionStorage.clear()
    localStorage.clear()
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
