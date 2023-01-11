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
            @cellClick="cellClick"
        ></table-data>
    </section>
    <modal-box
        title="エナジスト詳細"
        :open="statusModal.isUpdateOpen"
        width="50%"
        @close="closeUpdateModal"
        @submit="updateStatus"
    >
        <template v-slot:body>
            <div class="pattern-form">
                <el-form ref="ruleFormRef" status-icon class="update-form">
                    <el-row class="full-width">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('coach.columns.sessions.date') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.coachSessionData.date }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('coach.columns.sessions.shop_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.coachSessionData.shop_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('coach.columns.sessions.plan_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.coachSessionData.plan_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('coach.columns.sessions.full_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.coachSessionData.user_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4 mb-4">
                        <el-col :span="6" class="pr-10">
                            <p class="label">
                                {{ t('coach.columns.sessions.order_status') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="statusModel">
                                <el-option
                                    v-for="item in ORDER_STATUS"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </template>
    </modal-box>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useCoachStore, useReserveStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import type {
    CoachSession,
    PaginateCoachSessionParams,
} from '@/libs/interface/coachInterface'
import type { ParamsList } from '@/libs/interface/commonInterface'
import { FORMAT_DAY_WIDTH_TIME, STATUS_USERS } from '@/libs/constants/constants'
import { ORDER_STATUS } from '@/libs/constants/orders'

const { t } = useI18n()
const router = useRouter()
const statusModel = ref(0)

const statusModal = reactive({
    isUpdateOpen: false,
    coachSessionData: {
        date: '',
        full_name: '',
        user_name: '',
        id: '',
        order_status: '',
        plan_name: '',
        shop_name: '',
        status_id: '',
        order_id: '',
    },
    refresh: 1,
})

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
        statusModal.refresh += 1
        statusModal.coachSessionData = row
        statusModal.isUpdateOpen = true
        statusModel.value = row.status_id
    }
}

const closeUpdateModal = () => {
    statusModal.isUpdateOpen = false
}

const updateStatus = async () => {
    const payload = {
        status: statusModel.value,
    }
    const sessionStore = useReserveStore()
    await sessionStore.updateReserve(
        payload,
        statusModal.coachSessionData.order_id
    )
    await getListData()
    statusModal.isUpdateOpen = false
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
                user_id: e.user_id,
                date: FORMAT_DAY_WIDTH_TIME(e.date, e.start_time, e.end_time),
                shop_name: e.shop_name,
                plan_name: e.plan_name,
                full_name: e.user_id ? `<span class="link">${e.full_name}</span>` : e.full_name,
                user_name: e.full_name,
                order_status: STATUS_USERS[e.order_status],
                status_id: e.order_status,
                order_id: e.order_id,
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

const cellClick = (row: any, column: any) => {
    if (column.property === 'full_name') {
        router.push({
            name: 'users-detail',
            params: { id: row.user_id },
            replace: true,
        })
    }
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style lang="scss">
.link {
    color: #49a2ff;
    cursor: pointer;
}
</style>
