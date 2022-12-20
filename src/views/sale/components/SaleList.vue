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

const handleCheckbox = () => {}

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

const cellClick = (row: any, column: any) => {
    if (column.property === 'name') {
        router.push({
            name: 'survey-detail',
            params: { id: row.id },
            replace: true,
        })
    }
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

watch(data, async () => {
    await getListData()
})
</script>
