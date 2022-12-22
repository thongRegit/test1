import { ElLoading } from 'element-plus'

export const LoadingVue = () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return loading
}
