<template>
    <BoxVue
        title="パターン管理"
        padding="20"
        btnCreate="true"
        @onCreate="onCreatePattern"
    >
        <template v-slot:body>
            <el-row style="width: 100%">
                <el-col :span="12">
                    <el-select
                        v-model="value1"
                        placeholder="Activity zone"
                        class="base-input"
                    >
                        <el-option
                            v-for="(item, index) in timeArr"
                            :key="index"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select
                        v-model="value2"
                        placeholder="Activity zone"
                        class="base-input"
                    >
                        <el-option
                            v-for="(item, index) in timeArr"
                            :key="`select_2_${index}`"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-col>
            </el-row>
        </template>
    </BoxVue>
    <create-pattern ref="createModalRef" />
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import { generateTimeArr } from '@/utilities/constant'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import CreatePattern from './CreateVue.vue'
const timeArr = generateTimeArr()
const value1 = ref('')
const value2 = ref('')
const createModalRef = ref()
const onCreatePattern = () => {
    createModalRef.value?.showCreateModal()
}
</script>
