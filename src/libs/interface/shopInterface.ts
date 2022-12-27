import type { Period } from '@/libs/interface/patternInterface'
export interface Shop {
    id: number
    name: string | null
    station_amount: number | null
    status: number
    created_at: string
    business_hours: Array<BusinessHour>
}

export interface BusinessHour {
    id: string
    name?: string
    shop_id: number | undefined
    details?: Array<BusinessHourDetail>
    day: number
    created_at?: string
    updated_at?: string
    business_hour_details?: Array<BusinessHourDetail>
}

export interface BusinessHourDetail {
    id: number | undefined
    period_id?: number | undefined
    business_hour_id?: number | undefined
    start_time?: string | undefined
    end_time?: string | undefined
    created_at?: string | undefined
    updated_at?: string | undefined
    period: Period | undefined
}

export interface ShopSearch {
    name: string
    status: string
}

export interface IndividuaSetting {
    id: number
    dayName: string | number
    isShowDetail: boolean
    // patternList?: Array<Pattern> | []
    currentSessionsList: Array<BusinessHourDetail> | []
    patternIndex?: number
}

export interface UpdateShopPayload {
    id: number
    name: string | null
    station_amount: number | null
    status: number
    business_hours: Array<BusinessHourForAPI>
}

export interface BusinessHourForAPI {
    day: number
    period_id?: number
    start_time?: string
    end_time?: string
}

export interface ShopListPayload {
    ['orders[0][key]']: string
    ['orders[0][dir]']: string
    page: number
    search: string
    per_page: 10
    filters: string
}

export interface ShopDetailPayload {
    id: number | string | string[]
}
