export interface Shop {
    id: number
    name: string
    station_amount: number
    day: string
    status?: string
    created_at?: string
    business_hours: Array<BussinessHour>
}

export interface BussinessHour {
    id: string
    shop_id: number
    day: number
    created_at: string
    updated_at: string
    business_hour_details: Array<businessHourDetail>
}

export interface businessHourDetail {
    id: number
    period_id: string
    start_time: string
    end_time: string
    created_at: string
    updated_at: string
}

export interface ShopSearch {
    name: string
    status: string
}
