import request from '@/config/axios'
import type {
    patternPayload,
    createPatternPayload,
} from '@/libs/interface/patternInterface'

export const getListPattern = (payload: patternPayload | null) => {
    return request.get('/patterns', {
        params: payload,
    })
}

export const createPattern = (payload: createPatternPayload) => {
    return request.post('/patterns/create', payload)
}

export const updatePattern = (payload: createPatternPayload, id: number) => {
    return request.put(`patterns/${id}/update`, payload)
}
