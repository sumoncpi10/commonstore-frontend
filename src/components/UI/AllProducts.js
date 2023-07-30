// AllProducts.js

import React from "react";
import { Button, Card, Col, Row, Space,notification } from "antd";
import Image from "next/image";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,ShoppingCartOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hook';


const AllProducts = ({ allProducts }) => {
  const { Meta } = Card;
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.cart);
  console.log(status);
  const handleAddProduct = (product) => {
     dispatch(addToCart(product));
    
    // console.log(r);
    // toast('Product Added');
    if (!status) {
      openNotificationWithIcon('success')
    }
    else if (status) {
      openNotificationWithIcon('info')
    }
    
  };
 const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Product Added',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <>
       <>
      {contextHolder}
      
    </>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "30px 0px",
        }}
      >
        #TODAY HIGHLIGHT
      </h1>
      <Row gutter={[16, 16]}>
        {allProducts?.map((part) => (
          <Col key={part.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <Image
                  src={part?.image_url}
                  width={500}
                  height={400}
                  responsive
                  alt="news image"
                />
              }
            >
              <Meta title={part?.product_name} />
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px 0",
                  background: "#000",
                  width: "100%",
                }}
              ></div>

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "12px",
                }}
              >
                
                <span>
                  <CalendarOutlined /> {part?.price}
                </span>
                <span>
                  <CalendarOutlined /> {part?.status}
                </span>
                <span>
                  <CommentOutlined /> {part?.rating } Ratings
                </span>
                <span>
                  <ProfileOutlined /> {part?.category}
                </span>
              </p>

              {/* <p style={{ fontSize: "15px" }}>
                {part?.product_name.length > 100
                  ? part?.product_name.slice(0, 70) + "..."
                  : part?.product_name}
              </p> */}
              <Button icon={<ShoppingCartOutlined />} style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    color: "white",
                    width: "100%",
                    padding: "2px 5px ",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }} type="primary" className='mx-2' onClick={() => handleAddProduct(part)}>Add to cart</Button>
              <Link href={`/parts/${part?.id}`}>
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    padding: "2px 5px ",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }}
                >
                  Show Detail <ArrowRightOutlined />
                </p>
              </Link>
              
              {/* <Button type="primary">Primary Button</Button> */}
            </Card>
          </Col>
        ))}
      </Row>
      
    </>
  );
};

export default AllProducts;
