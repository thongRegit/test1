<template>
    <!-- <el-row class="group-title-table">
      <el-col :span="12" class="table-quantity-data">{{ t('quantity_item_is_showing_table_header', [recordStart, recordEnd, data.total]) }}</el-col>
      <el-col :span="12" class="text-right" v-if="hasCreate">
        <el-button type="success" class="btn-create" @click="$emit('handleRedirectCreate')" >{{ t('btn_create') }}</el-button>
      </el-col>
    </el-row> -->
    <el-table
        :data="data.records"
        id="table"
        @sort-change="sortChange"
        v-loading="loading"
        :empty-text="t('table.no_data')"
        @cell-click="cellClick"
        :lazy="true"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="55" v-if="showCheckbox" />
        <el-table-column
            type="index"
            :index="indexMethod"
            width="75"
            label="No."
            v-if="showIndex"
            :class-name="'index'"
            :label-class-name="'label-index'"
        />
        <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            :label="column.label"
            :sortable="column.sortable"
            :class-name="column.class"
            :prop="column.prop"
            :width="column.width"
            :label-class-name="column.labelClass"
            :align="column.align"
        >
            <template v-slot="scope">
                <p v-html="scope.row[column.prop]"></p>
            </template>
        </el-table-column>
        <el-table-column
            v-if="buttons && buttons.length"
            align="right"
            :width="widthButton"
        >
            <template #default="scope">
                <el-button
                    v-for="(button, index) in buttons"
                    :icon="button.icon"
                    :type="button.type"
                    :class="button.class"
                    :key="index"
                    @click="$emit('clickButton', button.class, scope.row)"
                    >{{ button.label }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column v-if="links && links.length" align="right">
            <template #default="scope">
                <el-link
                    v-for="(link, index) in links"
                    :class="link.class"
                    :key="index"
                    :underline="false"
                    @click="$emit('clickLink', link.type, scope.row)"
                >
                    {{ link.label }}
                </el-link>
            </template>
        </el-table-column>
    </el-table>
    <div class="table-pagination">
        <p class="table-quantity-data-bottom padding-top-list text-center">
            {{
                t('quantity_item_is_showing_table_footer', [
                    data.total,
                    recordStart,
                    recordEnd,
                ])
            }}
        </p>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="data.total"
            :page-size="data.perPage"
            :currentPage="data.currentPage"
            @current-change="handleChangePage"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const props = defineProps({
    columns: { type: Array<any>, required: true, default: [] },
    data: { type: Object, required: true },
    buttons: { type: Array<any>, required: false, default: [] },
    loading: { type: Boolean, required: true, default: true },
    links: { type: Array<any>, required: false, default: [] },
    showIndex: { type: Boolean, required: false, default: true },
    showCheckbox: { type: Boolean, required: false, default: true },
    hasCreate: { type: Boolean, required: false, default: false },
})
const { columns, data, buttons, loading, links, showIndex, showCheckbox } =
    toRefs(props)

console.log('data :>> ', data.value)

const handleSelectionChange = (val: any[]) => {
    emit('clickCheckbox', val)
}

const emit = defineEmits([
    'changePage',
    'clickButton',
    'sort',
    'clickLink',
    'handleRedirectCreate',
    'cellClick',
    'clickCheckbox',
])

const cellClick = (row: any, column: any, cell: any) => {
    emit('cellClick', row, column, cell)
}
const handleChangePage = (page: any) => emit('changePage', page)
const indexMethod = (index: any) =>
    (data.value.currentPage - 1) * data.value.perPage + index + 1
const sortChange = (sortProps: any) => emit('sort', sortProps)

const recordStart = computed(() =>
    data.value.total > 0
        ? (data.value.currentPage - 1) * data.value.perPage + 1
        : 0
)
const recordEnd = computed(() =>
    data.value.currentPage * data.value.perPage >= data.value.total
        ? data.value.total
        : data.value.currentPage * data.value.perPage
)
const widthButton = computed(() => (buttons.value.length > 1 ? 230 : 100))
</script>

<style lang="scss" scoped>
.link-detail {
    font-size: 11px;
}

.status-pending {
    width: 63px;
    height: 22px;
    text-align: center;
    letter-spacing: 1px;
    color: #468349;
    opacity: 1;
    border: 1px solid #468349;
}

.status-inactive {
    width: 63px;
    height: 22px;
    text-align: center;
    letter-spacing: 1px;
    color: #ffffff;
    opacity: 1;
    background: #969696 0 0 no-repeat padding-box;
}

.status-active {
    width: 63px;
    height: 22px;
    text-align: center;
    letter-spacing: 1px;
    color: #ffffff;
    opacity: 1;
    background: #468349 0 0 no-repeat padding-box;
}

.el-input.company-name {
    width: 90%;
}

.el-input.shop-name {
    width: 90%;
}

.text-gray-500 {
    width: 5%;
}

.info {
    font-size: 20px;
}

.index {
    font: normal normal normal 11px/29px Kozuka Gothic Pr6N !important;
}

.label-index {
    font: normal normal normal 12px/29px Kozuka Gothic Pr6N !important;
}
.table-quantity-data-bottom {
    padding: 8px 0 4px;
}
</style>
