import "./Schedule.less";
import { DatePicker, Table, Calendar, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const Schedule = () => {
  const columns = [
    {
      title: "Employee Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
  ];

  for (let i = 8; i < 25; i++) {
    columns.push({
      title: `${i - 1}:00`,
      width: 100,
      dataIndex: `hour${i - 1}`,
      key: `hour${i - 1}`,
      onCell: (record) => {
        // console.log("record:", record);
        return {
          style: {
            backgroundColor: record[`hour${i - 1}`] ? "#2e79ba" : "#ececec", //判断单元格的值,来显示背景颜色
            color: "white", //单元格文字颜色
          },
        };
      },
    });
  }
  columns.push({
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (text) => (
      <Link to={`/schedule/${text.userid}`}>{text.userid}</Link>
    ),
  });

  const userData = [];
  for (let i = 0; i < 100; i++) {
    userData.push({
      key: i,
      name: `Edward ${i}`,
      hour10: true,
      address: `London Park no. ${i}`,
      userid: "P01234x",
    });
  }

  const now = dayjs();
  const start = now.subtract(7, "day");
  const end = now.add(7, "day");

  return (
    <div className="schedule-page">
      <p className="title">Day Schedule</p>
      <DatePicker className="date-picker" defaultvalue={now} />
      <Table
        className="table-day"
        columns={columns}
        dataSource={userData}
        scroll={{ x: 300, y: 300 }}
      />
    </div>
  );
};

const PersonalSchedule = () => {
  // an example of schedule data
  const initialSchedule = [
    {
      id: 1,
      day: "2024-03-22",
      time: ["9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM"],
    },
    {
      id: 2,
      day: "2024-03-21",
      time: ["9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM"],
    },
    {
      id: 3,
      day: "2024-03-20",
      time: ["9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM"],
    },
    {
      id: 4,
      day: "2024-03-19",
      time: ["9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM"],
    },
    {
      id: 5,
      day: "2024-03-18",
      time: ["9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM"],
    },
  ];

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 1:
      case 8:
        listData = [{ type: "working day" }];
        break;
      case 10:
      case 11:
        listData = [{ type: "off day" }];
        break;
      case 12:
      case 15:
        listData = [{ type: "working day" }];
        break;
      default:
      // listData = [{ type: "off day" }];
    }
    return listData || [];
  };

  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectDay, setSelectDay] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    console.log("selectDay:", selectDay);
    console.log("showPopup:", showPopup);
  }, [selectDay, showPopup]);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const cellRender = (current) => {
    const listData = getListData(current);

    const handleEditSchedule = () => {
      // 这里可以显示一个弹窗，供用户编辑工作时间表
      // 这里简化为在控制台中打印一条消息
      // console.log("edit schedule");
      setSelectDay(current.format("YYYY-MM-DD"));
      setShowPopup(true);
    };

    return (
      <div>
        {listData.map((item, index) => (
          <Button
            key={index}
            type={item.type === "working day" ? "primary" : "dashed"}
            onClick={() => handleEditSchedule()}
          >
            {item.type}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="schedule-page">
      <p className="title">Personal Schedule</p>
      <Calendar cellRender={cellRender} />
      {showPopup && (
        <>
          <div className="overlay"></div>
          <div className="card">
            <Card
              className="popup-card"
              type="inner"
              title="Work hour"
              extra={<Link to="#">Edit</Link>}
            >
              <div className="popup-card-content">
                <ul>
                  <li>07:00-11:00</li>
                  <li>12:30-18:30</li>
                </ul>
              </div>

              <Button
                onClick={() => handlePopupClose()}
                className="popup-card-button"
              >
                Close
              </Button>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export { Schedule, PersonalSchedule };
