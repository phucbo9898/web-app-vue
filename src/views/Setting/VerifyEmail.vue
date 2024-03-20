<template>
    <div class="flex-center">
        <div v-if="spining" class="spinner-border mt-30" />
        <ModalError
            :errorMess="modalMess"
            @close="jumpToLogin"
        />
        <ModalSuccess
            :successMess="modalMess"
            @close="jumpToLogin"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";
import store from "@/store";
import Auth from "@/store/modules/Auth";
import { getModule } from "vuex-module-decorators";

const AuthModule = getModule(Auth, store);

@Component
export default class VerifyPage extends Vue {
  private spining: boolean = true;
  private modalMess: string = "";

  created() {
    setTimeout(() => {
      this.verifyEmailChange();
    }, 2 * 1000);
  }

  verifyEmailChange() {
    if (this.$route.query.token) {
      let data = {
        params: { token: this.$route.query.token },
      };
      UserService.verifyEmailChange(this.$route.query.user_id, data)
        .then((response) => {
          this.$swal.fire({
            text: response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          })
        })
        .catch((error) => {
          this.$swal.fire({
            text: error.response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          })
        })
        .finally(() => (this.spining = false));
    }
  }

  jumpToLogin() {
    this.$router.push("login");
    AuthModule.SET_TOKEN_NULL();
    sessionStorage.clear();
    localStorage.clear();
  }
}
</script>
