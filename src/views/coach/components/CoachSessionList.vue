<template>
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

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useCoachStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import type {
    CoachSession,
    PaginateCoachSessionParams,
} from '@/libs/interface/coachInterface'
import type { ParamsList } from '@/libs/interface/commonInterface'
import { FORMAT_DAY_WIDTH_TIME } from '@/libs/constants/constants'

const { t } = useI18n()
const router = useRouter()

const listQuery = ref({
    page: 1,
    search: '',
    filters: [{ key: 'is_active', data: 'all' }],
})
const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as PaginateCoachSessionParams)

const loading = ref(true)
const columns = ref([
    {
        prop: 'date',
        label: t('coach.columns.sessions.date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'shop_name',
        label: t('coach.columns.sessions.shop_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'plan_name',
        label: t('coach.columns.sessions.plan_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'full_name',
        label: t('coach.columns.sessions.full_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'order_status',
        label: t('coach.columns.sessions.order_status'),
        sortable: false,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'users-update', params: { id: row.id } })
    }
}

const getListData = async () => {
    let query: ParamsList = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        'filters[0][key]': listQuery.value.filters[0].key,
        'filters[0][data]': listQuery.value.filters[0].data,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 20,
    }

    const id = router.currentRoute.value.params.id

    const userStore = useCoachStore()
    await userStore.listCoachSession(query, id)
    data.value.total = userStore.session_coaches.total
    data.value.currentPage = userStore.session_coaches.current_page
    data.value.perPage = userStore.session_coaches.per_page
    data.value.records = userStore.session_coaches.data?.map(
        (e: CoachSession) => {
            return {
                id: e.id,
                date: FORMAT_DAY_WIDTH_TIME(e.date, e.start_time, e.end_time),
                shop_name: e.shop_name,
                plan_name: e.plan_type,
                full_name: e.full_name,
                order_status: e.order_status,
            }
        }
    )
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

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
