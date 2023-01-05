import type { ResponseList } from './commonInterface'

export interface SessionHistory {
    id: number
    date: string
    start_time: string
    end_time: string
    period_id: number
}

export interface ResponseSessionHistoryList extends ResponseList {
    data?: SessionHistory[]
}
