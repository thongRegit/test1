import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ParamsUserList } from '@/libs/interface/userInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'
import * as coachAPI from '@/api/coachApi'
import type { CoachDetail, CoachUpdate } from '@/libs/interface/coachInterface'

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref([] as ResponseList)
    const coach = ref({} as CoachDetail)
    const invited_coaches = ref([] as ResponseList)
    const session_coaches = ref([] as ResponseList)

    const listCoach = async (payload: ParamsUserList) => {
        try {
            const data = await coachAPI.coaches(payload)
            coaches.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const listCoachInvited = async (
        payload: ParamsUserList,
        id: string | string[] | number
    ) => {
        try {
            const data = await coachAPI.invitedCoaches(payload, id)
            invited_coaches.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const listCoachSession = async (
        payload: ParamsUserList,
        id: string | string[] | number
    ) => {
        try {
            const data = await coachAPI.sessionCoaches(payload, id)
            session_coaches.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateCoach = async (
        payload: CoachUpdate,
        id: string | string[] | number
    ) => {
        try {
            await coachAPI.update(payload, id)
            await detailCoach(id)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const detailCoach = async (id: string | string[] | number) => {
        try {
            const data = await coachAPI.coach(id)
            coach.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        coach,
        coaches,
        invited_coaches,
        session_coaches,
        listCoach,
        listCoachInvited,
        listCoachSession,
        updateCoach,
        detailCoach,
    }
})
