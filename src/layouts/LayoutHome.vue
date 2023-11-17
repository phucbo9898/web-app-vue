<template>
  <div class="min-h-screen d-flex flex-column pb-17 pb-xl-0">
    <TestView v-if="$store.state.auth.token"/>
    <Header />
    <main class="flex-1 py-3 py-xl-5">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import TestView from '@/components/TestView.vue';
import Header from '@/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: {TestView, Header} })
export default class LayoutDefault extends Vue {}
</script>
