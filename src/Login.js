import React from 'react';
import {Button, Col, Form, Input, message, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import cookie from 'react-cookies';
import axios from './axios';

const LoginForm = () => {
    const [form] = Form.useForm();
    const onsubmit = (values) => {
        axios.post('/auth/login/', {
            'username': values.username,
            'password': values.password
        }).then(async response => {
            let expireDate = new Date(new Date().getTime() + 7 * 24 * 3600 * 1000);
            cookie.save('user', response.data, {path: '/', expires: expireDate});
            await message.success('Login Successfully!', 1, () => {
                window.location.href = '/'
            })
        }).catch(async error => {
            await message.error(error.response.data[0], 3)
        })
    }

    return (
        <Form
            form={form}
            name="login"
            className="login-form"
            onFinish={onsubmit}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please enter the username!'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="username" size="large"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please enter the password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="password"
                    size="large"
                />
            </Form.Item>
            <Form.Item style={{fontSize: "15px"}}>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large"
                        block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

class Login extends React.Component {
    render() {
        return (
            <div>
                <div style={{marginTop: "5%", marginBottom: document.body.clientWidth > 750 ? "10%" : "40%"}}>
                    <div style={{fontSize: "29.5px", textAlign: "center", marginBottom: "3%"}}>
                        <span style={{fontFamily: "alibaba", fontWeight: "bold", color: "#000080"}}>User Login</span>
                    </div>
                    {document.body.clientWidth >= 750 ?
                        <div>
                            <Row>
                                <Col push={8} span={8}>
                                    <div style={{paddingLeft: "50px", paddingRight: "50px"}}>
                                        <LoginForm/>
                                    </div>
                                </Col>
                            </Row>
                        </div> :
                        <div>
                            <Row>
                                <Col push={1} span={22}>
                                    <div>
                                        <LoginForm/>
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                </div>
            </div>
        )
    }
}


export default Login;
