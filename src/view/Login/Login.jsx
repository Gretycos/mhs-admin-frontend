/**
 * author: Tsong
 * time: 09/03/2024 15:15
 */
import {App, Button, Card, Form, Input, Layout} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "@/service/user/admin.js";
import {useDispatch} from "react-redux";
import {save} from "@/redux/slice/globalSlice.js";
import "./Login.less"
import md5 from "js-md5";

const {Meta} = Card
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {message} = App.useApp()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    // 表单规则
    const rules = {
        email: [
            {
                required: true,
                message: 'Please input your Email',
            },
            {
                type: 'email',
                message: 'The input is not valid Email'
            }
        ],
        password: [
            {
                required: true,
                message: 'Please input your Password',
            }
        ]
    }

    // 表单提交
    const onFinish = async values => {
        // console.log('Received values of form: ', values);
        setLoading(true)
        const params = {
            email: values.email,
            password: md5(values.password)
        }
        // console.log(params)
        const {data} = await login(params)
        dispatch(save({ token: data.token }))
        dispatch(save({ adminId: data.userId }))
        message.success('login succeeded', 2)
        // 回主页
        navigate('/')
        setLoading(false)
    };

    return (
        <Layout className="login-page-content">
            <Card bordered={false} className="login-card">
                <Meta title="MHS Admin" className="login-title"></Meta>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={rules.email}
                        validateTrigger="onBlur"
                        validateFirst={true}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={rules.password}
                        validateTrigger="onBlur"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
                            Sign in
                        </Button>
                        {/*<NavLink to="/forgot" className="login-form-forgot">*/}
                        {/*    Forgot password*/}
                        {/*</NavLink>*/}
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}

export default Login
