<template>
    <BoxVue :title="t('reserve.list_title')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <ReserveSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue :title="t('reserve.list_title')" :type="'table'" :padding="20">
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
                    :showCheckbox="false"
                    :buttons="buttons"
                    @click-button="handleClickButtonTable"
                    @change-page="handleChangePage"
                    @sort="sort"
                ></table-data>
            </section>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { useReserveStore } from '@/stores'
import type {
    ReserveSearch,
    Reserve,
    PaginateReserveParams,
} from '@/libs/interface/reserveInterface'
import type { ParamsList } from '@/libs/interface/commonInterface'
import BoxVue from '@/components/common/BoxVue.vue'
import ReserveSearchVue from './ReserveSearch.vue'

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)

const columns = ref([
    {
        prop: 'date',
        label: t('reserve.columns.date'),
        sortable: true,
        class: '',
    },
    {
        prop: 'shop_name',
        label: t('reserve.columns.shop_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'plan_name',
        label: t('reserve.columns.plan_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'full_name',
        label: t('reserve.columns.full_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'status',
        label: t('reserve.columns.status'),
        sortable: true,
        class: '',
    },
])

const listQuery = ref({
    page: 1,
    search: '',
    filters: [
        { key: 'coach_id', data: [] },
        { key: 'plan_id', data: [] },
        { key: 'day', data: [] },
        { key: 'shop_id', data: [] },
        { key: 'status', data: [] },
        { key: 'created_at', data: [] },
    ],
} as any)

const sortProp = reactive({ key: 'id', dir: 'descending' })

const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'reserves-detail', params: { id: row.id } })
    }
}

const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as PaginateReserveParams)

const search = (search: ReserveSearch) => {
    console.log('search >> ', search)
    loading.value = true
    listQuery.value.search = search.search
    listQuery.value.filters = [
        { key: 'coach_id', data: JSON.stringify(search.coach_id) },
        { key: 'plan_id', data: JSON.stringify(search.plan_id) },
        { key: 'day', data: JSON.stringify(search.day) },
        { key: 'shop_id', data: JSON.stringify(search.shop_id) },
        { key: 'status', data: JSON.stringify(search.status) },
        {
            key: 'created_at',
            data: JSON.stringify({
                from: search.from,
                to: search.to,
            }),
        },
    ]
    listQuery.value.page = 1
    getListData()
}

const getListData = async () => {
    let query: ParamsList = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        'filters[0][key]': listQuery.value.filters[0].key,
        'filters[0][data]': listQuery.value.filters[0].data,
        'filters[1][key]': listQuery.value.filters[1].key,
        'filters[1][data]': listQuery.value.filters[1].data,
        'filters[2][key]': listQuery.value.filters[2].key,
        'filters[2][data]': listQuery.value.filters[2].data,
        'filters[3][key]': listQuery.value.filters[3].key,
        'filters[3][data]': listQuery.value.filters[3].data,
        'filters[4][key]': listQuery.value.filters[4].key,
        'filters[4][data]': listQuery.value.filters[4].data,
        'filters[5][key]': listQuery.value.filters[5].key,
        'filters[5][data]': listQuery.value.filters[5].data,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 20,
    }

    const reserveStore = useReserveStore()
    await reserveStore.listReserve(query)
    data.value.total = reserveStore.reserves.total
    data.value.currentPage = reserveStore.reserves.current_page
    data.value.perPage = reserveStore.reserves.per_page
    data.value.records = reserveStore.reserves.data?.map((e: Reserve) => {
        return {
            id: e.id,
            date: e.date,
            shop_name: e.shop_name,
            plan_name: e.plan_name,
            full_name: e.user_name,
            status: e.status_name,
        }
    })

    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const sort = (sortProps: any) => {
    sortProp.key =
        sortProps.prop === 'user_name' ? 'first_name' : sortProps.prop
    sortProp.dir = sortProps.order
    listQuery.value.page = 1
    getListData()
}

const resetForm = () => {
    listQuery.value.page = 1
    listQuery.value.search = ''
    listQuery.value.filters = [
        { key: 'coach_id', data: [] },
        { key: 'plan_id', data: [] },
        { key: 'date', data: [] },
        { key: 'shop_id', data: [] },
        { key: 'status', data: [] },
        { key: 'created_at', data: [] },
    ]
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style></style>