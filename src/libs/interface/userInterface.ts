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

export interface UserUpdate {
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    tel: string
    avatar_url: string
    gender: number
    birthday: string
    status: number
    is_active: number
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
    name: string
    is_active: string
}
