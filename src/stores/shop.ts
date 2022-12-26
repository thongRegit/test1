import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Shop, UpdateShopPayload, ShopListPayload, ShopDetailPayload } from '@/libs/interface/shopInterface'
import { LoadingVue } from '@/components/common/loading'
import { useAlertStore } from './alert'
import * as shopApi from '@/api/shopApi'
import { ElNotification } from 'element-plus'

export const useShopStore = defineStore('shops', () => {
    const shops = ref([] as any)
    const shop = ref({} as any)
    const shopDetail = ref({} as Shop)

    const listShop = async (payload: ShopListPayload) => {
        try {
            const data = await shopApi.getListShop(payload)
            shops.value = data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const updateShop = async (payload: UpdateShopPayload, id: number) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        try {
            const data = await shopApi.updateShop(id, payload)
            shop.value = data
            alertStore.createAlert({
                title: `Update successfully!`,
                type: 'success',
            })
            loading.close()
        } catch (error) {
            loading.close()
            console.log(error)
            return error
        }
    }

    const getDetailShop = async (payLoad: ShopDetailPayload) => {
        try {
            const data = await shopApi.getShopDetail(payLoad.id)
            shopDetail.value = data
        } catch (error) {
            ElNotification({
                title: 'Error',
                message: error.message,
                type: 'error',
            })
            return error
        }
    }

    return {
        shops,
        shop,
        shopDetail,
        listShop,
        getDetailShop,
        updateShop,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot))
}
