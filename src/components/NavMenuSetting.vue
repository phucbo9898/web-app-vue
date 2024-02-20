<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0 pt-2">
    <ul class="pl-0 shadow border bg-light" style="padding-left: 0 !important;">
      <li class="text-decoration-none list-style-none border-bottom px-4 py-3 text-center">
        <div>
          <span class="font-weight-bold fs-24">Setting</span>
        </div>
      </li>
      <li
        v-for="menu in listMenu"
        :key="menu.id"
        class="list-style-none item-menu"
        :class="$route.path.includes(menu.link) ? 'bg-secondary' : 'bg-light'"
      >
        <router-link
            :to="menu.link"
            class="text-decoration-none text-dark d-block px-4 py-3"
            style="margin-right: 10px !important;"
            :class="$route.path.includes(menu.link) ? 'text-white' : 'text-dark'"
        >{{menu.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SettingMenu } from '@/models';

@Component
export default class LayoutSetting extends Vue {
  public listMenu: SettingMenu[] = []

  created() {
    this.getListMenu();
  }

  getListMenu() {
    let data: SettingMenu[] = [
      {
        id: 1,
        link: '/setting/change-profile',
        name: 'Setting profile'
      },
      {
        id: 2,
        link: '/setting/account-information',
        name: 'Setting account'
      },
      {
        id: 3,
        link: '/setting/change-language',
        name: 'Setting language'
      }
    ]
    this.listMenu = data
  }
}
</script>
<style>
.item-menu:hover {
    background-color: aquamarine;
}
</style>
