import { CartProduct } from "@/models/cart";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true, name: "cartProductStore" })
class CartProductStore extends VuexModule {
  public cartInitState: CartProduct[] = localStorage.getItem('cart_product') ? JSON.parse(localStorage.getItem('cart_product') || '') : [];
  public countProduct: any = 0

//   @Mutation
//   addCart(payload: CartProduct[]): void {
//     if (payload) {        
//       this.cartInitState = localStorage.setItem('cart_product', JSON.stringify(payload));
//     }
//   }

//   @Action({ rawError: true })
//   ADD_CART(data: CartProduct[]) {
//     this.context.commit("addCart", data);
//   }

  @Mutation
  addProductToCart(payload: CartProduct) {
    console.log('this.cartInitState', this.cartInitState);
    if (this.cartInitState.length > 0) {
      const index = this.cartInitState.findIndex(
        (item) => item.id === payload.id
      );
      if (this.cartInitState[index]) {
        this.cartInitState[index].qty_pay++;
        localStorage.setItem("cart_product", JSON.stringify(this.cartInitState));
        this.cartInitState = JSON.parse(localStorage.getItem('cart_product') || '')
      } else {
        this.cartInitState.push(payload);
        localStorage.setItem("cart_product", JSON.stringify(this.cartInitState));
        this.cartInitState = JSON.parse(localStorage.getItem('cart_product') || '')
      }
    } else {
      this.cartInitState.push(payload);
      localStorage.setItem("cart_product", JSON.stringify(this.cartInitState));
      this.cartInitState = JSON.parse(localStorage.getItem('cart_product') || '')
    }
  }

  @Action({ rawError: true })
  ADD_PRODUCT_TO_CART(data: CartProduct) {
    this.context.commit("addProductToCart", data);
  }

  @Mutation
  updateQuantityProduct(data: any) {
    if (this.cartInitState.length > 0) {
      const index = this.cartInitState.findIndex((item) => item.id === data.id);
      if (this.cartInitState[index]) {
        if (data.quantity > 0) {
            this.cartInitState[index].qty_pay = data.quantity;
            localStorage.setItem("cart_product", JSON.stringify(this.cartInitState));
            this.cartInitState = JSON.parse(localStorage.getItem('cart_product') || '')
        } else {
            this.cartInitState = this.cartInitState.filter((item) => item.id !== data.id)
            localStorage.setItem("cart_product", JSON.stringify(this.cartInitState));
            this.cartInitState = JSON.parse(localStorage.getItem('cart_product') || '')
        }
        
      }
    }
  }

  @Action({ rawError: true })
  UPDATE_QUANTITY_PRODUCT(data: any) {
    this.context.commit("updateQuantityProduct", data);
  }

  @Mutation
  public clearCartProduct() {
    this.cartInitState = []
    this.countProduct = 0
    localStorage.setItem('cart_product', JSON.stringify(this.cartInitState))
    localStorage.setItem('count_product', this.countProduct)
  }

  @Action({ rawError: true })
  public CLEAR_CART_PRODUCT_EDIT() {
    this.context.commit('clearCartProduct')
  }

  get cartInfo(): CartProduct[] {
    return this.cartInitState;
  }
}

export default CartProductStore;
