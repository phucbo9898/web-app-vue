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
              <td class="col-md-1 vertical-align-middle">
                <button class="btn btn-primary w-100" @click="addToCart(data)">Add to cart</button>
                <button class="btn btn-light w-100" @click="removeFavorite(data.id)">Remove</button>
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
import HomeInformationServices from "@/services/HomeInformationServices";
import { Component, Vue } from "vue-property-decorator";

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
      this.modalMess = "response.data.message";
      this.$bvModal.show("modal-error");
    }
    console.log(item);
  }

  removeFavorite(id: any) {
    const params = {
        productId: id
    }
    HomeInformationServices.removeFavoriteProduct(params)
    .then((response) => {
        if (response.status == 200) {
            this.modalMess = response.data.message;
            this.$bvModal.show("modal-success");
            this.getListFavorite();
        }
    })
    .catch((error) => {
        console.log(error);
        this.modalMess = error.response.data.message;
        this.$bvModal.show("modal-error");
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
