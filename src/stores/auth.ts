import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginDto } from '../libs/interface/auth'
import * as API from '@/api/auth'

const tokenKey = 'access_token'

export const useAuthStore = defineStore('auth', () => {
    const TOKEN_STR = localStorage.getItem(tokenKey)
    const token = ref(JSON.parse(TOKEN_STR || '{}'))

    const isAuthenticated = computed(() => {
        return Object.keys(token.value).length > 0 && !!token.value
    })

    const login = async (payload: LoginDto | {}) => {
        try {
            const data: any = await API.login('/auth/login', payload)
            token.value = data.access_token
            localStorage.setItem(tokenKey, JSON.stringify(data.access_token))
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const me = async () => {
        try {
            const data: any = await API.getProfile('/auth/me')
            return data
        } catch (error) {
            return null
        }
    }

    const logout = () => {
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
