<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <SaleSearchVue />
        </template>
    </BoxVue>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body> </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/Box.vue'
import SaleSearchVue from './components/UserSearch.vue'
</script>
