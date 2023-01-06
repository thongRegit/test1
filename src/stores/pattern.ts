import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/config/axios'
import type {
    PatternData,
    patternPayload,
    createPatternPayload,
    Period,
    Pattern,
} from '@/libs/interface/patternInterface'
import { useAlertStore } from './alert'
import { LoadingVue } from '@/components/common/loading'
import { makeMessage } from '@/libs/constants/constants'
import * as patternAPI from '@/api/patternAPI'
import i18n from '@/lang/index'

export const usePatternStore = defineStore('patterns', () => {
    const patterns = ref({} as PatternData)
    const pattern = ref({})
    const periods = ref([] as Array<Period>)
    const allPatterns = ref([] as Array<Pattern>)

    const listPattern = async (payload: patternPayload | null = null) => {
        try {
            const data: any = await patternAPI.getListPattern(payload)
            if (payload?.all) {
                allPatterns.value = data
            } else {
                patterns.value = data
            }
        } catch (error: any) {
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
            const data = await patternAPI.createPattern(payload)
            pattern.value = data
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: i18n.t('message.create_success'),
                type: 'success',
            })
            loading.close()
        } catch (error: any) {
            makeMessage('error', error?.message)
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
            const data = await patternAPI.updatePattern(payload, id)
            pattern.value = data.data
            if (cb) {
                cb()
            }
            alertStore.createAlert({
                title: i18n.t('message.update_success'),
                type: 'success',
            })
            loading.close()
        } catch (error: any) {
            makeMessage('error', error?.message)
            loading.close()
            return error
        }
    }

    const getPeriod = async () => {
        try {
            const data: Array<Period> = await axios.get(`/period`)
            periods.value = data
        } catch (error: any) {
            return error
        }
    }

    return {
        allPatterns,
        patterns,
        pattern,
        periods,
        listPattern,
        createPattern,
        updatePattern,
        getPeriod,
    }
})
