<template>
  <div class="container">
    <div class="d-flex">
      <div class="col-md-2" style="width: 20% !important;">
        <div class="border text-center" style="background-color: #406ccf; color: white !important;">
          <h3>List Categories</h3>
        </div>
        <ul class="menu list-style-none" style="padding-left: 0px !important;">
          <li>
            <ul class="list-style-none" style="padding-left: 0px !important; background-color: #406ccf;">
              <li class="px-3 py-2" v-for="category in categories" :key="category.id">
                <router-link :to="{
                  name: 'category-detail',
                  params: { categoryId: category.id }  
                }">{{ category.name }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-md-10 ml-10">
        <Swiper
          ref="swiper1"
          class="swiper w-100 height-cus"
          :options="swiperOption"
        >
          <SwiperSlide
            v-for="banner in banners"
            :key="banner.id"
            class="cursor-pointer"
            style=" object-fit: contain !important; background-color: black !important;"
          >
            <img class="w-100" :src="banner.image" alt="banner" style="height: 445px !important; object-fit: cover;"/>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <!-- <input type="text" class="form-control" v-model="msg" style="width: 20%">
    <button @click="handleNotification">click me</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import NotificationServices from '@/services/NotificationServices';
import axios from 'axios';
import store from '@/store';
import Swiper, { Navigation, SwiperOptions } from 'swiper'
@Component({
  components: {
    HelloWorld,
      },
})
export default class HomeView extends Vue {
  private msg: any = ''
  private logo: any = require('@/assets/logo-fe.png')
  private banners: any = []
  private categories: any = []
  created() {
    console.log('Home View Created');
    this.getListBanner()
    this.getListCategories()
  }

  public swiperOption: SwiperOptions = {
    initialSlide: 0,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
    },
    centeredSlides: true,
    centeredSlidesBounds: true
  }

  getListBanner() {
    NotificationServices.getSlide()
      .then((res) => {
        if (res.status === 200) {
          this.banners = res.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getListCategories() {
    NotificationServices.getCategories()
      .then((res) => {
        if (res.status === 200) {
          this.categories = res.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
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
<style>
.menu {
  display: block;
  position: relative;
}


.menu-list ul {
  background: #ddd;
  height: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  transition: all .9s ease;
  top: 35px;
  width: 100%;
}

.menu-categories:hover ul {
  height: 200px;
  opacity: 1;
  transform: translateY(0);
}

.menu ul a {
  color: white;
  text-decoration: none !important;
  display: block;
  padding: 5px 20px;
}
</style>
