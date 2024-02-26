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
}

export default new HomeInformationServices