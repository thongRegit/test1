import request from '@/config/axios'
import type {
    ReserveDetail,
    ResponseReserveList,
} from '@/libs/interface/reserveInterface'

export const reserves = (payload: object | {}) => {
    const url = '/orders'
    return request<ResponseReserveList, ResponseReserveList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const reserve = (id: string | string[] | number) => {
    const url = `/orders/${id}`
    return request<ReserveDetail, ReserveDetail, ReserveDetail>({
        url,
        method: 'GET',
    })
}

export const update = (
    payload: object | {},
    id: string | string[] | number
) => {
    const url = `/orders/${id}`
    return request({
        url,
        method: 'PUT',
        data: payload,
    })
}
