<template>
  <article class="container pt-10">
    <section class="p-4">
      <div ref="detailProductContent">
        <div class="row g-3" v-if="detailProductInformation">
          <div v-html="detailProductInformation"></div>
        </div>
        <div class="row g-3" v-else>
          <span class="text-center">Product details are being updated...</span>
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
  public detailProductInformation: any = [];

  created() {
    this.detailProductInformation = this.information;
  }

  @Watch('productInformation')
  watchDetail() {
    this.detailProductInformation = this.information;
  }
}
</script>
<style>
.item-menu:hover {
  background-color: aquamarine;
}
</style>
