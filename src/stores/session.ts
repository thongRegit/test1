import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'
import type { createSessionPayload, Period, ResponsePeriodList, ResponseSessionList } from '@/libs/interface/sessionInterface'
import { makeNotification } from '@/libs/constants/constants'
import { useAlertStore } from './alert'
import type { ParamsList } from '@/libs/interface/commonInterface'
import * as coachAPI from '@/api/coachApi'

import type { ResponseCoachList } from '@/libs/interface/coachInterface'
import { getListSession, getListPeriod, create, createShift } from '@/api/sesssionApi'

export const useSessionStore = defineStore('sessions', () => {
    const sessions = ref([] as ResponseSessionList)
    const periods = ref([] as ResponsePeriodList)
    const coaches = ref([] as ResponseCoachList)

    const listSession = async (payload: ParamsList) => {
        try {
            const data = await getListSession(payload)
            sessions.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const getPeriod = async () => {
        try {
            const data: ResponsePeriodList = await getListPeriod()
            periods.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const createSession = async (payload: any, cb?: Function) => {
        const alertStore = useAlertStore()
        try {
            await create(payload)
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
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateShift = async (payload: createSessionPayload, cb?: Function) => {
        const alertStore = useAlertStore()
        try {
            const data = await createShift(payload)
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
