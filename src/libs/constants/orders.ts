export const STATUS_RESERVED = {
    id: 1,
    name: '予約中',
}

export const STATUS_TODAY_CANCEL = {
    id: 2,
    name: '当日キャンセル',
}

export const STATUS_CANCEL = {
    id: 3,
    name: '予約取り消し',
}

export const STATUS_COMPLETED = {
    id: 4,
    name: '実施',
}

export const ORDER_STATUS = [
    STATUS_RESERVED,
    STATUS_TODAY_CANCEL,
    STATUS_CANCEL,
    STATUS_COMPLETED,
]
