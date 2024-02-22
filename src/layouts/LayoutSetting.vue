<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0">
    <!-- <TestView v-if="$store.state.auth.token"/> -->
    <HeaderTop />
    <HeaderMiddle />
    <main class="flex-1 py-3 py-xl-5 order-2">
      <div class="container">
        <div class="d-xl-flex mt-2 mt-xl-6 mb-xl-15">
          <router-view class="order-2 flex-1 ml-10 w-82"></router-view>
          <NavMenuSetting class="order-1 w-18" />
        </div>
      </div>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TestView from '@/components/Footer.vue';
import HeaderTop from '@/components/HeaderTop.vue'
import HeaderMiddle from '@/components/HeaderMiddle.vue'
import Footer from '@/components/Footer.vue'
import NavMenuSetting from '@/components/NavMenuSetting.vue'

@Component({
  components: {
    TestView,
    HeaderTop,
    HeaderMiddle,
    Footer,
    NavMenuSetting
  }
})
export default class LayoutSetting extends Vue {}
</script>
