import { mande } from 'mande'

const URL_API = import.meta.env.VITE_PUBLIC_APP_API

export const API_LOGIN = mande(`${URL_API}/auth/login`)
export const API_REGISTER = mande(`${URL_API}/register`)
export const API_ME = mande(`${URL_API}/auth/me`)
