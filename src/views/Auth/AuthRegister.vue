<template>
    <div class="card register container">
        <div class="card-header">
            <h3 class="text-center">Register</h3>
        </div>
        <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit, invalid }">
                <form action=''>
                    <div class="form-group mb-3">
                        <ValidationProvider
                            v-slot="{ errors }"
                            :rules="{
                                required: true,
                                email: true,
                                max: 255,
                                no_script_tag: true,
                            }"
                            name="email"
                        >
                        <label class="mb-1">
                            Email address
                            <span class="badge bg-danger require">
                                {{ $t("required") }}
                            </span>
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter your email"
                            v-model="newMem.email"
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
                    <div class="form-group mb-3">
                        <ValidationProvider
                            v-slot="{ errors, touched }"
                            :rules="{
                                required: true,
                                check_password: true,
                                max: 255,
                                no_script_tag: true,
                            }"
                            name="password"
                        >
                        <label for=''>
                            Password
                            <span class="badge bg-danger require">
                                {{ $t("required") }}
                            </span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="typePassword"
                                :class="{
                                    'border-danger': (touched || invalid) && errors[0],
                                }"
                                class="form-control"
                                placeholder="Enter your password"
                                v-model="newMem.password"
                                autocomplete="off"
                            />
                            <div class="input-group-text" @click="hideOrShow">
                                <i class="check-pw far" :class="showPw"></i>
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

                    <div class="form-group mb-3">
                        <ValidationProvider
                            v-slot="{ errors, touched }"
                            :rules="{
                                required: true,
                                check_password: true,
                                max: 255,
                                no_script_tag: true,
                            }"
                            name="password"
                        >
                        <label for=''>
                            Password confirm
                            <span class="badge bg-danger require">
                                {{ $t("required") }}
                            </span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="typePassword"
                                :class="{
                                    'border-danger': (touched || invalid) && errors[0],
                                }"
                                class="form-control"
                                placeholder="Enter your password"
                                v-model="passwordConfirm"
                                autocomplete="off"
                            />
                            <div class="input-group-text" @click="hideOrShow">
                                <i class="check-pw far" :class="showPw"></i>
                            </div>
                        </div>
                        <span
                            v-if="(touched || invalid) && errors[0]"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ errors[0] }}
                        </span>
                        <span
                            v-if="!passwordMatch && !((touched || invalid) && errors[0])"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ $t("password_confirm_not_match") }}
                        </span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group mb-3 d-flex justify-content-between">
                        <ValidationProvider
                            v-slot="{ errors, touched }"
                            :rules="{ required: true, max: 255, no_script_tag: true }"
                            name="password"
                        >
                        <label for=''>
                            First name
                            <span class="badge bg-danger require">
                                {{ $t("required") }}
                            </span>
                        </label>
                        <input
                            type="text"
                            :class="{ 'border-danger': (touched || invalid) && errors[0] }"
                            class="form-control"
                            placeholder="Enter your first name"
                            v-model="newMem.first_name"
                            autocomplete="off"
                        />
                        <span
                            v-if="(touched || invalid) && errors[0]"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ errors[0] }}
                        </span>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors, touched }"
                            :rules="{ required: true, max: 255, no_script_tag: true }"
                            name="password"
                        >
                        <label for=''>
                            Last name
                            <span class="badge bg-danger require">
                                {{ $t("required") }}
                            </span>
                        </label>
                        <input
                            type="text"
                            :class="{ 'border-danger': (touched || invalid) && errors[0] }"
                            class="form-control"
                            placeholder="Enter your last name"
                            v-model="newMem.last_name"
                            autocomplete="off"
                        />
                        <span
                            v-if="(touched || invalid) && errors[0]"
                            class="text-danger slide-down-40-percent d-block z-n1"
                        >
                            {{ errors[0] }}
                        </span>
                        </ValidationProvider>
                    </div>
                    <!-- <div class="form-group mb-3">
                                
                            </div> -->
                    <div class="form-group mb-3">
                        <label for=''>Phone number</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your phone number"
                            v-model="newMem.phone_number"
                            autocomplete="off"
                        />
                    </div>
                    <div class="form-group">
                        <label for=''>Address</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your address"
                            v-model="newMem.address"
                            autocomplete="off"
                        />
                    </div>

                    <div
                        v-if="showErrLogin"
                        class="text-danger mb-5"
                        v-html="msgErrLogin"
                    ></div>
                    <br />
                </form>
                <button @click="handleSubmit(submitRegister)" class="btn btn-primary">Submit</button>
                <button @click="onReset" class="btn btn-danger">Reset</button>
            </ValidationObserver>
        </div>
        <ModalSuccess :successMess="modalMess" @close="modalSuccessClose" />
        <ModalError :errorMess="modalMess"  />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AuthService from "../../services/AuthService";
import { RegisterMember } from "@/models";

@Component
export default class LayoutAuth extends Vue {
    private newMem: RegisterMember = new RegisterMember();
    private name: String = '';
    private email: String = '';
    private password: String = '';
    private phone: String = '';
    private address: String = '';
    private showErrLogin: boolean = false;
    private msgErrLogin: String = '';
    private showPw: String = "fa-eye-slash";
    private typePassword: String = "password";
    private passwordConfirm: String = '';
    private passwordMatch: Boolean = true;
    private modalMess: string = '';
    private nameRoute: string = '';
    /**
     * Check confirm password
     */
    @Watch("passwordConfirm")
    checkConfirmPassword() {
        if (
            this.passwordConfirm.localeCompare(this.newMem.password as string) === 0
        ) {
            this.passwordMatch = true;
            return;
        }
        this.passwordMatch = false;
    }

    hideOrShow() {
        if (this.showPw == "fa-eye-slash") {
            this.showPw = "fa-eye";
            this.typePassword = "text";
        } else {
            this.showPw = "fa-eye-slash";
            this.typePassword = "password";
        }
    }

    submitRegister() {
        console.log(this.newMem);
        this.$blockui.show();
        AuthService.register(this.newMem)
        .then((response) => {
            if (response.status === 200) {
            this.modalMess = this.$t('common.msg.register_success') as string;
            this.$bvModal.show("modal-success");
            }
        })
        .catch((error) => {
            if (
                error.response.status === 401 &&
                error.response.data.message == 'email_already_exists'
            ) {
                this.nameRoute = 'register'
                this.modalMess = this.$t('common.message.email_already_exists') as string
                this.$bvModal.show('modal-error')
            } else {
                this.nameRoute = 'register'
                this.modalMess = this.$t('common.msg.register_error') as string;
                this.$bvModal.show("modal-error");
            }
        })
        .finally(() => this.$blockui.hide());
    }

    onReset() {
        this.email = '';
        this.name = '';
        this.password = '';
    }

    modalSuccessClose() {
        this.$router.push({ name: 'login' })
    }
}
</script>

<style lang="scss">
.register {
    @media (min-width: 992px) {
        width: 40%;
    }
}

.text-required {
  border: 1px solid;
  background-color: red;
  color: white !important;
  border-radius: 20px;
}
</style>
