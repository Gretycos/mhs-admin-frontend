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
  Modal,
} from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import IntroBar from "@/component/IntroBar/IntroBar.jsx";
import {
  getEmployeeList,
  addEmployee,
  getEmployeeInfo,
  updateEmployee,
  deleteEmployee,
} from "@/service/user/admin.js";
import md5 from "js-md5";

const dateFormat = "YYYY-MM-DD";

const columns = [
  {
    title: "Practitioner Name",
    dataIndex: "name",
    width: 200,
    render: (text, record) => (
      <Link to={`/manage-employee/edit/${record.id}`}>{text}</Link>
    ),
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
  {
    title: "Position",
    width: 200,
    dataIndex: "position",
  },
];

const ManageEmployee = () => {
  const [employeeList, setEmployeeList] = useState([{}]);
  const employeeAll = async () => {
    const { data } = await getEmployeeList({ state: 1 });
    const extractedData = data.map((item) => ({
      key: item.practId,
      id: item.practId,
      name: item.givenName + " " + item.familyName,
      email: item.email,
      sex: item.sex === 0 ? "male" : "female",
      position: positionOption[item.role],
      birth: dayjs(item.dateOfBirth).format("DD/MM/YYYY"),
    }));
    setEmployeeList(extractedData);
  };

  useEffect(() => {
    employeeAll();
  }, []);

  return (
    <div className="manage-page">
      <IntroBar title="View All Employee" />
      <Table
        dataSource={employeeList}
        columns={columns}
        className="table"
      ></Table>
    </div>
  );
};

// column option fot gender and position
const genderOpt = [
  { value: 1, label: "female" },
  { value: 0, label: "male" },
];

// Map jobs return for the back end
const positionOpt = [
  { value: 0, label: "Doctor" },
  { value: 1, label: "Test" },
  { value: 2, label: "Nurse" },
  { value: 3, label: "Else" },
];

// Map jobs displayed on the front end
const positionOption = {
  0: "Doctor",
  1: "Test",
  2: "Nurse",
  3: "Else",
};

const EditEmployee = () => {
  const [dataEdit, setDataEdit] = useState({});
  const { id } = useParams();
  const [form] = Form.useForm();
  const now = dayjs();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    values.user.dateOfBirth =
      values.user.dateOfBirth.format("DD-MM-YYYY HH:mm");
    values.user.practId = id;
    console.log("Received values of form: ", values.user);
    try {
      const response = await updateEmployee({
        ...values.user,
      });
      console.log("response:", response);
      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Employee information updated.",
          onOk: () => {
            navigate("/manage-employee");
          },
        });
      }
      // 处理成功响应
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
      // 处理错误响应
    }
  };

  const getEditData = async () => {
    const { data } = await getEmployeeInfo({ userId: id });
    setDataEdit(data);
    form.setFieldsValue({
      user: {
        givenName: data.givenName,
        familyName: data.familyName,
        email: data.email,
        // mobileNum: data.phone,
        dateOfBirth: dayjs(data.dateOfBirth),
        role: data.role,
        sex: data.sex,
      },
    });
  };

  const deleteUser = async () => {
    console.log("delete user", id);
    try {
      const response = await deleteEmployee({
        practId: id,
      });
      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Employee deleted.",
          onOk: () => {
            navigate("/manage-employee");
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

  useEffect(() => {
    getEditData();
  }, []);

  useEffect(() => {
    console.log("dataEdit:", dataEdit);
  }, [dataEdit]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="edit-employee-page">
      <IntroBar title="Edit | Delete Employee" />
      {/* <div className="employee-img">image</div> */}
      <div className="edit-page">
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
          className="employee-info"
        >
          <div className="form-items">
            <Form.Item
              name={["user", "givenName"]}
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input practitioner's First name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "familyName"]}
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input practitioner's Last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input practitioner's email!",
                },
              ]}
            >
              <Input disabled/>
            </Form.Item>
            {/* <Form.Item name={["user", "mobileNum"]} label="Phone">
              <Input />
            </Form.Item> */}
            <Form.Item
              name={["user", "sex"]}
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select practitioner's gender!",
                },
              ]}
            >
              <Select options={genderOpt} />
            </Form.Item>
            <Form.Item
              name={["user", "dateOfBirth"]}
              label="Birthday"
              rules={[
                {
                  required: true,
                  message: "Please select practitioner's birthday!",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current >= dayjs(now).startOf("day");
                  // Can not select days before today
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name={["user", "role"]}
              label="Position"
              rules={[
                {
                  required: true,
                  message: "Please select practitioner's position!",
                },
              ]}
            >
              <Select options={positionOpt} disabled/>
            </Form.Item>
          </div>

          <div className="btn-group">
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              className="btn"
            >
              <Button type="default" onClick={deleteUser}>
                Delete
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              className="btn"
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

const AddEmployee = () => {
  /* eslint-enable no-template-curly-in-string */
  const navigate = useNavigate();

  const onFinish = async (values) => {
    values.user.dateOfBirth =
      values.user.dateOfBirth.format("DD-MM-YYYY HH:mm");
    values.user = {
      ...values.user,
      password: md5("Aa112233"),
    };
    console.log("Received values of form: ", values.user);
    try {
      const response = await addEmployee({
        ...values.user,
      });
      console.log("response:", response);
      if (response.resultCode === 200) {
        Modal.success({
          title: "Success",
          content: "Employee added.",
          onOk: () => {
            navigate("/manage-employee");
          },
        });
      }
      // 处理成功响应
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
      // 处理错误响应
    }
  };

  const now = dayjs();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="add-page">
      <p className="title">Add New Employee</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        className="employee-info"
      >
        <div className="form-items">
          <Form.Item
            name={["user", "givenName"]}
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input practitioner's First name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "familyName"]}
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input practitioner's Last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input practitioner's email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name={["user", "mobileNum"]} label="Phone">
            <Input />
          </Form.Item> */}
          <Form.Item
            name={["user", "sex"]}
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select practitioner's gender!",
              },
            ]}
          >
            <Select options={genderOpt} />
          </Form.Item>
          <Form.Item
            name={["user", "dateOfBirth"]}
            label="Birthday"
            rules={[
              {
                required: true,
                message: "Please select practitioner's birthday!",
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) => {
                return current && current >= dayjs(now).startOf("day");
                // Can not select days before today
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name={["user", "role"]}
            label="Position"
            rules={[
              {
                required: true,
                message: "Please select practitioner's position!",
              },
            ]}
          >
            <Select options={positionOpt} />
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

// upload image, future work
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

export { ManageEmployee, EditEmployee, AddEmployee };
