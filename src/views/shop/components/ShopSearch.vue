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
            <p class="label">{{ t('shop.ruleForm.status.title') }}</p>
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
            <p class="label">{{ t('shop.ruleForm.name.title') }}</p>
            <el-col :span="10">
                <el-input
                    class="base-input"
                    v-model="ruleForm.name"
                    :placeholder="t('shop.ruleForm.name.placeholder')"
                />
            </el-col>
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
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('shop.ruleForm.status.value.all'),
    },
    {
        id: '0',
        title: t('shop.ruleForm.status.value.0'),
    },
    {
        id: '1',
        title: t('shop.ruleForm.status.value.1'),
    },
]

const emit = defineEmits(['submit', 'reset'])

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    status: 'all',
})

const rules = reactive<FormRules>({
    name: [
        { message: 'Please input shop name', trigger: 'blur' },
        {
            max: 255,
            message: 'Length max 255',
            trigger: 'blur',
        },
    ],
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
    emit('reset')
}
</script>
