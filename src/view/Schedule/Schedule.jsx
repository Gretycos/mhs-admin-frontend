import "./Schedule.less";
import { DatePicker, Table, Calendar, Button, Card } from "antd";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getEveryoneWorkShiftByDate } from "@/service/user/admin.js";

const Schedule = () => {
  // define the columns of the table
  const columns = [
    {
      title: "Practitioner Name",
      width: "200px",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: `morning`,
      width: "100px",
      key: `morning`,
      align: "-webkit-center",
      render: (record) =>
        record[`workShift`] === "morning" ? (
          <div className="custom-cell"></div>
        ) : (
          <></>
        ),
    },
    {
      title: `afternoon`,
      width: "100px",
      key: `afternoon`,
      align: "-webkit-center",
      render: (record) =>
        record[`workShift`] === "afternoon" ? (
          <div className="custom-cell"></div>
        ) : (
          <></>
        ),
    },
    {
      title: `all day`,
      width: "200px",
      key: `dayOff`,
      align: "-webkit-center",
      render: (record) =>
        record[`workShift`] === "AllDay" ? (
          <div className="custom-cell"></div>
        ) : (
          <></>
        ),
    },
    {
      title: `day off`,
      width: "200px",
      key: `dayOff`,
      align: "-webkit-center",
      render: (record) =>
        record[`workShift`] === "dayOff" ? (
          <div className="custom-cell"></div>
        ) : (
          <></>
        ),
    },
  ];

  // columns.push();

  const now = dayjs();
  const start = now.subtract(7, "day");
  const end = now.add(7, "day");
  const [selectDate, setSelectDate] = useState(dayjs(now));

  const [workShiftList, setWorkShiftList] = useState([{}]);
  function getShiftName(shiftType) {
    switch (shiftType) {
      case 0:
        return "morning";
      case 1:
        return "afternoon";
      case 2:
        return "AllDay";
      case 3:
        return "dayOff";
      default:
        return "Unknown";
    }
  }
  // get all work shift data group by practitioner and date.
  const getWorkShiftList = async () => {
    const date = dayjs(selectDate).format("DD-MM-YYYY");
    const { data } = await getEveryoneWorkShiftByDate({
      date, // 0: pending, 1: approved, 2: rejected
    });
    const extractedData = data.map((item) => ({
      key: item.practId,
      workDate: item.workDate,
      workShift: getShiftName(item.shiftType),
      name: item.practName,
    }));
    setWorkShiftList(extractedData);
  };

  const handleDateChange = (value) => {
    setSelectDate(dayjs(value));
    console.log("selectDate:", selectDate);
  };

  useEffect(() => {
    getWorkShiftList();
  }, [selectDate]);

  // Used to monitor changes to workShiftList and execute after each update
  useEffect(() => {}, [workShiftList]);

  return (
    <div className="schedule-page">
      <IntroBar title="View All Schedule" />
      <DatePicker
        onChange={handleDateChange}
        className="date-picker"
        value={selectDate}
      />
      <Table
        className="table-day"
        columns={columns}
        dataSource={workShiftList}
      />
    </div>
  );
};

// no-used code
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
