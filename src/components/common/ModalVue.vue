<template>
    <el-dialog
        v-model="dialogFormVisible"
        :title="title"
        :width="width"
        :show-close="false"
        :before-close="handleClose"
        destroy-on-close
        custom-class="dialog-custom"
    >
        <template #header>
            <div class="head-title">
                <h4>{{ title }}</h4>
            </div>
        </template>
        <slot name="body"></slot>
        <template #footer>
            <div class="dialog-footer">
                <el-button color="#717171" @click="close">キャンセル</el-button>
                <el-button color="#0069D9" @click="onSubmit"> 更新 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue'

const props = defineProps({
    title: String,
    open: Boolean,
    width: String,
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
    width: 92px;
}

.head-title {
    text-align: center;
    h4 {
        font-size: 28px;
        font-weight: bold;
        color: #212529;
    }
}

.dialog-footer {
    width: 79%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 70px 0;
}
</style>
