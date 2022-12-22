<template>
    <div class="alert-custom">
        <el-alert
            :title="title"
            :type="type"
            :effect="effect || 'dark'"
            :show-icon="showIcon === undefined ? true : showIcon"
        />
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface alert {
    title: String
    type: String
    effect?: String
    showIcon?: Boolean
}

const props = defineProps(['title', 'type', 'effect', 'showIcon'])
const { title, type, effect, showIcon } = toRefs(props as alert)
</script>

<style scoped>
.alert-custom {
    margin: 20px 0 0;
}

.alert-custom:first-child {
    margin: 0;
}
</style>
