<template>
  <div class="card login container">
    <div class="card-header">
      <h3 class="text-center">Login</h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
          @keyup.enter="handleSubmit"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
          @keyup.enter="handleSubmit"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <div
        v-if="showErrLogin"
        class="text-danger mb-5"
        v-html="msgErrLogin"
      ></div>
      <button @click="handleSubmit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import Auth from "@/store/modules/Auth";
import UserInfo from "@/store/modules/UserInfo";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthService from "../../services/AuthService";
const AuthModule = getModule(Auth, store);
const UserInforModule = getModule(UserInfo, store);

@Component
export default class LayoutAuth extends Vue {
  private email: String = "";
  private password: String = "";
  private showErrLogin: boolean = false;
  private msgErrLogin: String = "";

  created() {
    if (this.$store.state.auth.token) {
      router.push({ name: 'home'})
    }
  }
  handleSubmit() {
    let account = {
      email: this.email,
      password: this.password,
    };
    console.log(this.email);
    console.log(this.password);
    this.$blockui.show();
    AuthService.login(account)
      .then(async (response) => {
        console.log(response);

        if (response.status == 200) {
          console.log('token', response.data.item.token);
          
          let token = response.data.item.token;
          if (token) {
            await AuthModule.SET_NEW_TOKEN(response.data.item.token);
            await this.getUserInfor();
          }
        }
      })
      .catch((err) => {
        console.log('err: ', err);
        
        // if (err.response.status === 401) {
        //   this.showErrLogin = true;
        //   this.msgErrLogin = err.response.data.message;
        // } else {
        //   this.showErrLogin = false;
        // }
        // console.log(err.response.status);
      })
      .finally(() => this.$blockui.hide());
  }

  getUserInfor() {
    AuthService.getUserInfor()
      .then(async (response) => {
        if (response.status === 200) {
          await UserInforModule.HANDLE_USER_PROFILE(response.data.item);
          let path = this.$route.query.redirect ? String(this.$route.query.redirect) : '/'
          window.location.href = window.location.origin + path;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style lang="scss">
.login {
  width: 40%;
}
</style>
