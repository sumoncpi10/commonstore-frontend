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

  const resZonal = await fetch(`${process.env.BACKEND_URL}/api/v1/zonal/${session?.pbs_code?.pbs_code}`);
  const dataZonal = await resZonal.json();
  // const res = await fetch(`https://pbsactivities.onrender.com/zonals/${session?.pbs_code?.pbs_code}`);
  const resCC = await fetch(`${process.env.BACKEND_URL}/api/v1/complain`);
  const dataCC = await resCC.json();
  const resDepartment = await fetch(`${process.env.BACKEND_URL}/api/v1/department`);
  const dataDepartment = await resDepartment.json();
  const resDesignation = await fetch(`${process.env.BACKEND_URL}/api/v1/designation`);
  const dataDesignation = await resDesignation.json();
  const resUsers = await fetch(`${process.env.BACKEND_URL}/api/v1/user/`);
  const dataUsers= await resUsers.json();
  const resCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/category`);
  const dataCategory= await resCategory.json();
  const resSubCategory = await fetch(`${process.env.BACKEND_URL}/api/v1/sub-category`);
  const dataSubCategory= await resSubCategory.json();
  // console.log(data);
  return {
    props: {
      zonals: dataZonal.data,
      ccs: dataCC.data,
      designations: dataDesignation.data,
      departments: dataDepartment.data,
      users: dataUsers.data,
      categroys: dataCategory.data,
      subcategroys: dataSubCategory.data
    },
  };
}
const AdminPage = ({ ccs,zonals,designations,departments,users,categroys,subcategroys,context }) => {
  const session = getSession(context);
  const [zonalCode, setZonalCode] = useState(session?.zonal_code?.zonal_code || null);
  const [formId, setformId] = useState(1);

    return (
       <div>
      <Header>
        <AdminSidebar setZonalCode={setZonalCode} setformId={setformId}>
          {/* <PBS zonals={zonals} ccs={ccs}></PBS> */}
            {formId == 2 && <ManageSubCategory subcategroys={subcategroys}></ManageSubCategory>}
            {formId == 4 && <ManageCategory categroys={categroys}></ManageCategory>}
            {formId == 6 && <ManageDesignation designations={designations}></ManageDesignation>}
            {formId == 8 && <ManageDepartment departments={departments}></ManageDepartment>}
            {formId == 10 && <ManageUsers users={users}></ManageUsers>}
            {formId == 11 && <AddZonal ></AddZonal>}
            {formId==12 && <AddCC zonals={zonals} ></AddCC>}
            {formId==13 && <Zonal zonals={zonals} ></Zonal>}
            {formId == 14 && <CC ccs={ccs}></CC>}
        </AdminSidebar>
      </Header>
    </div>
    );
};
export default AdminPage;

