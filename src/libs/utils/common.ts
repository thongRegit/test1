import {
    ACTIVE_STATUS,
    CANCELLING_PAY_STATUS_USERS,
} from '@/libs/constants/constants'
import dayjs from 'dayjs'

export const findData = (arr: any, id: any) => {
    if (arr.length > 0) return arr.find((item: any) => item.id == id)
    return []
}

export const findIndex = (arr: any, index: number): number => {
    return arr.findIndex((item: any) => item.index === index)
}

export const findStatus = (isActive: number | boolean) => {
    return ACTIVE_STATUS.find((item) => item.is_active == isActive)
}

export const getFormikErr = (data: any) => {
    const errorData: any = {}
    Object?.values(data).forEach((v: any, k: any) => {
        errorData[k] = v + ''
    })
    return errorData
}

export const cancellingPayStatusLabel = (status: number) => {
    return `<span class="${status === 1 ? 'text-danger' : ''}">${
        CANCELLING_PAY_STATUS_USERS[status]
    }</span>`
}

export const checkDayFuture = (day: string | Date) => {
    const hours = dayjs().diff(day, 'hours')
    return Math.floor(hours / 24)
}
