import request from '@/config/axios'
import type {
    CoachDetail,
    ResponseCoachList,
    ResponseCoachInvitedList,
    ResponseCoachSessionList,
} from '@/libs/interface/coachInterface'

export const coaches = (payload: object | {}) => {
    const url = '/coaches'
    return request<ResponseCoachList, ResponseCoachList>({
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

export const invitedCoaches = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/coaches/${id}/invited`
    return request<ResponseCoachInvitedList, ResponseCoachInvitedList>({
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

export const create = (
    payload: object | {},
) => {
    const url = `/coaches`
    return request({
        url,
        method: 'POST',
        data: payload,
    })
}
