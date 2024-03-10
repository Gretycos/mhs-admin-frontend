/**
 * author: Tsong
 * time: 2024/03/09 01:09
 */

import axios from 'axios'
import {App as MsgApp} from "antd";
import {store} from "@/redux/store.js";

// console.log('import.meta.env', import.meta.env)
const {message} = MsgApp.useApp()

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '/api' : '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = store.getState()?.globalSlice.user_token
axios.defaults.headers['user-id'] = store.getState()?.globalSlice.user_id
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        message.error('server error', 2)
        return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
        if (res.data.resultCode === 416) {
            message.error(res.data.message, 2)
        } else {
            message.error(res.data.message, 2)
        }
        return Promise.reject(res.data)
    }

    return res.data
}, rej => {
    if (rej.response.status === 401){
        message.error("timeout", 2)
    }
    console.log(rej.response)
    return Promise.reject(rej.response.statusText)
})


export default axios
