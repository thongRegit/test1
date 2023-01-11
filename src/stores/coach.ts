import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ParamsList } from '@/libs/interface/commonInterface'
import * as coachAPI from '@/api/coachApi'
import type {
    CoachDetail,
    CoachRuleForm,
    ResponseCoachInvitedList,
    ResponseCoachList,
    ResponseCoachSessionList,
} from '@/libs/interface/coachInterface'
import { makeNotification } from '@/libs/constants/constants'

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref([] as ResponseCoachList)
    const coach = ref({} as CoachDetail)
    const invited_coaches = ref([] as ResponseCoachInvitedList)
    const session_coaches = ref([] as ResponseCoachSessionList)

    const listCoach = async (payload: ParamsList) => {
        try {
            const data = await coachAPI.coaches(payload)
            coaches.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listCoachInvited = async (
        payload: ParamsList,
        id: string | string[] | number
    ) => {
        try {
            const data = await coachAPI.invitedCoaches(payload, id)
            invited_coaches.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const listCoachSession = async (
        payload: ParamsList,
        id: string | string[] | number
    ) => {
        try {
            const data = await coachAPI.sessionCoaches(payload, id)
            session_coaches.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updateCoach = async (
        payload: CoachRuleForm,
        id: string | string[] | number
    ) => {
        payload.is_active = payload.is_active ? 1 : 0
        try {
            await coachAPI.update(payload, id)
            await coachAPI.coach(id)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const createCoach = async (
        payload: CoachRuleForm,
    ) => {
        payload.is_active = payload.is_active ? 1 : 0
        try {
            await coachAPI.create(payload)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const detailCoach = async (id: string | string[] | number) => {
        try {
            const data = await coachAPI.coach(id)
            coach.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
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
        createCoach,
        updateCoach,
        detailCoach,
    }
})
