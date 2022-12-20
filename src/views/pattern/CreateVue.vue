<template>
    <modal-box
        title="パターン登録"
        width="1193"
        :open="isShowModal"
        @close="oncloseModal"
    >
        <template v-slot:body>
            <div style="width: 79%; margin: 0 auto">
                <el-form-item>
                    <el-row class="w-100">
                        <el-col span="24">
                            <p class="label">パターン名</p>
                            <el-form-item prop="name">
                                <el-input
                                    v-model="ruleForm.name"
                                    class="pattern-input"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-row class="w-100">
                        <el-col :span="11">
                            <p class="label">営業時間</p>
                        </el-col>
                        <el-col :span="13" style="padding-left: 60px">
                            <p class="label">SESSION時間</p>
                        </el-col>
                    </el-row>
                    <el-row class="w-100">
                        <el-col :span="11">
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item prop="name">
                                        <el-input
                                            v-model="ruleForm.name"
                                            class="pattern-input"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col class="text-center" :span="4">
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
                                            class="pattern-input ml-auto"
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="13" style="padding-left: 60px">
                            <el-select
                                v-model="sessionSelected"
                                placeholder="Session"
                                class="pattern-input pattern-select"
                            >
                                <el-option
                                    :key="'ontion_1'"
                                    :label="'45分'"
                                    :value="45"
                                />
                                <el-option
                                    :key="'ontion_2'"
                                    :label="'30分'"
                                    :value="30"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row class="w-100">
                        <el-col span="24">
                            <span
                                class="add-pattern-btn"
                                @click="addSessionBlock"
                            >
                                +営業時間を追加する
                            </span>
                        </el-col>
                    </el-row>
                </el-form-item>
            </div>
        </template>
    </modal-box>
</template>
<script setup lang="ts">
import { ref, watch, defineExpose, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const isShowModal = ref(false)

const oncloseModal = () => {
    isShowModal.value = false
}

const showCreateModal = () => {
    isShowModal.value = true
}
const ruleForm = reactive({
    name: 'Hello',
    type: [],
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
})

const sessionSelected = ref('')

const addSessionBlock = () => {
    console.log('324234')
}
defineExpose({
    showCreateModal,
})
</script>
<style scoped lang="scss">
.w-100 {
    width: 100%;
}
.pattern-input {
    &.ml-auto {
        margin-left: auto;
    }
    width: 147px;
}
.pattern-select {
    margin-bottom: 3px;
}

.add-pattern-btn {
    padding: 2px 0;
    cursor: pointer;
    color: #007bff;
    font-size: 16px;
    line-height: 1.5;
}
</style>
