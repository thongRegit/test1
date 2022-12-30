<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <PlanSearchVue @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue
        :title="'プラン一覧'"
        :type="'table'"
        :padding="20"
        :btnCreate="true"
        @on-create="handleCreate"
    >
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
import { usePlanStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import BoxVue from '@/components/common/BoxVue.vue'
import PlanSearchVue from './PlanSearch.vue'
import { findStatus } from '@/libs/utils/common'
import { ElIcon } from 'element-plus'
import type {
    PlanDetailPayload,
    ResponsePlanList,
} from '@/libs/interface/planInterface'

const { t } = useI18n()
const router = useRouter()

const listQuery = ref({
    page: 1,
    search: '',
    filters: [
        { key: 'is_active', data: 'all' },
        { key: 'type', data: 'all' },
    ],
})
const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as ResponsePlanList)

const loading = ref(true)
const columns = ref([
    {
        prop: 'name',
        label: t('plan.columns.name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'time',
        label: t('plan.columns.time'),
        sortable: false,
        class: '',
    },
    {
        prop: 'basic_charge',
        label: t('plan.columns.basic_charge'),
        sortable: false,
        class: '',
    },
    {
        prop: 'first_experience',
        label: t('plan.columns.first_experience'),
        sortable: false,
        class: '',
    },
    {
        prop: 'status',
        label: t('plan.columns.status'),
        sortable: false,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'created_at', dir: 'descending' })

const formatNumber = (value: any) => {
    let formatter = new Intl.NumberFormat()
    return formatter.format(parseFloat(value))
}

const getListData = async () => {
    let query = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        'filters[0][key]': listQuery.value.filters[0].key,
        'filters[0][data]': listQuery.value.filters[0].data,
        'filters[1][key]': listQuery.value.filters[1].key,
        'filters[1][data]': listQuery.value.filters[1].data,
        page: listQuery.value.page,
        search: listQuery.value.search,
    }

    const planStore = usePlanStore()
    await planStore.listPlan(query)
    data.value.total = planStore.plans.total
    data.value.currentPage = planStore.plans.current_page
    data.value.perPage = planStore.plans.per_page
    data.value.records = planStore.plans.data?.map((e: PlanDetailPayload) => {
        const status: any = findStatus(e.is_active)
        return {
            id: e.id,
            name: `<a class="text-link cursor-pointer">${e.name}</a>`,
            time: e.period.value + '分',
            basic_charge: formatNumber(e.amount),
            first_experience:
                e.type == 1
                    ? t('plan.type_plan.first_experience.can_be')
                    : t('plan.type_plan.first_experience.none'),
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

const handleClickButtonTable = (type: any, row: any) => {
    router.push({
        name: 'plans-detail',
        params: { id: row.id },
        replace: true,
    })
}

const search = (search: any) => {
    loading.value = true
    listQuery.value.page = 1
    listQuery.value.search = search.name
    listQuery.value.filters = [
        { key: 'is_active', data: search.status },
        { key: 'type', data: search.type },
    ]
    getListData()
}

const resetForm = () => {
    listQuery.value.page = 1
    listQuery.value.search = ''
    listQuery.value.filters = [
        { key: 'is_active', data: 'all' },
        { key: 'type', data: 'all' },
    ]
    getListData()
}

const sort = (sortProps: any) => {
    sortProp.key = sortProps.prop
    sortProp.dir = sortProps.order
    getListData()
}

const handleCreate = () => {
    router.push({
        name: 'plans-create',
        replace: true,
    })
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
