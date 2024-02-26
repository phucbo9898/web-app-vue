<template>
  <div class="container">
    <div class="text-center mt-2" v-if="loading">
      <b-spinner></b-spinner>
    </div>
    <div class="row" v-else>
        <div class="col-md-3 order-2">
            test
        </div>
        <div class="col-md-9 order-1">
            <div class="article-image">
                <img :src="articleDetail.image" alt="" style="width: 100%">
            </div>
            <div class="article-name mt-20">
                <h4>{{ articleDetail.name }}</h4>
            </div>
            <div class="mt-3 d-flex justify-content-between">
              <span
                ><i class="fa fa-user"></i> {{ articleDetail.user.name }}
                <i class="ml-10 far fa-calendar-alt"></i>
                {{ handleFormatDate(articleDetail.updated_at) }}</span
              >
            </div>
            <div class="px-5 py-3">
                <div
                    class="px-5 py-5"
                    style="
                        background-color: rgb(221, 218, 218);
                        border-left: 5px solid #2095d9 !important;
                    "
                    >
                    <i>{{ articleDetail.description }}</i>
                </div>
            </div>
            <div class="mt-3" v-html="articleDetail.content"></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//@ts-ignore
import _ from 'lodash';
import PreviewText from '@/helpers/PreviewText';
import moment from 'moment';
import HomeInformationServices from '@/services/HomeInformationServices';

@Component
export default class ArticleView extends Vue {
    private loading: boolean = true
    private articleId: any = this.$route.params.articleId || ''
    private articleDetail: any = []
  created() {
    console.log('Article detail');
    console.log(this.articleId);
    this.getDetailArticle()
  }

  getDetailArticle() {
    HomeInformationServices.getDetailArticle(this.articleId)
    .then((response) => {
        if (response.status === 200) {
            console.log(response);
            this.articleDetail = response.data.item
            this.loading = false
        }
    })
    .catch((error) => {
        console.log(error);
        
    })
  }

  handleFormatDate(date: string) {
    return moment(date).format("YYYY-MM-DD H:mm:s");
  }
}
</script>
