import Header from '@/components/Layout/Header';
import InfoEntrySidebar from '@/components/Layout/InfoEntrySidebar';
import ComplainAddForm from '@/components/Pages/ComplainAddForm';
import ElectricityAddForm from '@/components/Pages/ElectricityAddForm';
import TransformerAddForm from '@/components/Pages/TransformerAddForm';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';
import ElectricityReport from '@/components/Reports/Electricity';
import ManageRevinueItem from '@/components/Pages/Info/ManageRevinueItem';
import ManageBrand from '@/components/Pages/Info/ManageBrand';
import ManageModel from '@/components/Pages/Info/ManageModel';
import ManageSupplier from '@/components/Pages/Info/ManageSupplier';
import ManageCapitalItem from '@/components/Pages/Info/ManageCapitalItem';
import AddSupplier from '@/components/Pages/Info/AddSupplier';
import AddBrand from '@/components/Pages/Info/AddBrand';
import AddModel from '@/components/Pages/Info/AddModel';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session || session.role.role !== "admin") {
    // Redirect to a page with an appropriate message or display an error message
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const accessToken = session?.accessToken?.accessToken;
  const getMethod = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  }
  const resCapitalItem = await fetch(`${process.env.BACKEND_URL}/api/v1/capital-item`, getMethod);
  const dataCapitalItem = await resCapitalItem.json();
  const resBrand = await fetch(`${process.env.BACKEND_URL}/api/v1/brand`, getMethod);
  const dataBrand = await resBrand.json();
  const resModel = await fetch(`${process.env.BACKEND_URL}/api/v1/model`, getMethod);
  const dataModel = await resModel.json();
  const resSupplier = await fetch(`${process.env.BACKEND_URL}/api/v1/supplier/${session?.pbs_code?.pbs_code}`, getMethod);
  const dataSupplier = await resSupplier.json();
  // console.log(data);
  return {
    props: {
      capitalItem: dataCapitalItem.data || [],
      brands: dataBrand.data || [],
      models: dataModel.data || [],
      suppliers: dataSupplier.data || [],
    },
  };
}
const Categories = ({ capitalItem, brands, models, suppliers }) => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  console.log(session?.zonal_code);

  const [formId, setFormId] = useState(2);
  const category = [
    {
      "id": "1",
      "category": "Electricity",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
    },
    {
      "id": "2",
      "category": "Complain",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/cpu-cooler/antec/t120/t120-01-228x228.jpg"
    },
    {
      "id": "3",
      "category": "Transformer",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-h610m-K-d4/prime-h610m-K-d4-02-228x228.jpg"
    },
    {
      "id": "4",
      "category": "SAIDI & SAIFI",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
    }



  ]

  console.log(category);
  return (
    <div>
      {contextHolder}
      <Header>
        <InfoEntrySidebar category={category} setFormId={setFormId}>
          {!formId && <FeaturedCategories key={category.category} allProducts={category}></FeaturedCategories>}
          {formId == 2 && <ManageRevinueItem ></ManageRevinueItem>}
          {formId == 4 && <ManageCapitalItem capitalItem={capitalItem}></ManageCapitalItem>}
          {formId == 7 && <AddBrand ></AddBrand>}
          {formId == 8 && <ManageBrand brands={brands}></ManageBrand>}
          {formId == 9 && <AddModel brands={brands}></AddModel>}
          {formId == 10 && <ManageModel models={models}></ManageModel>}
          {formId == 11 && <AddSupplier ></AddSupplier>}
          {formId == 12 && <ManageSupplier suppliers={suppliers}></ManageSupplier>}

        </InfoEntrySidebar>
      </Header >

    </div>
  );
};

export default Categories;

