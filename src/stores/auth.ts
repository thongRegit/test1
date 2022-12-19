import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginDto } from '../libs/interface/auth'
import { API_LOGIN } from '../libs/constants/urlApi'
import axios from '@/config/axios'

const tokenKey = 'access_token'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(JSON.parse(localStorage.getItem(tokenKey) || ''))

    const isAuthenticated = computed(() => !!token.value)

    const login = async (payload: LoginDto | {}) => {
        try {
            const data = await API_LOGIN.post(payload)
            token.value = data['data']['access_token']
            localStorage.setItem(
                tokenKey,
                JSON.stringify(data['data']['access_token'])
            )
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const me = async () => {
        try {
            if (!localStorage.getItem(tokenKey)) return null
            const data: any = await axios.get('/auth/me')
            return data
        } catch (error) {
            localStorage.removeItem(tokenKey)
            return null
        }
    }

    const logout = () => {
        // localStorage.removeItem(tokenKey);
        localStorage.clear()
        token.value = ''
    }

    return {
        token,
        isAuthenticated,
        login,
        logout,
        me,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
