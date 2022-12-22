import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

interface alert {
    title: String
    type: String
    effect?: String
    showIcon?: Boolean
}

export const useAlertStore = defineStore('alerts', () => {
    const alerts = ref([] as alert[])

    const createAlert = async (payload: alert) => {
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
