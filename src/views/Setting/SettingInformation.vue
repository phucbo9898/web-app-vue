<template>
  <div class="border p-3">
    <div class="mb-3">
      <h3>Setting profile in account : {{ profile.name }}</h3>
    </div>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form>
        <div class="form-group mb-3 p-1 px-3 d-flex">
          <div class="w-100">
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">Email:</label>
              </div>
              <div class="col-md-9 input-group w-40 ml-10">
                <input
                  type="text"
                  class="form-control"
                  :value="profile.email"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
          <ValidationProvider
            v-slot="{ errors, touched }"
            :rules="{
              max: 255,
              no_script_tag: true,
            }"
            name="avatar"
            class="w-100"
          >
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">Avatar:</label>
              </div>
              <div class="col-md-9 input-group w-40 ml-10">
                <input
                  type="file"
                  :class="{
                    'border-danger': (touched || invalid) && errors[0],
                  }"
                  class="form-control"
                  @change="uploadChange"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="d-flex mt-2">
              <div class="col-md-3"></div>
              <div class="col-md-9 ml-10" style="width: 150px !important">
                <img
                  :src="
                    newAvatar ? newAvatar : $store.state.userInfor.user.avatar
                  "
                  alt=""
                  width="100%"
                />
              </div>
            </div>
            <div class="d-flex mt-2" v-if="errorTypeAndSize">
              <div class="col-md-3"></div>
              <div class="col-md-9 ml-10">
                <span class="text-danger slide-down-40-percent d-block z-n1">
                  limit size
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
              max: 255,
              no_script_tag: true,
            }"
            name="first_name"
            class="w-100"
          >
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">First Name:</label>
              </div>
              <div class="col-md-9 input-group w-40 ml-10">
                <input
                  type="text"
                  :class="{
                    'border-danger': (touched || invalid) && errors[0],
                  }"
                  class="form-control"
                  v-model="profile.first_name"
                  autocomplete="off"
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
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
          <ValidationProvider
            v-slot="{ errors, touched }"
            :rules="{
              required: true,
              max: 255,
              no_script_tag: true,
            }"
            name="last_name"
            class="w-100"
          >
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">Last Name:</label>
              </div>
              <div class="col-md-9 input-group w-40 ml-10">
                <input
                  type="text"
                  :class="{
                    'border-danger': (touched || invalid) && errors[0],
                  }"
                  class="form-control"
                  v-model="profile.last_name"
                  autocomplete="off"
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
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3 p-1 px-3">
          <ValidationProvider
            v-slot="{ errors, touched }"
            :rules="{
              
              max: 255,
              no_script_tag: true,
            }"
            name="phone"
            class="w-100"
          >
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">Phone Number:</label>
              </div>
              <div class="input-group col-md-9 w-40 ml-10">
                <input
                  type="text"
                  :class="{
                    'border-danger': (touched || invalid) && errors[0],
                  }"
                  class="form-control"
                  v-model="profile.phone"
                  autocomplete="off"
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
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3 p-1 px-3 d-flex">
          <ValidationProvider
            v-slot="{ errors, touched }"
            :rules="{
              
              max: 255,
              no_script_tag: true,
            }"
            name="address"
            class="w-100"
          >
            <div class="d-flex">
              <div class="col-md-3 text-end">
                <label for="">Address:</label>
              </div>
              <div class="col-md-9 input-group w-40 ml-10">
                <input
                  type="text"
                  :class="{
                    'border-danger': (touched || invalid) && errors[0],
                  }"
                  class="form-control"
                  v-model="profile.address"
                  autocomplete="off"
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
              </div>
            </div>
          </ValidationProvider>
        </div>
      </form>
      <div class="px-3 d-flex">
        <div class="col-md-3"></div>
        <div class="col-md-9 ml-10">
          <button
            @click="handleSubmit(handleChangeProfile)"
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </ValidationObserver>
    <ModalSuccess :successMess="modalMess" />
    <ModalError :errorMess="modalMess" />
  </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import store from '@/store';
import UserInfo from '@/store/modules/UserInfo';
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators';
const UserInforModule = getModule(UserInfo, store);
@Component
export default class SettingInformation extends Vue {
  private image_name: any;
  private img_base64: any;
  public profile: any = {
    avatar: '',
    last_name: '',
    first_name: '',
    phone: '',
    address: '',
  }
  private modalMess: string = '';
  private newAvatar: any = ''
  private errorTypeAndSize: boolean = false

  // beforeRouteLeave (to: any, from: any, next: any) {
  // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  // if (answer) {
  //     next()
  // } else {
  //     next(false)
  // }
  // }

  created() {
    this.getProfile();
  }

  getProfile() {
    AuthService.getUserInfor().then(async (response) => {
      if (response.status === 200) {
        console.log(response.data.item);
        await UserInforModule.HANDLE_USER_PROFILE(response.data.item);
        this.profile = Object.assign({}, this.$store.state.userInfor.user);
      }
    });
  }

  uploadChange(event: any) {
    console.log(event);
    console.log("e.target", event.target.files[0]);
    const file = event.target.files[0];
    if (event.target.files[0].size > 26214400) {
      // 25MB
      this.errorTypeAndSize = true;
    } else {
      this.errorTypeAndSize = false;
      this.newAvatar = URL.createObjectURL(file);
      this.image_name = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img_base64 = reader.result;
      };
    }
  }

  handleChangeProfile() {
    if (!this.errorTypeAndSize) {
      let formData = new FormData();
      formData.append("image", this.img_base64);
      formData.append("img_name", this.image_name);
      formData.append("first_name", this.profile.first_name);
      formData.append("last_name", this.profile.last_name);
      formData.append("phone", this.profile.phone);
      formData.append("address", this.profile.address);
      this.$blockui.show();
      UserService.updateProfile(formData)
        .then((response) => {
          if (response.status === 200) {
            this.getProfile();
            this.$swal.fire({
              text: response.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch((error) => {
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
}
</script>
