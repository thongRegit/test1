export interface PatternData {
    total: number
    current_page: number
    per_page: number
    data: Array<Pattern>
}

export interface Pattern {
    id: number
    name: string
    details?: Array<Detail> | []
    pattern_details?: Array<Detail> | []
}

export interface Detail {
    id: number
    start_time: string
    end_time: string
    period: Period
}

export interface Period {
    id: number
    value: number
}

export interface Session {
    start_time: string | null
    end_time: string | null
    period_id: number | null
    error_msg?: string | null
}

export interface SessionEl {
    id: number
    start_time: string
    end_time: string
    period: Period
}

export interface patternPayload {
    page?: number
    all?: number | null
}

export interface createPatternPayload {
    name: string
    pattern_details?: Array<Session> | []
}
