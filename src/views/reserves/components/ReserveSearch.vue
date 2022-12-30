<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-form-item prop="status">
            <p class="label">{{ t('reserve.search_form.status.title') }}</p>
            <el-checkbox-group v-model="ruleForm.status">
                <el-checkbox
                    :label="item.id"
                    :key="item.id"
                    v-for="item in statusOrders"
                >
                    {{ item.title }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-row class="full-width" :gutter="40">
            <el-col :span="8">
                <el-form-item prop="shop_id">
                    <p class="label">{{ t('reserve.search_form.shop_id') }}</p>
                    <el-select
                        v-model="ruleForm.shop_id"
                        class="base-input full-width"
                        placeholder="Select"
                        filterable
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        fit-input-width
                    >
                        <el-option
                            v-for="item in options.shops"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="plan_id">
                    <p class="label">
                        {{ t('reserve.search_form.plan_id') }}
                    </p>
                    <el-select
                        v-model="ruleForm.plan_id"
                        class="base-input full-width"
                        placeholder="Select"
                        filterable
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        fit-input-width
                    >
                        <el-option
                            v-for="item in options.plans"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <div v-if="showForm">
            <el-row class="full-width" :gutter="40">
                <el-col :span="8">
                    <p class="label">
                        {{ t('reserve.search_form.search.title') }}
                    </p>
                    <el-form-item prop="search">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.search"
                            :placeholder="
                                t('reserve.search_form.search.placeholder')
                            "
                            @blur="trim('search')"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <p class="label">
                        {{ t('reserve.search_form.order_created_at') }}
                    </p>
                    <el-row class="full-width">
                        <el-col :span="11">
                            <el-form-item prop="from">
                                <el-date-picker
                                    v-model="ruleForm.from"
                                    type="date"
                                    class="base-input"
                                    format="YYYY/MM/DD"
                                    value-format="YYYY-MM-DD"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="2">
                            <div
                                class="text-gray-500"
                                style="text-align: center"
                            >
                                ~
                            </div>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="to">
                                <el-date-picker
                                    v-model="ruleForm.to"
                                    type="date"
                                    class="base-input"
                                    format="YYYY/MM/DD"
                                    value-format="YYYY-MM-DD"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div v-if="showForm">
            <el-row class="full-width" :gutter="40">
                <el-col :span="8">
                    <el-form-item prop="coach_id">
                        <p class="label">
                            {{ t('reserve.search_form.coach_id') }}
                        </p>
                        <el-select
                            v-model="ruleForm.coach_id"
                            class="base-input full-width"
                            placeholder="Select"
                            filterable
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            fit-input-width
                        >
                            <el-option
                                v-for="item in options.coaches"
                                :key="item.id"
                                :label="item.first_name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="day">
                        <p class="label">
                            {{ t('reserve.search_form.day') }}
                        </p>
                        <el-checkbox-group v-model="ruleForm.day">
                            <el-checkbox
                                :label="item"
                                :key="item"
                                v-for="item in Object.keys(dayList)"
                            >
                                {{ dayList[item] }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <el-form-item>
            <el-button
                class="btn-add"
                type="info"
                :icon="!showForm ? Plus : Minus"
                @click="handleShowForm"
                >{{ t('reserve.search_form.btn_toggle') }}</el-button
            >
        </el-form-item>
        <el-form-item>
            <el-button @click="resetForm(ruleFormRef)">{{
                t('btn_clear')
            }}</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">{{
                t('btn_search')
            }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Minus, Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue3-i18n'
import { dayList } from '@/libs/constants/constants'
import { useReserveStore } from '@/stores'

const { t } = useI18n()
const emit = defineEmits(['submit', 'reset'])

const statusOrders = [
    {
        id: '1',
        title: t('reserve.search_form.status.value.1'),
    },
    {
        id: '2',
        title: t('reserve.search_form.status.value.2'),
    },
    {
        id: '3',
        title: t('reserve.search_form.status.value.3'),
    },
    {
        id: '4',
        title: t('reserve.search_form.status.value.4'),
    },
]

const showForm = ref(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    status: [],
    day: [],
    search: '',
    shop_id: [],
    plan_id: [],
    coach_id: [],
    from: '',
    to: '',
})

const options = reactive({
    coaches: [] as any,
    shops: [] as any,
    plans: [] as any,
})

const handleShowForm = () => {
    showForm.value = !showForm.value
}

const rules = reactive<FormRules>({
    search: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('reserve.search_form.search.title'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    from: [
        {
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
    to: [
        {
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit('submit', ruleForm)
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    emit('reset')
}

const trim = (field: 'search') => {
    if (ruleForm[field]) {
        ruleForm[field] = ruleForm[field].trim()
    }
}

onMounted(async () => {
    const reserveStore = useReserveStore()
    const payload = ref({
        all: 1,
    } as any)
    await Promise.all([
        reserveStore.listCoach(payload.value),
        reserveStore.listShop(payload.value),
        reserveStore.listPlan(payload.value),
    ])
    options.coaches = reserveStore.coaches
    options.shops = reserveStore.shops
    options.plans = reserveStore.plans
})
</script>

<style scoped lang="scss">
.el-form-item {
    .el-form-item__content {
        .el-button {
            &.btn-add {
                width: inherit;
                height: 50px;
            }
        }
    }
}
</style>
