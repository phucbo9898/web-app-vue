<template>
  <div class="container">
    <div class="text-center mt-2" v-if="loading">
      <b-spinner></b-spinner>
    </div>
    <div v-else>
      <div class="d-flex">
        <div class="card col-md-2" style="width: 20% !important">
          <div
            class="card-header text-center"
            style="
              color: white !important;
              border-bottom-color: white;
              background-color: #406ccf;
            "
          >
            <h3>List Categories</h3>
          </div>
          <div class="menu card-body" v-if="categories.length > 0">
            <div
              class="px-3 py-2"
              v-for="category in categories"
              :key="category.id"
            >
              <router-link
                :to="{
                  name: 'category-detail',
                  params: { categoryId: category.id },
                }"
                class="hover-menu"
                style="color: black; text-decoration: none"
                >{{ category.name }}</router-link
              >
            </div>
          </div>
          <div class="card-body menu" v-else>
            <div class="px-3 py-2">
              <span>No data available.</span>
            </div>
          </div>
        </div>
        <div class="col-md-10 ml-10">
          <Swiper
            v-if="banners.length > 0"
            ref="swiper1"
            class="swiper w-100 height-cus"
            :options="swiperOption"
          >
            <SwiperSlide
              v-for="banner in banners"
              :key="banner.id"
              class="cursor-pointer"
              style="
                object-fit: contain !important;
                background-color: black !important;
              "
            >
              <img
                class="w-100"
                :src="banner.image"
                alt="banner"
                style="height: 445px !important; object-fit: cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <section class="product-new mt-5" v-if="product_news.length > 0">
        <div class="row">
          <div class="col-md-12">
            <div class="li-section-title">
              <h4 class="line-section-title">
                <span style="text-transform: uppercase">New Products</span>
              </h4>
            </div>
            <div class="row">
              <div
                class="col-md-3"
                v-for="product_new in product_news"
                :key="product_new.id"
              >
                <div class="product-image">
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product_new.id }
                    }"
                  >
                    <img :src="product_new.image" alt="Li's Product Image" />
                  </router-link>
                  <div>
                    <span :style="handleQuantity(product_new.quantity).color">{{
                      handleQuantity(product_new.quantity).text
                    }}</span>
                  </div>
                </div>
                <div class="product-desc">
                  <div style="height: 25px !important">
                    <router-link
                      :to="{
                        name: 'product-detail',
                        params: { productId: product_new.id }
                      }"
                      class="text-decoration-none font-weight-bold"
                      >{{ handleLongText(product_new.name).text }}</router-link
                    >
                  </div>
                  <div v-if="product_new.sale > 0">
                    <div
                      class="d-flex justify-content-between text-danger mt-4"
                    >
                      <span
                        >{{
                          ((product_new.price * (100 - product_new.sale)) / 100)
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND</span
                      >
                      <span>-{{ product_new.sale }}%</span>
                    </div>
                    <span class="text-decoration-line-through"
                      >{{
                        product_new.price.toLocaleString().replaceAll(".", ",")
                      }}VND</span
                    >
                  </div>
                  <div v-else>
                    <div
                      class="d-flex justify-content-between mt-4"
                      style="height: 49px !important"
                    >
                      <span>
                        {{
                          product_new.price
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND
                      </span>
                    </div>
                  </div>
                </div>
                <div class="product-action d-flex">
                  <button
                    @click="addToCart(product_new)"
                    class="btn btn-primary mr-10"
                    :class="product_new.quantity <= 0 ? 'disabled cursor-no-drop' : ''"
                    style="pointer-events: fill;"
                  >
                    Add to cart
                  </button>
                  <button
                    @click="addToFavorite(product_new)"
                    class="btn btn-warning mr-5"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product_new.id }
                    }"
                    class="btn btn-light"
                  ><i class="fa fa-eye"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="product-best-pay mt-5"
        v-if="product_best_pays.length > 0"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="li-section-title">
              <h4 class="line-section-title">
                <span style="text-transform: uppercase">Products best pay</span>
              </h4>
            </div>
            <div class="row">
              <div
                class="col-md-3"
                v-for="product_best_pay in product_best_pays"
                :key="product_best_pay.id"
              >
                <div class="product-image">
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product_best_pay.id }
                    }"
                  >
                    <img :src="product_best_pay.image" alt="Li's Product Image" />
                  </router-link>
                  <div>
                    <span
                      :style="handleQuantity(product_best_pay.quantity).color"
                      >{{
                        handleQuantity(product_best_pay.quantity).text
                      }}</span
                    >
                  </div>
                </div>
                <div class="product-desc">
                  <div style="height: 25px !important">
                    <router-link
                      :to="{
                        name: 'product-detail',
                        params: { productId: product_best_pay.id }
                      }"
                      class="text-decoration-none font-weight-bold"
                      >{{
                        handleLongText(product_best_pay.name).text
                      }}</router-link
                    >
                  </div>
                  <div v-if="product_best_pay.sale > 0">
                    <div
                      class="d-flex justify-content-between text-danger mt-4"
                    >
                      <span
                        >{{
                          (
                            (product_best_pay.price *
                              (100 - product_best_pay.sale)) /
                            100
                          )
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND</span
                      >
                      <span>-{{ product_best_pay.sale }}%</span>
                    </div>
                    <span class="text-decoration-line-through"
                      >{{
                        product_best_pay.price
                          .toLocaleString()
                          .replaceAll(".", ",")
                      }}VND</span
                    >
                  </div>
                  <div v-else>
                    <div
                      class="d-flex justify-content-between mt-4"
                      style="height: 49px !important"
                    >
                      <span>
                        {{
                          product_best_pay.price
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND
                      </span>
                    </div>
                  </div>
                </div>
                <div class="product-action d-flex">
                  <button
                    @click="addToCart"
                    class="btn btn-primary mr-10"
                    :class="product_best_pay.quantity <= 0 ? 'disabled cursor-no-drop' : ''"
                    style="pointer-events: fill;"
                  >
                    Add to cart
                  </button>
                  <button @click="addToFavorite(product_best_pay)" class="btn btn-warning mr-5">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product_best_pay.id }
                    }"
                    class="btn btn-light"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="product-in-category">
        <div
          class="row"
          v-for="arrayProductByCategory in arrayProductByCategories"
          :key="arrayProductByCategory.id"
        >
          <div
            class="col-md-12 mt-5"
            v-if="arrayProductByCategory.products.length > 0"
          >
            <div class="li-section-title">
              <h4 class="line-section-title">
                <span style="text-transform: uppercase">{{
                  arrayProductByCategory.category_name
                }}</span>
              </h4>
            </div>
            <div class="row">
              <div
                class="col-md-3"
                v-for="product in arrayProductByCategory.products"
                :key="product.id"
              >
                <div class="product-image">
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product.id }
                    }"
                  >
                    <img :src="product.image" alt="Li's Product Image" />
                  </router-link>
                  <div>
                    <span :style="handleQuantity(product.quantity).color">{{
                      handleQuantity(product.quantity).text
                    }}</span>
                  </div>
                </div>
                <div class="product-desc">
                  <div style="height: 25px !important">
                    <router-link
                      :to="{
                        name: 'product-detail',
                        params: { productId: product.id }
                      }"
                      class="text-decoration-none font-weight-bold"
                      >{{ handleLongText(product.name).text }}</router-link
                    >
                  </div>
                  <div v-if="product.sale > 0">
                    <div
                      class="d-flex justify-content-between text-danger mt-4"
                    >
                      <span
                        >{{
                          ((product.price * (100 - product.sale)) / 100)
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND</span
                      >
                      <span>-{{ product.sale }}%</span>
                    </div>
                    <span class="text-decoration-line-through"
                      >{{
                        product.price.toLocaleString().replaceAll(".", ",")
                      }}VND</span
                    >
                  </div>
                  <div v-else>
                    <div
                      class="d-flex justify-content-between mt-4"
                      style="height: 49px !important"
                    >
                      <span>
                        {{
                          product.price
                            .toLocaleString()
                            .replaceAll(".", ",")
                        }}VND
                      </span>
                    </div>
                  </div>
                </div>
                <div class="product-action d-flex">
                  <button
                    @click="addToCart(product)"
                    class="btn btn-primary mr-10"
                    :class="product.quantity <= 0 ? 'disabled cursor-no-drop' : ''"
                    style="pointer-events: fill;"
                  >
                    Add to cart
                  </button>
                  <button @click="addToFavorite(product)" class="btn btn-warning mr-5">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: { productId: product.id }
                    }"
                    class="btn btn-light"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="articles mt-5">
        <div class="row">
          <div class="col-md-12">
            <div class="li-section-title">
              <h4 class="line-section-title">
                <span style="text-transform: uppercase">Articles</span>
              </h4>
            </div>
            <div class="row mt-4" v-if="articles.length > 0">
              <div
                class="col-md-4"
                v-for="article in articles"
                :key="article.id"
              >
                <router-link
                  :to="{
                    name: 'article-detail',
                    params: { articleId: article.id }
                  }"
                >
                  <img
                    :src="article.image"
                    alt="Li's Product Image"
                    style="
                      width: 100% !important;
                      height: 300px !important;
                      object-fit: cover !important;
                    "
                  />
                </router-link>
                <div class="article-desc mt-3">
                  <div style="height: 50px !important">
                    <router-link
                      :to="{
                        name: 'article-detail',
                        params: { articleId: article.id },
                      }"
                      class="text-decoration-none font-weight-bold"
                      >{{ handleLongText(article.name).text }}</router-link
                    >
                  </div>
                  <div class="mt-3" style="font-size: 11px; color: silver;">
                    <span>
                      <i class="fa fa-user"></i> {{ article.user.name }}
                      <i class="ml-10 far fa-calendar-alt"></i>
                      {{ handleFormatDate(article.updated_at) }}
                    </span>
                  </div>
                  <div class="mt-2" style="height: 50px !important">
                    <span>{{ handleLongText(article.description).text }}</span>
                  </div>
                  <div class="mt-3">
                    <router-link
                      :to="{
                        name: 'article-detail',
                        params: { articleId: article.id },
                      }"
                      class="hover-menu text-decoration-none fs-13"
                      style="color: silver"
                      >Xem thêm ...</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ModalSuccess :successMess="modalMess" />
    <ModalError :errorMess="modalMess" />
    <ModalWarning :errorMess="modalMess" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeInformationServices from '@/services/HomeInformationServices';
import Swiper, { Navigation, SwiperOptions } from 'swiper';
//@ts-ignore
import _ from 'lodash';
import PreviewText from '@/helpers/PreviewText';
import moment from 'moment';
@Component
export default class HomeView extends Vue {
  private loading: boolean = true;
  private msg: any = '';
  private logo: any = require('@/assets/logo-fe.png');
  private banners: any = [];
  private categories: any = [];
  private product_news: any = [];
  private articles: any = [];
  private product_best_pays: any = [];
  private arrayProductByCategories: any = [];
  private modalMess: string = ''

  created() {
    console.log('Home View Created');
    this.getDataInformationHome();
  }

  public swiperOption: SwiperOptions = {
    spaceBetween: 10,
    speed: 1000,
    rewind: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      clickable: true,
    },
  };

  handleLongText(text: string) {
    return PreviewText.convertToPreviewText(text);
  }

  handleFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD H:mm:s');
  }

  handleQuantity(quantity: number) {
    if (quantity > 10) {
      return {
        text: 'Stocking',
        color: 'color: #3d3de3;',
      };
    } else if (quantity <= 10 && quantity > 0) {
      return {
        text: 'Almost out of stock',
        color: 'color: #bfbf50;',
      };
    } else if (quantity == 0) {
      return {
        text: 'Sold out',
        color: 'color: red;',
      };
    } else {
      return {
        text: 'Unknown',
        color: '',
      };
    }
  }
  getDataInformationHome() {
    HomeInformationServices.getDataInformationHome()
      .then((res) => {
        if (res.status === 200) {
          this.banners = res.data.item.banners;
          this.categories = res.data.item.categories;
          this.product_news = res.data.item.product_news;
          this.product_best_pays = res.data.item.product_best_pays;
          this.articles = res.data.item.articles;
          this.arrayProductByCategories =
            res.data.item.arrayProductByCategories;
          this.loading = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(item: any) {
    if (item.quantity <= 0) {
      this.modalMess = 'response.data.message';
      this.$bvModal.show("modal-error");
    }
    console.log(item);
  }

  addToFavorite(item: any) {
    HomeInformationServices.addFavoriteProduct(item.id)
    .then((response) => {
      if (response.status == 200) {
        if (response.data.item.status === 200) {
          this.modalMess = response.data.message;
          this.$bvModal.show("modal-success");
        } else {
          this.modalMess = response.data.message;
          this.$bvModal.show("modal-warning");
        }
      }
    })
    .catch((error) => {
      this.modalMess = error.response.data.message;
      this.$bvModal.show("modal-error");
    })
    console.log(item);
  }
}
</script>
<style>
.cursor-no-drop {
  cursor: not-allowed !important;
}
</style>
