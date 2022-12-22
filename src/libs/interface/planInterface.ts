export interface Period {
    id: number
    value: number
}

export interface Payload {
    id: number
}

export interface PlanDiscount {
    frequency?: number
    discount_amount?: number
}
export interface PlanDetail {
    id: number
    name: string
    type: number
    period_value: string
    amount: number
    plan_discounts: Array<PlanDiscount>

    first_experience?: boolean
}
