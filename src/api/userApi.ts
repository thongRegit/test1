import request from '@/config/axios'
import type { User } from '@/libs/interface/userInterface'
import type { ResponseList } from '@/libs/interface/commonInterface'

export const users = (url: string, payload: object | {}) => {
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const user = (url: string) => {
    return request<User, User, User>({
        url,
        method: 'GET',
    })
}

export const update = (url: string, payload: object | {}) => {
    return request({
        url,
        method: 'PUT',
        data: payload,
    })
}
