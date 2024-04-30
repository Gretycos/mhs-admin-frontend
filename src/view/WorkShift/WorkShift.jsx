/**
 * author: Tsong
 * time: 2024/2/5 14:32
 */
import { useEffect, useState } from "react";
import "./WorkShift.less";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import { Input, Calendar, DatePicker, Radio, Button, Select } from "antd";
import dayjs from "dayjs";
const { Search } = Input;

const WorkShift = () => {
  const [options, setOptions] = useState([]);
  const [workTime, setWorkTime] = useState(1);
  const [selectUser, setSelectUser] = useState({
    user_id: "",
    user_name: "",
  });

  const today = dayjs().format("YYYY-MM-DD");
  const [defaultValue, setDefaultValue] = useState([dayjs(today)]);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const changeShiftTime = (e) => {
    console.log("Shift time change to:", e.target.value);
    setWorkTime(e.target.value);
  };

  const onSelectPractitioner = (value) => {
    console.log("Select practitioner:", value);
    setSelectUser({
      user_id: value[0],
      user_name: value[1],
    });
  };

  const option = [
    {
      value: ["JB1", "James Bond"],
      label: "James Bond",
    },
    {
      value: ["TC2", "Tim Cook"],
      label: "Tim Cook",
    },
    {
      value: ["EM3", "Elon Musk"],
      label: "Elon Musk",
    },
    {
      value: ["JB4", "Jeff Bezos"],
      label: "Jeff Bezos",
    },
    {
      value: ["BG5", "Bill Gates"],
      label: "Bill Gates",
    },
    {
      value: ["LP6", "Larry Page"],
      label: "Larry Page",
    },
  ];

  useEffect(() => {
    if (selectUser) {
      // Reset the DatePicker's default value
      setDefaultValue([dayjs(today)]);
      // Reset the selected work time in Radio.Group
      setWorkTime(1); // Assuming `null` is the original state
    }
  }, [selectUser]);

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
        options={option}
        onSelect={onSelectPractitioner}
        value={selectUser.user_name ? selectUser.user_name : ""}
      />
      <div className="select-workday">
        <div>
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            className="calender"
          />
          {/* <p>*Edit or delete day by clicking the calender.</p> */}
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
            multiple
            onChange={onChangeDate}
            maxTagCount="responsive"
            defaultValue={defaultValue}
            disabledDate={
              (current) =>
                current &&
                (current < dayjs(today) ||
                  current > dayjs(today).endOf("day").add(14, "day"))
              // Can not select days before today
            }
            className="date-picker"
          />
          <p>*Can only select 14 days from today.</p>
          <div className="shift">
            <Radio.Group
              onChange={changeShiftTime}
              value={workTime}
              className="items"
            >
              <Radio value={1}>Morning (8:00am - 12:00pm)</Radio>
              <Radio value={2}>Afternoon (12:00pm - 17:00pm)</Radio>
              <Radio value={3}>All Day (8:00am - 17:00pm)</Radio>
              <Radio value={4}>Day Off</Radio>
            </Radio.Group>
            <Button type="primary" className="submit">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShift;
