import React from 'react'
import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function LoginForm() {
    return (
        <div>
            <Form.Item
                name="email"
                label="email"
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'email',
                        message: 'Bitte Email eingeben',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Bitte Passwort eingeben',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <a className="login-form-forgot" href="/forgetpassword">
                    Passwort vergessen
                </a>
            </Form.Item>
        </div>
    )
}
