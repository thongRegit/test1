import request from '@/config/axios'
import type {
    ResponsePlanList,
    PlanDetailPayload,
} from '@/libs/interface/planInterface'

export const getListPlan = (payload: object | {}) => {
    const url = '/plans'
    return request<ResponsePlanList, ResponsePlanList>({
        url,
        method: 'GET',
        params: payload,
    })
}
export const getPlanDetail = (id: string | string[] | number) => {
    const url = `/plans/${id}`
    return request<PlanDetailPayload, PlanDetailPayload, PlanDetailPayload>({
        url,
        method: 'GET',
    })
}

export const create = (payload: object | {}) => {
    const url = `/plans`
    return request<PlanDetailPayload, PlanDetailPayload>({
        url,
        method: 'POST',
        data: payload,
    })
}

export const update = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/plans/${id}`
    return request({
        url,
        method: 'PUT',
        data: payload,
    })
}
