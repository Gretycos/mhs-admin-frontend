/**
 * author: Tsong
 * time: 2024/2/5 14:29
 */
import "./TopBar.less";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar } from "antd";

const { Header } = Layout;

let data = [
  {
    key: "a",
    title: "test1",
    link: "/test",
  },
  {
    key: "b",
    title: "test2",
    link: "/test",
  },
  {
    key: "c",
    title: "test3",
    link: "/test",
  },
];

let userInfo = {
  id: "1",
  name: "admin",
};

const TopBar = () => {
  const TitleList = data.map((arr) => {
    return (
      <a href={arr.link} key={arr.key} className="title">
        {arr.title}
      </a>
    );
  });

  console.log(data, TitleList);
  return (
    <Header className="top-bar">
      {/* {TitleList} */}
      <div className="user-info">
        <span>Welcome, {userInfo.name}</span>
      </div>
      <Avatar icon={<UserOutlined /> } className="icon"/>
    </Header>
  );
};

export default TopBar;
