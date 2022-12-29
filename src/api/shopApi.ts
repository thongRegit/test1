import request from '@/config/axios'
import type {
    UpdateShopPayload,
    ShopListPayload,
} from '@/libs/interface/shopInterface'

export const getListShop = (payload: ShopListPayload) => {
    return request.get('/shops', {
        params: payload,
    })
}

export const updateShop = (id: number, payload: UpdateShopPayload) => {
    return request.put(`shops/${id}/`, payload)
}

export const getShopDetail = (id: number | string | string[]) => {
    return request.get(`/shops/${id}`)
}
