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
