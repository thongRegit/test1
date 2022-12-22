<template>
    <BoxVue :type="'table'" :padding="20" :width="'800px'">
        <template v-slot:header>{{t('plans.form.plans')}}</template>
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
                    <h4>{{t('plans.form.basic_setting')}}</h4>
                </div>
                <el-form-item prop="name">
                    <p class="label">{{t('plans.form.name')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="session_time">
                    <p class="label">{{t('plans.form.session')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.period_id" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="amount">
                    <p class="label">{{t('plans.form.basic_charge')}}</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.amount" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="first_experience">
                    <el-checkbox label="初回体験" name="type" v-model="ruleForm.first_experience"/>
                    <span class="text-note"
                    >{{t('plans.form.is_display')}}</span>
                </el-form-item>
                <div class="el-group-title-child">
                    <h4>{{t('plans.form.discount_settings')}}</h4>
                </div>
                <el-form-item required v-for="item in ruleForm.plan_discounts">
                    <el-col :span="22">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item prop="frequency">
                                    <p class="label">{{t('plans.form.frequency')}}</p>
                                    <el-input
                                        v-model="item.frequency"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col class="text-center" :span="2">
                                <span class="text-gray-500">{{t('plans.form.from')}}</span>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="discount_amount">
                                    <p class="label">{{t('plans.form.fee')}}</p>
                                    <el-input
                                        v-model="item.discount_amount"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-link
                       @click="addBlock"
                        target="_blank"
                        type="primary"
                    >{{t('plans.form.link')}}</el-link
                    >
                </el-form-item>
                <el-form-item class="justify-center">
                    <el-button @click="resetForm(ruleFormRef)">{{
                            t('btn_clear')
                        }}</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{
                            t('btn_search')
                        }}</el-button>
                </el-form-item>
            </el-form>
        </template>
    </BoxVue>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BoxVue from "@/components/common/BoxVue.vue";
import { useI18n } from 'vue3-i18n'
import {usePlanStore} from "@/stores";

const { t } = useI18n()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
    name: '',
    type : 0,
    period_id: '',
    amount: '',
    first_experience: false,
    plan_discounts: [{
        frequency: '',
        discount_amount: ''}],
    is_active: 1
})

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
            type: 'array',
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

const getPlanDetail = async (payload: any) => {
    const planStore = usePlanStore()
    await planStore.detailPlan(payload)
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            ruleForm.type = ruleForm.first_experience ? 1 : 2
            const planStore = usePlanStore()
            planStore.createPlan(ruleForm)
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const addBlock = () => {
    ruleForm.plan_discounts.push({
        frequency: '',
        discount_amount: ''})
}
</script>

