import React from 'react';
import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
const PartsDetails = ({ part }) => {
    console.log(part);
    return (
        <Row style={{ marginTop: "80px", alignItems: "center" }}>
    <Col md={6} lg={12}>
      <Image
        alt="example"
        src={part?.image_url}
        width={500}
        height={300}
        responsive
      />
    </Col>
    <Col md={6} lg={12} style={{ paddingLeft: "20px" }}>
      <h1 style={{ fontSize: "30px" }}>{part?.product_name}</h1>
      <span
        style={{
          color: "gray",
          display: "block",
          fontSize: "20px",
        }}
      >
        <UserOutlined /> {part?.status}
      </span>
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
          fontSize: "20px",
        }}
      >
        <span>
          <CalendarOutlined /> {part?.rating}
        </span>
        <span>
          <CommentOutlined /> {part?.comment_count} Comments
        </span>
        <span>
          <ProfileOutlined /> {part?.category}
        </span>
      </p>

      <p style={{ fontSize: "25px", fontWeight: "lighter" }}>
        {part?.description}
      </p>
    </Col>
  </Row>
    );
};

export default PartsDetails;

export const getStaticPaths = async() => {

    const res = await fetch(`http://localhost:5000/products`)
    const allProducts = await res.json();
    // console.log(allProducts);

    const paths = allProducts.map(part => ({
        params: {partsId:part.id}
    }))

    return {paths, fallback:true}
}
export const getStaticProps = async(context) => {
    const { params } = context;
    const res = await fetch(`http://localhost:5000/products/${params.partsId}`)
    const data = await res.json();
    // console.log(data);

    return {
        props: {
            part:data
        },
        revalidate:30
    }
}