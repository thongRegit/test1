import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import axios from '@/config/axios'

export const useShopStore = defineStore('question_type', () => {
    const shops = ref([] as any)
    const shop = ref({} as any)
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
            console.log('data :>> ', data)
            shops.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const createShop = async (payload: any) => {
        try {
            // const data = await axios.post('/shop', { name: 'Axios POST Request Example' })
            const data = await axios.post('/shops', payload)
            shop.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateShop = async (payload: any, id: any) => {
        try {
            const data = await axios.put(`shops/${id}/update`, payload)
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

    const detailShop = async (payload: any) => {
        try {
            return await axios.get(`/shops/${payload.id}`).then((res) => res)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return {
        shops,
        shop,
        search,
        listShop,
        detailShop,
        createShop,
        updateShop,
        deleteShop,
        updateSearch,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot))
}
