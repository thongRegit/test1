<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-row>
            <el-form-item prop="status">
                <p class="label">{{ t('coach.ruleForm.status.title') }}</p>
                <el-checkbox-group
                    v-model="checkedSession"
                    @change="handleCheckedSessionChange"
                >
                    <el-checkbox
                        :label="item.id"
                        :key="item.id"
                        v-for="item in statusArr"
                        >{{ item.title }}</el-checkbox
                    >
                </el-checkbox-group>
            </el-form-item>
        </el-row>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">{{
                t('btn_search')
            }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const statusArr = [
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
    status: [1, 0],
})

const submitForm = () => {
    emit('submit', ruleForm)
}

const checkedSession = ref(['1', '0'])

const handleCheckedSessionChange = (value: []) => {
    ruleForm['status'] = value
}
</script>
