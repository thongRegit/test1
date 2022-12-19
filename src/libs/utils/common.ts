import { TYPE_QUESTION } from '@/libs/constants/constants'

export const findData = (arr: any, id: any) => {
    if (arr.length > 0) return arr.find((item) => item.id == id)
    return []
}

export const findIndex = (arr: any, index: number): number => {
    return arr.findIndex((item) => item.index === index)
}

export const findType = (type_id: string) => {
    const arr = Object.keys(TYPE_QUESTION)
    const index = arr.findIndex((item) => TYPE_QUESTION[item] === type_id)
    return arr[index]
}
