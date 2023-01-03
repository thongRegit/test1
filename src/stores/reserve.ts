import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ParamsList } from '@/libs/interface/commonInterface'
import * as reserveAPI from '@/api/reserveApi'
import type {
    ReserveDetail,
    ResponseReserveList,
} from '@/libs/interface/reserveInterface'
import { makeNotification } from '@/libs/constants/constants'
import * as shopAPI from '@/api/shopApi'
import * as coachAPI from '@/api/coachApi'
import axios from '@/config/axios'

export const useReserveStore = defineStore('reserve', () => {
    const reserves = ref([] as ResponseReserveList)
    const shops = ref([] as any)
    const coaches = ref([] as any)
    const plans = ref([] as any)
    const reserve = ref({} as ReserveDetail)

    const listReserve = async (payload: ParamsList) => {
        try {
            const data = await reserveAPI.reserves(payload)
            reserves.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listShop = async (payload: any) => {
        try {
            const data = await shopAPI.getListShop(payload)
            shops.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listPlan = async (payload: any) => {
        try {
            const data = await axios.get('/plans', {
                params: payload,
            })
            plans.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listCoach = async (payload: any) => {
        try {
            const data = await coachAPI.coaches(payload)
            coaches.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateReserve = async (
        payload: any,
        id: string | string[] | number
    ) => {
        payload.is_active = payload.is_active ? 1 : 0
        try {
            await reserveAPI.update(payload, id)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const detailReserve = async (id: string | string[] | number) => {
        try {
            const data = await reserveAPI.reserve(id)
            reserve.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    return {
        reserve,
        reserves,
        shops,
        coaches,
        plans,
        listReserve,
        updateReserve,
        detailReserve,
        listShop,
        listCoach,
        listPlan,
    }
})
