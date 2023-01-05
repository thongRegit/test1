import request from '@/config/axios'
import type {
    ResponseSessionHistoryList,
} from '@/libs/interface/sessionHistoryInterface'

export const sessionHistories = (payload: object | {}) => {
    const url = '/session-histories'
    return request<ResponseSessionHistoryList, ResponseSessionHistoryList>({
        url,
        method: 'GET',
        params: payload,
    })
}
