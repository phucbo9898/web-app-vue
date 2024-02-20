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
    // refreshAccessToken() {
    //     return axios.get(Const.api_url + 'auth/refresh', {
    //         headers: authHeader()
    //     })
    //     .then(response => {
    //         let access_token = response.data.items.access_token
    //         AuthModule.SET_NEW_TOKEN(access_token)
    //         return access_token
    //     })
    //     .catch((error: any) => {
    //         if (error) {
    //             router.push({ name: 'login'})
    //         }
    //     })
    // }

    // register(params: RegisterMember) {
    //     return axiosApiInstance.post(`${Const.api_url}auth/register`, params)
    // }
    
    // updateDeviceToken(params: any) {
    //     return axiosApiInstance.patch(`${Const.api_url}auth/fcm-token`, params)
    // }

    pushNotifications(params:any) {
        return axiosApiInstance.post(`${Const.api_url}auth/send-notification`, params)
    }
}

export default new NotificationServices