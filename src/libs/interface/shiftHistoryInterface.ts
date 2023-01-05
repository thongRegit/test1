import type { ResponseList } from './commonInterface'

export interface ShiftHistory {
    id: number
    date: string
    start_time: string
    end_time: string
    coach_id: number
}

export interface ResponseShiftHistoryList extends ResponseList {
    data?: ShiftHistory[]
}
