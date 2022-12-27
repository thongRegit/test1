<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <ShopSearchVue />
        </template>
    </BoxVue>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body> </template>
    </BoxVue>
    <Step2 />
    <Step3 />
    <Step4 />
    <ModalVue :open="true" :title="'セッション個別設定'">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <el-form-item required>
                <el-col :span="20" class="group-time">
                    <el-row class="group-time-item" :gutter="20">
                        <el-col :span="6">
                            <el-date-picker
                                v-model="ruleForm.date"
                                type="date"
                                placeholder="Pick a date"
                                class="base-input full-width"
                                format="YYYY/MM/DD"
                                value-format="YYYY-MM-DD"
                            />
                        </el-col>
                        <el-col :span="4">
                            <el-input
                                v-model="ruleForm.name"
                                class="base-input"
                            />
                        </el-col>
                        <el-col :span="1">
                            <span class="text-gray-500 time-center">~</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input
                                v-model="ruleForm.name"
                                class="base-input"
                            />
                        </el-col>
                        <el-col :span="1">
                            <span class="text-gray-500 time-center">を</span>
                        </el-col>
                        <el-col :span="4">
                            <el-select
                                v-model="ruleForm.name"
                                placeholder="please select your zone"
                                class="base-input"
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <span class="text-gray-500 time-center"
                                >に設定</span
                            >
                        </el-col>
                    </el-row>
                </el-col>
            </el-form-item>
            <el-form-item required>
                <el-col :span="20" class="group-time">
                    <el-row class="group-time-item" :gutter="20">
                        <el-col :span="6">
                            <el-date-picker
                                v-model="ruleForm.date"
                                type="date"
                                placeholder="Pick a date"
                                class="base-input full-width"
                                format="YYYY/MM/DD"
                                value-format="YYYY-MM-DD"
                            />
                        </el-col>
                        <el-col :span="4">
                            <el-input
                                v-model="ruleForm.name"
                                class="base-input"
                            />
                        </el-col>
                        <el-col :span="1">
                            <span class="text-gray-500 time-center">~</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input
                                v-model="ruleForm.name"
                                class="base-input"
                            />
                        </el-col>
                        <el-col :span="1">
                            <span class="text-gray-500 time-center">を</span>
                        </el-col>
                        <el-col :span="4">
                            <el-select
                                v-model="ruleForm.name"
                                placeholder="please select your zone"
                                class="base-input"
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <span class="text-gray-500 time-center"
                                >に設定</span
                            >
                        </el-col>
                    </el-row>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-link
                    href="https://element.eleme.io"
                    target="_blank"
                    type="primary"
                    >+営業時間を追加する</el-link
                >
            </el-form-item>
        </el-form>
    </ModalVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import ShopSearchVue from './components/ShopSearch.vue'
import Step2 from '@/views/shop/components/ShopStepTwo.vue'
import Step3 from '@/views/shop/components/ShopStepThree.vue'
import Step4 from '@/views/shop/components/ShopStepFour.vue'

import ModalVue from '@/components/common/ModalVue.vue'

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: 'Hello',
    date: '2021-10-01',
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
