import AllProducts from "@/components/UI/AllProducts";
import FeaturedCategories from "@/components/UI/FeaturedCategories";
import { Col, Row } from "antd";
import Head from "next/head";
const HomePage = ({ allProducts }) => {
  console.log(allProducts);
      const category=[
    {
      "category": "CPU-Processor",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/cpu-cooler/antec/t120/t120-01-228x228.jpg"
    },
    {
      "category": "Motherboard",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-h610m-K-d4/prime-h610m-K-d4-02-228x228.jpg"
    },
    {
      "category": "RAM",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
    },
    {
      "category": "Power Supply Unit",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/power-supply/asus/thor-1200p2/thor-1200p2-228x228.webp"
    },
    {
      "category": "Storage Device",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/storage/asustor/as6602t/as6602t-01-228x228.webp"
    },
    {
      "category": "Monitor",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/monitor/lg-monitor/20mk400h/20mk400h-228x228.jpg"
    },
   
  ]
  return (
    <div>
      <Head>
        <title>PC Builder</title>
      </Head>
      
      {/* <h1 style={{ textAlign: "center", marginTop: "10%" }}>Welcome To PC Builder Home Page</h1> */}
       <Row>
      
    </Row>
      <AllProducts allProducts={allProducts}></AllProducts>
      <br></br>
      <br></br>
       <FeaturedCategories allProducts={category}></FeaturedCategories>
    </div>
  );
};

export default HomePage;
export const getStaticProps = async() => {

  const res = await fetch("http://localhost:3000/api/products");

    const data = await res.json();
    // console.log(data);

    return {
        props: {
            allProducts:data.data
        },
        revalidate:30
    }
}