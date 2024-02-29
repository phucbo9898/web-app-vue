<template>
  <article class="container pt-10">
    <section class="p-4">
      <div ref="detailProductContent">
        <div class="row g-3" v-if="detailProduct">
          <div v-html="detailProduct.content"></div>
        </div>
        <div class="row g-3" v-else>
          <span class="text-center">no data</span>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ProductInformation extends Vue {
  @Prop() information!: any;
  public detailProduct: any[] = [];

  created() {
    this.detailProduct = this.information;
  }

  @Watch('information')
  watchDetail() {
    this.detailProduct = this.information;
  }
}
</script>
<style>
.item-menu:hover {
  background-color: aquamarine;
}
</style>
