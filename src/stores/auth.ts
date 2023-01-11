import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginDto } from '../libs/interface/authInterface'
import type { Profile } from '@/libs/interface/userInterface'
import * as API from '@/api/auth'

const tokenKey = 'access_token'

export const useAuthStore = defineStore('auth', () => {
    const TOKEN_STR = localStorage.getItem(tokenKey)
    const token = ref(TOKEN_STR)
    const isAuthenticated = computed(() => !!token.value)

    const profile = ref({} as Profile)

    const login = async (payload: LoginDto | {}) => {
        try {
            const data: any = await API.login('/auth/login', payload)
            localStorage.setItem(tokenKey, data.access_token)
            token.value = data.access_token
            profile.value = data.me
        } catch (error) {
            return error
        }
    }

    const me = computed(() => {
        return profile.value
    })

    const logout = () => {
        setTimeout(() => {
            localStorage.clear()
            token.value = ''
        }, 1000)
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
