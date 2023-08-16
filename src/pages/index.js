
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Image from "next/image";

const HomePage = ({allProduct}) => {
  // console.log(allProduct);

  return (
    <div align="middle">
      <Head>
        <title>PBS Activities</title>
      </Head>
      
      <Image src={allProduct.photoURL} alt="" width={100} height={120}></Image>
      <div>Role: {allProduct.displayName}</div>
      <div>Designation: {allProduct.designation}</div>
      <div>Role: {allProduct.role}</div>
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
export async function getServerSideProps() {
  const res = await fetch(`https://pbsactivities.onrender.com/user/sumoncpi10@gmail.com`);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      allProduct: data.data,
    },
  };
}

HomePage.getLayout = function getLayout(page) {
  return (
    <Header>
      {page}
    </Header >
  )
}
