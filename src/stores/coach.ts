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
import { useAlertStore } from './alert'
import { LoadingVue } from '@/components/common/loading'

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref([] as ResponseCoachList)
    const coach = ref({} as CoachDetail)
    const invited_coaches = ref([] as ResponseCoachInvitedList)
    const session_coaches = ref([] as ResponseCoachSessionList)

    const listCoach = async (payload: ParamsList) => {
        try {
            const data = await coachAPI.coaches(payload)
            coaches.value = data
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateCoach = async (
        payload: CoachRuleForm,
        id: string | string[] | number
    ) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        payload.is_active = payload.is_active ? 1 : 0
        try {
            await coachAPI.update(payload, id)
            await coachAPI.coach(id)
            alertStore.createAlert({
                title: `Update ${coach.value.first_name}${coach.value.last_name} successfully!`,
                type: 'success',
            })
            loading.close()
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
