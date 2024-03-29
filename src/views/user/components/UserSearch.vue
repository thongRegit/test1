<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
    >
        <el-form-item prop="is_active">
            <p class="label">{{ t('user.status') }}</p>
            <el-radio-group v-model="ruleForm.is_active">
                <el-radio
                    :label="item.id"
                    :key="item.id"
                    v-for="item in statusArr"
                    >{{ item.title }}</el-radio
                >
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="type">
            <p class="label">{{ t('user.type') }}</p>
            <el-radio-group v-model="ruleForm.type">
                <el-radio
                    :label="item"
                    :key="item"
                    v-for="item in Object.keys(TYPE_USERS)"
                    >{{ TYPE_USERS[item] }}</el-radio
                >
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="search">
            <p class="label">{{ t('user.keyword_search') }}</p>
            <el-col :span="10">
                <el-input
                    class="base-input"
                    v-model="ruleForm.search"
                    :placeholder="t('user.ruleForm.name.placeholder')"
                    @blur="trim('search')"
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
import { TYPE_USERS } from '@/libs/constants/constants'

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('user.ruleForm.status.value.all'),
    },
    {
        id: '1',
        title: t('user.ruleForm.status.value.1'),
    },
    {
        id: '0',
        title: t('user.ruleForm.status.value.0'),
    },
]
const emit = defineEmits(['submit', 'reset'])
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    search: '',
    type: '0',
    is_active: 'all',
})

const rules = reactive<FormRules>({
    search: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('user.ruleForm.name.placeholder'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    is_active: [
        {
            type: 'string',
            required: true,
            message: t('validation.check_one'),
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'string',
            required: true,
            message: t('validation.check_one'),
            trigger: 'change',
        },
    ],
})

const trim = (field: 'search') => {
    if (ruleForm[field]) {
        ruleForm[field] = ruleForm[field].trim()
    }
}

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
</script>
