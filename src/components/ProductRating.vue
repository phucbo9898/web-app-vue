<template>
  <article class="container pt-10">
    <section class="p-4">
      <div ref="detailProductContent">
        <div class="row g-3" v-if="productDetail">
          <div class="border d-flex text-center">
            <div class="p-5" style="padding-left: 5rem !important; padding-right: 5rem !important;">
              <p class="fs-24">
                <span class="fa fa-star" style="color:#ff9705; font-size: 80px"></span> <br>
                <span>{{ productDetail.avg_score }}/5</span>
              </p>
            </div>
            <div class="px-4 py-2">
              <div class="d-flex px-3 py-2">
                <span>
                  <i class="fa fa-star" style="color:#ff9705;" v-for="rateFire in 5" :key="rateFire = Math.random()"></i>
                </span>
                <span class="ml-10">{{ productDetail.rate_five_star }} đánh giá ({{ handleRatePercent(productDetail.rate_five_star) }}%)</span>
              </div>
              <div class="d-flex px-3 py-2">
                <span>
                  <i class="fa fa-star" style="color:#ff9705;" v-for="rateFour in 4" :key="rateFour = Math.random()"></i>
                  <i class="fa fa-star"></i>
                </span>
                <span class="ml-10">{{ productDetail.rate_four_star }} đánh giá ({{ handleRatePercent(productDetail.rate_four_star) }}%)</span>
              </div>
              <div class="d-flex px-3 py-2">
                <span>
                  <i class="fa fa-star" style="color:#ff9705;" v-for="rateThree in 3" :key="rateThree = Math.random()"></i>
                  <i class="fa fa-star" v-for="notRateThree in 2" :key="notRateThree = Math.random()"></i>
                </span>
                <span class="ml-10">{{ productDetail.rate_three_star }} đánh giá ({{ handleRatePercent(productDetail.rate_three_star) }}%)</span>
              </div>
              <div class="d-flex px-3 py-2">
                <span>
                  <i class="fa fa-star" style="color:#ff9705;" v-for="rateTwo in 2" :key="rateTwo = Math.random()"></i>
                  <i class="fa fa-star" v-for="notRateTwo in 3" :key="notRateTwo = Math.random()"></i>
                </span>
                <span class="ml-10">{{ productDetail.rate_two_star }} đánh giá ({{ handleRatePercent(productDetail.rate_two_star) }}%)</span>
              </div>
              <div class="d-flex px-3 py-2">
                <span>
                  <i class="fa fa-star" style="color:#ff9705;"></i>
                  <i class="fa fa-star" v-for="notRateOne in 4" :key="notRateOne = Math.random()"></i>
                </span>
                <span class="ml-10">{{ productDetail.rate_one_star }} đánh giá ({{ handleRatePercent(productDetail.rate_one_star) }}%)</span>
              </div>
            </div>
          </div>
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
export default class LayoutSetting extends Vue {
  @Prop() productDetail!: any;
  public productRating: any[] = [];

  created() {
    this.productRating = this.productDetail.ratings;
  }

  @Watch('productDetail')
  watchDetail() {
    this.productRating = this.productDetail.ratings;
  }

  handleRatePercent(totalRate: any) {
    if (totalRate > 0) {
      return Math.ceil(totalRate / (this.productDetail.rate_five_star + this.productDetail.rate_four_star + this.productDetail.rate_three_star + this.productDetail.rate_two_star + this.productDetail.rate_one_star) * 100)
    } else {
      return 0
    }
  }
}
</script>
<style>
.item-menu:hover {
  background-color: aquamarine;
}
</style>
