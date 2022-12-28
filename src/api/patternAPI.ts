import axios from '@/config/axios'
import type {
    patternPayload,
    createPatternPayload,
} from '@/libs/interface/patternInterface'

export const getListPattern = (payload: patternPayload | null) => {
    return axios.get('/patterns', {
        params: payload,
    })
}

export const createPattern = (payload: createPatternPayload) => {
    return axios.post('/patterns/create', payload)
}

export const updatePattern = (payload: createPatternPayload, id: number) => {
    return axios.put(`patterns/${id}/update`, payload)
}
