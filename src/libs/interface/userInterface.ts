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
    birthday: string
    birthdays: Date
    tel: string
    line_name: string
    gender: string | number
    status: string | number
    is_active: boolean | number
}

export interface UserUpdate {
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    tel: string
    birthday: string
    gender: string | number
    status: string | number
    is_active: boolean | number
}

export interface ParamsOrders {
    key: string
    dir: 'descending' | 'ascending'
}

export interface ParamsFilters {
    key: string
    dir: string
}

export interface ParamsUserList {
    search?: string
    per_page?: number | string | undefined
    page?: number | string | undefined
    orders?: ParamsOrders[]
    filters?: ParamsFilters[]
    [key: string]: any
}

export interface UserSearchParam {
    search: string
    is_active: string
}
