import "./Request.less";
import { Table, Button, Input, Modal } from "antd";
const { TextArea } = Input;
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
const status = ["Complete", "Ongoing", "Pause"];
import {
  getRegisterPatients,
  getRegisterPatientDetails,
  rejectRegister,
  approveRegister,
} from "@/service/user/admin.js";
import dayjs from "dayjs";

const columns = [
  {
    title: "Patient Name",
    dataIndex: "name",
    width: 200,
    render: (text, record) => <Link to={`/request/${record.id}`}>{text}</Link>,
  },
  {
    title: "Email",
    width: 200,
    dataIndex: "email",
  },
  {
    title: "Gender",
    width: 100,
    dataIndex: "sex",
  },
  {
    title: "Date of Birth",
    width: 200,
    dataIndex: "birth",
  },
];

const Request = () => {
  const [reqList, setReqList] = useState([{}]);
  const getRequestList = async () => {
    const { data } = await getRegisterPatients({
      state: 0, // 0: pending, 1: approved, 2: rejected
    });
    const extractedData = data.map((item) => ({
      key: item.reqId,
      id: item.reqId,
      name: item.givenName + " " + item.familyName,
      email: item.email,
      sex: item.sex === 0 ? "female" : "male",
      birth: dayjs(item.dateOfBirth).format("DD/MM/YYYY"),
    }));
    setReqList(extractedData);
  };

  useEffect(() => {
    getRequestList();
  }, []);

  return (
    <div className={"table-div"}>
      <IntroBar title="Patient Register" />
      <Table dataSource={reqList} columns={columns} className="request-table" />
    </div>
  );
};

const RequestDetail = () => {
  const { id } = useParams(); // 傳入的參數 id
  const [reqDetail, setReqDetail] = useState({});
  const getRequestDetail = async () => {
    const { data } = await getRegisterPatientDetails({
      reqId: id,
    });

    setReqDetail(data);
  };

  useEffect(() => {
    getRequestDetail();
  }, []);

  const rejectSubmit = async () => {
    try {
      if (
        (reqDetail.reason =
          null || reqDetail.reason === "" || reqDetail.reason === undefined)
      ) {
        Modal.error({
          title: "Error",
          content: "Please enter the reason for rejection",
        });
        return;
      }
      const response = await rejectRegister({
        reqId: reqDetail.reqId,
        name: reqDetail.givenName,
        email: reqDetail.email,
        reason: reqDetail.reason,
      });
      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Reject submitted.",
          onOk: () => {
            navigate("/");
          },
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  const navigate = useNavigate();

  const approveSubmit = async () => {
    try {
      const response = await approveRegister({
        reqId: reqDetail.reqId,
        name: reqDetail.givenName,
        email: reqDetail.email,
      });

      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Approve submitted.",
          onOk: () => {
            navigate("/");
          },
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  return (
    <div className="request-detail">
      <p className="title">Patient Register Details</p>
      <div className="form-list">
        <div className="detail">
          <p className="item-txt">
            <span>Given Name: </span>
            {reqDetail.givenName}
          </p>
          <p className="item-txt">
            <span>Family Name: </span>
            {reqDetail.familyName}
          </p>
          <p className="item-txt">
            <span>Date of Birth: </span>
            {dayjs(reqDetail.dayOfBirth).format("DD/MM/YYYY")}
          </p>
          <p className="item-txt">
            <span>Gender: </span>
            {reqDetail.sex === 0 ? "Female" : "Male"}
          </p>
          <p className="item-txt">
            <span>Email: </span>
            {reqDetail.email}
          </p>
          <p className="item-txt">
            <span>Address: </span>
            {reqDetail.addr1 + " " + (reqDetail.addr2 ? reqDetail.addr2 : "")}
          </p>
          <p className="item-txt">
            <span>City: </span>
            {reqDetail.city}
          </p>
          <p className="item-txt">
            <span>Post Code: </span>
            {reqDetail.postcode}
          </p>
          <p className="item-txt">
            <span>Mobile Number: </span>
            {reqDetail.mobileNum ? reqDetail.mobileNum : "N/A"}
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
            onBlur={(e) => {
              console.log("reason", e.target.value);
              setReqDetail({ reason: e.target.value, ...reqDetail });
            }}
          />
          <div className="check">
            <Button type="default" className="btn" onClick={rejectSubmit}>
              Reject
            </Button>
            <Button type="primary" className="btn" onClick={approveSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Request, RequestDetail };
