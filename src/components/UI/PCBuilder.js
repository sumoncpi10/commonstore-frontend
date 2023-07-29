// AllProducts.js

import React from "react";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { EditOutlined, EllipsisOutlined, SettingOutlined,FileAddOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const { Meta } = Card;
const PCBuilder = ({ allProducts }) => {
  const { Meta } = Card;

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "30px 0px",
        }}
      >
        #Build Your PC
      </h1>
      <Row gutter={[16, 16]} align="middle">
        {allProducts?.map((part) => (
          <Col key={part.id} xs={24} sm={24} md={24} lg={24} align="middle">
          <Card
    style={{
      width: 500,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <Link href={`/products/${part?.category}`} key={part?.id}>
    <FileAddOutlined key="add" />
      </Link>,
      <EditOutlined key="edit" />,
      // <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src={part?.image_url} />}
      title={part?.category}
      // description="This is the description"
    />
  </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PCBuilder;
