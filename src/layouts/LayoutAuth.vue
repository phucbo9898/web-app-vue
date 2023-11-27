<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0">
    <HeaderTop />
    <main class="flex-1 py-3 py-xl-5">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderTop from '@/components/HeaderTop.vue';

@Component({
    components: {HeaderTop}
})
export default class LayoutAuth extends Vue {}
</script>
