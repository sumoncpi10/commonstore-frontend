import Header from "@/components/Layout/Header";
import { getSession } from "next-auth/react";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";
import PBS from "@/components/Pages/Office/PBS";
import Zonal from "@/components/Pages/Office/Zonal";
import CC from "@/components/Pages/Office/CC";
import ManageCategory from "@/components/Pages/Category/ManageCategory";
import ManageSubCategory from "@/components/Pages/Category/ManageSubCategory";
import ManageUsers from "@/components/Pages/Users/ManageUsers";
import ManageDepartment from "@/components/Pages/Department/ManageDepartment";
import ManageDesignation from "@/components/Pages/Department/ManageDesignation";
import AddZonal from "@/components/Pages/Office/AddZonal";
import AddCC from "@/components/Pages/Office/AddCC";
import AddCategory from "@/components/Pages/Category/AddCategory";
import AddSubCategory from "@/components/Pages/Category/AddSubCategory";
import AddDepartment from "@/components/Pages/Department/AddDepartment";
import AddDesignation from "@/components/Pages/Department/AddDesignation";
import AddUser from "@/components/Pages/Users/AddUser";
import { headers } from "next/dist/client/components/headers";

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
  const resItemType = await fetch(`${process.env.BACKEND_URL}/api/v1/item-type`, getMethod);
  const dataItemType = await resItemType.json();
  const resCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/category`, getMethod);
  const dataCategory = await resCategory.json();
  const resSubCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/sub-category`, getMethod);
  const dataSubCategory = await resSubCategory.json();
  const resZonal = await fetch(`${process.env.BACKEND_URL}/api/v1/zonal/${session?.pbs_code?.pbs_code}`, getMethod);
  const dataZonal = await resZonal.json();
  const resCC = await fetch(`${process.env.BACKEND_URL}/api/v1/complain/${session?.pbs_code?.pbs_code}`, getMethod);
  const dataCC = await resCC.json();
  const resDepartment = await fetch(`${process.env.BACKEND_URL}/api/v1/department`, getMethod);
  const dataDepartment = await resDepartment.json();
  const resDesignation = await fetch(`${process.env.BACKEND_URL}/api/v1/designation`, getMethod);
  const dataDesignation = await resDesignation.json();
  const resUsers = await fetch(`${process.env.BACKEND_URL}/api/v1/user/${session?.pbs_code?.pbs_code}`, getMethod);
  const dataUsers = await resUsers.json();

  // console.log(data);
  return {
    props: {
      itemType: dataItemType.data || [],
      categroys: dataCategory.data || [],
      subcategroys: dataSubCategory.data || [],
      designations: dataDesignation.data || [],
      departments: dataDepartment.data || [],
      users: dataUsers.data || [],
      zonals: dataZonal.data || [],
      ccs: dataCC.data || []
    },
  };
}
const AdminPage = ({ itemType, categroys, subcategroys, designations, departments, users, zonals, ccs, context }) => {
  const session = getSession(context);
  const [zonalCode, setZonalCode] = useState(session?.zonal_code?.zonal_code || null);
  const [formId, setformId] = useState(1);

  return (
    <div>
      <Header>
        <AdminSidebar setZonalCode={setZonalCode} setformId={setformId}>
          {/* <PBS zonals={zonals} ccs={ccs}></PBS> */}
          {formId == 1 && <AddSubCategory categroys={categroys}></AddSubCategory>}
          {formId == 2 && <ManageSubCategory subcategroys={subcategroys}></ManageSubCategory>}
          {formId == 3 && <AddCategory itemType={itemType}></AddCategory>}
          {formId == 4 && <ManageCategory categroys={categroys}></ManageCategory>}
          {formId == 5 && <AddDesignation departments={departments}></AddDesignation>}
          {formId == 6 && <ManageDesignation designations={designations}></ManageDesignation>}
          {formId == 7 && <AddDepartment></AddDepartment>}
          {formId == 8 && <ManageDepartment departments={departments}></ManageDepartment>}
          {formId == 9 && <AddUser></AddUser>}
          {formId == 10 && <ManageUsers users={users}></ManageUsers>}
          {formId == 11 && <AddZonal ></AddZonal>}
          {formId == 12 && <AddCC zonals={zonals} ></AddCC>}
          {formId == 13 && <Zonal zonals={zonals} ></Zonal>}
          {formId == 14 && <CC ccs={ccs}></CC>}
        </AdminSidebar>
      </Header>
    </div>
  );
};
export default AdminPage;

