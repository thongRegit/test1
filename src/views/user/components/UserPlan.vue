<template>
    <el-row class="mb-4 mt-2">
        <el-col class="text-right">
            <el-button type="primary" @click="openModal">
                {{ t('user.plan_change') }}
            </el-button>
        </el-col>
    </el-row>
    <section class="box-list">
        <table-data
            :data="data"
            :loading="loading"
            :columns="columns"
            :showIndex="false"
            :showCheckbox="false"
            @change-page="handleChangePage"
            :buttons="buttons"
            @click-button="handleClickButtonTable"
        ></table-data>
    </section>
    <el-dialog
        title="プラン変更"
        v-model="isOpenModal"
        width="50%"
    >
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            class="update-form"
            :rules="rules"
        >
            <el-row class="full-width">
                <el-col :span="24">
                    <p class="label">{{ t('user.plan_type') }}</p>
                    <el-form-item prop="type">
                        <el-select
                            v-model="ruleForm.type"
                            placeholder=""
                            class=""
                            :fit-input-width="true"
                            :filterable="true"
                        >
                            <el-option
                                v-for="item in USER_PLAN_TYPES"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4 mb-4">
                <el-col :span="12">
                    <p class="label">{{ t('user.start_date') }}</p>
                    <el-form-item prop="start_date">
                        <el-date-picker
                            v-model="ruleForm.start_date"
                            type="date"
                            :size="'default'"
                            :clearable="false"
                            :disabled-date="disableStartDate"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isOpenModal = false">{{ t('btn_cancel') }}</el-button>
                <el-button type="primary" @click="updatePlan(ruleFormRef)">
                    {{ t('btn_update') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog
        title="プラン削除"
        v-model="isOpenDeleteModal"
        width="50%"
    >
        <div class="ml-5">
            <el-row class="full-width">
                <el-col :span="6">
                    <p class="label">{{ t('user.columns.user_plans.plan_name') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ planDetail.plan_name }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('user.columns.user_plans.start_date') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ planDetail.start_date }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('user.columns.user_plans.end_date') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ planDetail.end_date }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('user.columns.user_plans.created_date') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ planDetail.created_date }}</p>
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isOpenDeleteModal = false">{{ t('btn_cancel') }}</el-button>
                <el-button type="danger" @click="deletePlan">
                    {{ t('btn_delete') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { USER_PLAN_TYPES } from '@/libs/constants/users'
import type { FormInstance, FormRules } from 'element-plus'
import dayjs from 'dayjs'

const { t } = useI18n()
const router = useRouter()

const isOpenModal = ref(false)
const isOpenDeleteModal = ref(false)

const listQuery = ref({
    page: 1,
})

const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as any)

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    type: null,
    start_date: null,
    default_date: dayjs().format('YYYY-MM-DD'),
})

const planDetail = reactive({
    id: '',
    plan_name: '',
    start_date: null,
    end_date: null,
    created_date: null,
})

const rules = reactive<FormRules>({
    type: [
        {
            required: true,
            message: t('validation.required', [t('user.plan_type')]),
            trigger: 'blur',
        },
    ],
    start_date: [
        {
            required: true,
            message: t('validation.required', [t('user.start_date')]),
            trigger: 'blur',
        },
    ],
})

const buttons = ref([
    { id: '1', label: '削除', class: 'btn-action btn-delete' },
])


const loading = ref(true)
const columns = ref([
    {
        prop: 'plan_name',
        label: t('user.columns.user_plans.plan_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'start_date',
        label: t('user.columns.user_plans.start_date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'end_date',
        label: t('user.columns.user_plans.end_date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'created_date',
        label: t('user.columns.user_plans.created_date'),
        sortable: false,
        class: '',
    },
])

const userStore = useUserStore()

const getListData = async () => {
    let query: any = {
        page: listQuery.value.page,
        per_page: 20,
    }
    const id = router.currentRoute.value.params.id

    await userStore.listUserPlan(query, id)
    data.value.total = userStore.user_plans.total
    data.value.currentPage = userStore.user_plans.current_page
    data.value.perPage = userStore.user_plans.per_page

    data.value.records = []
    const datas = userStore.user_plans.data
    ruleForm.default_date = dayjs().format('YYYY-MM-DD')
    for (let i = 0; i < datas.length; i++) {
        let minDate = dayjs(datas[i].start_date).format('YYYY-MM-DD')
        if (minDate > ruleForm.default_date) {
            ruleForm.default_date = minDate
        }
        let record = {
            id: datas[i].id,
            plan_name: datas[i].name,
            start_date: datas[i].start_date,
            end_date: datas[i+1]?.start_date,
            created_date: datas[i].created_at,
        }
        data.value.records.push(record)
    }
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const openModal = () => {
    ruleForm.type = null,
    ruleForm.start_date = null
    isOpenModal.value = true
}

const disableStartDate = (date: any) => {
    date = dayjs(date).format('YYYY-MM-DD')
    if (ruleForm.default_date) {
        return ruleForm.default_date > date
    }

    return false
}

const updatePlan = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            let query: any = {
                type: ruleForm.type,
                start_date: ruleForm.start_date ? dayjs(ruleForm.start_date).format('YYYY-MM-DD') : '',
            }
            const id = router.currentRoute.value.params.id
            await userStore.updateUserPlan(query, id, () => {
                isOpenModal.value = false
            })

            await getListData()
        }
    })
}

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-delete')) {
        planDetail.id = row.id
        planDetail.plan_name = row.plan_name
        planDetail.start_date = row.start_date
        planDetail.end_date = row.end_date
        planDetail.created_date = row.created_date
        isOpenDeleteModal.value = true
    }
}

const deletePlan = async () => {
    let id = planDetail.id
    await userStore.deleteUserPlan(id, () => {
        isOpenDeleteModal.value = false
    })

    await getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
