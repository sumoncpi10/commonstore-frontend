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
import { EditOutlined, EllipsisOutlined, SettingOutlined,FileAddOutlined,DeleteFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFromCart, removeOne } from "@/redux/features/cart/cartSlice";
const { Meta } = Card;
const PCBuilder = ({ allProducts }) => {
  const { Meta } = Card;
  const { products } = useAppSelector((state) => state.cart);
  console.log(products);
  const dispatch = useAppDispatch();
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
              cover={products?.map((p) =>
  p.category === part?.category ? (
    <Image
      key={p.id} // Make sure to add a unique key when using map
      src={p?.image_url}
      width={500}
      height={400}
      responsive
      alt="news image"
    />
  ) : null
)}

    actions={[
      <Link href={`/products/${part?.category}`} key={part?.id}>
    <FileAddOutlined style={{ fontSize: 30 }} key="add" />
      </Link>,
      <DeleteFilled style={{ fontSize: 30 }} key="delete" onClick={() => dispatch(removeFromCart(part))}/>,
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
