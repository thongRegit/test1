export interface Session {
    start_time: string
    end_time: string
    period_id: number
}

export interface Period {
    id: number
    value: number
}

export interface createSessionPayload {
    date: string
    sessions: Array<Session>
}