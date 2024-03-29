<template>
    <BoxVue :type="'table'" :padding="20">
        <template v-slot:header>{{ t('plan.form.plans') }}</template>
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
                    <p class="label required">{{ t('plan.form.name') }}</p>
                    <el-col :span="10">
                        <el-input
                            v-model="ruleForm.name"
                            class="base-input"
                            @blur="trim('name')"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item prop="session_time">
                    <p class="label">{{ t('plan.form.session') }}</p>
                    <el-col :span="10">
                        <el-select
                            v-model="ruleForm.period_id"
                            :placeholder="t('shop.placeholders.select')"
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
                    <p class="label required">
                        {{ t('plan.form.basic_charge') }}
                    </p>
                    <el-col :span="10">
                        <el-input
                            maxlength="10"
                            v-model="ruleForm.amount"
                            class="base-input"
                            :formatter="
                                (value) =>
                                    `$ ${value}`
                                        .replace(/[^0-9.]/g, '')
                                        .replace(/(\..*)\./g, '$1')
                            "
                        />
                    </el-col>
                    <el-col class="currency" :span="1"> 円 </el-col>
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
                <el-form-item prop="is_active">
                    <p class="label">{{ t('plan.form.is_active') }}</p>
                    <el-switch v-model="ruleForm.is_active" />
                    <span style="padding-left: 8px">{{
                        ruleForm.is_active
                            ? t('plan.form.value.is_active.active')
                            : t('plan.form.value.is_active.inactive')
                    }}</span>
                </el-form-item>
                <!--<div class="el-group-title-child">
                    <h4>{{ t('plan.form.discount_settings') }}</h4>
                </div>
                <div
                    class="flex align-items-center"
                    required
                    v-for="(item, index) in ruleForm.plan_discounts"
                    :key="'plan-create-' + index"
                >
                    <el-col :span="21">
                        <el-row>
                            <el-col :span="10">
                                <p class="label">
                                    {{ t('plan.form.frequency') }}
                                </p>
                            </el-col>
                            <el-col class="text-center" :span="2"></el-col>
                            <el-col :span="10">
                                <p class="label">
                                    {{ t('plan.form.fee') }}
                                </p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item
                                    :prop="`plan_discounts.${index}.frequency`"
                                    :rules="rules.frequency"
                                >
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
                            <el-col :span="10">
                                <el-form-item
                                    :prop="`plan_discounts.${index}.discount_amount`"
                                    :rules="rules.discount_amount"
                                >
                                    <el-input
                                        v-model="item.discount_amount"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="1">
                        <el-icon
                            class="cursor-pointer mt-10"
                            @click="removeDiscountPlan(index)"
                            ><Close
                        /></el-icon>
                    </el-col>
                </div>
                <el-form-item>
                    <el-link @click="addBlock" target="_blank" type="primary">{{
                        t('plan.form.link')
                    }}</el-link>
                </el-form-item>-->
                <el-form-item>
                    <el-button @click="backToList">{{
                        t('btn_cancel')
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="submitForm(ruleFormRef)"
                        >{{ t('btn_create') }}</el-button
                    >
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
import { usePatternStore, usePlanStore, useAlertStore } from '@/stores'
import type { Period } from '@/libs/interface/planInterface'
import { useRouter } from 'vue-router'
const router = useRouter()

const { t } = useI18n()
const alertStore = useAlertStore()

const checkRegexAmount = (rule: any, value: number, callback: any) => {
    const regex = new RegExp(/^([0-9\s\-\.]*)$/)
    if (value <= 0) {
        callback(new Error(t('validation.tel_format')))
    }
    if (!regex.test(value.toString())) {
        callback(new Error(t('validation.tel_format')))
    } else {
        callback()
    }
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
    name: '',
    period_id: 1,
    amount: null,
    type: 1,
    is_active: true,
    plan_discounts: [
        {
            frequency: null,
            discount_amount: null,
        },
    ],
})
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: t('validation.required', [t('plan.form.name')]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max', [[t('plan.form.name')], 255]),
            trigger: 'blur',
        },
    ],
    amount: [
        {
            required: true,
            message: t('validation.required', [t('plan.form.fee')]),
            trigger: 'blur',
        },
        { validator: checkRegexAmount, trigger: 'blur' },
    ],
    frequency: [
        {
            required: true,
            message: t('validation.required', [t('plan.form.frequency')]),
            trigger: 'blur',
        },
        { validator: checkRegexAmount, trigger: 'blur' },
    ],
    discount_amount: [
        {
            required: true,
            message: t('validation.required', [
                t('plan.form.discount_settings'),
            ]),
            trigger: 'blur',
        },
        { validator: checkRegexAmount, trigger: 'blur' },
    ],
})

const trim = (field: 'name') => {
    if (ruleForm[field]) {
        ruleForm[field] = ruleForm[field].trim()
    }
}

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
    await getPeriodData()
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const payload: any = { ...ruleForm }
            payload.plan_discounts = payload.plan_discounts.filter(
                (item: any) => {
                    return item.frequency && item.discount_amount
                }
            )
            const planStore = usePlanStore()
            planStore.createPlan(payload)
            alertStore.createAlert({
                title: t('message.create_success'),
                type: 'success',
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const backToList = () => {
    router.push({
        name: 'plans',
        replace: true,
    })
}

const addBlock = () => {
    ruleForm.plan_discounts.push({
        frequency: null,
        discount_amount: null,
    })
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
const removeDiscountPlan = (index: number) => {
    ruleForm.plan_discounts.splice(index, 1)
}
</script>

<style lang="scss">
.mt-10 {
    margin-top: 10px;
}
.currency {
    text-align: center;
}
</style>
