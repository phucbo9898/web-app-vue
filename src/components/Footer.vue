<template>
  <footer id="footer">
    <div style="background-color: silver;">
      <span>Copyright @ 2022 Kise, Inc.</span>
    </div>
  </footer>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import store from '@/store';
import Auth from '@/store/modules/Auth';
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
const AuthModule = getModule(Auth, store)
@Component
export default class TestView extends Vue {
  async handleLogout() {
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
#footer {
  /* position: absolute; */
  bottom: 0 !important;
  width: 100%;
}
</style>
