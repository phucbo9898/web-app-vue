import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import AuthService from '@/services/AuthService'
import store from '@/store'
import router from '@/router'
import main from '@/main'

const axiosInstance = axios.create()

// Request interceptor for call API
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        let token = store.state.auth.token

        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

// Response interceptors for call APIs
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, async (error) => {
    const originalRequest = error ? error.config: null;
    if (
        error.response.status === 401
        && !originalRequest._retry
        && error?.response?.data?.status_code === "TOKEN_EXPIRED"
    ) {
        router.push({ name: 'login' })
        sessionStorage.clear()
        localStorage.clear()
    }

    if (
        error.response.status === 401
        && (error?.response?.data?.status_code === "INVALID_USER" || error?.response?.data?.status_code === "INVALID_TOKEN")
    ) {
        router.push({ name: 'login' })
        sessionStorage.clear()
        localStorage.clear()
    }

    if (error.response.status === 429) {
        AuthService.logout()
    }

    return Promise.reject(error);
});

export default axiosInstance