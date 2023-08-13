import React, { useState } from 'react';
import {
    Button,

    DatePicker,
    Form,

    InputNumber,
    Radio,
    Select,

} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const ElectricityAddForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const handleSubmit = (values) => {
        console.log('Form values:', values);


        // fetch('your-api-endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('API response:', data);
        //         // You can perform further actions based on the API response if needed
        //     })
        //     .catch(error => {
        //         console.error('API error:', error);
        //     });
    };

    return (
        <>
            <Title>Electricity Info</Title>
            <Form
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 10,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                    maxWidth: 600,
                }}
                onSubmit={handleSubmit}
            >
                <Form.Item label="View" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small View</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Number Of 33KV Feder(OFF)">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number Of 11KV Feder(OFF)">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number Of Not Solved Complain">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number Of Consumer Without Electricity">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number of Transformers Destroyed">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number of Pending CMO">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number of Transformer Grounding">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Number of Transformer Fuse Change">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Pre-planned Shutdown">
                    <Select>
                        <Select.Option value="yes">Yes</Select.Option>
                        <Select.Option value="no">No</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Button">
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </ >
    );
};
export default ElectricityAddForm;