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
import { notification } from "antd";
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

const AddCategory = ({ itemType }) => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const onFinish = (values) => {
        console.log('Received values:', values);

        fetch(`http://localhost:5000/api/v1/category/create-category`, {
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
            <Form.Item label="Item Type" name="itemTypeId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Item Type name',
                },
            ]}>
                <Select placeholder="Select a Brand" allowClear>
                    {itemType.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.itemType}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Category Name"
                name="categoryName"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Category name',
                    },
                ]}
            >
                <Input placeholder="Category Name" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCategory;
