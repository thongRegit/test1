<template>
    <BoxVue :title="t('coach.list_title')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <CoachSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue :title="t('coach.list_title')" :type="'table'" :padding="20">
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
import { useCoachStore } from '@/stores'
import BoxVue from '@/components/common/BoxVue.vue'
import CoachSearchVue from './CoachSearchVue.vue'
import type { CoachSearch } from '@/libs/interface/coachInterface'
import { useI18n } from 'vue3-i18n'
import { findStatus } from '@/libs/utils/common'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)

const columns = ref([
    {
        prop: 'full_name',
        label: t('coach.columns.full_name'),
        sortable: true,
        class: '',
    },
    {
        prop: 'nickname',
        label: t('coach.columns.nickname'),
        sortable: true,
        class: '',
    },
    {
        prop: 'tel',
        label: t('coach.columns.tel'),
        sortable: true,
        class: '',
    },
    {
        prop: 'created_at',
        label: t('coach.columns.created_at'),
        sortable: true,
        class: '',
    },
    {
        prop: 'status',
        label: t('coach.columns.status'),
        sortable: true,
        class: '',
    },
])

const listQuery = ref({
    page: 1,
    search: '',
    filters: [{ key: 'status', data: 'all' }],
})

const sortProp = reactive({ key: 'id', dir: 'descending' })

const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'coaches-detail', params: { id: row.id } })
    }
}

const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 20,
    records: [],
    total: 0,
} as any)

const search = (search: CoachSearch) => {
    loading.value = true
    listQuery.value.search = search.search
    listQuery.value.filters = [{ key: 'status', data: search.status }]
    listQuery.value.page = 1
    getListData()
}

const getListData = async () => {
    let query: any = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 20,
        filters: '',
    }
    query.filters = JSON.stringify(listQuery.value.filters)

    const coachStore = useCoachStore()
    await coachStore.listCoach(query)
    data.value.total = coachStore.coaches.total
    data.value.currentPage = coachStore.coaches.current_page
    data.value.perPage = coachStore.coaches.per_page
    data.value.records = coachStore.coaches.data.map((e: any) => {
        const status: any = findStatus(e.is_active)
        return {
            id: e.id,
            full_name: e.full_name,
            nickname: e.nickname,
            tel: e.tel,
            created_at: e.created_at,
            status: status.display,
            edit: `編集`,
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
    listQuery.value.filters = [{ key: 'status', data: 'all' }]
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style></style>
