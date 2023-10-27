<template>
  <div class="card register container">
      <div class="card-header">
        <h3 class="text-center">Register</h3>
      </div>
      <div class="card-body">
        <form action="">
            <ValidationObserver v-slot="{ invalid }">
                <div class="form-group">
                    <ValidationProvider
                        v-slot="{ errors }"
                        :rules="{ required: true, email: true, max: 255, no_script_tag: true }"
                        name="email"
                    >
                        <label class="mb-1">
                            Email address
                            <span class="text-danger">
                                required
                            </span>
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            v-model="email"
                            autocomplete="off"
                            :class="{ 'border-danger': errors[0] }"
                        />
                        <span
                            v-if="errors[0]"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ errors[0] }}
                        </span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <ValidationProvider
                        v-slot="{ errors, touched }"
                        :rules="{ required: true, check_password: true, max: 255, no_script_tag: true }"
                        name="password"
                    >
                        <label for="">
                            Password
                            <span class="text-danger">
                                {{ $t('required')}}
                            </span>
                        </label>
                        <div class="input-group">
                            <input
                                type="password"
                                :class="{ 'border-danger': (touched || invalid) && errors[0] }"
                                class="form-control"
                                placeholder="Password"
                                v-model="password"
                                autocomplete="off"
                            />
                            <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                            </div>
                        </div>
                        <span
                            v-if="(touched || invalid) && errors[0]"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ errors[0] }}
                        </span>
                    </ValidationProvider>
                    
                </div>
                <div class="form-group">
                    <label for="">Phone number</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="phone"
                        autocomplete="off"
                    />
                </div>
                <div class="form-group">
                    <label for="">Address</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="address"
                        autocomplete="off"
                    />
                </div>
            </ValidationObserver>

            <div v-if="showErrLogin" class="text-danger mb-5" v-html="msgErrLogin"></div>
            <br>
            <button @click="handleSubmit" class="btn btn-primary">Submit</button>
            <button @click="onReset" class="btn btn-danger">Reset</button>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from '../../services/AuthService'

@Component
export default class LayoutAuth extends Vue {
    private name: String = ''
    private email: String = ''
    private password: String = ''
    private phone: String = ''
    private address: String = ''
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
        // AuthService.login(account)
        // .then(async (response) => {
        //     if (response.status == 200) {
        //         let token = response.data.item.token
        //         if (token) {
        //             AuthModule.SET_NEW_TOKEN(response.data.item.token)
        //             this.getUserInfor()
        //         }
        //         this.$router.push({ name: 'home'})
        //     }
        // })
        // .catch(err => {
        //     if (err.response.status === 401) {
        //         this.showErrLogin = true
        //         this.msgErrLogin = err.response.data.message
        //     } else {
        //         this.showErrLogin = false
        //     }
        //     console.log(err.response.status);
        // })
        // .finally(() => this.$blockui.hide())
    }

    onReset() {
        this.email = ''
        this.name = ''
        this.password = ''
    }
}
</script>

<style lang="scss">
.register {
  width: 40%;
}
</style>
