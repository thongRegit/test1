import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Alert } from '@/libs/interface/alertInterface'

export const useAlertStore = defineStore('alerts', () => {
    const alerts = ref([] as Alert[])

    const createAlert = async (payload: Alert) => {
        alerts.value = []
        alerts.value.push(payload)
    }

    const deleteAlert = async (payload: any) => {
        alerts.value.push(payload)
    }

    return {
        alerts,
        createAlert,
        deleteAlert,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))
}
