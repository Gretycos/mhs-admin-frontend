/**
 * author: Tsong
 * time: 2024/2/5 14:29
 */
import "./TopBar.less"
import { Layout } from "antd";

const { Header } = Layout

let data = [
  {
    key: "a",
    title: "ALL STATUS",
    link: "/test",
  },
  {
    key: "b",
    title: "EMERGENCY",
    link: "/test",
  },
  {
    key: "c",
    title: "DRUG",
    link: "/test",
  },
];

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
      {TitleList}
      </Header>
  );
};

export default TopBar;
