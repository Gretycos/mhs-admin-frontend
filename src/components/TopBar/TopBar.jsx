/**
 * author: Tsong
 * time: 2024/2/5 14:29
 */
import "./TopBar.less";

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
    <div className="top-bar">
      {/* This is topbar */}
      {TitleList}
    </div>
  );
};

export default TopBar;
