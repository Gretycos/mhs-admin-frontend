/**
 * author: Tsong
 * time: 09/03/2024 20:39
 */
import {Navigate, useNavigate} from "react-router-dom";
import {store} from "@/redux/store.js";
import {App as MsgApp} from "antd";
import {useEffect} from "react";

const RouteGuard = (props) => {
    const token = store.getState()?.globalSlice.user_token
    const {message} = MsgApp.useApp()

    // 防止多重渲染
    useEffect(() => {
        if (!token){
            message.error("please login", 2)
        }
    }, []);

    if (!token) {
        //没有token直接跳转到登录页
        return <Navigate to='/login' replace/>
    }
    return props.children
}

export default RouteGuard
