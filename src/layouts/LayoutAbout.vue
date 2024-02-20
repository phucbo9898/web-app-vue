<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0">
    <HeaderTop />
    <HeaderMiddle />
    <main class="flex-1 py-3 py-xl-5">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import HeaderTop from '@/components/HeaderTop.vue';
import HeaderMiddle from '@/components/HeaderMiddle.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    HeaderTop,
    HeaderMiddle,
  }
})
export default class LayoutAbout extends Vue {}
</script>
