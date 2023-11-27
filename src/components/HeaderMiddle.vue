<template>
  <div class="header-top">
    <nav class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
      <div class="container">
        <div class="row">
          <!-- Begin Header Logo Area -->
          <div class="col-lg-3">
            <div class="logo pb-sm-30 pb-xs-30">
              <a href="http://webpc.test">
                <img
                  src="http://webpc.test/images/logo-fe.png"
                  alt=""
                  style="width: 75px"
                />
              </a>
            </div>
          </div>
          <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
            <form
              action="http://webpc.test/search"
              class="hm-searchbox"
              method="GET"
            >
              <select
                class="nice-select select-search-category"
                name="search_category_id"
              >
                <option value="0">Tất cả</option>
                <option value="1">CPU - Bộ vi xử lý</option>
                <option value="2">VGA - Card màn hình</option>
                <option value="3">Mainbroad - Bo mạch chủ</option>
                <option value="4">RAM - Bộ nhớ</option>
                <option value="5">Ổ cứng</option>
                <option value="6">PSU - Nguồn máy tính</option>
                <option value="7">Tai nghe</option>
                <option value="8">Chuột - Bàn phím</option>
              </select>
              <input
                type="text"
                placeholder=" Nhập giá trị cần tìm kiếm"
                name="search_key"
                class="input-search"
              />
              <button class="li-btn" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </form>
            <div class="header-middle-right">
              <ul class="hm-menu">
                <li class="hm-minicart">
                  <a href="http://webpc.test/shopping">
                    <div class="hm-minicart-trigger">
                      <span class="item-icon"></span>
                      <span class="item-text"
                        ><span class="price_total_cart">0</span> VNĐ
                        <span class="cart-item-count cart-item-count-number"
                          >0</span
                        >
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HeaderMiddle extends Vue {}
</script>

<style lang="scss" scoped>
.header-middle {
  padding: 30px;
}
/* .pl-sm-0, .px-sm-0 {
  @media (min-width: 576px) {
    padding-left: 0!important;
  }
} */

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.w-115px {
  width: 115px !important;
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
    margin-left: 15px;
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
.hm-searchbox .nice-select.select-search-category {
    width: 115px;
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
    height: 42px;
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
</style>
