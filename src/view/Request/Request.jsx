import "./Request.less";
import { Table, Button, Input } from "antd";
const { TextArea } = Input;
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
    title: "Patient Name",
    dataIndex: "name",
    width: 200,
    render: (text) => <Link to={`/request/edit`}>{text}</Link>,
  },
  {
    title: "Start Time",
    width: 200,
    dataIndex: "s_time",
  },
  {
    title: "End Time",
    width: 200,
    dataIndex: "e_time",
  },
  {
    title: "Status",
    width: 200,
    dataIndex: "sta",
  },
];

const Request = () => {
  return (
    <div className={"table-div"}>
      <IntroBar title="Patient Register" />
      <Table
        dataSource={dataSource}
        columns={columns}
        className="request-table"
      />
    </div>
  );
};

const detailData = {
  key: 1,
  last_name: "Jessica",
  first_name: "Williams",
  birth: "1996-03-15",
  email: "abc123@gmail.com",
  gender: "female",
  address: "ABC12 Mulholland Drive",
  city: "Southampton",
  postcode: "SO15 2NP",
  mobileNum: "1234567890",
  dateOfBirth: "1996-03-15",
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
      <p className="title">Patient Register Details</p>
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
          <p className="item-txt">
            <span>City: </span>
            {detailData.city}
          </p>
          <p className="item-txt">
            <span>Post Code: </span>
            {detailData.postcode}
          </p>
          <p className="item-txt">
            <span>Mobile Number: </span>
            {detailData.mobileNum}
          </p>
          <p className="item-txt">
            <span>Birthday: </span>
            {detailData.dateOfBirth}
          </p>
          {/* <span>User description: </span>
          <div className="typo-txt">{detailData.description}</div> */}
        </div>

        <div className="reject-reason">
          <TextArea
            placeholder="Please enter the reason for rejection"
            style={{
              resize: "none",
              width: 350,
              height: 200,
            }}
          />
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
    </div>
  );
};

export { Request, RequestDetail };
