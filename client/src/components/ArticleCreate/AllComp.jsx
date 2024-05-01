import React from 'react'
import './allComp.scss'
import { Button, Checkbox, Form, Input, Upload } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { StarOutlined, UploadOutlined } from '@ant-design/icons'
import axios  from 'axios'

//Upload

const onFinish = async (values) => {
const apiUrl = "http://localhost:5000/api/createArticle"
    //console.log('Success:', values)

    /**const formData = {
    title: document.getElementByName("title").value,
    description: document.getElementByName("description").value,
    price: document.getElementByName("price").value,
    type: document.getElementByName("type").value,
    category: document.getElementByName("category").value,
    image: document.getElementByName("image").value


    }*/
    try {
      // Use axios to send a POST request with the form data
      console.log(values);
      const response = await axios.post(apiUrl, values);

      // Handle the response from the backend
      console.log('Article Created:', response.data);
      

      // Perform any additional actions like resetting the form or navigating away
  } catch (error) {
      // Handle any errors that occur during the request
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
      
  }

}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

const AllComp = () => {
    return (
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
                onFinish={onFinish} //dann wird onFinish Funktion von oben ausgeführt
                onFinishFailed={onFinishFailed} //dann wird onFinishFailed Funktion von oben ausgeführt
                autoComplete="off"
            >
                <a> Anzeige </a>
                <p></p>
                <Form.Item
                    label="Titel"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben den Titel deiner Anzeige an',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Kategorie"           //Muss Liste sein
                    name="category"
                    rules={[
                        {
                            required: true,
                            message:
                                'Bitte gebe die Kategorie deiner Anezige an',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                                <option value="Verschenken">Kostenlos</option>
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
    )
}

export default AllComp
