import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import * as userAPI from '@/api/userApi'
import type {
    UserDetail,
    UserUpdate,
    ParamsUserList,
} from '@/libs/interface/userInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'
import { useAlertStore } from './alert'
import { LoadingVue } from '@/components/common/loading'

export const useUserStore = defineStore('users', () => {
    const users = ref({} as ResponseList)
    const session_users = ref({} as ResponseList)
    const cancel_fee_users = ref({} as ResponseList)
    const user = ref({} as UserDetail)

    const listUser = async (payload: ParamsUserList) => {
        try {
            const data = await userAPI.users(payload)
            users.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const listUserSession = async (
        payload: ParamsUserList,
        id: string | string[] | number
    ) => {
        try {
            const data = await userAPI.sessionUsers(payload, id)
            session_users.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const listUserCancelFee = async (
        payload: ParamsUserList,
        id: string | string[] | number
    ) => {
        try {
            const data = await userAPI.cancelFeeUsers(payload, id)
            cancel_fee_users.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateUser = async (
        payload: UserUpdate,
        id: string | string[] | number
    ) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        payload.gender = Number(payload.gender)
        payload.status = Number(payload.status)
        payload.is_active = payload.is_active ? 1 : 0
        console.log('payload >> ', payload)
        try {
            await userAPI.update(payload, id)
            await detailUser(id)
            alertStore.createAlert({
                title: `Update ${user.value.first_name} ${user.value.last_name} successfully!`,
                type: 'success',
            })
            loading.close()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const detailUser = async (id: string | string[] | number) => {
        try {
            const data = await userAPI.user(id)
            user.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        users,
        session_users,
        cancel_fee_users,
        user,
        listUser,
        listUserSession,
        listUserCancelFee,
        detailUser,
        updateUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
