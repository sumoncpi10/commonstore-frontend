import AllProducts from "@/components/UI/AllProducts";
import FeaturedCategories from "@/components/UI/FeaturedCategories";
import { Col, Row } from "antd";
import Head from "next/head";
const HomePage = () => {
  // console.log(allProducts);
      
  return (
    <div>
      <Head>
        <title>PC Builder</title>
      </Head>
      
      {/* <h1 style={{ textAlign: "center", marginTop: "10%" }}>Welcome To PC Builder Home Page</h1> */}
       {/* <Row>
      
    </Row>
      <AllProducts allProducts={allProducts}></AllProducts>
      <br></br>
      <br></br>
       <FeaturedCategories allProducts={category}></FeaturedCategories> */}
    </div>
  );
};

export default HomePage;
