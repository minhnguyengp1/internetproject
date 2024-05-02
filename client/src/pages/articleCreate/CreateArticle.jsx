import './createArticle.scss'
import { Button, Checkbox, Form, Input, Upload } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { StarOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const onFinish = async (values) => {
    const apiUrl = 'http://localhost:5000/api/createArticle'

    try {
        console.log(values)
        const response = await axios.post(apiUrl, values)

        console.log('Article Created:', response.data)
    } catch (error) {
        if (error.response) {
            console.error('Error data:', error.response.data)
            console.error('Error status:', error.response.status)
            console.error('Error headers:', error.response.headers)
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

const Create = () => {
    return (
        <div className="main">
            <div className="whole">
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
    )
}

export default Create
