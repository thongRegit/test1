<template>
    <BoxVue
        :title="t('session.title')"
        :type="'table'"
        :padding="20"
        :btnCreate="false"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <div class="">
                <el-form-item>
                    <el-row class="full-width">
                        <el-col :span="14">
                            <el-row class="items-end">
                                <div class="w-40">
                                    <p class="label">
                                        {{ t('shops.keyword_search') }}
                                    </p>
                                    <el-col :span="20">
                                        <el-select
                                            v-model="ruleForm.shops"
                                            :placeholder="
                                                t('shop.placeholders.select')
                                            "
                                        >
                                            <el-option
                                                label="Zone one"
                                                value="shanghai"
                                            />
                                            <el-option
                                                label="Zone two"
                                                value="beijing"
                                            />
                                        </el-select>
                                    </el-col>
                                </div>
                                <div class="w-40">
                                    <el-col :span="20">
                                        <el-select
                                            v-model="ruleForm.stations"
                                            placeholder=""
                                        >
                                            <el-option
                                                label="Zone one"
                                                value="shanghai"
                                            />
                                            <el-option
                                                label="Zone two"
                                                value="beijing"
                                            />
                                        </el-select>
                                    </el-col>
                                </div>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row class="items-end justify-between">
                                <el-col :span="12">
                                    <p class="label">{{ t('session.date') }}</p>
                                    <el-date-picker
                                        v-model="ruleForm.day"
                                        type="date"
                                        :size="'default'"
                                    />
                                </el-col>
                                <el-col :span="10" class="text-right">
                                    <el-button type="primary">{{
                                        t('session.buttons.individual_setting')
                                    }}</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form-item>
            </div>
            <AccountTableVue />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import AccountTableVue from './components/AccountTable.vue'
import BoxVue from '@/components/common/BoxVue.vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const ruleForm = reactive({
    shops: [],
    stations: [],
    day: new Date(),
})
</script>

<style lang="scss">
.w-40 {
    width: 40%;
}
</style>
