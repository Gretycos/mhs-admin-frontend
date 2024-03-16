import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from "@/router/Router.jsx";
import {RouterProvider} from "react-router-dom";
import {App as MsgApp} from 'antd'
import {persistor, store} from "@/redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //     <MsgApp>
  //         <RouterProvider router={router} />
  //     </MsgApp>
  // </React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <MsgApp>
                <RouterProvider router={router} />
            </MsgApp>
        </PersistGate>
    </Provider>
)
