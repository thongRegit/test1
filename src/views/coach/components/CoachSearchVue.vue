<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item prop="status">
                    <p class="label">{{ t('coach.ruleForm.status.title') }}</p>
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio
                            :label="item.id"
                            :key="item.id"
                            v-for="item in statusArr"
                            >{{ item.title }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="type">
                    <p class="label">{{ t('coach.ruleForm.type') }}</p>
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio
                            :label="item"
                            :key="item"
                            v-for="item in Object.keys(COACH_TYPE)"
                            >{{ COACH_TYPE[item] }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item prop="search">
            <p class="label">{{ t('coach.ruleForm.search.title') }}</p>
            <el-col :span="10">
                <el-input
                    class="base-input"
                    v-model="ruleForm.search"
                    :placeholder="t('coach.ruleForm.search.placeholder')"
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
import { reactive, ref, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'
import { COACH_TYPE } from '@/libs/constants/constants'

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('coach.ruleForm.status.value.all'),
    },
    {
        id: '1',
        title: t('coach.ruleForm.status.value.1'),
    },
    {
        id: '0',
        title: t('coach.ruleForm.status.value.0'),
    },
]

const emit = defineEmits(['submit', 'reset'])

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    search: '',
    type: '',
    status: 'all',
})

const rules = reactive<FormRules>({
    search: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.ruleForm.search.placeholder'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    status: [
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
