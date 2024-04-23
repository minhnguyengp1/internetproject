import React from 'react'
import './AllComp.scss'
import { Button, Checkbox, Form, Input, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';



//Upload














const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const AllComp = () => {
  return (
    <div className='whole'>

   
    
    <Form



    name="createArticle"
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
    onFinish={onFinish}                     //dann wird onFinish Funktion von oben ausgeführt
    onFinishFailed={onFinishFailed}         //dann wird onFinishFailed Funktion von oben ausgeführt
    autoComplete="off"
  >
    <a> Anzeige </a>
    <p></p>
    <Form.Item
      label="Titel"
      name="titel"
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
      label="Kategorie"
      name="kategorie"
      rules={[
        {
          required: true,
          message: 'Bitte gebe die Kategorie deiner Anezige an',
        },
      ]}
    >
      <Input />
    </Form.Item>



    <div className='preis'>
    <Form.Item className='preisEingabe'
      label="Preis"
      name="preis"
      rules={[
        {
          required: true,
          message: 'Bitte gebe den Preis an',
        },
      ]}
      
    >
      
  

      <Input />
     
    </Form.Item>



      <div className='preisArt'>
    <Form.Item 
  label="PreisArt"
  name="preisArt"
>
  <select id="preisArt" name="preisArt">
    <option value="festPreis">Festpreis</option>
    <option value="kostenlos">Kostenlos</option>
    <option value="verhandelbar">Verhandelbar</option>
  </select>
</Form.Item>
</div>
</div>

<Form.Item
      label="Beschreibung"
      name="beschreibung"
      rules={[
        {
          required: true,
          message: 'Bitte gebe die Beschreibung deiner Anzeige an',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
  label="Bilder hinzufügen"
  name="bilder"
>
  <Upload
    name="images"
    action="/upload"
    listType="picture"
  >
    <Button icon={<UploadOutlined />}>Bilder hochladen</Button>
  </Upload>
</Form.Item>

<a> Ort </a>
<p> </p>

<Form.Item
      label="PLZ"
      name="plz"
      rules={[
        {
          required: true,
          message: 'Bitte geben Sie die Postleitzahl an ',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Straße + Hausnummer"
      name="adresse"
      rules={[
        {
          required: false,
          message: 'Bitte geben Sie Ihre Adresse an ',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <a> Persönliche Informationen</a>
    <p></p>

    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Bitte geben Sie Ihren Namen an  ',
        },
      ]}
    >
      <Input />
    </Form.Item>
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