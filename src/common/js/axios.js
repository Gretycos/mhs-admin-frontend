/**
 * author: Tsong
 * time: 2024/03/09 01:09
 */

import axios from 'axios'
import {store} from "@/redux/store.js";
import {message} from "antd";

// console.log('import.meta.env', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '/admin' : '/admin'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = store.getState()?.globalSlice.token
axios.defaults.headers['admin-id'] = store.getState()?.globalSlice.adminId
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
    // console.log(store.getState())
    config.headers['token'] = store.getState()?.globalSlice.token
    config.headers['admin-id'] = store.getState()?.globalSlice.adminId
    return config
})

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        message.error('server error', 2)
        return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
        message.error(res.data.message, 2)
        if (res.data.resultCode === 416) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
}, rej => {
    if (rej.response.status === 401){
        message.error("timeout", 2)
        window.location.href = '/login'
    }
    console.log(rej.response)
    return Promise.reject(rej.response.statusText)
})


export default axios
