import "./Request.less";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
const status = ["Complete", "Ongoing", "Pause"];

const dataSource = [
  {
    key: "1",
    id: "req10214A",
    name: "Jessica Williams",
    s_time: "2024-03-15 10:46",
    e_time: "2024-03-15 11:46",
    sta: status[0],
  },
  {
    key: "2",
    id: "req10234W",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    sta: status[1],
  },
  {
    key: "3",
    id: "req10294V",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    sta: status[1],
  },
  {
    key: "4",
    id: "req10219S",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    sta: status[1],
  },
  {
    key: "5",
    id: "req10210P",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    sta: status[1],
  },
];

const columns = [
  {
    title: "Case ID",
    dataIndex: "id",
    render: (text) => <Link to={`/request/${text}`}>{text}</Link>,
  },
  {
    title: "Patient Name",
    dataIndex: "name",
  },
  {
    title: "Start Time",
    dataIndex: "s_time",
  },
  {
    title: "End Time",
    dataIndex: "e_time",
  },
  {
    title: "Status",
    dataIndex: "sta",
  },
];

const Request = () => {
  return (
    <div className={"table-div"}>
      <IntroBar title="Patient Register"/>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

const detailData = {
  title: "PX102222Q",
  key: 1,
  last_name: "Jessica",
  first_name: "Williams",
  birth: "1996-03-15",
  email: "abc123@gmail.com",
  gender: "female",
  description: `Every day's a blur
  Sometimes I can't tell what day it is
  Don't know what day it is
  Can you tell me what day it is?`,
  address: "ABC12 Mulholland Drive",
  // suggestion: `I'm a Ferrari pulled off on Mulholland Drive
  // Over the city, the lights are so pretty from up here
  // I'm a Ferrari (I'm a Ferrari) and after the party's done
  // I keep on going, missing the moments
  // Living in the fast lane's getting kinda lonely.`,
};

const RequestDetail = () => {
  // 傳入的參數 id

  return (
    <div className="request-detail">
      <p className="title">{detailData.title}</p>
      <div className="form-list">
        <div className="detail">
          <p className="item-txt">
            <span>First Name: </span>
            {detailData.first_name}
          </p>
          <p className="item-txt">
            <span>Last Name: </span>
            {detailData.last_name}
          </p>
          <p className="item-txt">
            <span>Date of Birth: </span>
            {detailData.birth}
          </p>
          <p className="item-txt">
            <span>Gender: </span>
            {detailData.gender}
          </p>
          <p className="item-txt">
            <span>Email: </span>
            {detailData.email}
          </p>
          <p className="item-txt">
            <span>Address: </span>
            {detailData.address}
          </p>
          <span>User description: </span>
          <div className="typo-txt">{detailData.description}</div>
        </div>

        <div className="check">
          <Button type="default" className="btn">
            Reject
          </Button>
          <Button type="primary" className="btn">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Request, RequestDetail };
