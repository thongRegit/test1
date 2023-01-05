import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
    createSessionPayload,
    ResponsePeriodList,
    ResponseSessionList,
} from '@/libs/interface/sessionInterface'
import { makeNotification } from '@/libs/constants/constants'
import { useAlertStore } from './alert'
import type { ParamsList } from '@/libs/interface/commonInterface'
import * as coachAPI from '@/api/coachApi'
import * as sessionHistoryAPI from '@/api/sessionHistoryAPI'
import * as shiftHistoryAPI from '@/api/shiftHistoryAPI'

import type { ResponseCoachList } from '@/libs/interface/coachInterface'
import type { ResponseSessionHistoryList } from '@/libs/interface/sessionHistoryInterface'
import type { ResponseShiftHistoryList } from '@/libs/interface/shiftHistoryInterface'
import {
    getListSession,
    getListPeriod,
    create,
    createShift,
} from '@/api/sesssionApi'

export const useSessionStore = defineStore('sessions', () => {
    const sessions = ref([] as ResponseSessionList)
    const periods = ref([] as ResponsePeriodList)
    const coaches = ref([] as ResponseCoachList)
    const sessionHistories = ref([] as ResponseSessionHistoryList)
    const shiftHistories = ref([] as ResponseShiftHistoryList)
    const alertStore = useAlertStore()

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

    const getSessionHistories = async (payload: ParamsList) => {
        try {
            const data = await sessionHistoryAPI.sessionHistories(payload)
            sessionHistories.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const getShiftHistories = async (payload: ParamsList) => {
        try {
            const data = await shiftHistoryAPI.shiftHistories(payload)
            shiftHistories.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateShift = async (
        payload: createSessionPayload,
        cb?: Function
    ) => {
        const alertStore = useAlertStore()
        try {
            await createShift(payload)
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
        sessionHistories,
        shiftHistories,
        listSession,
        createSession,
        getPeriod,
        getCoaches,
        updateShift,
        getSessionHistories,
        getShiftHistories,
    }
})
