import request from '@/config/axios'
import type { UserDetail } from '@/libs/interface/userInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'

export const users = (payload: object | {}) => {
    const url = '/users'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const sessionUsers = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/users/${id}/sessions`
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const cancelFeeUsers = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/users/${id}/cancel-fee`
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const user = (id: string | string[] | number) => {
    const url = `/users/${id}`
    return request<UserDetail, UserDetail, UserDetail>({
        url,
        method: 'GET',
    })
}

export const update = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/users/${id}`
    return request({
        url,
        method: 'PUT',
        data: payload,
    })
}
