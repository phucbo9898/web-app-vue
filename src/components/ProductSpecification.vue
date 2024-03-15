<template>
  <article class="container pt-10">
    <section class="p-4">
      <div ref="detailProductContent">
        <div class="row g-3" v-if="detailProductSpecification">
          <div v-html="detailProductSpecification"></div>
        </div>
        <div class="row g-3" v-else>
          <span class="text-center">Product specifications are being updated...</span>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ProductSpecification extends Vue {
  @Prop() specification!: any;
  public detailProductSpecification: any[] = [];

  created() {
    console.log(this.specification);
    
    this.detailProductSpecification = this.specification;
  }

  @Watch('information')
  watchDetail() {
    this.detailProductSpecification = this.specification;
  }
}
</script>
<style>
.item-menu:hover {
  background-color: aquamarine;
}
</style>
