import Header from "@/components/Layout/Header";
import { getSession } from "next-auth/react";
import AdminSidebar from "@/components/Layout/AdminSidebar";
import Admin from "@/components/Pages/Admin";
import { useEffect, useState } from "react";

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

  const res = await fetch(`https://pbsactivities-server.vercel.app/zonals/${session?.pbs_code?.pbs_code}`);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      zonals: data
    },
  };
}
const AdminPage = ({ zonals,context }) => {
  const session = getSession(context);
  const [zonalCode, setZonalCode] = useState(session?.zonal_code?.zonal_code||null);
  const [ccs, setCCS] = useState([]);
    useEffect(() => {
        fetch(`https://pbsactivities-server.vercel.app/ccs/${zonalCode}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCCS(data);
            })
    }, [zonalCode]);
// console.log(category);
    return (
       <div>
      <Header>
        <AdminSidebar setZonalCode={setZonalCode}>
          <Admin zonals={zonals} ccs={ccs}></Admin>
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