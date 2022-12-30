import request from '@/config/axios'
import type { ResponseCoachSessionList } from '@/libs/interface/coachInterface'
import type {
    Period,
    ResponsePeriodList,
    ResponseSessionList,
} from '@/libs/interface/sessionInterface'

export const getListSession = (payload: object | {}) => {
    const url = '/sessions'
    return request<ResponseSessionList, ResponseSessionList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const sessionCoaches = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/coaches/${id}/sessions`
    return request<ResponseCoachSessionList, ResponseCoachSessionList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const getListPeriod = () => {
    const url = `/period`
    return request<ResponsePeriodList, ResponsePeriodList>({
        url,
        method: 'GET',
    })
}

export const create = (payload: object | {}) => {
    const url = `sessions`
    return request({
        url,
        method: 'POST',
        data: payload,
    })
}

export const createShift = (payload: object | {}) => {
    const url = `/sessions/shift`
    return request({
        url,
        method: 'POST',
        data: payload,
    })
}
