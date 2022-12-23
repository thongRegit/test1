import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import * as userAPI from '@/api/userApi'
import type {
    User,
    UserUpdate,
    ParamsUserList,
} from '@/libs/interface/userInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'

export const useUserStore = defineStore('users', () => {
    const users = ref({} as ResponseList)
    const user = ref({} as User)

    const listUser = async (payload: ParamsUserList) => {
        try {
            const data = await userAPI.users('/users', {
                params: payload,
            })
            users.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateUser = async (payload: UserUpdate, id: number) => {
        try {
            await userAPI.update(`user/${id}/update`, payload)
            await detailUser(id)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const detailUser = async (id: number) => {
        try {
            const data = await userAPI.user(`/user/${id}`)
            user.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        users,
        user,
        listUser,
        detailUser,
        updateUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
