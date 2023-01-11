<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-row>
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
        </el-row>
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

const { t } = useI18n()

const statusArr = [
    {
        id: 'all',
        title: t('coach.ruleForm.status.session.all'),
    },
    {
        id: '1',
        title: t('coach.ruleForm.status.session.1'),
    },
    {
        id: '0',
        title: t('coach.ruleForm.status.session.0'),
    },
]

const emit = defineEmits(['submit', 'reset'])

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    type: '0',
    status: 'all',
})

const rules = reactive<FormRules>({
    status: [
        {
            type: 'string',
            trigger: 'change',
        },
    ],
})

const submitForm = () => {
    emit('submit', ruleForm)
}

const resetForm = () => {
    emit('reset')
}
</script>
