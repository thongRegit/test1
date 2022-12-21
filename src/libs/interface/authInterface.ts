export interface LoginDto {
    mail_address: string
    password: string
}
export interface SignupTermDto {
    mail_address: string
    first_name: string
    last_name: string
}
export interface SignupDto {
    [k: string]: any
}
export interface UserDocument {
    id?: string
    shop_id?: string
    first_name?: string
    last_name?: string
    mail_address?: string
    nickname?: string
    avatar_image_url?: string
    birthday?: string
    gender?: string
    zip_code?: string
    prefecture_id?: string
    city?: string
    address_number?: string
    house?: string
    tel?: string
    point?: number
    used_point?: number
    is_first_login?: string
    last_login_datetime?: string
    shop_name?: string
    stripe_id?: string
    pm_last_four?: string
    has_reply_contact?: boolean
    [k: string]: any
}
