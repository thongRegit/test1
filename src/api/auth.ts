import request from '@/config/axios'

export const login = (url: string, payload: object | {}) => {
    return request({
        url,
        method: 'POST',
        data: payload,
    })
}

export const getProfile = (url: string) => {
    return request({
        url,
        method: 'GET',
    })
}
