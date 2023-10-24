import Const from '@/constants/index'
import axios from 'axios'
import '@/router'
import axiosApiInstance from '@/interceptors'
import { getModule } from 'vuex-module-decorators'

class AuthService {
    login(account: any) {
        return axiosApiInstance.post(Const.api_url + 'auth/login', account)
    }
    
    getUserInfor() {
        return axiosApiInstance.get(Const.api_url + 'auth/get-info')
    }

    logout() {
        return axiosApiInstance.post(Const.api_url + 'auth/logout')
    }
}

export default new AuthService