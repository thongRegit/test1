import type { ResponseList } from './commonInterface'

export interface Session {
    id?: any
    start_time: string
    end_time: string
    period_id: number
}

export interface ResponseSessionList extends ResponseList {
    data?: Session[]
}

export interface Period {
    id: number
    value: number
    color: string
}

export interface ResponsePeriodList extends ResponseList {
    data?: Period[]
}

export interface createSessionPayload {
    date: string
    sessions: Array<Session>
}

export interface createShiftPayload {
    shop_id: string
    station_number: number
    date: string
    shifts: Array<Session>
}

export interface Coach {
    id: number
    full_name: string
}
