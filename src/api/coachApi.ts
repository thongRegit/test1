import request from '@/config/axios'
import type { CoachDetail } from '@/libs/interface/coachInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'

export const coaches = (payload: object | {}) => {
    const url = '/coaches'
    return request<ResponseList, ResponseList>({
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
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const invitedCoaches = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/coaches/${id}/invited`
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const coach = (id: string | string[] | number) => {
    const url = `/coaches/${id}`
    return request<CoachDetail, CoachDetail, CoachDetail>({
        url,
        method: 'GET',
    })
}

export const update = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/coaches/${id}/update`
    return request({
        url,
        method: 'PUT',
        data: payload,
    })
}
