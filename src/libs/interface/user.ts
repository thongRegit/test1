export interface User {
    id: number
    name: string
    generation: number
    line_user_id: string
    avatar_image_url?: string
    children_user_id?: number
    created_at?: number
}
