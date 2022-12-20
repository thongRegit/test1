import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'

export const useUserStore = defineStore('question_type', () => {
    const users = ref([] as any)
    const user = ref({} as any)

    const getUsers = async (payload: any) => {
        try {
            const data = await axios.get('/user', {
                params: payload,
            })
            users.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createUser = async (payload: any) => {
        try {
            const data = await axios.post('/user', payload)
            user.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateUser = async (payload: any, id: any) => {
        try {
            const data = await axios.put(`user/${id}/update`, payload)
            user.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const deleteUser = async (payload: any) => {
        try {
            return await axios.delete(`/user/${payload.id}`).then((res) => res)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const getUser = async (payload: any) => {
        try {
            return await axios.get(`/user/${payload.id}`).then((res) => res)
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
        createUser,
        updateUser,
        deleteUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
