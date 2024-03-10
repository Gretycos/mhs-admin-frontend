import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from "@/router/Router.jsx";
import {RouterProvider} from "react-router-dom";
import {App as MsgApp} from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //     <MsgApp>
  //         <RouterProvider router={router} />
  //     </MsgApp>
  // </React.StrictMode>
    <MsgApp>
        <RouterProvider router={router} />
    </MsgApp>
)
