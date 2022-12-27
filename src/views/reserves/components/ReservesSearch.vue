<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-form-item prop="type">
            <p class="label">{{ t('shops.status') }}</p>
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="全て" name="type" />
                <el-checkbox label="有効" name="type" />
                <el-checkbox label="無効" name="type" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="name">
            <el-row class="full-width">
                <el-col :span="12">
                    <p class="label">{{ t('shops.status') }}</p>
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="全て" name="type" />
                        <el-checkbox label="有効" name="type" />
                        <el-checkbox label="無効" name="type" />
                        <el-checkbox label="無効" name="type" />
                        <el-checkbox label="無効" name="type" />
                        <el-checkbox label="無効" name="type" />
                        <el-checkbox label="無効" name="type" />
                    </el-checkbox-group>
                </el-col>
                <el-col :span="12">
                    <p class="label">{{ t('shops.status') }}</p>
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="全て" name="type" />
                        <el-checkbox label="有効" name="type" />
                        <el-checkbox label="無効" name="type" />
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item prop="name">
            <el-row class="full-width">
                <el-col :span="12">
                    <p class="label">{{ t('shops.keyword_search') }}</p>
                    <el-col :span="20">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <p class="label">{{ t('shops.status') }}</p>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item prop="name">
                                <el-input
                                    v-model="ruleForm.name"
                                    class="base-input"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="2">
                            <div
                                class="text-gray-500"
                                style="text-align: center"
                            >
                                ~
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="name">
                                <el-input
                                    v-model="ruleForm.name"
                                    class="base-input"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
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

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: 'Hello',
    type: [],
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
