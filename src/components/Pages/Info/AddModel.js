import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
} from 'antd';
import {  notification } from "antd";
import { useSession } from 'next-auth/react';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddModel = ({brands}) => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const onFinish = (values) => {
    console.log('Received values:', values);
  
    fetch("https://computer-management-system.onrender.com/api/v1/model/create-model", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
    
          const openNotificationWithIcon = (type) => {
            api[type]({
              message: data?.message,
            });
          };
          openNotificationWithIcon('success')
        
      });
  };

  return (
    <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={onFinish}>
          {contextHolder}
      <Form.Item label="Brand" name="brandId" hasFeedback rules={[
          {
            required: true,
            message: 'Please provide a Brand name',
          },
        ]}>
        <Select placeholder="Select a Brand" allowClear>
          {brands.map((brand) => (
            <Option value={brand.id} key={brand.id}>
              {brand.brandName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Model Name"
        name="modelName"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Model name',
          },
        ]}
      >
        <Input placeholder="Model Name" />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block> 
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddModel;
