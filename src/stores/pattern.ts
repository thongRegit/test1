import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import axios from '@/config/axios'
import type {
    PatternData,
    patternPayload,
    createPatternPayload,
    Period,
} from '@/libs/interface/patternInterface'
import { useAlertStore } from './alert'
import { LoadingVue } from '@/components/common/loading'
import { makeNotification } from '@/libs/constants/constants'

export const usePatternStore = defineStore('question_type', () => {
    const patterns: any = ref({} as PatternData)
    const pattern = ref({})
    const periods = ref([] as Array<Period>)

    const listPattern = async (payload: patternPayload) => {
        try {
            const data = await axios.get('/patterns', {
                params: payload,
            })
            patterns.value = data
        } catch (error) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const createPattern = async (
        payload: createPatternPayload,
        cb?: Function
    ) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        try {
            // const data = await axios.post('/shop', { name: 'Axios POST Request Example' })
            const data = await axios.post('/patterns/create', payload)
            pattern.value = data
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `Create pattern successfully!`,
                type: 'success',
            })
            loading.close()
        } catch (error) {
            makeNotification('error', 'Error', error?.message)
            loading.close()
            return error
        }
    }

    const updatePattern = async (
        payload: createPatternPayload,
        id: number,
        cb?: Function
    ) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        try {
            const data = await axios.put(`patterns/${id}/update`, payload)
            pattern.value = data.data
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: `Update pattern successfully!`,
                type: 'success',
            })
            loading.close()
        } catch (error) {
            makeNotification('error', 'Error', error?.message)
            loading.close()
            return error
        }
    }

    const getPeriod = async () => {
        try {
            const data: Array<Period> = await axios.get(`period/`)
            periods.value = data
        } catch (error) {
            makeNotification('error', 'Error', error?.message)
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
