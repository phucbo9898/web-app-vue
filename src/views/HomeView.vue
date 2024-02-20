<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <input type="text" class="form-control" v-model="msg" style="width: 20%">
    <button @click="handleNotification">click me</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import NotificationServices from '@/services/NotificationServices';
import axios from 'axios';
import store from '@/store';
@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  private msg: any = ''
  private logo: any = require('@/assets/logo-fe.png')
  created() {
    console.log('Home View Created');
  }

  handleNotification() {
    // var title = 'Welcome to Your Vue.js + TypeScript App'
    // const notification = new Notification(title, {
    //   body: this.msg,
    //   icon: this.logo
    // })
    // notification.addEventListener('click', () => {
      //   window.open('https://google.com')
    // })
    const params = {
      title: 'Welcome to Your Vue.js + TypeScript App',
      message: 'test notification'
    }
    NotificationServices.pushNotifications(params)
      .then((response) => {
        if (response.status == 200) {
          // const url = 'https://fcm.googleapis.com/fcm/send'
          // const headers = {
          //   'Authorization': 'key=AAAAasG8NoU:APA91bHw1eAGmgvu7uoAzN0pxysRIBVhhs163UMIrissa7jMT3olc1hpdoLowuMXlPkBConvra03jhYpsZQGkr07mlmSbr_KRoGoeTQqsNpfdDeN-4aKZdKypEcVBFn8BDdezOOopMP3',
          //   'Content-Type': 'application/json'
          // }
          // var params = {
          //   "to": sessionStorage.getItem('currentToken'),
          //   "notification": {
          //       "title": "This is a title",
          //       "body": "This is a body",
          //       // "click_action":"https://google.com" 
          //       'image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoVki-W_uujCaTvpNM11TDow7Quak0v3sC-4HKViNS4pdPnqUdydTBFn0TQunXiPzQOUM&usqp=CAU",
          //   }
          // }
          // axios.post(url, params, {
          //   headers: headers
          // }).then((res) => {
          //   console.log('res', res);
          // }).catch(error => {
          //   console.log(error);
          // })
          console.log(response.data.data.link);
          
          sessionStorage.setItem('url_redirect', response.data.data.link)
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        
      })
  }
}
</script>
