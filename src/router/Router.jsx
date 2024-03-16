/**
 * author: Tsong
 * time: 2024/2/5 14:21
 */
import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "@/views/Home/Home.jsx";
import WorkShift from "@/views/WorkShift/WorkShift.jsx";
import AuthGuard from "@/router/RouteGuard.jsx"
import App from "@/App.jsx";
import Login from "@/views/Login/Login.jsx";

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
    }
])

export default router
