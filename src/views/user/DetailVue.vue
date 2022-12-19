<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Printer />
            </el-icon>
        </template>
        <template v-slot:body>
            <UserFormVue />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/Box.vue'
import UserFormVue from './components/UserForm.vue'
</script>
