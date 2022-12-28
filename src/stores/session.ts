import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'
import type { Period } from '@/libs/interface/sessionInterface'
import { makeNotification } from '@/libs/constants/constants'
import { useAlertStore } from './alert'
import type { ParamsList } from '@/libs/interface/commonInterface'
import * as coachAPI from '@/api/coachApi'

import type {
    ResponseCoachList,
} from '@/libs/interface/coachInterface'

export const useSessionStore = defineStore('sessions', () => {
    const sessions = ref([] as any)
    const periods = ref([] as Array<Period>)
    const coaches = ref([] as ResponseCoachList)

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

    const getCoaches = async (payload: ParamsList) => {
        try {
            const data = await coachAPI.coaches(payload)
            coaches.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateShift = async (payload: any, cb?: Function) => {
        const alertStore = useAlertStore()
        try {
            const data = await axios.post('/sessions/shift', payload)
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `シフト設定が成功しました。`,
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
        coaches,
        listSession,
        createSession,
        getPeriod,
        getCoaches,
        updateShift,
    }
})
