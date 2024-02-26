<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0">
<!-- <TestView v-if="$store.state.auth.token"/> -->
    <HeaderTop />
    <HeaderMiddle />
    <main class="flex-1 py-3 py-xl-5">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import TestView from '@/components/Footer.vue';
import HeaderTop from '@/components/HeaderTop.vue'
import HeaderMiddle from '@/components/HeaderMiddle.vue'
import Footer from '@/components/Footer.vue'
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    TestView,
    HeaderTop,
    HeaderMiddle,
    Footer
  }
})
export default class LayoutDefault extends Vue {}
</script>
