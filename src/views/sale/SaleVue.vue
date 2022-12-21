<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Histogram />
            </el-icon>
        </template>
        <template v-slot:body>
            <SaleSearchVue />
        </template>
    </BoxVue>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Histogram />
            </el-icon>
        </template>
        <template v-slot:body>
            <SaleListVue />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import SaleListVue from './components/SaleList.vue'
import SaleSearchVue from './components/SaleSearch.vue'
</script>
