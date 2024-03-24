/**
 * author: Tsong
 * time: 2024/2/5 14:21
 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/views/Home/Home";
import WorkShift from "@/views/WorkShift/WorkShift.jsx";
import AuthGuard from "@/router/RouteGuard.jsx";
import App from "@/App.jsx";
import Login from "@/views/Login/Login.jsx";
import { Request, RequestDetail } from "../views/Request/Request";
import {
  ManageEmployee,
  EditEmployee,
  AddEmployee,
} from "../views/ManageEmployee/ManageEmployee";
import { NoMatch } from "../views/NoMatch";
import { Schedule, PersonalSchedule } from "../views/Schedule/Schedule";

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
        element: <Home />,
      },
      {
        path: "/work-shift",
        element: (
          <AuthGuard>
            <WorkShift />
          </AuthGuard>
        ),
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
        path: "/manage-employee/add",
        element: <AddEmployee />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/schedule/:id",
        element: <PersonalSchedule />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
