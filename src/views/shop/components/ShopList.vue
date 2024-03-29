<template>
    <BoxVue :title="t('homepage.shops')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Discount />
            </el-icon>
        </template>
        <template v-slot:body>
            <ShopSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue
        :title="t('homepage.list.shops')"
        :type="'table'"
        :padding="20"
        :show-header="false"
    >
        <template v-slot:body>
            <section class="box-list">
                <table-data
                    :data="data"
                    :loading="loading"
                    :columns="columns"
                    :showIndex="false"
                    :showCheckbox="false"
                    @change-page="handleChangePage"
                    @sort="sort"
                    :buttons="buttons"
                    :hasCreate="false"
                    @click-button="handleClickButtonTable"
                ></table-data>
            </section>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useShopStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import BoxVue from '@/components/common/BoxVue.vue'
import ShopSearchVue from './ShopSearch.vue'
import type {
    ShopSearch,
    ShopListPayload,
} from '@/libs/interface/shopInterface'
import { findStatus } from '@/libs/utils/common'
import { dayList } from '@/libs/constants/constants'

const { t } = useI18n()
const router = useRouter()

const listQuery = ref({
    page: 1,
    search: '',
    filters: [{ key: 'status', data: 'all' }],
})
const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
})

const loading = ref(true)
const columns = ref([
    {
        prop: 'name',
        label: t('shop.columns.name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'station_amount',
        label: t('shop.columns.station_amount'),
        sortable: true,
        class: '',
    },
    { prop: 'day', label: t('shop.columns.day'), sortable: false, class: '' },
    {
        prop: 'status',
        label: t('shop.columns.status'),
        sortable: true,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'shops-detail', params: { id: row.id } })
    }
}

const getListData = async () => {
    let query: ShopListPayload = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        'filters[0][key]': listQuery.value.filters[0].key,
        'filters[0][data]': listQuery.value.filters[0].data,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 20,
    }

    const shopStore = useShopStore()
    await shopStore.listShop(query)
    data.value.total = shopStore.shops.total
    data.value.currentPage = shopStore.shops.current_page
    data.value.perPage = shopStore.shops.per_page
    data.value.records = shopStore.shops.data.map((e: any) => {
        const status: any = findStatus(e.status)
        const day_arr = [] as any
        e.shop_holidays.map((item: any) => {
            day_arr.push(dayList[item.day])
        })
        return {
            id: e.id,
            name: e.name,
            station_amount: e.station_amount,
            day: day_arr.join(','),
            status: status.display,
        }
    })
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const search = (search: ShopSearch) => {
    loading.value = true
    listQuery.value.search = search.name
    listQuery.value.filters = [{ key: 'status', data: search.status }]
    listQuery.value.page = 1
    getListData()
}

const sort = (sortProps: any) => {
    sortProp.key = sortProps.prop
    sortProp.dir = sortProps.order
    listQuery.value.page = 1
    getListData()
}

const resetForm = () => {
    listQuery.value.page = 1
    listQuery.value.search = ''
    listQuery.value.filters = [{ key: 'status', data: 'all' }]
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
