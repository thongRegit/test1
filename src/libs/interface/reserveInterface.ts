import type { ResponseList, PaginateParams } from './commonInterface'

export interface ReserveSearch {
    search: string
    status: Array<string>
    days: Array<string>
    shop_id: Array<string>
    plan_id: Array<string>
    coach_id: Array<string>
    from: string
    to: string
}

export interface Date {
    day: string
    month: string
    year: string
}
export interface ReserveDetail {}

export interface ReserveRuleForm {
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

export interface ReserveUpdate {
    first_name: string
    last_name: string
    first_name_furigana: string
    last_name_furigana: string
    nickname: string
    birthday: string
    tel: string
    is_active: boolean
}

export interface Reserve {
    id: number
    amount: string
    amount_with_tax: string
    shop_name: string
    plan_name: string
    user_name: string
    coach_name: string
    status: number
    status_name: string
    start_time: string
    end_time: string
    date: string
    created_at?: string
}

export interface ResponseReserveList extends ResponseList {
    data?: Reserve[]
}

export interface PaginateReserveParams extends PaginateParams {
    records?: {
        id: number
        date: string
        shop_name: string
        plan_name: string
        coach_name: string
        user_name: string
        status: string
    }[]
}
