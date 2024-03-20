<template>
  <div class="container product-detail">
    <div class="row px-5">
      <div class="col-md-12 text-center">
        <h4 class="font-weight-bold">List of your favorite products</h4>
      </div>
      <div class="col-md-12 py-3">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center" scope="col">Name</th>
              <th class="text-center" scope="col">Image</th>
              <th class="text-center" scope="col">Price</th>
              <th class="text-center" scope="col">Status</th>
              <th class="text-center" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in lstFavorite" :key="data.id">
              <td class="col-md-3 vertical-align-middle">
                <router-link
                    :to="{
                        name: 'product-detail',
                        params: { productId: data.id }
                    }"
                    class="text-decoration-none font-weight-bold"
                >
                    {{ data.name }}
                </router-link>
              </td>
              <td class="col-md-1 text-center">
                <img :src="data.image" style="width: 100%">
              </td>
              <td class="col-md-1 text-center vertical-align-middle">{{ data.price.toLocaleString().replaceAll(".", ",") }}VND</td>
              <td class="col-md-2 text-center vertical-align-middle">
                <span class="font-weight-bold" :style="handleQuantity(data.quantity).color">
                    {{ handleQuantity(data.quantity).text }}
                </span>
              </td>
              <td class="col-md-1 vertical-align-middle text-center">
                <button class="btn btn-warning mr-5" @click="addToCart(data)"><i class="fas fa-shopping-cart" style="color: white;"></i></button>
                <button class="btn btn-danger" @click="removeFavorite(data.id)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalSuccess :successMess="modalMess" />
    <ModalError :errorMess="modalMess" />
  </div>
</template>
<script lang="ts">
import CartService from "@/services/CartService";
import HomeInformationServices from "@/services/HomeInformationServices";
import store from "@/store";
import CartProductStore from "@/store/modules/CartProductStore";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
const CartModule = getModule(CartProductStore, store)

@Component
export default class CartView extends Vue {
  private modalMess: string = "";
  private lstFavorite: any = [];
  created() {
    this.getListFavorite();
  }

  getListFavorite() {
    HomeInformationServices.getListFavorite()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.lstFavorite = response.data.item;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(item: any) {
    if (item.quantity <= 0) {
      this.$swal.fire({
        text: 'Số lượng sản phẩm ko đủ!!!',
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      })
    }

    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      qty_pay: 1,
      image: item.image,
      category_id: item.category_id,
      sale: item.sale
    }
    CartModule.ADD_PRODUCT_TO_CART(product)
    let params = {
      products: localStorage.getItem('cart_product')
    }
    
    CartService.addProductToCart(params).then((response) => {
      if (response.status === 200) {
        this.$swal.fire({
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 3000
        })
      }
    })
    .catch((error) => {
      this.$swal.fire({
        text: error.response.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  removeFavorite(id: any) {
    const params = {
        productId: id
    }
    HomeInformationServices.removeFavoriteProduct(params)
    .then((response) => {
        if (response.status == 200) {
            this.$swal.fire({
              text: response.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 3000
            })
            this.getListFavorite();
        }
    })
    .catch((error) => {
        console.log(error);
        this.$swal.fire({
          text: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000
        })
    })
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
<style scoped></style>
