import AllProducts from "@/components/UI/AllProducts";
import { Col, Row } from "antd";
import Head from "next/head";
const HomePage = ({allProducts}) => {
  return (
    <div>
      <Head>
        <title>PC Builder</title>
      </Head>
      
      {/* <h1 style={{ textAlign: "center", marginTop: "10%" }}>Welcome To PC Builder Home Page</h1> */}
       <Row>
      
    </Row>
       <AllProducts allProducts={allProducts}></AllProducts>
    </div>
  );
};

export default HomePage;
export const getStaticProps = async() => {

    const res = await fetch("http://localhost:5000/parts")
    const data = await res.json();
    console.log(data);

    return {
        props: {
            allProducts:data
        }
    }
}