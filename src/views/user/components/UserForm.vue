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
        <el-form-item prop="name">
            <p class="label">{{ t('shops.keyword_search') }}</p>
            <table class="table">
                <thead>
                    <tr>
                        <th class="primary--text">ID</th>
                        <th class="primary--text">Name</th>
                        <th class="primary--text">Country</th>
                        <th class="primary--text">City</th>
                        <th class="text-right primary--text">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td class="text-right">$36,738</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Minverva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaas-Waas</td>
                        <td class="text-right">$23,789</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td class="text-right">$56,142</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td class="text-right">$38,735</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td class="text-right">$63,542</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td class="text-right">$78,615</td>
                    </tr>
                </tbody>
            </table>
        </el-form-item>
        <el-form-item prop="name">
            <p class="label">{{ t('shops.keyword_search') }}</p>
            <table class="table">
                <thead>
                    <tr>
                        <th class="primary--text">ID</th>
                        <th class="primary--text">Name</th>
                        <th class="primary--text">Country</th>
                        <th class="primary--text">City</th>
                        <th class="text-right primary--text">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td class="text-right">$36,738</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Minverva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaas-Waas</td>
                        <td class="text-right">$23,789</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td class="text-right">$56,142</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td class="text-right">$38,735</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td class="text-right">$63,542</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td class="text-right">$78,615</td>
                    </tr>
                </tbody>
            </table>
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
</script>
