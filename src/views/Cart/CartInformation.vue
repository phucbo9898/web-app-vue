<template>
  <div class="container product-detail">
    <div class="row px-5">
      <div class="col-md-12 text-center">
        <h4 class="font-weight-bold">Thông tin giỏ hàng</h4>
      </div>
      <div class="col-md-12 py-3">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center" scope="col">Name</th>
              <th class="text-center" scope="col">Image</th>
              <th class="text-center" scope="col">Price</th>
              <th class="text-center" scope="col">Quantity</th>
              <th class="text-center" scope="col">Total price</th>
              <th class="text-center" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in $store.state.cartProductStore.cartInitState" :key="data.id">
              <td class="col-md-4 vertical-align-middle">
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
              <td class="col-md-2 text-center">
                <img :src="data.image" style="width: 100%">
              </td>
              <td class="col-md-1 text-center vertical-align-middle">{{ data.price.toLocaleString().replaceAll(".", ",") }}VND</td>
              <td class="col-md-1 text-center vertical-align-middle">
                <input type="number" class="form-control" v-model="data.qty_pay" @change="handleQuantity(data)">
              </td>
              <td class="col-md-2 text-center vertical-align-middle">
                {{ (data.price * (100 - data.sale) / 100 * data.qty_pay).toLocaleString().replaceAll('.', ',') }}VND
              </td>
              <td class="col-md-1 vertical-align-middle text-center">
                <button class="btn btn-danger" @click="removeProductToCart(data)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row px-5">
      <div class="col-md-12 text-center">
        <h4 class="font-weight-bold">Thông tin người mua hàng</h4>
      </div>
      <div class="col-md-12 py-3">
        <div class="information-payment">
          <div class="information-payment-name p-3">
            <label for="name">Họ và tên <span style="color: red;">*</span></label>
            <input type="text" v-model="informationUserPayment.name" class="form-control">
          </div>
          <div class="information-payment-address p-3">
            <label for="address">Địa chỉ <span style="color: red;">*</span></label>
            <input type="text" v-model="informationUserPayment.address" class="form-control">
          </div>
          <div class="information-payment-phone p-3">
            <label for="phone">Số điện thoại <span style="color: red;">*</span></label>
            <input type="text" v-model="informationUserPayment.phone" class="form-control">
          </div>
          <div class="information-payment-note p-3">
            <label for="note">Ghi chú</label>
            <textarea v-model="informationUserPayment.note" cols="30" rows="5" class="form-control"></textarea>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="col-md-6"></div>
        <div class="col-md-6 py-3">
          <h5>Tổng tiền cần thanh toán:</h5>
          <table class="table">
            <tbody>
              <tr>
                <td class="vertical-align-middle">Mã giảm giá (Nếu có)</td>
                <td>
                  <input type="text" class="form-control" v-model="voucher">
                </td>
                <td class="text-center">
                  <button @click="handleVoucher" class="btn btn-success">Áp dụng</button>
                </td>
              </tr>
              <tr v-if="voucherInformation.code && voucherInformation.sale">
                <td>Trước giảm giá:</td>
                <td></td>
                <td>{{ totalMoneyNotHaveVoucher.toLocaleString().replaceAll('.', ',') }}VND</td>
              </tr>
              <tr v-if="voucherInformation.code && voucherInformation.sale">
                <td>Mã giảm giá:</td>
                <td></td>
                <td>{{ voucherInformation.code }} (-{{ voucherInformation.sale }}%)</td>
              </tr>
              <tr v-if="voucherInformation.code && voucherInformation.sale">
                <th>Tổng tiền</th>
                <th></th>
                <th>{{ totalMoneyHaveVoucher.toLocaleString().replaceAll('.', ',') }}VND</th>
              </tr>
              <tr v-else>
                <th>Tổng tiền</th>
                <th></th>
                <th>{{ totalMoneyNotHaveVoucher.toLocaleString().replaceAll('.', ',') }}VND</th>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary float-right" @click="handleSubmitForm">Xác nhận đặt hàng</button>
        </div>
      </div>
    </div>
    <ModalSuccess :successMess="modalMess" />
    <ModalError :errorMess="modalMess" />
  </div>
</template>
<script lang="ts">
import { InformationPayment } from '@/models/cart';
import CartService from '@/services/CartService';
import store from '@/store';
import CartProductStore from '@/store/modules/CartProductStore';
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators';
const CartModule = getModule(CartProductStore, store)
@Component
export default class CartView extends Vue {
  public voucher: string = ''
  public voucherInformation: any = []
  public totalMoneyNotHaveVoucher: number = 0
  public totalMoneyHaveVoucher: number = 0
  public productInCart: any = []
  private informationUserPayment: InformationPayment = new InformationPayment()
  private modalMess: string = ''

  created() {
    this.voucherInformation = localStorage.getItem('voucher') ? JSON.parse(localStorage.getItem('voucher') || '') : []
    this.voucher = this.voucherInformation ? this.voucherInformation.code : ''
    this.productInCart = localStorage.getItem('cart_product') ? JSON.parse(localStorage.getItem('cart_product') || '') : []
    this.handleTotalMoneyBeforeAddVoucher()
    this.handleTotalMoneyAfterAddCoupon()    
  }

  handleTotalMoneyBeforeAddVoucher() {
    let sumTotalMoney = 0
    if (this.productInCart.length > 0) {
      this.productInCart.forEach((item: any) => {
        sumTotalMoney += item.qty_pay * item.price * (100- item.sale) / 100
      });
      this.totalMoneyNotHaveVoucher = sumTotalMoney
    }
  }

  handleTotalMoneyAfterAddCoupon() {
    let total_money = this.totalMoneyNotHaveVoucher
    if (this.voucherInformation) {
      this.totalMoneyHaveVoucher = total_money * (100 - this.voucherInformation.sale) / 100
    }
  }

  handleVoucher() {
    const params = {
      voucher: this.voucher
    }
    if (this.voucher === '' || this.voucher === null || this.voucher === undefined) {
      if (this.voucherInformation) {
        localStorage.removeItem('voucher')
        this.voucherInformation = []
      }
    } else {
      CartService.checkVoucher(params).then((response) => {
        if (response.status === 200) {
          localStorage.setItem('voucher', JSON.stringify(response.data.item))
          this.voucherInformation = localStorage.getItem('voucher') ? JSON.parse(localStorage.getItem('voucher') || '') : []
          this.handleTotalMoneyAfterAddCoupon()
          this.$toast.success(response.data.message, {
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        }
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message, {
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
      })
    }
  }

  handleQuantity(data: any) {
    if (Number(data.qty_pay) <= 0) {
      data.qty_pay = 1
      this.$toast.warning("Quantity must be greater than 1", {
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    } else {
      const productUpdate = {
        id: data.id,
        quantity: Number(data.qty_pay)
      }
      CartModule.UPDATE_QUANTITY_PRODUCT(productUpdate)
      const params = {
        products: localStorage.getItem('cart_product')
      }
      CartService.addProductToCart(params).then((response) => {
        if (response.status === 200) {
          this.productInCart = localStorage.getItem('cart_product') ? JSON.parse(localStorage.getItem('cart_product') || '') : []
          this.handleTotalMoneyBeforeAddVoucher()
          this.handleTotalMoneyAfterAddCoupon()
          this.$toast.success("Update quantity product success", {
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        }
      })
      .catch((error) => {
        this.$toast.error("Update quantity product failed", {
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
      })
    }
  }

  removeProductToCart(data: any) {
    let params = {
      products: this.$store.state.cartProductStore.cartInitState.filter((item:any) => item.id !== data.id)
    }
    CartService.addProductToCart(params).then((response) => {
      if (response.status === 200) {
        const productUpdate = {
          id: data.id,
          quantity: 0
        }
        CartModule.UPDATE_QUANTITY_PRODUCT(productUpdate)
        this.productInCart = localStorage.getItem('cart_product') ? JSON.parse(localStorage.getItem('cart_product') || '') : []
        this.handleTotalMoneyBeforeAddVoucher()
        this.handleTotalMoneyAfterAddCoupon()
        this.$toast.success("Delete quantity product success", {
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
      }
    })
    .catch((error) => {
      this.$toast.error("Delete quantity product failed", {
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    })
  }

  handleSubmitForm() {
    let isSubmit = 0
    if (!this.informationUserPayment.name || !this.informationUserPayment.address || !this.informationUserPayment.phone) {
      this.$toast.warning("Vui lòng nhập đầy đủ thông tin người mua hàng", {
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        icon: true,
        rtl: false
      });
    } else {
      isSubmit = 1
    }

    if (isSubmit) {
      let params = {
        informationUserPayment: this.informationUserPayment,
        productInCart: this.productInCart,
        totalMoney: this.voucherInformation.code ? this.totalMoneyHaveVoucher : this.totalMoneyNotHaveVoucher
      }
      this.$blockui.show()
      CartService.cartCheckOut(params).then((response) => {
        if (response.status === 200) {
          console.log('response', response.data);
          this.$swal.fire({
            title: response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'home'})
            }
          });
          localStorage.removeItem('cart_product')
          localStorage.removeItem('voucher')
          CartModule.CLEAR_CART_PRODUCT_EDIT()
          setTimeout(() => {
            this.$router.push({ name: 'home'})
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
        this.$swal.fire({
          text: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000
        })
      })
      .finally(() => this.$blockui.hide());
    }
  }
}
</script>
