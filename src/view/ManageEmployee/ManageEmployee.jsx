import "./ManageEmployee.less";
import {
  Space,
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  InputNumber,
} from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const { Column, ColumnGroup } = Table;
const dateFormat = "YYYY-MM-DD";

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    address: "New York No. 1 Lake Park",
    email: "jb32k@soton.mhs.uk",
    phone: "07442933210",
    position: "Doctor",
    id: "jb1023w",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    address: "London No. 1 Lake Park",
    email: "jg32i@soton.mhs.uk",
    phone: "07442124532",
    position: "Doctor",
    id: "jb1013j",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    address: "Sydney No. 1 Lake Park",
    email: "jb32i@soton.mhs.uk",
    phone: "07442993012",
    position: "Nurse",
    id: "jb1030rr",
  },
];

const ManageEmployee = () => {
  return (
    <div className="manage-page">
      <p className="title">View all employees</p>
      <Table dataSource={data} className="table">
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>

        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="Position" dataIndex="position" key="position" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Link to={`/manage-employee/edit/${record.id}`}>
                Edit or Delete
              </Link>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

const dataEdit = {
  key: "1",
  firstName: "John",
  lastName: "Brown",
  address: "New York No. 1 Lake Park",
  email: "jb32k@soton.mhs.uk",
  phone: "07442933210",
  position: "Doctor",
  gender: "Female",
  birth: "1999-12-12",
  id: "jb1023w",
};

const genderOption = [
  {
    value: 1,
    label: "female",
  },
  {
    value: 0,
    label: "male",
  },
  {
    value: 1,
    label: "other",
  },
];

const EditEmployee = () => {
  const validateMessages = {
    // required: `${label} is required!`,
    // types: {
    //   email: `${label} is not a valid email!`,
    //   number: `${label} is not a valid number!`,
    // },
    // number: {
    //   range: `${label} must be between ${min} and ${max}`,
    // },
  };
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="edit-page">
      <div className="employee-img">image</div>
      <div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className="employee-info"
          validateMessages={validateMessages}
        >
          <div className="form-items">
            <Form.Item
              name={["user", "first-name"]}
              label="First Name"
              rules={[{ required: true }]}
              initialValue={dataEdit.firstName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "last-name"]}
              label="Last Name"
              rules={[{ required: true }]}
              initialValue={dataEdit.lastName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
              initialValue={dataEdit.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "phone"]}
              label="phone"
              rules={[{ type: "number" }]}
              initialValue={dataEdit.phone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "gender"]}
              label="Gender"
              // rules={[{ type: "number", min: 0, max: 120 }]}
              initialValue={dataEdit.gender}
            >
              <Select defaultValue={dataEdit.gender} options={genderOption} />
            </Form.Item>
            <Form.Item
              name={["user", "birth"]}
              label="Birth"
              initialValue={dayjs(dataEdit.birth, dateFormat)}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={["user", "position"]}
              label="position"
              // rules={[{ type: "number", min: 0, max: 120 }]}
              initialValue={dataEdit.position}
            >
              <Select defaultValue={dataEdit.gender} options={genderOption} />
            </Form.Item>
            <Form.Item
              name={["user", "home-address"]}
              label="Home Address"
              initialValue={dataEdit.address}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className="btn-group">
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              className="btn"
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              className="btn"
            >
              <Button type="primary" htmlType="submit">
                Delete
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export { ManageEmployee, EditEmployee };
