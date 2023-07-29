import React from 'react';
import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import AllProducts from '@/components/UI/AllProducts';
const PartsDetails = ({ allProducts }) => {
    console.log(allProducts);
    return (
 
      <AllProducts allProducts={allProducts}></AllProducts>
    );
};

export default PartsDetails;


export const getStaticPaths = async (context) => {
  const { params } = context;
  console.log(params);

  const res = await fetch(`http://localhost:5000/products?category=${params?.category}`);
  const allProducts = await res.json();
  // console.log(allProducts);

  const paths = allProducts.map((part) => ({
    params: { category: part.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  console.log(params);

  const res = await fetch(`http://localhost:5000/products?category=${params?.category}`);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      allProducts: data,
    },
    revalidate: 30,
  };
};