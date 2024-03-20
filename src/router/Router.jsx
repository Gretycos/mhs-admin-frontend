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
import { Request, RequestDetail } from "../views/Request/Request";
import {
  ManageEmployee,
  EditEmployee,
} from "../views/ManageEmployee/ManageEmployee";
import { NoMatch } from "../views/NoMatch";
import { Schedule } from "../views/Schedule/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
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
        },
        {
          path: "/request",
          element: <Request />,
        },
        {
          path: "/request/:id",
          element: <RequestDetail />,
        },
        {
          path: "*",
          element: <NoMatch />,
        },
        {
          path: "/manage-employee",
          element: <ManageEmployee />,
        },
        {
          path: "/manage-employee/edit/:id",
          element: <EditEmployee />,
        },
        {
          path: "/schedule",
          element: <Schedule />,
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
]);

export default router;
