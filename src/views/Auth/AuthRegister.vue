<template>
    <div class="card register container">
        <div class="card-header">
            <h3 class="text-center">{{ $t('register')}}</h3>
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
                            {{ $t('common.field.email') }}
                            <span class="badge bg-danger require">
                                {{ $t("common.field.required") }}
                            </span>
                        </label>
                        <span>{{newMem.email}}</span>
                        <input
                            type="text"
                            class="form-control"
                            aria-describedby="emailHelp"
                            :placeholder="$t('common.placeholder.email')"
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
                            {{ $t('common.field.password') }}
                            <span class="badge bg-danger require">
                                {{ $t("common.field.required") }}
                            </span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="typePassword"
                                :class="{
                                    'border-danger': (touched || invalid) && errors[0],
                                }"
                                class="form-control"
                                :placeholder="$t('common.placeholder.password')"
                                v-model="newMem.password"
                                autocomplete="off"
                            />
                            <div class="input-group-text" @click="hideOrShow('password')">
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
                            {{ $t('common.field.password_confirm') }}
                            <span class="badge bg-danger require">
                                {{ $t("common.field.required") }}
                            </span>
                        </label>
                        <div class="input-group">
                            <input
                                :type="typePasswordConfirm"
                                :class="{
                                    'border-danger': (touched || invalid) && errors[0],
                                }"
                                class="form-control"
                                :placeholder="$t('common.placeholder.password_confirm')"
                                v-model="passwordConfirm"
                                autocomplete="off"
                            />
                            <div class="input-group-text" @click="hideOrShow('passwordConfirm')">
                                <i class="check-pw far" :class="showPwConfirm"></i>
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
                    <div class="form-group mb-3 d-block d-xl-flex justify-content-between">
                        <div class="name-custom mr-10px mb-3-custom">
                            <ValidationProvider
                                v-slot="{ errors, touched }"
                                :rules="{ required: true, max: 255, no_script_tag: true }"
                                name="first_name"
                                class=""
                            >
                                <label for=''>
                                    {{ $t('common.field.first_name') }}
                                    <span class="badge bg-danger require">
                                        {{ $t("common.field.required") }}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    :class="{ 'border-danger': (touched || invalid) && errors[0] }"
                                    class="form-control"
                                    :placeholder="$t('common.placeholder.first_name')"
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
                        </div>
                        <div class="name-custom">
                            <ValidationProvider
                                v-slot="{ errors, touched }"
                                :rules="{ required: true, max: 255, no_script_tag: true }"
                                name="last_name"
                                
                            >
                                <label for=''>
                                    {{ $t('common.field.last_name') }}
                                    <span class="badge bg-danger require">
                                        {{ $t("common.field.required") }}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    :class="{ 'border-danger': (touched || invalid) && errors[0] }"
                                    class="form-control"
                                    :placeholder="$t('common.placeholder.last_name')"
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
                    </div>
                    <div class="form-group mb-3">
                        <label for=''>{{ $t('common.field.phone_number')}}</label>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('common.placeholder.phone_number')"
                            v-model="newMem.phone_number"
                            autocomplete="off"
                        />
                    </div>
                    <div class="form-group">
                        <label for=''>{{ $t('common.field.address') }}</label>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('common.placeholder.address')"
                            v-model="newMem.address"
                            autocomplete="off"
                        />
                    </div>

                    <div v-if="showErrLogin" class="text-danger mb-5" v-html="msgErrLogin"></div>
                    <br />
                </form>
                <button @click="onReset" class="btn btn-warning" style="margin-right: 10px;">{{ $t('common.btn.btn_reset') }}</button>
                <button @click="handleSubmit(submitRegister)" class="btn btn-primary">{{ $t('common.btn.btn_save') }}</button>
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
    private showErrLogin: boolean = false;
    private msgErrLogin: String = '';
    private showPw: String = "fa-eye-slash";
    private showPwConfirm: String = "fa-eye-slash";
    private typePassword: String = "password";
    private typePasswordConfirm: String = "password";
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

    hideOrShow(name: String) {
        if (name == 'password') {
            if (this.showPw == "fa-eye-slash") {
                this.showPw = "fa-eye";
                this.typePassword = "text";
            } else {
                this.showPw = "fa-eye-slash";
                this.typePassword = "password";
            }
        } else {
            if (this.showPwConfirm == "fa-eye-slash") {
            this.showPwConfirm = "fa-eye";
            this.typePasswordConfirm = "text";
        } else {
            this.showPwConfirm = "fa-eye-slash";
            this.typePasswordConfirm = "password";
        }
        }
        
    }

    submitRegister() {
        console.log(this.newMem);
        this.$blockui.show();
        AuthService.register(this.newMem)
        .then((response) => {
            if (response.status === 200) {
                this.$swal.fire({
                    text: this.$t('common.msg.register_success') as string,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
        .catch((error) => {
            if (
                error.response.status === 401 &&
                error.response.data.message == 'email_already_exists'
            ) {
                this.nameRoute = 'register'
                // this.modalMess = this.$t('common.message.email_already_exists') as string
                // this.$bvModal.show('modal-error')
                this.$swal.fire({
                    text: this.$t('common.message.email_already_exists') as string,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                this.nameRoute = 'register'
                // this.modalMess = this.$t('common.msg.register_error') as string;
                // this.$bvModal.show("modal-error");
                this.$swal.fire({
                    text: this.$t('common.msg.register_error') as string,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
        .finally(() => this.$blockui.hide());
    }

    onReset() {
        this.newMem.email = '';
        this.newMem.password = '';
        this.newMem.first_name = '';
        this.newMem.last_name = '';
        this.newMem.phone_number = '';
        this.newMem.address = '';
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
.name-custom {
    @media (min-width: 992px) {
        width: 50% !important;
    }
}
.mr-10px {
    @media (min-width: 992px) {
        margin-right: 10px !important;
    }
}
.mb-3-custom {
    margin-bottom: 1rem !important;
    @media (min-width: 992px) {
        margin-bottom: 0 !important;
    }
}
</style>
