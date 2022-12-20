<template>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <SaleSearchVue />
        </template>
    </BoxVue>
    <BoxVue
        :title="'プラン一覧'"
        :type="'table'"
        :padding="20"
        :btnCreate="true"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body> </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import SaleSearchVue from './components/ReservationSearch.vue'
</script>
