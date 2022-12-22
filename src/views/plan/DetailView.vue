<template>
    <BoxVue :type="'table'" :padding="20" :width="'800px'">
        <template v-slot:header> {{t('plan.form.plans')}}</template>
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
                    <h4>{{t('plan.form.basic_setting')}}</h4>
                </div>
                <el-form-item prop="name">
                    <p class="label">{{t('plan.form.name')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="session">
                    <p class="label">{{t('plan.form.session_time')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.period_value" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="amount">
                    <p class="label">{{t('plan.form.basic_charge')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.amount" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio
                            :label="item.id"
                            :key="item.id"
                            v-for="item in types"
                        >{{ item.title }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="active">
                    <p class="label">{{t('plan.form.active')}}</p>
                    <el-switch v-model="ruleForm.is_active" />
                </el-form-item>
                <div class="el-group-title-child">
                    <h4>{{t('plan.form.discount_settings')}}</h4>
                </div>
                <el-form-item required v-for="item in ruleForm.plan_discounts">
                    <el-col :span="22">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item prop="name">
                                    <p class="label">{{t('plan.form.frequency')}}</p>
                                    <el-input
                                        v-model="item.frequency"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col class="text-center" :span="2">
                                <span class="text-gray-500">{{t('plan.form.from')}}</span>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="name">
                                    <p class="label">{{t('plan.form.fee')}}</p>
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
import {nextTick, onMounted, reactive, ref,} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import BoxVue from "@/components/common/BoxVue.vue";
import {useI18n} from 'vue3-i18n'
import {usePlanStore} from "@/stores";
import {useRoute} from "vue-router";
import type {Payload} from "@/libs/interface/planInterface";

const { t } = useI18n()
const route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
    name: '',
    type: 1,
    period_value: '',
    amount: '',
    plan_discounts: [{
        frequency: '',
        discount_amount: ''}],
    is_active: true,
    period_id: ''
})
const payload = ref({} as Payload)

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
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
})

const getPlanDetail = async (payload: any) => {
    const planStore = usePlanStore()
    await planStore.detailPlan(payload)
    const data = planStore.plan
    ruleForm.name = data.name
    ruleForm.type = data.type
    ruleForm.period_value = data.period_value
    ruleForm.amount = data.amount
    ruleForm.plan_discounts = data.plan_discounts
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
</script>
