/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkShift.less";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import axios from "axios";
import { store } from "@/redux/store.js";
import {
  Input,
  Calendar,
  DatePicker,
  Radio,
  Button,
  Select,
  Row,
  Col,
  Modal,
} from "antd";
import dayjs from "dayjs";
import {
  getEmployeeList,
  createWorkShift,
  getDailyWorkShift,
} from "@/service/user/admin.js";
const { Search } = Input;

const WorkShift = () => {
  const [options, setOptions] = useState([]);
  const [workTime, setWorkTime] = useState(null);
  const [selectUser, setSelectUser] = useState({
    user_id: "",
    user_name: "",
  });
  const [listData, setListData] = useState([]);
  const [disabledDate, setDisabledDate] = useState(false);
  const [changePanel, setChangePanel] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");
  const [selectDate, setSelectDate] = useState(dayjs(today));

  const onPanelChange = (value, mode) => {
    console.log("onPanelChange", dayjs(value.$d).format("YYYY-MM-DD"), mode);
    setSelectDate(dayjs(value.$d));
    setChangePanel(true);
  };

  const changeShiftTime = (e) => {
    console.log("Shift time change to:", e.target.value);
    setWorkTime(e.target.value);
  };

  const onSelectPractitioner = (value) => {
    setSelectUser({
      user_id: value[0],
      user_name: value[1],
    });
  };

  // Return the work shift for work.
  const getSetListData = async () => {
    try {
      const date = selectDate.format("YYYY-MM-DD");
      const response = await getDailyWorkShift({
        practId: selectUser.user_id,
        workDate: date,
      });
      if (response.resultCode === 200) {
        console.log("response.data", response.data);
        setListData(response.data);
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  const setDay = (value) => {
    // Find if the user has a schedule on the day
    if (listData.length === 0) return <></>;
    const dateString = dayjs(value.$d).format("YYYY-MM-DD");
    var arrayObj = new Set(); // 判斷是否有當天的排班 如果0, 1都存在則顯示2

    for (let item of listData) {
      if (item.workDate === dateString) {
        arrayObj.add(item.shiftType);
      }
    }

    if (arrayObj.has(0) && arrayObj.has(1)) {
      return (
        <div
          style={{
            backgroundColor: "orange",
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            margin: "3px auto",
          }}
        ></div>
      );
    } else if (arrayObj.has(0)) {
      return (
        <div
          style={{
            backgroundColor: "green",
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            margin: "3px auto",
          }}
        ></div>
      );
    } else if (arrayObj.has(1)) {
      return (
        <div
          style={{
            backgroundColor: "blue",
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            margin: "3px auto",
          }}
        ></div>
      );
    }
    return <></>;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectUser) {
      getSetListData();
      setSelectDate(dayjs(today));
      setWorkTime(null);
    }
    practitionerList();
  }, [selectUser]);

  useEffect(() => {
    if (changePanel) {
      getSetListData();
      setChangePanel(false);
    }
  }, [changePanel]);

  // Select the date of the work shift.
  const handleDateChange = (value) => {
    if (dayjs(value).M != selectDate.$M) {
      setChangePanel(true);
    }
    setSelectDate(dayjs(value));
    if (
      (value && value > dayjs().endOf("day").add(60, "day")) ||
      (value && value < dayjs().startOf("day"))
    ) {
      setDisabledDate(true);
    } else {
      setDisabledDate(false);
    }
  };

  // Get the list of practitioners when the page is loaded.
  const practitionerList = async () => {
    const { data } = await getEmployeeList();
    const options = data.map((item) => ({
      value: [item.practId, item.givenName + " " + item.familyName],
      label: item.givenName + " " + item.familyName,
    }));
    setOptions(options);
  };

  // Click the confirm button to submit the work shift.
  const submitWorkShift = async () => {
    const adminId = (axios.defaults.headers["admin-id"] =
      store.getState()?.globalSlice.adminId);
    try {
      const response = await createWorkShift({
        adminId,
        practId: selectUser.user_id,
        workDate: dayjs(selectDate.$d).format("YYYY-MM-DD"),
        shiftType: workTime,
      });
      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Work shift submitted",
          onOk: () => {
            getSetListData();
            setWorkTime(null);
          },
        });
      }
    } catch (error) {
      console.log(
        "submitWorkShift",
        adminId,
        selectUser.user_id,
        dayjs(selectDate.$d).format("YYYY-MM-DD"),
        workTime
      );
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  return (
    <div className="work-shift">
      <IntroBar title="Add Individual Schedule" />
      <Select
        showSearch
        className="search-input"
        placeholder="Select practitioner"
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
        onSelect={onSelectPractitioner}
        value={selectUser.user_name ? selectUser.user_name : ""}
      />
      <div className="select-workday">
        <div>
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            onSelect={(value) => handleDateChange(value)}
            value={selectDate}
            defaultValue={dayjs().format("YYYY-MM-DD")}
            cellRender={(value) => setDay(value)}
            HeaderRender={({ value }) => {
              // 确保 value 是 Day.js 对象
              const currentValue = dayjs(value);
              const months = [];
              for (let i = 0; i < 12; i++) {
                months.push(currentValue.month(i).format("MMM"));
              }

              const year = currentValue.year();
              const yearOptions = [];
              for (let i = year - 10; i <= year + 10; i++) {
                yearOptions.push(
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                );
              }

              const month = currentValue.month();
              const monthOptions = [];
              for (let i = 0; i < 12; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i}>
                    {months[i]}
                  </Select.Option>
                );
              }

              return (
                <div style={{ padding: 8 }} className="calender-header">
                  <Row gutter={8}>
                    <Col>
                      <Select
                        size="small"
                        value={year}
                        onChange={(newYear) =>
                          onChange(dayjs(value).year(newYear).month(month))
                        }
                      >
                        {yearOptions}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        value={month}
                        onChange={(newMonth) =>
                          onChange(dayjs(value).year(year).month(newMonth))
                        }
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
            className="calender"
          />
          <div className="color">
            <p className="green circle" />
            <span>Morning</span>
            <p className="blue circle"></p>
            <span>Afternoon</span>
            <p className="orange circle"></p>
            <span>All Day</span>
          </div>
        </div>

        <div className="workday">
          <p className="title">Shift Timetable</p>
          <p className="name">
            Name of the Practitioner:
            {` ${selectUser.user_name ? selectUser.user_name : ""}`}
          </p>
          <p>ID: {`${selectUser.user_id ? selectUser.user_id : ""}`}</p>
          <p>Select Date(s): </p>
          <DatePicker
            onChange={handleDateChange}
            disabled={selectUser.user_name ? false : true}
            needConfirm
            value={
              !disabledDate
                ? selectUser.user_name
                  ? selectDate
                  : dayjs()
                : selectDate
            }
            // defaultValue={dayjs().format("YYYY-MM-DD")}
            disabledDate={(current) => {
              return (
                (current &&
                  current > dayjs(today).endOf("day").add(60, "day")) ||
                (current && current < dayjs(today).startOf("day"))
              );
              // Can not select days before today
            }}
            className="date-picker"
            format={"YYYY/MM/DD"}
            picker="date"
          />
          <p>*Can only select 2 months from today.</p>
          <div className="shift">
            <Radio.Group
              onChange={changeShiftTime}
              value={workTime}
              className="items"
              disabled={
                !disabledDate
                  ? selectUser.user_name
                    ? false
                    : true
                  : disabledDate
              }
            >
              <Radio value={0}>Morning (8:00am - 12:00pm)</Radio>
              <Radio value={1}>Afternoon (12:00pm - 17:00pm)</Radio>
              <Radio value={2}>All Day (8:00am - 17:00pm)</Radio>
              <Radio value={3}>Day Off</Radio>
            </Radio.Group>
            <Button
              type="primary"
              className="submit"
              disabled={
                !disabledDate
                  ? selectUser.user_name
                    ? false
                    : true
                  : disabledDate
              }
              onClick={() => submitWorkShift()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShift;
