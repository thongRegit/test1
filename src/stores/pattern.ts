import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import axios from '@/config/axios'
import type {
    PatternData,
    patternPayload,
    createPatternPayload,
    Period,
} from '@/libs/interface/patternInterface'

export const usePatternStore = defineStore('question_type', () => {
    const patterns = ref({} as PatternData)
    const pattern = ref({})
    const periods = ref([] as Array<Period>)

    const listPattern = async (payload: patternPayload) => {
        try {
            const data = await axios.get('/patterns', {
                params: payload,
            })
            patterns.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createPattern = async (
        payload: createPatternPayload,
        cb?: Function
    ) => {
        try {
            // const data = await axios.post('/shop', { name: 'Axios POST Request Example' })
            const data = await axios.post('/patterns/create', payload)
            pattern.value = data
            if (cb) {
                cb()
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updatePattern = async (
        payload: createPatternPayload,
        id: number,
        cb?: Function
    ) => {
        try {
            const data = await axios.put(`patterns/${id}/update`, payload)
            pattern.value = data.data
            if (cb) {
                cb()
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const getPeriod = async () => {
        try {
            const data: Array<Period> = await axios.get(`period/`)
            periods.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        patterns,
        pattern,
        periods,
        listPattern,
        createPattern,
        updatePattern,
        getPeriod,
    }
})
