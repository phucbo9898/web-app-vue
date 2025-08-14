<template>
    <div class="border border-radius-10 p-3">
        <div class="text-center font-weight-bold fs-20 mb-20">
            <span>Change password</span>
        </div>
        <!-- <div class="p-3 d-flex">
            <div class="col-md-3 text-end">
                <span class="">Current password:</span>
            </div>
            <div class="col-md-9 ml-10">
                
            </div>
        </div>
        <div class="d-flex p-3">
            <div class="col-md-3 text-end">
                <label for="">New password:</label>
            </div>
            <div class="col-md-9">
                <b-form-input class="ml-10" v-model="new_password" style="width:40%"></b-form-input>
            </div>
        </div>
        <div class="d-flex p-3">
            <div class="col-md-3 text-end">
                <label for="">New password confirm:</label>
            </div>
            <div class="col-md-9">
                <b-form-input class="ml-10" v-model="new_password_confirm" style="width:40%"></b-form-input>
            </div>            
        </div>
        <div class="d-flex p-3">
            <div class="col-md-3"></div>
            <div class="col-md-9 ml-10">
                <button class="btn btn-primary" @click="handleChangeEmail">Submit</button>
            </div>
        </div> -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form>
                <div class="form-group mb-3 p-1 px-3 d-flex">
                    <ValidationProvider
                        v-slot="{ errors, touched }"
                        :rules="{
                            required: true,
                            check_password: true,
                            max: 255,
                            no_script_tag: true,
                        }"
                        name="password"
                        class="w-100"
                    >
                        <div class="d-flex">
                            <div class="col-md-3 text-end">
                                <label for="">Current password:</label>
                            </div>
                            <div class="col-md-9 input-group w-40 ml-10">
                                <input
                                    :type="typePassword"
                                    :class="{
                                        'border-danger': (touched || invalid) && errors[0],
                                    }"
                                    class="form-control"
                                    v-model="password"
                                    autocomplete="off"
                                />
                                <div class="input-group-text" @click="hideOrShow('password')">
                                    <i class="check-pw far" :class="showPw"></i>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2">
                            <div class="col-md-3"></div>
                            <div class="col-md-9 ml-10">
                                <span
                                    v-if="(touched || invalid) && errors[0]"
                                    class="text-danger slide-down-40-percent d-block z-n1"
                                >
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="form-group mb-3 p-1 px-3 d-flex">
                    <ValidationProvider
                        v-slot="{ errors, touched }"
                        :rules="{
                            required: true,
                            check_password: true,
                            max: 255,
                            no_script_tag: true,
                        }"
                        name="password"
                        class="w-100"
                    >
                        <div class="d-flex">
                            <div class="col-md-3 text-end">
                                <label for="">New password:</label>
                            </div>
                            <div class="col-md-9 input-group w-40 ml-10">
                                <input
                                    :type="typePasswordNew"
                                    :class="{
                                        'border-danger': (touched || invalid) && errors[0],
                                    }"
                                    class="form-control"
                                    v-model="new_password"
                                    autocomplete="off"
                                />
                                <div class="input-group-text" @click="hideOrShow('passwordNew')">
                                    <i class="check-pw far" :class="showPwNew"></i>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2">
                            <div class="col-md-3"></div>
                            <div class="col-md-9 ml-10">
                                <span
                                    v-if="(touched || invalid) && errors[0]"
                                    class="text-danger slide-down-40-percent d-block z-n1"
                                >
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="form-group mb-3 p-1 px-3">
                    <ValidationProvider
                        v-slot="{ errors, touched }"
                        :rules="{
                            required: true,
                            check_password: true,
                            max: 255,
                            no_script_tag: true,
                        }"
                        name="password"
                        class="w-100"
                    >
                    <div class="d-flex">
                        <div class="col-md-3 text-end">
                            <label for=''>New password confirm:</label>
                        </div>
                        <div class="input-group col-md-9 w-40 ml-10">
                            <input
                                :type="typePasswordConfirm"
                                :class="{
                                    'border-danger': (touched || invalid) && errors[0],
                                }"
                                class="form-control"
                                v-model="new_password_confirm"
                                autocomplete="off"
                            />
                            <div class="input-group-text" @click="hideOrShow('passwordConfirm')">
                                <i class="check-pw far" :class="showPwConfirm"></i>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="col-md-3"></div>
                        <div class="col-md-9 ml-10">
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
                            <span v-if="showErrorPassword" class="text-danger">{{ passwordStatusMsg }}</span>
                        </div>
                    </div>
                    </ValidationProvider>
                </div>
                <!-- <div class="px-3 d-flex" v-if="showErrorPassword">
                    <div class="col-md-3"></div>
                    <div class="col-md-9 ml-10">
                        <span class="text-danger">{{ passwordStatusMsg }}</span>
                    </div>
                </div> -->
            </form>
            <div class="px-3 d-flex">
                <div class="col-md-3"></div>
                <div class="col-md-9 ml-10">
                    <button @click="handleSubmit(handleChangePassword)" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </ValidationObserver>
        <ModalSuccess :successMess="modalMess" @close="modalSuccessClose" />
        <ModalError :errorMess="modalMess"  />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import UserService from '@/services/UserService'
@Component
export default class SettingChangePassword extends Vue {
    private password: string = ''
    private new_password: string = ''
    private new_password_confirm: string = ''
    private showPw: String = "fa-eye-slash";
    private showPwNew: String = "fa-eye-slash";
    private showPwConfirm: String = "fa-eye-slash";
    private typePassword: String = "password";
    private typePasswordNew: String = "password";
    private typePasswordConfirm: String = "password";
    private passwordMatch: Boolean = true;
    private passwordStatusMsg: any = ''
    private showErrorPassword: boolean = false
    private modalMess: string = ''

    @Watch("new_password_confirm")
    checkConfirmPassword() {
        if (this.new_password_confirm.localeCompare(this.new_password as string) === 0) {
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
        } else if (name == 'passwordNew') {
            if (this.showPwNew == "fa-eye-slash") {
                this.showPwNew = "fa-eye";
                this.typePasswordNew = "text";
            } else {
                this.showPwNew = "fa-eye-slash";
                this.typePasswordNew = "password";
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
    handleChangePassword() {
        let params = {
            current_password: this.password,
            new_password: this.new_password
        }
        this.$blockui.show();
        UserService.changePassword(params)
            .then((response) => {
                if (response.status == 200) {
                    this.$swal.fire({
                        text: response.data.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    console.log('error.response.data', error.response.data);
                    this.passwordStatusMsg = error.response.data.message
                    this.showErrorPassword = true
                } else {
                    this.$swal.fire({
                        text: 'Error',
                        icon: "error",
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.showErrorPassword = false
                }
            })
            .finally(() => this.$blockui.hide());
    }

    modalSuccessClose() {
        this.$router.push({ name: 'account-information' })
    }
}
</script>