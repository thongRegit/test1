<template>
    <el-dialog
        v-model="dialogFormVisible"
        :title="title"
        :width="width"
        :before-close="handleClose"
        destroy-on-close
        custom-class="dialog-custom"
    >
        <template #header>
            <div class="head-title">
                <span>{{ title }}</span>
            </div>
        </template>
        <slot name="body"></slot>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">キャンセル</el-button>
                <el-button type="primary" @click="onSubmit">
                    {{ isUpdate ? '更新' : '登録' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { toRef } from 'vue'

const props = defineProps({
    title: String,
    open: Boolean,
    width: String,
    isUpdate: {
        type: Boolean,
        default: true,
    },
})

const title = toRef(props, 'title')
const dialogFormVisible = toRef(props, 'open')
const width = toRef(props, 'width')

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
    width: var(--vt-w-button);
}

.head-title {
    span {
        line-height: var(--el-dialog-font-line-height);
        font-size: var(--el-dialog-title-font-size);
        color: var(--el-text-color-primary);
    }
}

.footer {
    width: 79%;
    display: flex;
    justify-content: end;
    margin: 0 auto;
    padding: 70px 0;
}
</style>
