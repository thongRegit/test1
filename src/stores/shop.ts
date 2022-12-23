import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import type { Shop, updateShopPayload } from '@/libs/interface/shopInterface'
import axios from '@/config/axios'
export const useShopStore = defineStore('shops', () => {
    const shops = ref([] as any)
    const shop = ref({} as any)
    const shopDetail = ref({} as Shop)
    const search = reactive({
        name: '',
        status: ['all'],
    })

    const updateSearch = async (payload: any) => {
        search.name = payload.name
        search.status = payload.status
    }

    const listShop = async (payload: any) => {
        try {
            const data = await axios.get('/shops', {
                params: payload,
            })
            shops.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createShop = async (payload: any) => {
        try {
            const data = await axios.post('/shops', payload)
            shop.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateShop = async (payload: updateShopPayload, id: number) => {
        try {
            const data = await axios.put(`shops/${id}/`, payload)
            shop.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const deleteShop = async (payload: any) => {
        try {
            return await axios.delete(`/shops/${payload.id}`).then((res) => res)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const getdetailShop = async (payload: any) => {
        try {
            const data = await axios.get(`/shops/${payload.id}`)
            shopDetail.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        shops,
        shop,
        search,
        shopDetail,
        listShop,
        getdetailShop,
        createShop,
        updateShop,
        deleteShop,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot))
}
