import './createArticle.scss'
//import { Button, Checkbox, Form, Input, Upload } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    ConfigProvider,
} from 'antd'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const onFinish = async (values) => {
    const apiUrl = 'http://localhost:5000/api/createArticle'

    console.log('Form values:', values)

    try {
        console.log(values)
        const response = await axios.post(apiUrl, values)

        console.log('Article Created:', response.data)
    } catch (error) {
        if (error.response) {
            console.error('Error data:', error.response.data)
        } else if (error.request) {
            console.error('Error request:', error.request)
        } else {
            console.error('Error message:', error.message)
        }
        console.error('Error config:', error.config)
    }
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

const { TextArea } = Input
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

const CreateArticle = () => {
    return (
        <>
            <div className="main">
                <Header />
                <div className="formContainer">
                    <ConfigProvider
                        theme={{
                            components: {
                                Form: {
                                    labelFontSize: 20,
                                },
                            },
                        }}
                    >
                        <Form
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 80,
                            }}
                            layout="horizontal"
                            style={{
                                minWidth: 450,
                                maxWidth: 500,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Titel"
                                name="title" // Add name attribute
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kategorie"
                                name="category" // Add name attribute
                            >
                                <Select>
                                    <Select.Option value="Elektronik">
                                        Elektronik
                                    </Select.Option>
                                    <Select.Option value="Sport">
                                        Sport
                                    </Select.Option>
                                    <Select.Option value="Mode">
                                        Mode
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Preis"
                                name="price" // Add name attribute
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="type" // Add name attribute
                            >
                                <Radio.Group>
                                    <div className="testas">
                                        <Radio value="Festpreis">
                                            Festpreis
                                        </Radio>
                                        <Radio value="Verhandelbar">
                                            Verhandelbar
                                        </Radio>
                                        <Radio value="Verschenken">
                                            zu Verschenken
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Beschreibung"
                                name="description" // Add name attribute
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    action="/upload.do"
                                    listType="picture-card"
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Anzeige aufgeben
                                </Button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default () => <CreateArticle />
