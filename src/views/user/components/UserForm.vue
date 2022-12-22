<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-col :span="12">
            <el-form-item prop="name">
                <p class="label">{{ t('shops.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="10">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                    <el-col :span="10">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="name">
                <p class="label">{{ t('shops.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="11">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                    <el-col :span="11">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="name">
                <p class="label">{{ t('shops.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="8">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                    <el-col :span="8">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                    <el-col :span="8">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.name"
                            :placeholder="'名前'"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="name">
                <p class="label">{{ t('shops.keyword_search') }}</p>
                <el-col :span="18">
                    <el-input
                        class="base-input"
                        v-model="ruleForm.name"
                        :placeholder="'名前'"
                    />
                </el-col>
            </el-form-item>
            <el-form-item prop="name">
                <p class="label">{{ t('shops.keyword_search') }}</p>
                <el-col :span="14">
                    <el-input
                        class="base-input"
                        v-model="ruleForm.name"
                        :placeholder="'名前'"
                    />
                </el-col>
            </el-form-item>
        </el-col>
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
</script>
