/**
 * author: Tsong
 * time: 2024/2/1 11:41
 */
import { useState } from "react";
import "./Sider.less";
import { useLocation, useNavigate } from "react-router-dom";
import {
  QuestionCircleOutlined,
  MailOutlined,
  FormOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

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

const Sider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = ({ key }) => {
    navigate(key);
  };
  return (
    <Menu
      className="sider"
      onClick={handleClick}
      defaultSelectedKeys={[location.pathname]}
      defaultOpenKeys={items.map((it) => it.key)}
      mode="inline"
      items={items}
    />
  );
};

export default Sider;
