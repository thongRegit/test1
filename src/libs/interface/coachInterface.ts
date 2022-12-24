export interface CoachSearch {
    search: string
    status: string
}

export interface Date {
    day: string
    month: string
    year: string
}
export interface CoachDetail {
    id?: number
    full_name: string
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    avatar_url: string
    nickname: string
    birthday: string
    birthdays: Date
    created_at: string
    tel: string
    is_active: boolean
    is_active_name: string
    users: any
    session_details: any
}

export interface CoachUpdate {
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    nickname: string
    birthday: string
    tel: string
    is_active: boolean
}
