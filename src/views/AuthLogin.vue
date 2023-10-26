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
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"
            >Check me out</label
          >
        </div>
        <div v-if="showErrLogin" class="text-danger mb-5" v-html="msgErrLogin"></div>
        <button @click="handleSubmit" class="btn btn-primary">Submit</button>
      </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import Auth from "@/store/modules/Auth";
import UserInfo from "@/store/modules/UserInfo";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthService from '../services/AuthService'
const AuthModule = getModule(Auth, store)
const UserInforModule = getModule(UserInfo, store)

@Component
export default class LayoutAuth extends Vue {
    private email: String = ''
    private password: String = ''
    private showErrLogin: boolean = false
    private msgErrLogin: String = ''

    handleSubmit() {
        let account = {
            email: this.email,
            password: this.password
        }
        console.log(this.email);
        console.log(this.password);
        this.$blockui.show()
        AuthService.login(account)
        .then(async (response) => {
            if (response.status == 200) {
                let token = response.data.item.token
                if (token) {
                    AuthModule.SET_NEW_TOKEN(response.data.item.token)
                    this.getUserInfor()
                }
                this.$router.push({ name: 'home'})
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
                this.showErrLogin = true
                this.msgErrLogin = err.response.data.message
            } else {
                this.showErrLogin = false
            }
            console.log(err.response.status);
        })
        .finally(() => this.$blockui.hide())
    }

    getUserInfor() {
        AuthService.getUserInfor()
        .then(response => {
            if (response.status === 200) {
                UserInforModule.HANDLE_USER_PROFILE(response.data)
                console.log(response)
            }
        })
        .catch(error => {
            console.log(error);
            
        })
    }
}
</script>

<style lang="scss">
.login {
  width: 40%;
}
</style>
