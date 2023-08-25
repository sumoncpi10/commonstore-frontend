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

const AddCC = ({zonals}) => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const onFinish = (values) => {
    console.log('Received values:', values);
    const pbsCode = session?.pbs_code?.pbs_code;
    const withvalues = { ...values, pbsCode };
    fetch("https://computer-management-system.onrender.com/api/v1/complain/create-complain", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(withvalues),
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
      <Form.Item label="Zonal" name="zonalCode" hasFeedback rules={[
          {
            required: true,
            message: 'Please provide a Zonal name',
          },
        ]}>
        <Select placeholder="Select a Zonal" allowClear>
          {zonals.map((zonal) => (
            <Option value={zonal.zonalCode} key={zonal.zonalCode}>
              {zonal.zonalName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="CC Code"
        name="complainCode"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Complain Code',
          },
        ]}
      >
        <Input placeholder="Complain Code" />
      </Form.Item>
      <Form.Item
        label="Complain Name"
        name="complainName"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Complain name',
          },
        ]}
      >
        <Input placeholder="Complain Name" />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block> 
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCC;
