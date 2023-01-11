<template>
    <el-dialog
        v-model="dialogVisible"
        title="予約編集"
        :before-close="close"
        width="50%"
    >
        <el-form ref="ruleFormRef" status-icon class="update-form">
            <el-row class="full-width">
                <el-col :span="6">
                    <p class="label">{{ t('reserve.columns.date') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ reserveData.date }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('reserve.columns.shop_name') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ reserveData.shop_name }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('reserve.columns.amount') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ reserveData.amount }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('reserve.columns.plan_name') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ reserveData.plan_name }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4">
                <el-col :span="6">
                    <p class="label">{{ t('reserve.columns.full_name') }}:</p>
                </el-col>
                <el-col :span="18">
                    <p class="label">{{ reserveData.user_name }}</p>
                </el-col>
            </el-row>
            <el-row class="full-width mt-4 mb-4">
                <el-col :span="6" class="pr-10">
                    <p class="label">{{ t('reserve.columns.status') }}:</p>
                </el-col>
                <el-col :span="18">
                    <el-select v-model="statusModel">
                        <el-option
                            v-for="item in ORDER_STATUS"
                            :key="item.id"
                            :label="`${item.name}`"
                            :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">{{ t('btn_cancel') }}</el-button>
                <el-button type="primary" @click="updateStatus">
                    {{ t('btn_update') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue3-i18n'
import { ORDER_STATUS } from '@/libs/constants/orders'
import { useReserveStore } from '@/stores'

const { t } = useI18n()

const props = defineProps(['dialogVisible', 'reserveData', 'status'])

const { dialogVisible, reserveData } = toRefs(props as any)
const statusModel = ref(props.status)

onMounted(() => {
    statusModel.value = props.status
})

const emit = defineEmits(['close', 'updated'])

const close = () => {
    emit('close')
}

const updateStatus = async () => {
    const query = {
        status: statusModel.value,
    }
    const reserveStore = useReserveStore()
    await reserveStore.updateReserve(query, reserveData?.value.id)
    emit('updated')
}
</script>
<style scoped>
.update-form {
    margin-left: 20px;
}

.pr-10 {
    padding-right: 10px !important;
}
</style>
