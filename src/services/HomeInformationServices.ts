import Const from '@/constants/index'
import authHeader from './AuthHeader'
import axios from 'axios'
import axiosApiInstance from '@/interceptors'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/modules/Auth'
import store from '@/store'
import router from '@/router'

const AuthModule = getModule(Auth, store)

class HomeInformationServices {
    getSlide() {
        return axios.get(`${Const.api_url}get-slide`)
    }

    getCategories() {
        return axios.get(`${Const.api_url}get-categories`)
    }

    getDataInformationHome() {
        return axios.get(`${Const.api_url}get-data-home`)
    }

    getListArticles() {
        return axios.get(`${Const.api_url}get-articles`)
    }

    getDetailArticle(articleId: number) {
        return axios.get(`${Const.api_url}get-detail-article/${articleId}`)
    }

    addFavoriteProduct(productId: number) {
        return axiosApiInstance.get(`${Const.api_url}add-favorite-product/${productId}`)
    }

    getDetailProduct(productId: number) {
        return axios.get(`${Const.api_url}get-detail-product/${productId}`)
    }

    getListFavorite() {
        return axiosApiInstance.get(`${Const.api_url}get-list-favorite`)
    }

    removeFavoriteProduct(params: any) {
        return axiosApiInstance.post(`${Const.api_url}remove-favorite-product`, params)
    }
}

export default new HomeInformationServices