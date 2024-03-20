import "./Schedule.less";
import { Calendar, Badge, Select, Row, Col } from "antd";
import dayjs from "dayjs";

const Schedule = () => {
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event......" },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const now = dayjs();
  const start = now.subtract(7, "day");
  const end = now.add(7, "day");

  return (
    <div className="schedule-page">
      <p className="title">Duty Schedule</p>
      <Calendar
        className="calendar"
        cellRender={cellRender}
        validRange={[start, end]}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];

          const month = value.month();
          const year = value.year();

          const optionsMonth = [];
          const optionsYear = [];

          for (let i = 2019; i < year + 5; i++) {
            //我这里是需要最前2019年，所以设置2019
            optionsYear.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }

          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
            optionsMonth.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          /* 上个月 可直接调用 */
          const prev = () => {
            let newMonth = now.subtract(1, "month");
            onChange(newMonth);
          };

          /* 下个月 可直接调用 */
          const next = () => {
            let newMonth = now.add(1, "month");
            onChange(newMonth);
          };

          /* 今天 */
          const showTotay = () => {
            let today = now;
            onChange(today);
            console.log(1);
          };

          return (
            <div style={{ padding: 10 }}>
              <Row type="flex" justify="space-between">
                <Col>
                  <Select
                    size="small"
                    className="year-select"
                    onChange={(newYear) => {
                      onChange(value.clone().year(newYear));
                    }}
                    value={year}
                  >
                    {optionsYear}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    className="month-select"
                    onChange={(newMonth) => {
                      onChange(value.clone().month(newMonth));
                    }}
                    value={month}
                  >
                    {optionsMonth}
                  </Select>
                </Col>
                <div>
                  <span onClick={prev}>left</span>
                  <span onClick={showTotay}>Today</span>
                  <span onClick={next}>Next</span>
                </div>
              </Row>
            </div>
          );
        }}
      />
    </div>
  );
};

export { Schedule };
