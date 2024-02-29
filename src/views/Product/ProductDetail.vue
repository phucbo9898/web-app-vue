<template>
    <div class="container product-detail">
        <div class="row px-5">
            <div class="col-md-4">
                <!-- Product Image -->
                <img :src="productDetail.image" alt="" style="width: 100%">
            </div>
            <div class="col-md-6">
                <div class="product-info">
                    <h5 class="mb-4" style="color: rgb(60, 153, 240);">{{ productDetail.name }}</h5>
                    <p>Trạng thái: <span :style="handleQuantity(productDetail.quantity).color">{{ handleQuantity(productDetail.quantity).text }}</span></p>
                    <span>Đánh giá: chưa đánh giá</span>
                </div>

                <div class="product-attribute" v-for="product_attribute in productDetail.product_attribute_value" :key="product_attribute.id">
                    <span>{{ product_attribute.attribute.name }} : {{ product_attribute.value }}</span>
                </div>

                <div class="product-price mt-4">
                    <span class="text-danger fs-24 font-weight-bold">{{ productDetail.price.toLocaleString().replaceAll(".", ",") }}VND</span>
                </div>
                <hr>
                <div class="product-action">
                    <button @click="addToFavorite(productDetail)" class="btn btn-light mr-5">
                        <i class="far fa-heart"></i>
                    </button>
                    <button
                        @click="addToCart(productDetail)"
                        class="btn btn-primary mr-10"
                        :class="productDetail.quantity <= 0 ? 'disabled' : ''"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
        <!-- Line seperate -->
        <div class="line-sepereate" />

        <!-- information tabs -->
        <div class="custom-container p-0">
          <div class="d-flex">
            <div
              v-for="(tab, index) in inforTabs"
              :key="tab.value"
              @click="selectedTab = tab.value"
              class="mr-10 text-center cursor-pointer position-relative hover-tabs"
            >
              <div
                class="h--11 d-flex justify-content-center align-items-center"
                :class="{ 'border-start border-secondary': index !== 0 }"
              >
                <div class="ml-10 fs-24" :class="selectedTab === tab.value ? 'color-tab' : ''">
                    {{ tab.label }}
                </div>
              </div>
              <div v-if="selectedTab === tab.value" class="active" />
            </div>
          </div>
        </div>

        <!-- Line seperate -->
        <div class="line-sepereate" />

        <!-- Main content -->
        <div class="main-content-wrapper">
          <ProductInformation
            v-if="selectedTab === 'information'"
            :information="productDetail"
          />
          <ProductRating
            v-if="selectedTab === 'rating'"
            :rating="productDetail"
          />
        </div>
        <ModalSuccess :successMess="modalMess" />
        <ModalError :errorMess="modalMess"  />
        <ModalWarning :errorMess="modalMess"  />
    </div>
</template>
<script lang="ts">
import HomeInformationServices from '@/services/HomeInformationServices'
import { Component, Vue } from 'vue-property-decorator'
import ProductInformation from '@/components/ProductInformation.vue'
import ProductRating from '@/components/ProductRating.vue'

@Component({
    components: {
        ProductInformation,
        ProductRating
    }
})
export default class CartView extends Vue {
    private productId: any = this.$route.params.productId || ''
    private productDetail: any = []
    private modalMess: string = ''
    public selectedTab: string = 'information';

    // information tabs
    public inforTabs = [
        {
            label: 'Thông tin chi tiết',
            value: 'information',
        },
        {
            label: 'Đánh giá',
            value: 'rating',
        }
    ];
    created() {
        this.getDetailProduct()
        if (this.$route.params.selectTab) {
            this.selectedTab = this.$route.params.selectTab as any
        }
    }

    getDetailProduct() {
        HomeInformationServices.getDetailProduct(this.productId)
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                this.productDetail = response.data.item
            }
        })
        .catch((error) => {
            console.log(error);
            
        })
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
}
</script>
<style scoped>

</style>