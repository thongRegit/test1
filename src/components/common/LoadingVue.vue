<script lang="ts" setup>
import { ElLoading } from 'element-plus'

const loading = defineProps<{
    loading?: boolean | undefined
}>()

const elShow = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
})
if (loading) {
    elShow.close()
}
</script>
