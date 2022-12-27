import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'
import type { Period } from '@/libs/interface/sessionInterface'
import { makeNotification } from '@/libs/constants/constants'
import { useAlertStore } from './alert'

export const useSessionStore = defineStore('sessions', () => {
    const sessions = ref([] as any)
    const periods = ref([] as Array<Period>)

    const listSession = async (payload: any) => {
        try {
            const data = await axios.get('/sessions', {
                params: payload,
            })
            sessions.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const getPeriod = async () => {
        try {
            const data: Array<Period> = await axios.get(`/period`)
            periods.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const createSession = async (payload: any, cb?: Function) => {
        const alertStore = useAlertStore()
        try {
            const data = await axios.post('/sessions', payload)
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `セッション設定が成功しました。`,
                type: 'success',
            })
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    return {
        sessions,
        periods,
        listSession,
        createSession,
        getPeriod,
    }
})
