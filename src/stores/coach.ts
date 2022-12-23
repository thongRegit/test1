import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import axios from '@/config/axios'

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref([] as any)

    const listCoach = async (payload: any) => {
        try {
            const data = await axios.get('/coaches', {
                params: payload,
            })
            coaches.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        coaches,
        listCoach,
    }
})
