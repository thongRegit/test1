import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { getListPlan, update, create, getPlanDetail } from '@/api/planApi'
import type {
    ResponsePlanList,
    PlanDetailPayload,
    PlanRuleForm,
} from '@/libs/interface/planInterface'
import { makeNotification } from '@/libs/constants/constants'
import type { ParamsList } from '@/libs/interface/commonInterface'

export const usePlanStore = defineStore('plans', () => {
    const plans = ref([] as ResponsePlanList)
    const plan = ref({} as PlanDetailPayload)

    const listPlan = async (payload: ParamsList) => {
        try {
            const data = await getListPlan(payload)
            plans.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const createPlan = async (payload: PlanRuleForm) => {
        try {
            await create(payload)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const updatePlan = async (payload: any, id: any) => {
        try {
            await update(payload, id)
            await getPlanDetail(id)
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    const detailPlan = async (payload: any) => {
        try {
            const data = await getPlanDetail(payload.id).then((res) => res)
            plan.value = data
        } catch (error: any) {
            makeNotification('error', 'Error', error?.message)
            return error
        }
    }

    return {
        plans,
        plan,
        listPlan,
        detailPlan,
        createPlan,
        updatePlan,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlanStore, import.meta.hot))
}
