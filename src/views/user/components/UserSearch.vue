<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
    >
        <el-form-item prop="type">
            <p class="label">{{ t('user.status') }}</p>
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
            <p class="label">{{ t('user.keyword_search') }}</p>
            <el-col :span="10">
                <el-input
                    class="base-input"
                    v-model="ruleForm.name"
                    :placeholder="t('user.ruleForm.name.placeholder')"
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
import { useAlertStore } from '@/stores/index'

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('user.ruleForm.status.value.all'),
    },
    {
        id: '0',
        title: t('user.ruleForm.status.value.0'),
    },
    {
        id: '1',
        title: t('user.ruleForm.status.value.1'),
    },
]

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    status: 'all',
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

const submitForm = async (formEl: FormInstance | undefined) => {
    const alertStore = useAlertStore()
    await alertStore.createAlert({
        title: 'Hello',
        type: 'success',
    })

    if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //     if (valid) {
    //         console.log('submit!')
    //     } else {
    //         console.log('error submit!', fields)
    //     }
    // })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
