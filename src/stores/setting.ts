import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useSettingStore = defineStore('setting', () => {
    const collapse = ref(false)
    const getCollapse = computed(() => collapse.value)

    const handleCollapse = () => {
        collapse.value = !collapse.value
    }

    return {
        collapse,
        getCollapse,
        handleCollapse,
    }
})
