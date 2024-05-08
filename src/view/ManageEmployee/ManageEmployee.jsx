import "./ManageEmployee.less";
import {
  Space,
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Image,
  Upload,
  message,
} from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
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
      <IntroBar title="View All Employee" />
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
    <div className="manage-employee-page">
      <IntroBar title="Edit | Delete Employee" />
      {/* <div className="employee-img">image</div> */}
      <div className="edit-page">
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
              <Select defaultvalue={dataEdit.gender} options={genderOption} />
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
              <Select defaultvalue={dataEdit.gender} options={genderOption} />
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

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    var formData = new FormData();
    const file = event.target.files[0];
    formData.append("image", file);

    if (file) {
      const reader = new FileReader(); // 创建FileReader对象
      reader.readAsDataURL(file); // 读取文件内容

      // 读取完成时触发load事件
      reader.onload = function (e) {
        const imagePath = e.target.result; // 获取文件路径
        console.log("image path:", imagePath);
        setImage(imagePath);
      };
    }

    // const uploadedImage = event.target.files[0];
    // const reader = new FileReader();

    // reader.onload = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(uploadedImage);
  };

  const props = {
    name: "file",
    accept: "image/*",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log("info.file:", info.file, "info.fileList:", info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // const handleClick = () => {
  //   // 点击事件处理逻辑
  //   console.log("ImageUpload component clicked");
  // };

  return (
    <div>
      {image ? (
        <Image width={200} height={200} src={image} />
      ) : (
        <Image
          width={200}
          height={200}
          src="error"
          fallback="data:image/png;base64,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"
        />
      )}
      <Upload {...props}>
        <Button
          icon={<UploadOutlined />}
          onClick={(e) => handleImageUpload(e)}
          className="up-image"
        >
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
};

const AddEmployee = () => {
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
    <div className="add-page">
      <p className="title">Add New Employee</p>
      {/* <div className="employee-img">image</div> */}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        className="employee-info"
        validateMessages={validateMessages}
      >
        <div className="form-items">
          <Form.Item
            name={["user", "first-name"]}
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "last-name"]}
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label="phone"
            rules={[{ type: "number" }]}
            // initialValue={dataEdit.phone}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "gender"]} label="Gender">
            <Select options={genderOption} />
          </Form.Item>
          <Form.Item name={["user", "birth"]} label="Birth">
            <DatePicker />
          </Form.Item>
          <Form.Item name={["user", "position"]} label="position">
            <Select options={genderOption} />
          </Form.Item>
          <Form.Item
            name={["user", "home-address"]}
            label="Address"
            initialValue={dataEdit.address}
          >
            <Input.TextArea />
          </Form.Item>
        </div>

        <div className="btn-group">
          <Form.Item wrapperCol={{ ...layout.wrapperCol }} className="btn">
            {/* <ImageUpload /> */}
            <Button type="primary" htmlType="submit" className="btn-add">
              Add employee
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export { ManageEmployee, EditEmployee, AddEmployee };
