import type { ResponseList, PaginateParams } from './commonInterface'

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
    invitation_code: string
    people_invited: string
    age?: number
}

export interface CoachRuleForm {
    full_name: string
    first_name: string
    last_name: string
    nickname?: string
    first_name_furigana: string
    last_name_furigana: string
    birthday: string | null
    birthdays: Date
    tel: string
    invitation_code: string
    people_invited: string
    is_active: boolean | number
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

export interface Coach {
    id: number
    full_name: string
    nickname: string
    tel: string
    is_active: number
    is_active_name: string
    created_at?: string
}

export interface CoachInvited {
    id: number
    full_name: string
    created_at: string
}

export interface CoachSession {
    id: number
    date: string
    shop_name: string
    full_name: string
    plan_name: string
    order_status: string
    start_time: string
    end_time: string
    order_id: number
}

export interface ResponseCoachList extends ResponseList {
    data?: Coach[]
}

export interface ResponseCoachInvitedList extends ResponseList {
    data?: CoachInvited[]
}

export interface ResponseCoachSessionList extends ResponseList {
    data?: CoachSession[] | undefined
}

export interface PaginateCoachParams extends PaginateParams {
    records?: {
        id: number
        full_name?: string
        nickname: string
        tel: string
        created_at?: string
        is_active: string
    }[]
}

export interface PaginateCoachInvitedParams extends PaginateParams {
    records?: CoachInvited[] | undefined
}

export interface PaginateCoachSessionParams extends PaginateParams {
    records?: {
        id: number
        date: string
        shop_name: string
        plan_name: string
        full_name?: string
        order_status: string
    }[]
}
