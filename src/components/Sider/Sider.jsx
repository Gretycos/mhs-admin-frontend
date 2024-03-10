/**
 * author: Tsong
 * time: 2024/2/1 11:41
 */
import {useState} from "react";
import "./Sider.less";
import {useLocation, useNavigate} from "react-router-dom";
import {AppstoreOutlined, MailOutlined} from "@ant-design/icons";
import {Menu} from "antd";

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

const Sider = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = ({key}) => {
        navigate(key)
    }
    return (
        <Menu
            className="sider"
            onClick={handleClick}
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={items.map(it => it.key)}
            mode="inline"
            items={items}
        />
    )
}

export default Sider
