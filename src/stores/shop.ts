import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type {
    Shop,
    UpdateShopPayload,
    ShopListPayload,
    ShopDetailPayload,
} from '@/libs/interface/shopInterface'
import { LoadingVue } from '@/components/common/loading'
import { useAlertStore } from './alert'
import * as shopApi from '@/api/shopApi'
import { makeNotification } from '@/libs/constants/constants'
import i18n from '@/lang/index'

export const useShopStore = defineStore('shops', () => {
    const shops = ref([] as any)
    const shop = ref({} as any)
    const shopDetail = ref({} as Shop)

    const listShop = async (payload: ShopListPayload) => {
        try {
            const data = await shopApi.getListShop(payload)
            shops.value = data
        } catch (error) {
            return error
        }
    }

    const updateShop = async (payload: UpdateShopPayload, id: number) => {
        const alertStore = useAlertStore()
        const loading = LoadingVue()
        try {
            await shopApi.updateShop(id, payload)
            alertStore.createAlert({
                title: i18n.t('message.update_success'),
                type: 'success',
            })
            loading.close()
            return { success: true }
        } catch (error: any) {
            loading.close()
            makeNotification(
                'error',
                i18n.t('message.error_title'),
                error.message
            )
            return error
        }
    }

    const getDetailShop = async (payLoad: ShopDetailPayload) => {
        try {
            const data: any = await shopApi.getShopDetail(payLoad.id)
            shopDetail.value = data
        } catch (error: any) {
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
