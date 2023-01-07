import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import * as userAPI from '@/api/userApi'
import type { UserDetail, UserUpdate, UserPlanUpdate } from '@/libs/interface/userInterface'
import type { ParamsList, ResponseList } from '@/libs/interface/commonInterface'
import { makeNotification } from '@/libs/constants/constants'
import { useAlertStore } from './alert'

export const useUserStore = defineStore('users', () => {
    const users = ref({} as ResponseList)
    const session_users = ref({} as ResponseList)
    const cancel_fee_users = ref({} as ResponseList)
    const user_plans = ref({} as any)
    const user = ref({} as UserDetail)

    const listUser = async (payload: ParamsList) => {
        try {
            const data = await userAPI.users(payload)
            users.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listUserSession = async (
        payload: ParamsList,
        id: string | string[] | number
    ) => {
        try {
            const data = await userAPI.sessionUsers(payload, id)
            session_users.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listUserCancelFee = async (
        payload: ParamsList,
        id: string | string[] | number
    ) => {
        try {
            const data = await userAPI.cancelFeeUsers(payload, id)
            cancel_fee_users.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listUserPlan = async (
        payload: ParamsList,
        id: string | string[] | number
    ) => {
        try {
            const data = await userAPI.userPlans(payload, id)
            user_plans.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateUser = async (
        payload: UserUpdate,
        id: string | string[] | number
    ) => {
        payload.gender = Number(payload.gender)
        payload.is_active = payload.is_active ? 1 : 0
        if (!payload.birthday) {
            delete payload.birthday
        }
        try {
            await userAPI.update(payload, id)
            await detailUser(id)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateUserPlan = async (
        payload: UserPlanUpdate,
        id: string | string[] | number,
        cb?: Function
    ) => {
        const alertStore = useAlertStore()
        try {
            await userAPI.updateUserPlan(payload, id)
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `プランの変更が成功しました。`,
                type: 'success',
            })
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const deleteUserPlan = async (
        id: string | string[] | number,
        cb?: Function
    ) => {
        const alertStore = useAlertStore()
        try {
            await userAPI.deleteUserPlan(id)
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `プランの削除が成功しました。`,
                type: 'success',
            })
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const detailUser = async (id: string | string[] | number) => {
        try {
            const data = await userAPI.user(id)
            user.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    return {
        users,
        session_users,
        cancel_fee_users,
        user_plans,
        user,
        listUser,
        listUserSession,
        listUserCancelFee,
        listUserPlan,
        updateUserPlan,
        deleteUserPlan,
        detailUser,
        updateUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
