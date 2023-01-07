import type { PaginateParams, ResponseList } from './commonInterface'
export interface Profile {
    id: number
    name: string
    mail_address: string
    created_at?: number
    updated_at?: number
}

export interface User {
    id: number
    full_name: string
    tel: string
    is_active: number
    last_session_date: string
    first_experience_date: string
    created_at: number
    type: string
}

export interface Date {
    day: string
    month: string
    year: string
}
export interface UserDetail {
    id?: number
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    birthday?: string | null
    birthdays: Date
    tel: string
    line_name: string
    gender: string | number
    is_active: boolean | number
    age?: number
    type?: string
}

export interface UserUpdate {
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    tel: string
    birthday?: string | null
    gender: string | number
    is_active: boolean | number
    type?: string
}

export interface UserSearchParam {
    search: string
    type: string
    is_active: string
}

export interface ResponseUserList extends ResponseList {
    data?: User
}

export interface PaginateUserParams extends PaginateParams {
    records?: {
        id: number
        full_name: string
        tel: string
        created_at: string
        first_experience_date: string
        last_session_date: string
        is_active: string
    }[]
}

export interface UserPlanUpdate {
    type: number
    start_date: string
    end_date: string
}
