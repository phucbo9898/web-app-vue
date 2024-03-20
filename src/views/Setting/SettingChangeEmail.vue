<template>
    <div class="border border-radius-10 p-3">
        <div class="text-center font-weight-bold fs-20 mb-20">
            <span>Change email</span>
        </div>
        <div class="d-flex p-3">
            <div class="col-md-3 text-end">
                <label for="">Current Email:</label>
            </div>
            <div class="col-md-9 ml-10">
                <span>{{ $store.state.userInfor.user.email }}</span>
            </div>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form action=''>
                <div class="form-group mb-3 p-1 px-3 d-flex">
                    <ValidationProvider
                        v-slot="{ errors, touched }"
                        :rules="{
                            required: true,
                            email: true,
                            max: 255,
                            no_script_tag: true,
                        }"
                        name="email"
                        class="w-100"
                    >
                        <div class="d-flex">
                            <div class="col-md-3 text-end">
                                <label class="mb-1">New email address:</label>
                            </div>
                            <div class="col-md-9 w-40 ml-10">
                                <input
                                    type="text"
                                    class="form-control"
                                    aria-describedby="emailHelp"
                                    v-model="email"
                                    autocomplete="off"
                                    :class="{
                                        'border-danger': (touched || invalid) && errors[0],
                                    }"
                                />
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
                                <span v-if="showErrorEmail" class="text-danger">{{ emailStatusMsg }}</span>
                            </div>
                        </div>
                    </ValidationProvider>
                </div>
            </form>
            <div class="d-flex">
                <div class="col-md-3"></div>
                <div class="col-md-9 ml-10">
                    <button @click="handleSubmit(handleChangeEmail)" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </ValidationObserver>
        <ModalSuccess :successMess="modalMess" @close="modalSuccessClose" />
        <ModalError :errorMess="modalMess"  />
    </div>
</template>

<script lang="ts">
import UserService from '@/services/UserService';
import {Component, Vue, Watch} from 'vue-property-decorator'
@Component
export default class SettingAccount extends Vue {
    private email: string = ''
    private showErrorEmail: boolean = false
    private emailStatusMsg: string = ''
    private modalMess: string = ''

    handleChangeEmail() {
        console.log(this.email);
        this.$blockui.show();
        let site_url = window.location.origin + '/verify'
        let url = window.location.origin
        let params = {
            email: this.email,
            site_url: site_url,
            url: url
        }
        UserService.changeEmail(params)
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
                this.emailStatusMsg = error.response.data.message
                this.showErrorEmail = true
            } else {
                this.$swal.fire({
                    text: 'Error',
                    icon: "error",
                    showConfirmButton: false,
                    timer: 3000
                })
                this.showErrorEmail = false
            }
        })
        .finally(() => this.$blockui.hide());
    }

    modalSuccessClose() {
        this.$router.push({ name: 'account-information' })
    }
}
</script>

<style>

</style>