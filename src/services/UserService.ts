import Const from '@/constants/index'
import axiosApiInstance from '@/interceptors'
import axios from 'axios'

class UserService {
    changePassword(params: any) {
        return axiosApiInstance.post(Const.api_url + 'members/me/user-infor/change-password', params)
    }

    changeEmail(params: any) {
        return axiosApiInstance.post(Const.api_url + 'members/me/user-infor/change-email', params)
    }

    verifyEmailChange(user_id: any, data: any) {        
        return axios.get(Const.api_url + 'verify-email/' + user_id, data)
    }

    uploadImage(params: any) {
        return axiosApiInstance.post(Const.api_url + 'upload-image', params,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
    }

    updateProfile(params: any) {
        return axiosApiInstance.post(Const.api_url + 'members/me/update-profile', params)
    }

    updateSettingLanguage(params: any) {
        return axiosApiInstance.post(Const.api_url + 'members/me/update-setting-language', params)
    }

    updateDeviceToken(params: any) {
        return axiosApiInstance.patch(`${Const.api_url}members/me/update-device-token`, params);
      }
}

export default new UserService