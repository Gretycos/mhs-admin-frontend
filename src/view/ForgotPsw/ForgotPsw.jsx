/**
 * author: Tsong
 * time: 20/03/2024 12:22
 */
import "./ForgotPsw.less"
import {App, Button, Card, Form, Input, Layout, Result, Spin} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {forgot} from "@/service/user/admin.js";
const {Meta} = Card

const ForgotPsw = () => {
    const navigate = useNavigate()
    const {message} = App.useApp()
    const location = useLocation()

    const {state} = location
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [hasAccount, setHasAccount] = useState(false)
    const [navigating, setNavigating] = useState(false)

    // 表单规则
    const rules = {
        email: [
            {
                required: true,
                message: 'Please input your Email',
            },
            {
                type: 'email',
                message: 'The input is not valid email'
            }
        ]
    }

    // 表单提交
    // const onFinish = async values => {
    //     console.log('Received values of form: ', values);
    //     setLoading(true)
    //     const params = {
    //         email: values.email,
    //     }
    //     const {data} = await forgot(params)
    //     if (data === ""){
    //         message.error('could not find your account', 2)
    //     }else{
    //         setHasAccount(true)
    //         // 回首页
    //         setTimeout(()=>{
    //             setNavigating(true)
    //             setTimeout( () => {
    //                 navigate("/")
    //                 setNavigating(false)
    //             }, 1000)
    //         }, 2000)
    //     }
    //     setLoading(false)
    // }

    const onFinish = async values => {
        console.log('Received values of form: ', values);
        setLoading(true)
        setHasAccount(true)
        setTimeout(()=>{
            setNavigating(true)
            setTimeout( () => {
                navigate("/")
                setNavigating(false)
            }, 1000)
        }, 2000)
        setLoading(false)
    }

    return (
        <Layout className="forgot-page-content">
            {
                hasAccount ?
                    (
                        <Result
                            status="success"
                            title="Successfully sending an email to your email address"
                            extra={[
                                <Spin key="0" spinning={navigating} />,
                            ]}
                        />
                    )
                    :
                    (
                        <Card bordered={false} className="forgot-card">
                            <Meta title={`MHS ${state? "Doctor" : ""}`} className="forgot-title"></Meta>
                            <Form
                                form={form}
                                name="normal_forgot"
                                className="forgot-form"
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

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} className="forgot-form-button">
                                        Forgot Password
                                    </Button>
                                    <NavLink to="/login" state={state? {role: state.role}: null} className="forgot-form-login">
                                        Sign in
                                    </NavLink>
                                </Form.Item>
                            </Form>
                        </Card>
                    )
            }
        </Layout>
    )
}

export default ForgotPsw
