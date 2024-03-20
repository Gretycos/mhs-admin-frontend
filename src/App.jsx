import "./App.less";
import Sider from "@/components/Sider/Sider.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "@/components/TopBar/TopBar.jsx";
import FootBar from "@/components/FootBar/FootBar.jsx";
import { persistor, store } from "@/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppCore />
      </PersistGate>
    </Provider>
  );
};

const AppCore = () => {
  return (
    <div id="app" className="app">
      <Sider />
      <div className="content">
        <TopBar />
        <div className="main">
          <Outlet />
        </div>
        {/* <FootBar/> */}
      </div>
    </div>
  );
};

export default App;
