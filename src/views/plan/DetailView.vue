<template>
    <BoxVue :type="'table'" :padding="20" :width="'800px'">
        <template v-slot:header> {{ t('plan.form.plans') }}</template>
        <template v-slot:body>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <div class="el-group-title-child">
                    <h4>{{ t('plan.form.basic_setting') }}</h4>
                </div>
                <el-form-item prop="name">
                    <p class="label">{{ t('plan.form.name') }}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="session">
                    <p class="label">{{ t('plan.form.session_time') }}</p>
                    <el-col :span="10">
                        <el-select
                            v-model="ruleForm.period_id"
                            :placeholder="t('shops.placeholders.select')"
                        >
                            <el-option
                                v-for="item in periods"
                                :key="item.id"
                                :label="`${item.value}分`"
                                :value="item.id"
                            />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item prop="amount">
                    <p class="label">{{ t('plan.form.basic_charge') }}</p>
                    <el-col :span="10">
                        <el-input
                            v-model="ruleForm.amount"
                            class="base-input"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio
                            :label="item.id"
                            :key="item.id"
                            v-for="item in types"
                            >{{ item.title }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="active">
                    <p class="label">{{ t('plan.form.active') }}</p>
                    <el-switch v-model="ruleForm.is_active" />
                </el-form-item>
                <div class="el-group-title-child">
                    <h4>{{ t('plan.form.discount_settings') }}</h4>
                </div>
                <el-form-item
                    required
                    v-for="(item, index) in ruleForm.plan_discounts"
                    :key="'plan-detail-' + index"
                >
                    <el-col :span="22">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item prop="name">
                                    <p class="label">
                                        {{ t('plan.form.frequency') }}
                                    </p>
                                    <el-input
                                        v-model="item.frequency"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col class="text-center" :span="2">
                                <span class="text-gray-500">{{
                                    t('plan.form.from')
                                }}</span>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="name">
                                    <p class="label">
                                        {{ t('plan.form.fee') }}
                                    </p>
                                    <el-input
                                        v-model="item.discount_amount"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-form-item>
            </el-form>
        </template>
    </BoxVue>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BoxVue from '@/components/common/BoxVue.vue'
import { useI18n } from 'vue3-i18n'
import { usePatternStore, usePlanStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { Payload } from '@/libs/interface/planInterface'
import { Period, PlanDetailPayload } from '@/libs/interface/planInterface'

const { t } = useI18n()
const route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = ref({} as PlanDetailPayload)
const payload = ref({} as Payload)

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 255,
            message: 'Length should be 3 to 255',
            trigger: 'blur',
        },
    ],
    type: [
        {
            type: 'number',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
})

const types = [
    {
        id: 1,
        title: t('plan.types.first_experience'),
    },
    {
        id: 2,
        title: t('plan.types.general'),
    },
    {
        id: 3,
        title: t('plan.types.subscription'),
    },
]

onMounted(async () => {
    await nextTick()
    payload.value.id = Number(route.params.id)
    await getPlanDetail(payload.value)
    await getPeriodData()
})

const getPlanDetail = async (payload: any) => {
    const planStore = usePlanStore()
    await planStore.detailPlan(payload)
    ruleForm.value = {
        id: planStore.plan.id,
        name: planStore.plan.name,
        type: planStore.plan.type,
        period_id: planStore.plan.period.id,
        amount: planStore.plan.amount,
        plan_discounts: planStore.plan.plan_discounts,
        is_active: Boolean(planStore.plan.is_active),
    }
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const periods = ref([] as Array<Period>)
const getPeriodData = async () => {
    const patternStore = usePatternStore()
    await patternStore.getPeriod()
    periods.value = patternStore.periods?.map((e: Period) => {
        return {
            id: e.id,
            value: e.value,
        }
    })
}
</script>
