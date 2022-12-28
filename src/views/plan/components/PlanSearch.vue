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
            <p class="label">{{ t('plan.ruleForm.status.title') }}</p>
            <el-radio-group v-model="ruleForm.status">
                <el-radio
                    :label="item.id"
                    :key="item.id"
                    v-for="item in statusArr"
                    >{{ item.title }}</el-radio
                >
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="name">
            <p class="label">{{ t('plan.ruleForm.name.title') }}</p>
            <el-col :span="10">
                <el-input
                    class="base-input"
                    v-model="ruleForm.name"
                    :placeholder="t('plan.ruleForm.name.placeholder')"
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
        <el-form-item class="justify-left">
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
import { reactive, ref, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('plan.ruleForm.status.value.all'),
    },
    {
        id: '1',
        title: t('plan.ruleForm.status.value.1'),
    },
    {
        id: '0',
        title: t('plan.ruleForm.status.value.0'),
    },
]

const types = [
    {
        id: 'all',
        title: t('plan.types.all'),
    },
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

const emit = defineEmits(['submit', 'reset'])

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    status: 'all',
    type: 'all',
})

const rules = reactive<FormRules>({
    status: [
        {
            type: 'string',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid: any, fields: any) => {
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
}
</script>
