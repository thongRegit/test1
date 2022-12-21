export interface PatternData {
    total: number
    current_page: number
    per_page: number
    data: Array<Pattern>
}

export interface Pattern {
    id: number
    name: string
    details: Array<Detail>
}

export interface Detail {
    id: number
    start_time: string
    end_time: string
    period: Period
}

export interface PeriodData {
    data: Array<Period>
}

export interface Period {
    id: number
    value: number
}

export interface Session {
    start_time: string
    end_time: string
    period_id: number
    period_value: number
}

export interface patternPayload {
    per_page: number
    page: number
}

export interface createPatternPayload {
    name: string
    pattern_details: Array<Session>,
}
