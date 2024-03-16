import './App.less'
import SideBar from "@/component/Sider/SideBar.jsx";
import {Outlet} from "react-router-dom";
import TopBar from "@/component/TopBar/TopBar.jsx";
import FootBar from "@/component/FootBar/FootBar.jsx";
import {Layout} from "antd";
const {Content} = Layout
const App = () => {
    return (
        // <div id="app" className="app">
        //     <SideBar/>
        //     <div className="content">
        //         <TopBar/>
        //         <div className="main">
        //             <Outlet/>
        //         </div>
        //         <FootBar/>
        //     </div>
        // </div>
        <Layout>
            <SideBar/>
            <Layout>
                <TopBar/>
                <Content>
                    <Outlet/>
                </Content>
                <FootBar/>
            </Layout>
        </Layout>
    )
}

export default App
