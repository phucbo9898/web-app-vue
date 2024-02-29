<template>
  <div class="container">
    <div class="text-center mt-2" v-if="loading">
      <b-spinner></b-spinner>
    </div>
    <div v-else>
      <div class="row" v-if="articles.length > 0">
        <div class="col-md-4 mt-40" v-for="article in articles" :key="article.id">
          <router-link
            :to="{
              name: 'article-detail',
              params: { articleId: article.id },
            }"
            class="article-image"
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
            <div class="mt-3 d-flex justify-content-between">
              <span
                ><i class="fa fa-user"></i> {{ article.user.name }}
                <i class="ml-10 far fa-calendar-alt"></i>
                {{ handleFormatDate(article.updated_at) }}</span
              >
            </div>
            <div class="mt-4" style="height: 50px !important">
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//@ts-ignore
import _ from "lodash";
import PreviewText from "@/helpers/PreviewText";
import moment from "moment";
import HomeInformationServices from "@/services/HomeInformationServices";

@Component
export default class ArticleView extends Vue {
  private loading: boolean = true;
  private articles: any = [];
  created() {
    console.log("Article List");
    this.getListArticles();
  }

  getListArticles() {
    HomeInformationServices.getListArticles()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.item);
          this.articles = response.data.item;
          this.loading = false;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }

  handleLongText(text: string) {
    return PreviewText.convertToPreviewText(text);
  }

  handleFormatDate(date: string) {
    return moment(date).format("YYYY-MM-DD H:mm:s");
  }
}
</script>
