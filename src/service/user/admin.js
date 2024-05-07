/**
 * author: Tsong
 * time: 15/03/2024 23:26
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/user'

export const login = (params) => {
    return axios.post(PREFIX + '/login', params)
}

export const logout = () => {
    return axios.delete(PREFIX + '/logout')
}

export const forgot = (params) => {
    return axios.post(PREFIX + '/forgot', params)
}

export const reset = (params) => {
    return axios.post(PREFIX + '/reset', params)
}

export const getAdminInfo = (params) => {
    return axios.get(PREFIX + '/info', {params})
}
