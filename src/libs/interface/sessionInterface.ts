export interface Session {
    id?: any
    start_time: string
    end_time: string
    period_id: number
}

export interface Period {
    id: number
    value: number
    color: string
}

export interface createSessionPayload {
    date: string
    sessions: Array<Session>
}

export interface Coach {
    id: number
    full_name: string
}
