/**
 * author: Tsong
 * time: 2024/2/1 11:41
 */
import "./SideBar.less";
import {useLocation, useNavigate} from "react-router-dom";
import {AppstoreOutlined, MailOutlined} from "@ant-design/icons";
import {Menu, Layout} from "antd";
const {Sider} = Layout

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type
    }
}

const items = [
    getItem('Home', 'sub1', <MailOutlined />, [
        getItem('Home', '/home'),
    ]),
    {
        type: 'divider',
    },
    getItem('Practitioner', 'sub2', <AppstoreOutlined />, [
        getItem('WorkShift', '/work-shift'),
    ]),
]

const SideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = ({key}) => {
        navigate(key)
    }
    return (
        <Sider className="sider" theme="light">
            <div className="sider-logo" />
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={items.map(it => it.key)}
                mode="inline"
                items={items}
            />
        </Sider>
    )
}

export default SideBar
