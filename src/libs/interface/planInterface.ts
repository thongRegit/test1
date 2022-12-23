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
export interface PlanDetailPayload {
    id: number
    name: string
    type: number
    period_id: number
    amount: number
    plan_discounts: Array<PlanDiscount>
    is_active: boolean
}
