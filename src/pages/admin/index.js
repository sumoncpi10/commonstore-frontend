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

  const res = await fetch(`http://localhost:5000/api/v1/zonal`);
  // const res = await fetch(`https://pbsactivities.onrender.com/zonals/${session?.pbs_code?.pbs_code}`);
  const data = await res.json();
  const rescc = await fetch(`http://localhost:5000/api/v1/complain`);
  // const res = await fetch(`https://pbsactivities.onrender.com/zonals/${session?.pbs_code?.pbs_code}`);
  const datacc = await rescc.json();
  const resCategory = await fetch(`http://localhost:5000/api/v1/category`);
  const dataCategory= await resCategory.json();
  const resSubCategory = await fetch(`http://localhost:5000/api/v1/sub-category`);
  const dataSubCategory= await resSubCategory.json();
  // console.log(data);
  return {
    props: {
      zonals: data.data,
      ccs: datacc.data,
      categroys: dataCategory.data,
      subcategroys: dataSubCategory.data
    },
  };
}
const AdminPage = ({ ccs,zonals,categroys,subcategroys,context }) => {
  const session = getSession(context);
  const [zonalCode, setZonalCode] = useState(session?.zonal_code?.zonal_code || null);
  const [formId, setformId] = useState(1);
  // const [ccs, setCCS] = useState([]);
  //   useEffect(() => {
  //       fetch(`https://pbsactivities-server.vercel.app/ccs/${zonalCode}`)
  //           .then(res => res.json())
  //           .then(data => {
  //               console.log(data)
  //               setCCS(data);
  //           })
  //   }, [zonalCode]);
// console.log(category);
    return (
       <div>
      <Header>
        <AdminSidebar setZonalCode={setZonalCode} setformId={setformId}>
          {/* <PBS zonals={zonals} ccs={ccs}></PBS> */}
            {formId == 2 && <ManageSubCategory subcategroys={subcategroys}></ManageSubCategory>}
            {formId == 4 && <ManageCategory categroys={categroys}></ManageCategory>}
            {formId==7 && <Zonal zonals={zonals} ></Zonal>}
            {formId == 8 && <CC ccs={ccs}></CC>}
        </AdminSidebar>
      </Header>
    </div>
    );
};
export default AdminPage;

// AdminPage.getLayout = function getLayout(page) {
//   return (
//     <Header>
//     <AdminSidebar setZonalCode={setZonalCode}>
//       {page}
//     </AdminSidebar>
//   </Header >
//   )
// }