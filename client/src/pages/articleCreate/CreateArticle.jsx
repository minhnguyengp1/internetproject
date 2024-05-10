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

const onFinish = async (values) => {
    const apiUrl = 'http://localhost:5000/api/createArticle'

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

const { RangePicker } = DatePicker
const { TextArea } = Input
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

const Create = () => {
    return (
        <div className="main">
            <div className="formContainer">
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                /* here is your component tokens */
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
                        <Form.Item label="Titel">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Kategorie">
                            <Select>
                                <Select.Option value="Elektronik">
                                    Elektronik
                                </Select.Option>
                                <Select.Option value="Sport">
                                    Sport
                                </Select.Option>
                                <Select.Option value="Mode">Mode</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Preis">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Radio.Group>
                                <div className="testas">
                                    <Radio value="Festpreis">Festpreis</Radio>
                                    <Radio value="Verhandelbar">
                                        Verhandelbar
                                    </Radio>
                                    <Radio value="Verschenken">
                                        zu Verschenken
                                    </Radio>
                                </div>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Beschreibung">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload action="/upload.do" listType="picture-card">
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
                        <Form.Item label="Button">
                            <Button type="primary" htmlType="submit">
                                Anzeige aufgeben
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    )
}

export default () => <Create />

//export default Create

/*        <div className="main">
            <div className="formContainer">
                <Form
                    name="createArticleForm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Titel"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Bitte geben den Titel deiner Anzeige an',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div className="preisArt">
                        <Form.Item label="Kategorie" name="type">
                            <select id="kategorie" name="type">
                                <option value="Elektronik" defaultValue={true}>
                                    Elektronik
                                </option>
                                <option value="Mode">Mode</option>
                                <option value="Sport">Sport</option>
                            </select>
                        </Form.Item>
                    </div>

                    <div className="preis">
                        <Form.Item
                            className="preisEingabe"
                            label="Preis"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bitte gebe den Preis an',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="preisArt">
                            <Form.Item label="PreisArt" name="type">
                                <select id="preisArt" name="type">
                                    <option value="Festpreis">Festpreis</option>
                                    <option value="Verschenken">
                                        Kostenlos
                                    </option>
                                    <option value="Verhandelbar">
                                        Verhandelbar
                                    </option>
                                </select>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item
                        label="Beschreibung"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Bitte gebe die Beschreibung deiner Anzeige an',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="imgUrl"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Bitte gebe die Beschreibung deiner Anzeige an',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="UserId"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Bitte gebe die Beschreibung deiner Anzeige an',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <a> Persönliche Informationen</a>
                    <p></p>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )*/
