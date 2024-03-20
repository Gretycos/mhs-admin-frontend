import "./Request.less";
import { Table } from "antd";
import { Link } from "react-router-dom";

const status = ["Complete", "Ongoing", "Pause"];
const type = ["Emergency", "Drug", "Examination", "Operation"];

const dataSource = [
  {
    key: "1",
    id: "req10214A",
    name: "Jessica Williams",
    s_time: "2024-03-15 10:46",
    e_time: "2024-03-15 11:46",
    type: type[0],
    sta: status[0],
  },
  {
    key: "2",
    id: "req10234W",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    type: type[1],
    sta: status[1],
  },
  {
    key: "3",
    id: "req10294V",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    type: type[1],
    sta: status[1],
  },
  {
    key: "4",
    id: "req10219S",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    type: type[1],
    sta: status[1],
  },
  {
    key: "5",
    id: "req10210P",
    name: "James Miller",
    s_time: "2024-03-15 10:46",
    e_time: "-",
    type: type[1],
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
    title: "Type",
    dataIndex: "type",
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
      <p>Patient Register</p>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

const detailData = {
  title: "PX102222Q",
  key: 1,
  name: "Jessica Williams",
  age: 32,
  doctor: "Dr. John",
  start_time: "2024-03-15 10:46",
  end_time: "2024-03-15 11:46",
  type: "Emergency",
  status: "Complete",
  location: `SO17 1BJ. University Health Service. 
  Building 48, University of Southampton.`,
  description: `Every day's a blur
  Sometimes I can't tell what day it is
  Don't know what day it is
  Can you tell me what day it is?`,
  suggestion: `I'm a Ferrari pulled off on Mulholland Drive
  Over the city, the lights are so pretty from up here
  I'm a Ferrari (I'm a Ferrari) and after the party's done
  I keep on going, missing the moments
  Living in the fast lane's getting kinda lonely.`,
};

const RequestDetail = () => {
  // 傳入的參數 id

  return (
    <div className="request-detail">
      <p className="title">{detailData.title}</p>
      <div className="form-list">
        <div className="detail">
          <p className="item-txt">
            <span>Start Time: </span>
            {detailData.start_time}
          </p>
          <p className="item-txt">
            <span>Patient: </span>
            {detailData.name}
          </p>
          <p className="item-txt">
            <span>Type: </span>
            {detailData.type}
          </p>
          <p className="item-txt">
            <span>Location: </span>
            {detailData.location}
          </p>
          <span>Problem description: </span>
          <div className="typo-txt">{detailData.description}</div>
        </div>

        <div className="detail">
          <p className="item-txt">
            <span>End Tine:</span>
            {detailData.end_time}
          </p>
          <p className="item-txt">
            <span>Doctor: </span>
            {detailData.doctor}
          </p>
          <p className="item-txt">
            <span>Status: </span>
            {detailData.status}
          </p>
          <span>Doctor Suggestion: </span>
          <div className="typo-txt">{detailData.suggestion}</div>
        </div>
      </div>
    </div>
  );
};

export { Request, RequestDetail };
