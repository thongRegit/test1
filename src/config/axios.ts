import { ACCESS_TOKEN } from '@/libs/constants/localStorage'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_APP_API

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_APP_API,
})

instance.interceptors.request.use(
    function (config: any) {
        try {
            const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        } catch (error) {}
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        const data = response?.data?.data || response?.data || response
        if (response?.data?.status_code !== 200)
            return Promise.reject(response?.data)

        return data
    },
    function (error) {
        if (error?.response?.data) {
            return Promise.reject(error?.response?.data)
        }
        return Promise.reject(error)
    }
)

export const setLocaleApi = (locale: string) => {
    instance.defaults.headers.common['lang'] = locale
}

export default instance
