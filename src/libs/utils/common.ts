import { ACTIVE_STATUS } from '@/libs/constants/constants'

export const findData = (arr: any, id: any) => {
    if (arr.length > 0) return arr.find((item: any) => item.id == id)
    return []
}

export const findIndex = (arr: any, index: number): number => {
    return arr.findIndex((item: any) => item.index === index)
}

export const findStatus = (isActive: number) => {
    return ACTIVE_STATUS.find((item) => item.is_active == isActive)
}
