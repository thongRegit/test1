import request from '@/config/axios'

export const users = (url: string, payload: object | {}) => {
    return request({
        url,
        method: 'GET',
        params: payload,
    })
}

export const user = (url: string) => {
    return request({
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
