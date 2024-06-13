import './createArticle.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
    Upload,
    ConfigProvider, message
} from 'antd'
import Footer from '../../components/footer/Footer.jsx'
import Header from '../../components/header/Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createArticle } from '../../redux/actions/articleActions.js'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

const CreateArticle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate() // Use useNavigate hook
    const [city, setCity] = useState('')

    const articleCreate = useSelector((state) => state.articleCreate)
    const { loading, success, article, error } = articleCreate

    useEffect(() => {
        if (success) {
            console.log('Article created:', article)
            navigate('/article-create/success')
        }
    }, [success, article])

    const onFinish = (values) => {
        dispatch(createArticle(values))
    }

    const onFinishFailed = ({ errorFields }) => {
        if (errorFields && errorFields.length > 0) {
            const firstError = errorFields[0]
            const input = document.querySelector(`input[id='${firstError.name[0]}']`)
            if (input) input.focus()
        }

        message.error('Please correct the highlighted fields before submitting.')
    }

    const handlePLZChange = async (e) => {
        const plz = e.target.value
        // if (plz.length === 5) {
        //     try {
        //         const response = await axios.get(`${PLZ_API_URL}${plz}`)
        //         const cityName = response.data.places[0]['place name']
        //         setCity(cityName)
        //     } catch (error) {
        //         console.error('Error retrieving city:', error)
        //     }
        // }
    }

    return (
        <div className="create-article">
            <Header />
            <div className="form-container">
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                labelFontSize: 20
                            }
                        }
                    }}
                >
                    <Form
                        className="create-article-form"
                        labelCol={{
                            span: 7
                        }}
                        wrapperCol={{
                            span: 80
                        }}
                        layout="horizontal"
                        style={{
                            minWidth: 450,
                            maxWidth: 500
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Titel"
                            name="title"
                            rules={[{ required: true, message: 'Bitte Titel eingeben' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Kategorie"
                            name="category"
                            rules={[{ required: true, message: 'Bitte Kategorie wählen' }]}
                        >
                            <Select>
                                <Select.Option value="Elektronik">Elektronik</Select.Option>
                                <Select.Option value="Sport">Sport</Select.Option>
                                <Select.Option value="Mode">Mode</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Preis"
                            name="price"
                            rules={[{ required: true, message: 'Bitte Preis eingeben' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Typ"
                            name="type"
                            rules={[{ required: true, message: 'Bitte Typ wählen' }]}
                        >
                            <Radio.Group>
                                <div className="radio-group">
                                    <Radio value="Festpreis">Festpreis</Radio>
                                    <Radio value="Verhandelbar">Verhandelbar</Radio>
                                </div>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Beschreibung"
                            name="description"
                            className="description-form-item"
                            rules={[{ required: true, message: 'Bitte Beschreibung eingeben' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="PLZ"
                            name="plz"
                            rules={[{ required: true, message: 'Bitte PLZ eingeben' }]}
                        >
                            <Input onChange={handlePLZChange} />
                        </Form.Item>
                        <Form.Item
                            label="Stadt"
                            name="city"
                        >
                            <Input value={city} disabled />
                        </Form.Item>
                        <Form.Item
                            label="Upload"
                            name="upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                action="/upload.do"
                                listType="picture-card"
                            >
                                <Button icon={<PlusOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item className="submit-button">
                            <Button type="primary" htmlType="submit">
                                Anzeige aufgeben
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
            <Footer />
        </div>
    )
}

export default CreateArticle
