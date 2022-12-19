<template>
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
        >
        </table-data>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePlanStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()

const listQuery = ref({
    page: 1,
    text: '',
    filters: [
        { key: 'id', data: '' },
        { key: 'name', data: '' },
    ],
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
    { prop: 'id', label: 'お問い合わせコード', sortable: 'custom', class: '' },
    { prop: 'name', label: '日付', sortable: 'custom', class: '' },
    { prop: 'type', label: '日付', sortable: 'custom', class: '' },
    { prop: 'amount', label: '日付', sortable: 'custom', class: '' },
])
const buttons = ref([
    { id: '1', label: '', icon: 'Monitor', class: 'btn-action btn-update' },
    { id: '2', label: '', icon: 'CloseBold', class: 'btn-action btn-delete' },
])
const sortProp = reactive({ key: 'created_at', dir: 'desc' })
const dataSearch = reactive({
    page: 1,
    text: '',
    filters: [
        { key: 'id', data: '' },
        { key: 'name', data: '' },
    ],
} as {
    page: Number
    text: String
    filters: Array<any> | String
})

const handleClickButtonTable = (type: any, row: any) => {
    const planStore = usePlanStore()
    if (type === 'danger') {
        ElMessageBox.confirm(
            'proxy will permanently delete the file. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                planStore.deletePlan({ id: row.id })
                getListData()
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Delete canceled',
                })
            })
    }
    if (type === 'info') {
        router.push(`/plans/${row.id}/update`)
    }
}

const handleCheckbox = (val: any) => {}

const getListData = async () => {
    let query = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        page: listQuery.value.page,
        text: listQuery.value.text,
        per_page: 10,
        filters: '',
    }
    query.filters = JSON.stringify(listQuery.value.filters)

    const planStore = usePlanStore()
    await planStore.listPlan(query)
    data.value.total = planStore.plans.total
    data.value.currentPage = planStore.plans.current_page
    data.value.perPage = planStore.plans.per_page
    data.value.records = planStore.plans.data.map((e: any) => {
        return {
            created_at: e.created_at,
            id: e.id,
            name: `<a class="text-link">${e.name}</a>`,
            type: e.type,
            amount: e.amount,
        }
    })
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const cellClick = (row: any, column: any, cell: any) => {
    if (column.property === 'name') {
        router.push({
            name: 'survey-detail',
            params: { id: row.id },
            replace: true,
        })
    }
}

const search = () => {
    loading.value = true
    Object.assign(
        listQuery,
        Object.fromEntries(Object.entries(dataSearch).map(([k, v]) => [k, v]))
    )
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
    // this.$refs["dataSearch"].resetFields();
    dataSearch.page = 1
    dataSearch.text = ''
    dataSearch.filters = [
        { key: 'contact_datetime', data: { year: '', month: '', day: '' } },
        { key: 'full_name_or_id', data: '' },
    ]
}

const changeDate = (data: any) => {
    dataSearch.filters[0].data = data.value
}

onMounted(async () => {
    await nextTick()
    await getListData()
})

watch(data, async () => {
    await getListData()
})
</script>

<style scoped lang="scss">
.survey-list {
    .survey-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    &:deep(.el-table__cell) {
        &:nth-child(4) {
            .cell {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
        .text-link {
            cursor: pointer;
            color: cornflowerblue;
        }
    }
}
</style>
