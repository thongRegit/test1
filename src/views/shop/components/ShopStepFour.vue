<template>
    <BoxVue :title="'パターンA'" :type="'table'" :padding="20" :width="'700px'">
        <template v-slot:header>
            <el-icon :size="24"><Edit /></el-icon>
        </template>
        <template v-slot:body>
            <el-form-item>
                <el-col :span="24" class="group-time">
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
        </template>
    </BoxVue>

    <BoxVue :title="'パターンB'" :type="'table'" :padding="20" :width="'700px'">
        <template v-slot:header>
            <el-icon :size="24"><Edit /></el-icon>
        </template>
        <template v-slot:body>
            <el-form-item>
                <el-col :span="24" class="group-time">
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
        </template>
    </BoxVue>
</template>

<script lang="ts" setup>
import BoxVue from '@/components/common/BoxVue.vue'
</script>
