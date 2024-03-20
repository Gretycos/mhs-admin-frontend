/**
 * author: Tsong
 * time: 2024/2/1 11:41
 */
import "./SideBar.less";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu, Layout} from "antd";
import {
  QuestionCircleOutlined,
  MailOutlined,
  FormOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Sider } = Layout
const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem("Home", "/home", <MailOutlined />),
  {
    type: "divider",
  },
  getItem("Register Request", "/Request", <FormOutlined />),
  getItem("Manage Employee", "sub2", <QuestionCircleOutlined />, [
    getItem("View", "/manage-employee"),
    getItem("Add", "/manage-employee/add"),
    getItem("Edit", "/manage-employee/edit"),
  ]),
  getItem("Duty Schedule", "/schedule", <ClockCircleOutlined />),
];

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
