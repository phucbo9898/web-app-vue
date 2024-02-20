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
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import router from "./router";
import Footer from "./components/Footer.vue";
const AuthModule = getModule(Auth, store)

@Component({ components: { BlockView, Footer } })
export default class App extends Vue {
  created() {
    if (this.$store.state.auth.token) {
      if ("Notification" in window) {
        console.log("Notification supported");
        if (Notification.permission !== 'granted') {
          Notification.requestPermission().then((res) => {
            if (res === 'denied') {
              console.log("Notification access denied");
            } else if (res === 'default') {
              console.log("Notification permission not given");
            }
          })
        }
        const registerSW = async () => {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/'});
          console.log('registration', registration);
          
          return registration;
        }
        registerSW()
      } else {
        console.error("Notification not supported");
      }
    

      const app = initializeApp({
        apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
        authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VUE_APP_FIREBASE_APP_ID,
        measurementId: process.env.VUE_APP_MEASUREMENT_ID
      });
      
      const messaging = getMessaging();
      onMessage(messaging, (payload: any) => {
        console.log('payload', payload);
        console.log(sessionStorage.getItem('url_redirect'));      
        setTimeout(() => {
          const noti = new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: require('@/assets/logo-fe.png')
          })

          noti.addEventListener('click', (event) => {
            console.log('click', event);
            
            router.push(sessionStorage.getItem('url_redirect') as string)
            sessionStorage.removeItem('url_redirect')
          })
        }, 10000);
      })
      getToken(messaging, { vapidKey: 'BEN93gwBJii2jWUMFNGlHDEqrtl8L8U8IbsNgePQliwZ8tLF0QRyWCSmQYukEfb49rf1l4rplIKFPTndEFw-Kb8' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          sessionStorage.setItem('currentToken', currentToken)
          console.log("Current token: ", currentToken);
          console.log('sessionStorage', sessionStorage.getItem('currentToken'));
          console.log(this.$store.state.auth.token);
          if (this.$store.state.auth.token) {
            var params = {
              token: currentToken
            }
            console.log(params);
            AuthService.updateDeviceToken({token: currentToken})
              .then(response => {
                console.log('token updated', response)
              })
              .catch((error) => {
                console.error(`Error! ${error}`);
              })
          }
          
          
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    }
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
