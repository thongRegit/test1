<template>
    <BoxVue :title="t('homepage.reserves')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Reading />
            </el-icon>
        </template>
        <template v-slot:body>
            <ReserveSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue
        :title="t('homepage.list.reserves')"
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
                    :buttons="buttons"
                    @click-button="handleClickButtonTable"
                    @change-page="handleChangePage"
                    @sort="sort"
                ></table-data>
            </section>
        </template>
    </BoxVue>
    <UpdateStatusModal
        :key="statusModal.refresh"
        :dialogVisible="statusModal.isUpdateOpen"
        :reserveData="statusModal.reserveData"
        :status="statusModal.reserveData.status_id"
        @close="closeUpdateModal"
        @updated="updatedStatus"
    />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useReserveStore } from '@/stores'
import type {
    ReserveSearch,
    Reserve,
    PaginateReserveParams,
} from '@/libs/interface/reserveInterface'
import type { ParamsList } from '@/libs/interface/commonInterface'
import BoxVue from '@/components/common/BoxVue.vue'
import ReserveSearchVue from './ReserveSearch.vue'
import { FORMAT_DAY_WIDTH_TIME } from '@/libs/constants/constants'
import UpdateStatusModal from './UpdateStatusModal.vue'

const { t } = useI18n()

const loading = ref(true)

const statusModal = reactive({
    isUpdateOpen: false,
    reserveData: {
        amount: '',
        amount_with_tax: '',
        coach_name: '',
        date: '',
        end_time: '',
        id: '',
        plan_name: '',
        reserve_date: '',
        shop_name: '',
        start_time: '',
        status: '',
        status_id: '',
        user_name: '',
    },
    refresh: 1,
} as any)

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
        prop: 'user_name',
        label: t('reserve.columns.user_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'coach_name',
        label: t('reserve.columns.coach_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'status',
        label: t('reserve.columns.status'),
        sortable: true,
        class: '',
    },
    {
        prop: 'amount',
        label: t('reserve.columns.amount'),
        sortable: false,
        class: '',
    },
])

const listQuery = ref({
    page: 1,
    search: '',
    filters: [
        { key: 'coach_id', data: [] },
        { key: 'plan_id', data: [] },
        { key: 'days', data: [] },
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
        statusModal.refresh += 1
        statusModal.reserveData = row
        statusModal.isUpdateOpen = true
    }
}

const closeUpdateModal = () => {
    statusModal.isUpdateOpen = false
}

const updatedStatus = () => {
    statusModal.isUpdateOpen = false
    getListData()
}

const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as PaginateReserveParams)

const search = (search: ReserveSearch) => {
    loading.value = true
    listQuery.value.search = search.search
    listQuery.value.filters = [
        { key: 'coach_id', data: JSON.stringify(search.coach_id) },
        { key: 'plan_id', data: JSON.stringify(search.plan_id) },
        { key: 'days', data: JSON.stringify(search.days) },
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
            amount: e.amount,
            amount_with_tax: e.amount_with_tax,
            date: FORMAT_DAY_WIDTH_TIME(e.date, e.start_time, e.end_time),
            reserve_date: e.date,
            start_time: e.start_time,
            end_time: e.end_time,
            shop_name: e.shop_name,
            plan_name: e.plan_name,
            coach_name: e.coach_name,
            user_name: e.user_name,
            status: e.status_name,
            status_id: e.status,
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
    sortProp.key = sortProps.prop
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
        { key: 'days', data: [] },
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
