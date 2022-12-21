export interface Shop {
    id: number
    name: string
    station_amount: number
    day: string
    status?: string
    created_at?: string
}

export interface ShopSearch {
    name: string
    status: []
}
