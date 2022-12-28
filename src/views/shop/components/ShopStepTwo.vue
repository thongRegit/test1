<template>
    <BoxVue :type="'table'" :padding="20">
        <template v-slot:header> プラン詳細 2 </template>
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
                    <h4>基本設定</h4>
                </div>
                <el-form-item prop="name">
                    <p class="label required">プラン名</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <p class="label required">SESSION時間</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <p class="label">基本料金(税抜)</p>
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <el-checkbox label="初回体験" name="type" />
                    <span class="text-note"
                        >（初回体験の対象のみ表示する）</span
                    >
                </el-form-item>
                <div class="el-group-title-child">
                    <h4>割引設定</h4>
                </div>
                <el-form-item required>
                    <el-col :span="22">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item prop="name">
                                    <p class="label">回数</p>
                                    <el-input
                                        v-model="ruleForm.name"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col class="text-center" :span="2">
                                <span class="text-gray-500">から</span>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="name">
                                    <p class="label">料金(税抜)</p>
                                    <el-input
                                        v-model="ruleForm.name"
                                        class="base-input"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-link
                        href="https://element.eleme.io"
                        target="_blank"
                        type="primary"
                        >割引設定を追加する</el-link
                    >
                </el-form-item>
            </el-form>
        </template>
    </BoxVue>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BoxVue from '@/components/common/BoxVue.vue'

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
