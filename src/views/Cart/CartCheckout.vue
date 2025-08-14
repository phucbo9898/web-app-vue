<template>
    <div class="container cart-checkout">
    <div class="row px-5">
      <div class="col-md-6">
        <div class="title">
            <h3 class="font-weight-bold" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">Chi tiết giao dịch</h3>
        </div>
        <div class="information-payment">
            <div class="information-payment-name p-3">
                <label for="name">Họ và tên</label>
                <input type="text" v-model="name" class="form-control">
            </div>
            <div class="information-payment-address p-3">
                <label for="address">Địa chỉ</label>
                <input type="text" v-model="address" class="form-control">
            </div>
            <div class="information-payment-phone p-3">
                <label for="phone">Số điện thoại</label>
                <input type="tel" v-model="phone" class="form-control">
            </div>
            <div class="information-payment-note p-3">
                <label for="note">Ghi chú</label>
                <textarea v-model="note" cols="30" rows="10" class="form-control"></textarea>
            </div>
        </div>
      </div>
      <div class="col-md-6" style="background-color: #e5e5e5;">
        <div class="title">
            <h3 class="font-weight-bold" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">Giỏ hàng của bạn</h3>
        </div>
        <div class="information-cart">
            <div class="information-cart-product p-3">
                <table>
                    <thead>
                        <tr class="border-bottom">
                            <th class="p-3">Sản phẩm</th>
                            <th class="p-3">Giá tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-bottom">
                            <td class="p-3">Mainboard MSI X299 PRO × 1</td>
                            <td class="p-3">5,453,100 VND</td>
                        </tr>
                        <tr class="border-bottom">
                            <td class="p-3">Mainboard MSI X299 PRO × 1</td>
                            <td class="p-3">5,453,100 VND</td>
                        </tr>
                        <tr class="border-bottom">
                            <td class="p-3">Mainboard MSI X299 PRO × 1</td>
                            <td class="p-3">5,453,100 VND</td>
                        </tr>
                        <tr class="border-bottom">
                            <td class="p-3">Mainboard MSI X299 PRO × 1</td>
                            <td class="p-3">5,453,100 VND</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="border-bottom">
                            <td class="p-3">Tổng tiền</td>
                            <td class="p-3">15.000.000VND</td>
                        </tr>
                        <tr class="border-bottom">
                            <td class="p-3">Mã giảm giá</td>
                            <td class="p-3"></td>
                        </tr>
                        <tr class="border-bottom">
                            <td class="p-3">Tổng tiền sau giảm giá</td>
                            <td class="p-3">13.000.000VND</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="information-cart-method">

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CartDetail extends Vue {

}
</script>