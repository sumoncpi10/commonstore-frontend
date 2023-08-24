import Header from "@/components/Layout/Header";
import { getSession } from "next-auth/react";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";
import PBS from "@/components/Pages/Office/PBS";
import Zonal from "@/components/Pages/Office/Zonal";
import CC from "@/components/Pages/Office/CC";

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
  // console.log(data);
  return {
    props: {
      zonals: data.data,
      ccs: datacc.data
    },
  };
}
const AdminPage = ({ ccs,zonals,context }) => {
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