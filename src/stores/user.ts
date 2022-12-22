import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import * as userAPI from '@/api/userApi'

export const useUserStore = defineStore('question_type', () => {
    const users = ref([] as any)
    const user = ref({} as any)

    const getUsers = async (payload: any) => {
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

    const updateUser = async (payload: any, id: any) => {
        try {
            await userAPI.update(`user/${id}/update`, payload)
            user.value = await getUser({ id: id })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const getUser = async (payload: any) => {
        try {
            return await userAPI.user(`/user/${payload.id}`)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        users,
        user,
        getUsers,
        getUser,
        updateUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
