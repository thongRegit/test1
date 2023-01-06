import request from '@/config/axios'
import type { ResponseShiftHistoryList } from '@/libs/interface/shiftHistoryInterface'

export const shiftHistories = (payload: object | {}) => {
    const url = '/shift-histories'
    return request<ResponseShiftHistoryList, ResponseShiftHistoryList>({
        url,
        method: 'GET',
        params: payload,
    })
}
