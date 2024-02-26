<template>
  <div class="header-top">
    <nav class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
      <div class="row">
          <!-- Begin Header Logo Area -->
          <div class="col-lg-3 text-end">
            <div class="logo pb-sm-30 pb-xs-30">
              <router-link :to="{ name: 'home' }">
                <img
                  src="../assets/logo-fe.png"
                  alt=""
                  style="width: 75px"
                />
              </router-link>
            </div>
          </div>
          <div class="col-lg-6" style="margin: auto !important;">
            <select
              class="nice-select select-search-category"
              name="search_category_id"
              v-model="search_category_id"
            >
              <option value="0">Tất cả</option>
              <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
            </select>
            <div class="hm-searchbox">
              <input
                type="text"
                placeholder="Nhập giá trị cần tìm kiếm"
                name="search_key"
                class="input-search form-control"
                v-model="keywork"
              />
              <button class="li-btn" @click="handleSubmit"><i class="fa fa-search"></i></button>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="d-flex">
              <img
                  src="../assets/shopping-cart.png"
                  alt=""
                  style="width: 50px"
                />
              <div style="margin-left:10px !important;">
                <span>Total quantity: 2</span> <br>
                <span class="font-weight-bold" style="font-weight: bold !important; color: red !important;">Total money: {{ price.toLocaleString().replaceAll('.', ',')}} VNĐ</span>
              </div>
            </div>
          </div>
        </div>
    </nav>

    <div class="border-top border-bottom" style="background-color: #406ccf;">
      <ul class="d-flex px-5" style="width: 100% !important; font-size: 20px !important; margin-bottom: 0 !important; padding-left: 285px !important;">
        <li class="hover-item-menu p-3 text-center" style="width: 6%">
          <router-link style="text-decoration: none !important; color: white !important;" to="/">Home</router-link>
        </li>
        <li class="hover-item-menu p-3 text-center" style="width: 6%">
          <router-link style="text-decoration: none !important; color: white !important;" to="/article/list">Articles</router-link>
        </li>
        <li class="hover-item-menu p-3 text-center" style="width: 6%">
          <router-link style="text-decoration: none !important; color: white !important;" to="/about">About</router-link>
        </li>
        <li class="hover-item-menu p-3 text-center" style="width: 9%">
          <router-link style="text-decoration: none !important; color: white !important;" to="">Introduction</router-link>
        </li>
        <li class="hover-item-menu p-3 text-center" style="width: 7%">
          <router-link style="text-decoration: none !important; color: white !important;" to="">Contact</router-link>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script lang="ts">
import HomeInformationServices from "@/services/HomeInformationServices";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HeaderMiddle extends Vue {
  public price: number = 1000000000
  public search_category_id: any = 0
  public keywork: any = ''
  public categories: any = []

  created() {
    this.getListCategories()
  }

  getListCategories() {
    HomeInformationServices.getCategories()
      .then((res) => {
        if (res.status === 200) {
          this.categories = res.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSubmit() {
    console.log(this.search_category_id);
    console.log(this.keywork);
    
  }
}
</script>

<style lang="scss" scoped>
.header-middle {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

li {
  list-style: none;
}
.hm-searchbox {
    display: flex;
    position: relative;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    min-width: 600px;
    height: 45px;
    float: left;
    margin-left: 5px;
}
.hm-searchbox input {
    font-size: 13px;
    color: #a5a5a5;
    height: 45px;
    background: transparent;
    border: none;
    width: 100%;
    padding: 0 60px 0 33px;
}
button.li-btn {
    border: none;
    background: #4587d7;
    color: #242424;
    font-size: 20px;
    width: 45px;
    border-radius: 0 2px 2px 0;
    height: 45px;
    line-height: 45px;
    position: absolute;
    right: -1px;
    top: -1px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.hm-searchbox > .nice-select > .select-search-category {
    width: 50px;
    line-height: 43px;
    height: 43px;
    margin: 0;
    border: 0;
    padding: 0 28px 0 25px;
    color: #242424;
    font-size: 13px;
    border-radius: 15px 0 0 15px;
    font-family: 'Tahoma';
    font-weight: 400;
    position: relative;
}
.nice-select {
    -webkit-tap-highlight-color: transparent;
    background-color: #fff;
    border-radius: 5px;
    border: solid 1px #e8e8e8;
    box-sizing: border-box;
    clear: both;
    cursor: pointer;
    display: block;
    float: left;
    font-family: inherit;
    font-size: 14px;
    font-weight: normal;
    height: 45px;
    line-height: 40px;
    outline: none;
    padding-left: 18px;
    padding-right: 30px;
    position: relative;
    text-align: left !important;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
    width: auto;
}
.input-search:focus {
  border: 1px solid silver !important;
}
.badge-danger {
  border: 1px solid red !important;
  background-color: red !important;
  color: white !important;
  height: 22px !important;
}

ul > .hover-item-menu:hover {
  background-color: rgb(18, 55, 216) !important;
}


</style>
