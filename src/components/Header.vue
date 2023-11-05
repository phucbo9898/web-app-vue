<template>
  <div class="header">
    <nav class="border-bottom">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-7 col-12">
          <div class="d-xl-flex d-block">
            <div class="mr-5" style="margin-right: 20px !important;">
              <span>{{ $t('Phone Number')}}: </span>
              <span>+1234567890</span>
            </div>
            <div>
              <span>{{ $t('Email')}}: </span>
              <a href="mailto://phucbo9898@gmail.com" class="number">phucbo9898@gmail.com</a>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-2 col-12 d-flex">
          <div>
            <span
              class="btn btn-light"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              style="background: none; border: 0px !important;"
            >
              <i class="fa fa-user"></i>
              {{ $t('Account')}}
            </span>
            <ul class="dropdown-menu">
              <li class="p-2">{{$t('Đăng nhập')}}</li>
              <li class="p-2">{{$t('Đăng kí')}}</li>
            </ul>
          </div>
          <span> | </span>
          <div>
            <span>EN|</span>
            <span>VI</span>
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
import store from "@/store";
import Auth from "@/store/modules/Auth";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
const AuthModule = getModule(Auth, store);
@Component
export default class AboutVie extends Vue {}
</script>

<style lang="scss" scoped>
nav {
  padding: 12px;
}

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
</style>
