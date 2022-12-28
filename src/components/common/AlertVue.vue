<template>
    <div class="alert-custom">
        <el-alert
            :title="title"
            :type="type"
            :effect="effect || 'dark'"
            :show-icon="showIcon === undefined ? true : showIcon"
            :closable="false"
        />
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { Alert } from '@/libs/interface/alertInterface'

const props = defineProps(['title', 'type', 'effect', 'showIcon'])
const { title, type, effect, showIcon } = toRefs(props as Alert)
</script>

<style scoped>
.alert-custom {
    margin: 20px 0 0;
}

.alert-custom:first-child {
    margin: 0;
}
</style>
