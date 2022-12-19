<template>
    <BoxVue :type="'table'" :padding="20" :width="'700px'">
        <template v-slot:header> 基本設定 3 </template>
        <template v-slot:body>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <el-form-item prop="name">
                    <el-col :span="10">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <p class="label">ステーション数</p>
                    <el-col :span="10">
                        <el-input
                            type="number"
                            v-model="ruleForm.name"
                            class="base-input"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <p class="label">営業時間設定</p>
                    <el-col :span="10">
                        <el-select
                            v-model="ruleForm.name"
                            placeholder="Activity zone"
                            class="base-input"
                        >
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item required>
                    <el-col :span="22" class="group-time">
                        <el-row>
                            <el-col :span="18">
                                <p class="label">営業時間</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="label">SESSION時間</p>
                            </el-col>
                        </el-row>
                        <el-row class="group-time-item">
                            <el-col :span="18">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <span class="text-gray-500 time-center"
                                            >~</span
                                        >
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <div class="base-input-time">12:00</div>
                            </el-col>
                        </el-row>
                        <el-row class="group-time-item">
                            <el-col :span="18">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <span class="text-gray-500 time-center"
                                            >~</span
                                        >
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <div class="base-input-time">12:00</div>
                            </el-col>
                        </el-row>
                        <el-row class="group-time-item">
                            <el-col :span="18">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <span class="text-gray-500 time-center"
                                            >~</span
                                        >
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="base-input-time">12:00</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <div class="base-input-time">12:00</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-form-item>
                <el-form-item prop="name">
                    <p class="label">定休日</p>
                    <el-col :span="16">
                        <el-input v-model="ruleForm.name" class="base-input" />
                    </el-col>
                </el-form-item>
            </el-form>
        </template>
    </BoxVue>

    <BoxVue :type="'table'" :padding="20">
        <template v-slot:header> 個別設定 3 </template>
        <template v-slot:body>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <div>
                    <el-form-item prop="name">
                        <el-checkbox
                            label="初回体験"
                            name="type"
                            v-model="checked1"
                        />
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-col :span="8">
                            <el-select
                                v-model="ruleForm.name"
                                placeholder="Activity zone"
                                class="base-input"
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item required>
                        <el-col :span="10" class="group-time">
                            <el-row>
                                <el-col :span="18">
                                    <p class="label">営業時間</p>
                                </el-col>
                                <el-col :span="6">
                                    <p class="label">SESSION時間</p>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                    <el-divider />
                </div>
                <div>
                    <el-form-item prop="name">
                        <el-checkbox
                            label="初回体験"
                            name="type"
                            v-model="checked1"
                        />
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-col :span="8">
                            <el-select
                                v-model="ruleForm.name"
                                placeholder="Activity zone"
                                class="base-input"
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item required>
                        <el-col :span="10" class="group-time">
                            <el-row>
                                <el-col :span="18">
                                    <p class="label">営業時間</p>
                                </el-col>
                                <el-col :span="6">
                                    <p class="label">SESSION時間</p>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                    <el-divider />
                </div>
                <div>
                    <el-form-item prop="name">
                        <el-checkbox
                            label="初回体験"
                            name="type"
                            v-model="checked1"
                        />
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-col :span="8">
                            <el-select
                                v-model="ruleForm.name"
                                placeholder="Activity zone"
                                class="base-input"
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item required>
                        <el-col :span="10" class="group-time">
                            <el-row>
                                <el-col :span="18">
                                    <p class="label">営業時間</p>
                                </el-col>
                                <el-col :span="6">
                                    <p class="label">SESSION時間</p>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                            <el-row class="group-time-item">
                                <el-col :span="18">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <span
                                                class="text-gray-500 time-center"
                                                >~</span
                                            >
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="base-input-time">
                                                12:00
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div class="base-input-time">12:00</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </div>
            </el-form>
        </template>
    </BoxVue>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BoxVue from '@/components/common/Box.vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: 'Hello',
    type: [],
})

const checked1 = ref(true)

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
