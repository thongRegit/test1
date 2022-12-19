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
            <el-row style="width: 100%">
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
        <el-form-item v-if="showForm">
            <el-row style="width: 100%">
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
        <el-form-item v-if="showForm">
            <el-row style="width: 100%">
                <el-col :span="12">
                    <p class="label">{{ t('shops.keyword_search') }}</p>
                    <el-col :span="20">
                        <el-select
                            v-model="value"
                            class="m-2"
                            placeholder="Select"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-col>
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
        <el-form-item v-if="!showForm">
            <el-button
                class="btn-add"
                type="info"
                :icon="Plus"
                @click="handleShowForm"
                >検索条件を増やす</el-button
            >
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
import { Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: 'Hello',
    type: [],
})

const showForm = ref(false)
const value = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

const handleShowForm = () => {
    showForm.value = true
}

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

<style scoped lang="scss">
.el-form-item {
    .el-form-item__content {
        .el-button {
            &.btn-add {
                width: inherit;
                height: 50px;
            }
        }
    }
}
</style>
