import Header from '@/components/Layout/Header';
import InfoEntrySidebar from '@/components/Layout/InfoEntrySidebar';
import ComplainAddForm from '@/components/Pages/ComplainAddForm';
import ElectricityAddForm from '@/components/Pages/ElectricityAddForm';
import TransformerAddForm from '@/components/Pages/TransformerAddForm';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';

const Categories = () => {
  const [formId, setFormId] = useState("");
  const category = [
    {
      "id": "1",
      "category": "Complain",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/cpu-cooler/antec/t120/t120-01-228x228.jpg"
    },
    {
      "id": "2",
      "category": "Transformer",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-h610m-K-d4/prime-h610m-K-d4-02-228x228.jpg"
    },
    {
      "id": "3",
      "category": "SAIDI & SAIFI",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
    },
    {
      "id": "4",
      "category": "Electricity",
      "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
    },


  ]

  console.log(category);
  return (
    <div>
      <Header>
        <InfoEntrySidebar category={category} setFormId={setFormId}>
          {!formId && <FeaturedCategories key={category.category} allProducts={category}></FeaturedCategories>}
          {formId == 11 && <ComplainAddForm ></ComplainAddForm>}
          {formId == 21 && <TransformerAddForm ></TransformerAddForm>}
          {formId == 41 && <ElectricityAddForm ></ElectricityAddForm>}
        </InfoEntrySidebar>
      </Header >

    </div>
  );
};

export default Categories;

