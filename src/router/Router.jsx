/**
 * author: Tsong
 * time: 2024/2/5 14:21
 */
import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "@/view/Home/Home.jsx";
import WorkShift from "@/view/WorkShift/WorkShift.jsx";
import AuthGuard from "@/router/RouteGuard.jsx"
import App from "@/App.jsx";
import Login from "@/view/Login/Login.jsx";
import ForgotPsw from "@/view/ForgotPsw/ForgotPsw.jsx";
import ResetPsw from "@/view/ResetPsw/ResetPsw.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                // element: <AuthGuard><Home/></AuthGuard> // 守卫，需要登录
                element: <Home/>
            },
            {
                path: "/work-shift",
                element: <AuthGuard><WorkShift/></AuthGuard>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forgot",
        element: <ForgotPsw />
    },
    {
        path: "/reset",
        element: <ResetPsw />
    },
])

export default router
