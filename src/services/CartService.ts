import Const from '@/constants/index'
import axiosApiInstance from '@/interceptors'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/modules/Auth'
import store from '@/store'

const AuthModule = getModule(Auth, store)

class CartService {
  getListProductInCart() {
    return axiosApiInstance.get(Const.api_url + 'cart/list-product-in-cart')
  }
  addProductToCart(product: any) {
    return axiosApiInstance.post(Const.api_url + 'cart/add-product-to-cart', product)
  }

  checkVoucher(voucher: any) {
    return axiosApiInstance.post(Const.api_url + 'cart/get-voucher', voucher)
  }

  cartCheckOut(params: any) {
    return axiosApiInstance.post(Const.api_url + 'cart/check-out', params)
  }
}

export default new CartService();
