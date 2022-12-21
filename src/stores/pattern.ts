import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import axios from '@/config/axios'

export const usePatternStore = defineStore('question_type', () => {
    const patterns = ref([] as any)
    const pattern = ref({} as any)

    const listPattern = async (payload: any) => {
        try {
            const data = await axios.get('/patterns', {
                params: payload,
            })
            console.log('data :>> ', data)
            patterns.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createPattern = async (payload: any) => {
        try {
            // const data = await axios.post('/shop', { name: 'Axios POST Request Example' })
            const data = await axios.post('/patterns/create', payload)
            pattern.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updatePattern = async (payload: any, id: any) => {
        try {
            const data = await axios.put(`patterns/${id}/update`, payload)
            pattern.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        patterns,
        pattern,
        listPattern,
        createPattern,
        updatePattern,
    }
})
