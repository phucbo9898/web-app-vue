<template>
  <nav class="header-top border-bottom p-2">
      <div class="container">
        <div class="d-flex justify-content-between">
          <div class="d-xl-flex d-block">
            <div class="mr-5" style="margin-right: 20px !important">
              <span>{{ $t("Phone Number") }}: </span>
              <span>+1234567890</span>
            </div>
            <div>
              <span>{{ $t("Email") }}: </span>
              <a href="mailto://phucbo9898@gmail.com" class="number"
                >phucbo9898@gmail.com</a
              >
            </div>
          </div>
          <div>
            <span
              class="btn btn-light"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              style="background: none; border: 0px !important"
            >
              <i class="fa fa-user"></i>
              {{ $t("Account") }}
            </span>
            <ul class="dropdown-menu">
              <li class="p-2">{{ $t("Đăng nhập") }}</li>
              <li class="p-2">{{ $t("Đăng kí") }}</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HeaderTop extends Vue {}
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
