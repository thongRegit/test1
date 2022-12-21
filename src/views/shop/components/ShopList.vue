<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <ShopSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <section class="box-list">
                <table-data
                    :data="data"
                    :loading="loading"
                    :columns="columns"
                    :showIndex="false"
                    :showCheckbox="true"
                    @cell-click="cellClick"
                    @change-page="handleChangePage"
                    @sort="sort"
                    :buttons="buttons"
                    :hasCreate="false"
                    @click-button="handleClickButtonTable"
                    @click-checkbox="handleCheckbox"
                ></table-data>
            </section>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useShopStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import BoxVue from '@/components/common/BoxVue.vue'
import ShopSearchVue from './ShopSearch.vue'
import type { ShopSearch } from '@/libs/interface/shopInterface'

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
        label: t('shops.columns.name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'station_amount',
        label: t('shops.columns.station_amount'),
        sortable: false,
        class: '',
    },
    { prop: 'day', label: t('shops.columns.day'), sortable: false, class: '' },
    {
        prop: 'status',
        label: t('shops.columns.status'),
        sortable: false,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', icon: 'Monitor', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push(`/shops/${row.id}/update`)
    }
}

const handleCheckbox = () => {}

const getListData = async () => {
    let query = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 10,
        filters: '',
    }
    query.filters = JSON.stringify(listQuery.value.filters)

    const shopStore = useShopStore()
    await shopStore.listShop(query)
    data.value.total = shopStore.shops.total
    data.value.currentPage = shopStore.shops.current_page
    data.value.perPage = shopStore.shops.per_page
    data.value.records = shopStore.shops.data.map((e: any) => {
        return {
            id: e.id,
            name: `<a class="text-link">${e.name}</a>`,
            station_amount: e.station_amount,
            day: e.day,
            status: e.status,
        }
    })
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const cellClick = (row: any, column: any) => {
    if (column.property === 'name') {
        router.push({
            name: 'survey-detail',
            params: { id: row.id },
            replace: true,
        })
    }
}

const search = (search: ShopSearch) => {
    loading.value = true
    listQuery.value.search = search.name
    listQuery.value.filters = [{ key: 'status', data: search.status }]
    console.log('search :>> ', search)
    listQuery.value.page = 1
    getListData()
}

const sort = (sortProps: any) => {
    sortProp.key = sortProps.prop
    sortProp.dir = sortProps.order
    // listQuery.value.page = 1
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

watch(data, async () => {
    await getListData()
})
</script>

<style scoped lang="scss"></style>
