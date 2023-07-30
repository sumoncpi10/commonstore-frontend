import AllProducts from "@/components/UI/AllProducts";
import Head from "next/head";
const Porducts = ({ allProducts }) => {
    // console.log(allProducts);
    return (
        <div>
            <Head>
        <title>Products</title>
      </Head>
            <AllProducts allProducts={allProducts}></AllProducts>
        </div>
    );
};

export default Porducts;

export const getStaticProps = async() => {

    const res = await fetch("http://localhost:5000/products")
    const data = await res.json();
    // console.log(data);

    return {
        props: {
            allProducts:data
        },
        revalidate:30
    }
}