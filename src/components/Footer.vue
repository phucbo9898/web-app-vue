<template>
  <div class="bg-footer d-none d-xl-block" style="background-color: silver">
    <div class="container">
      <div class="row px-3 py-2">
        <div class="col-xs-12 col-xl-5">
          <div class="d-flex align-items-end pb-2">
            <router-link to="/">
              <img
                src="@/assets/logo-fe.png"
                alt="logo"
                class="d-flex align-items-center"
                style="width: 55%"
              />
            </router-link>
          </div>
          <div class="color-footer">
            <div>Trang web này hiện đang trong giai đoạn thử nghiệm và phát triển để hoàn thiện hơn trước khi đưa vào kinh doanh và thương mại hóa.</div>
            <div class="mt-3">Địa chỉ: Tòa Mitec, Yên Hòa, Cầu Giấy, Hà Nội, Việt Nam.</div>
            <div>Số điện thoại: 0969908298</div>
            <div>
              Email: <a href="mailto://phucbo9898@gmail.com" style="text-decoration: none" >phucbo9898@gmail.com</a>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-xl-3 pt-5">
          <table width="100%">
            <thead>
              <tr>
                <th class="color-footer p-1">Nổi Bật</th>
                <th>&ensp;</th>
                <th class="color-footer p-1">Tính Năng</th>
                <th>&ensp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&ensp;</td>
                <td>&ensp;</td>
                <td>&ensp;</td>
                <td>&ensp;</td>
              </tr>
              <tr>
                <td class="color-footer p-1">
                  <span class="color-footer">Miễn phí vận chuyển</span>
                </td>
                <td class="p-1">&ensp;</td>
                <td class="color-footer p-1">
                  <router-link to="/" class="color-footer"
                    >Trang chủ</router-link
                  >
                </td>
                <td>&ensp;</td>
              </tr>
              <tr>
                <td class="color-footer p-1">
                  <span class="color-footer">Tiết kiệm chi phí</span>
                </td>
                <td>&ensp;</td>
                <td class="color-footer p-1">
                  <a
                    href="https://forms.gle/p1W9N4F8LQnePX7F9"
                    class="color-footer"
                    target="_blank"
                    >Tin tức</a
                  >
                </td>
                <td>&ensp;</td>
              </tr>
              <tr>
                <td class="color-footer p-1">
                  <span class="color-footer" target="_blank">Bảo mật</span>
                </td>
                <td>&ensp;</td>
                <td class="color-footer p-1">
                  <router-link :to="{ name: 'partner' }" class="color-footer"
                    >Về chúng tôi</router-link
                  >
                </td>
                <td>&ensp;</td>
              </tr>
              <tr>
                <td class="color-footer p-1">Hỗ trợ 24/7</td>
                <td>&ensp;</td>
                <td class="color-footer p-1">
                  <a
                    href="/white_paper.pdf"
                    target="_blank"
                    class="color-footer"
                    >Liên hệ</a
                  >
                </td>
                <td>&ensp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-12 col-xl-3 pt-5">
          <div class="footer-block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.31532409738!2d105.78137487587232!3d21.020065488075954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5365bfdb6f%3A0xf9246598ec2c0d5!2zVMOyYSBuaMOgIE1pdGVjLCBZw6puIEhvw6AsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1708934558726!5m2!1svi!2s"
              width="400"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div
          class="d-xl-flex color-footer ff-ss fwl w-100"
          style="justify-content: center !important"
        >
          <p class="color-footer"
            >This project is made with <span class="text-danger">♥</span> Vũ Ngọc Phúc on &copy;
            {{ yearNow }}</p
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import store from '@/store';
import Auth from '@/store/modules/Auth';
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
const AuthModule = getModule(Auth, store)
@Component
export default class TestView extends Vue {
  public yearNow: any = '';
  created() {
    const today = new Date();
    this.yearNow = today.getFullYear();
  }
  async handleLogout() {
    await AuthService.logout()
      .then((response) => {
        if (response.status === 200) {
          AuthModule.SET_TOKEN_NULL();
          this.$router.push({ name: 'login' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    sessionStorage.clear();
    localStorage.clear();
  }
}
</script>
<style>
.color-footer {
  text-decoration: none;
  color: black;
}
</style>
