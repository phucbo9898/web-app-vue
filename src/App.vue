<template>
  <div id="app">
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
    <BlockView :active="$store.state.blockUi.active" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthService from "./services/AuthService";
import BlockView from "@/components/BlockView.vue";
import store from "./store";
import Auth from "./store/modules/Auth";
import router from "./router";
import Footer from "./components/Footer.vue";
import { firebase } from '@/firebase'
const AuthModule = getModule(Auth, store)

@Component({ components: { BlockView, Footer } })
export default class App extends Vue {
  created() {
    // Register service work
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        return registration
      }
      registerSW()
    }
  }

  @Watch('$route.name')
  watchChangeRouteName() {
    console.log('change route name', this.$route.name);
    console.log('window.Notification.permission', window.Notification.permission);
    
    if (this.$store.state.auth.token) {
      if (!window.Notification) return
      if (window.Notification.permission === 'granted') {
        const messaging = firebase.messaging()
        console.log('messaging', messaging);
        messaging.getToken({ vapidKey: process.env.VUE_APP_FIREBASE_VAPID_KEY}).then((token: any) => { 
          if (token) {
            var params = {
              token: token
            }
            AuthService.updateDeviceToken(params)
              .then(response => {
                console.log('token updated', response)
              })
              .catch((error) => {
                console.error(`Error! ${error}`);
              })
          }
        })

        messaging.onMessage((payload: any) => {
          const notificationPush = new Notification(payload.data.title, {
            body: payload.data.body,
            icon: require('@/assets/logo-fe.png')
          })

          notificationPush.addEventListener('click', () => {
            router.push(payload.data.redirect_to)
          })
        })
      } else {
        window.Notification.requestPermission().then((permission: any) => {
          console.log('Have permission to send notification')
          console.log('permission check', permission);
          if (permission === 'granted') {
            window.location.reload()
          }
        })
      }
    }
  }

  @Watch('window.Notification.permission')
  watchChangePermissionNoti() {
    console.log('window.Notification.permission', window.Notification.permission);
  }

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
