<template>
    <el-dialog
        v-model="dialogFormVisible"
        :title="title"
        :width="width"
        :before-close="handleClose"
        destroy-on-close
    >
        <slot></slot>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">Cancel</el-button>
                <el-button type="primary" @click="onSubmit">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, toRefs } from 'vue'

const { title, open, width } = toRefs(defineProps(['title', 'open', 'width']))
const emit = defineEmits(['cancel', 'submit', 'close'])

const close = () => {
    emit('close')
}

const onSubmit = () => {
    emit('submit')
}

const handleClose = () => {
    emit('close')
}
</script>
<style scoped lang="scss">
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.el-button {
    width: 92px;
}
</style>
