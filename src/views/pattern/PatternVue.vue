<template>
    <BoxVue
        title="パターン管理"
        padding="20"
        btnCreate="true"
        @onCreate="onCreatePattern"
    >
        <template v-slot:body>
            <span>asdad</span>
        </template>
    </BoxVue>
    {{ `${isShowModal}` }}_1
    <modal
        title="パターン登録"
        width="1193"
        :open="isShowModal"
        @close="oncloseModal"
    >
        <span>asdad</span>
    </modal>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/Box.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { fa } from 'element-plus/es/locale'

const isShowModal = ref(false)
const onCreatePattern = () => {
    isShowModal.value = !isShowModal.value
}

const oncloseModal = () => {
    isShowModal.value = false
}
</script>
