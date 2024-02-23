import Const from '@/constants/index'
import authHeader from './AuthHeader'
import axios from 'axios'
import axiosApiInstance from '@/interceptors'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/modules/Auth'
import store from '@/store'
import router from '@/router'
import { RegisterMember } from '@/models'

const AuthModule = getModule(Auth, store)

class NotificationServices {
    pushNotifications(params:any) {
        return axiosApiInstance.post(`${Const.api_url}auth/send-notification`, params)
    }

    getSlide() {
        return axiosApiInstance.get(`${Const.api_url}get-slide`)
    }
}

export default new NotificationServices