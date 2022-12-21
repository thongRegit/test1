import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'

export const usePlanStore = defineStore('question_type', () => {
    const plans = ref([] as any)
    const plan = ref({} as any)

    const listPlan = async (payload: any) => {
        try {
            const data = await axios.get('/plans', {
                params: payload,
            })
            plans.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createPlan = async (payload: any) => {
        try {
            // const data = await axios.post('/plan', { name: 'Axios POST Request Example' })
            const data = await axios.post('/plans', payload)
            plan.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updatePlan = async (payload: any, id: any) => {
        try {
            const data = await axios.put(`plans/${id}/update`, payload)
            plan.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const deletePlan = async (payload: any) => {
        try {
            return await axios.delete(`/plans/${payload.id}`).then((res) => res)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const detailPlan = async (payload: any) => {
        try {
            return await axios.get(`/plans/${payload.id}`).then((res) => res)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        plans,
        plan,
        listPlan,
        detailPlan,
        createPlan,
        updatePlan,
        deletePlan,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlanStore, import.meta.hot))
}
