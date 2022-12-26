import axios from '@/config/axios'
import type { UpdateShopPayload, ShopListPayload } from '@/libs/interface/shopInterface'

export const getListShop = (payload: ShopListPayload) => {
    return axios.get('/shops', {
        params: payload,
    })
}

export const updateShop = (id: number, payload: UpdateShopPayload) => {
    return axios.put(`shops/${id}/`, payload)
}

export const getShopDetail = (id: number) => {
    return axios.get(`/shops/${id}`)
}
