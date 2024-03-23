/**
 * author: Tsong
 * time: 20/03/2024 13:56
 */
import "./ResetPsw.less"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {App, Button, Card, Form, Input, Layout, Result, Spin} from "antd";
import {useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {reset} from "@/service/user/admin.js";
const {Meta} = Card

const ResetPsw = () => {

    const navigate = useNavigate()
    const {message} = App.useApp()
    const location = useLocation()

    const {state} = location
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [isReset, setIsReset] = useState(false)
    const [navigating, setNavigating] = useState(false)

    // 验证器
    const validatePassword = async (_, value) => {
        if (!value){
            return Promise.reject(new Error("Please input your password"))
        }
        if (value.length < 8){
            return Promise.reject(new Error("The length must be longer than 8"))
        }
        if (value.length > 16){
            return Promise.reject(new Error("The length must be shorter than 16"))
        }
        if (value.match(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/) == null) {
            return Promise.reject(
                new Error("The password must contain at least 3 kinds of characters: " +
                    "[Uppercase letters, Lowercase letters, Symbols, Numbers]"
                )
            )
        }
        return Promise.resolve()
    }
    const validateConfirmPassword = async (_, value) => {
        if (value && value === form.getFieldsValue().password){
            return Promise.resolve()
        }
        return Promise.reject(new Error('Please confirm your password'))
    }

    // 表单规则
    const rules = {
        password: [
            {
                required: true,
                message: 'Please input your password',
            },
            {
                validator: validatePassword
            }
        ],
        confirmPassword: [
            {
                required: true,
                message: 'Please input your password',
            },
            {
                validator: validateConfirmPassword
            }
        ],
    }

    // 表单提交
    // const onFinish = async values => {
    //     console.log('Received values of form: ', values);
    //     setLoading(true)
    //     const params = {
    //         email: values.email,
    //         password: values.password,
    //     }
    //     const {data} = await reset(params)
    //     if (data === ""){
    //         message.error('could not find your account', 2)
    //     }else{
    //         setIsReset(true)
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
        setIsReset(true)
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
        <Layout className="reset-page-content">
            {
                isReset ?
                    (
                        <Result
                            status="success"
                            title="Successfully reset your password"
                            extra={[
                                <Spin key="0" spinning={navigating} />,
                            ]}
                        />
                    )
                    :
                    (
                        <Card bordered={false} className="reset-card">
                            <Meta title={`MHS ${state? "Doctor" : ""}`} className="reset-title"></Meta>
                            <Form
                                form={form}
                                name="normal_reset"
                                className="reset-form"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="email"
                                    rules={rules.email}
                                    validateTrigger="onBlur"
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                           placeholder="Email"
                                           disabled
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="reset-form-item"
                                    name="password"
                                    rules={rules.password}
                                    validateTrigger="onBlur"
                                    label="Password"
                                    validateFirst={true}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="reset-form-item"
                                    name="confirmPassword"
                                    rules={rules.confirmPassword}
                                    validateTrigger="onBlur"
                                    label="Confirm Password"
                                    validateFirst={true}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} className="reset-form-button">
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    )
            }
        </Layout>
    )
}

export default ResetPsw
