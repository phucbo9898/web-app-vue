<template>
    <div class="border p-3">
        <div class="mb-3 text-center">
            <h3>Setting Language</h3>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
            <div class="col-md-3 text-end">
                <label for="">Choose Language</label>
            </div>
            <div class="col-md-9 ml-10">
                <span>{{ $store.state.userInfor.user.setting_language == 'vi' ? 'Việt Nam' : 'English'}}</span>
            </div>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
            <div class="col-md-3 text-end">
                <label for="">Language to set</label>
            </div>
            <div class="col-md-9">
                <select class="form-select ml-10" name="language" v-model="language" style="width: 30%;">
                    <option value="" disabled>Choose your language</option>
                    <option value="vi">VI</option>
                    <option value="en">EN</option>
                </select>
            </div>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
            <div class="col-md-3 text-end"></div>
            <div class="col-md-9 ml-10">
                <button class="btn btn-primary" @click="handleChangeLanguage">Submit</button>
            </div>
        </div>
        <ModalSuccess :successMess="modalMess" />
        <ModalError :errorMess="modalMess" />
    </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService'
import store from '@/store';
import UserInfo from '@/store/modules/UserInfo';
import {Component, Vue} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators';
const UserInforModule = getModule(UserInfo, store);
@Component
export default class SettingLanguage extends Vue {
    private language: any = this.$store.state.userInfor.user.setting_language
    private modalMess: string = '';

    created() {
        this.getProfile();
    }
    getProfile() {
        AuthService.getUserInfor().then(async (response) => {
        if (response.status === 200) {
            await UserInforModule.HANDLE_USER_PROFILE(response.data.item);
        }
        });
    }
    handleChangeLanguage() {
        const parrams = {
            language: this.language
        }
        this.$blockui.show();
        UserService.updateSettingLanguage(parrams)
        .then((response) => {
            if (response.status === 200) {
                this.getProfile()
                this.$swal.fire({
                    text: response.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
        .catch((error) => {
            console.log(error);
            this.$swal.fire({
                text: error.response.data.message,
                icon: "error",
                showConfirmButton: false,
                timer: 3000
            })
        })
        .finally(() => this.$blockui.hide());
    }
}
</script>

<style>

</style>