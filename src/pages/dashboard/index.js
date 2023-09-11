import Header from '@/components/Layout/Header';
import DashboardSidebar from '@/components/Layout/DashboardSidebar';
import ComplainAddForm from '@/components/Pages/ComplainAddForm';
import ElectricityAddForm from '@/components/Pages/ElectricityAddForm';
import TransformerAddForm from '@/components/Pages/TransformerAddForm';
import FeaturedCategories from '@/components/UI/FeaturedCategories';
import React, { useState } from 'react';
import { message, notification } from "antd";
import { getSession, useSession } from 'next-auth/react';
import CertifyCapitalItem from '@/components/Dashboard/CertifyCapitalItem';
import ApproveCapitalItem from '@/components/Dashboard/ApproveCapitalItem';
import IssueCapitalItem from '@/components/Dashboard/IssueCapitalItem';
import ReceivedCapitalItem from '@/components/Dashboard/ReceivedCapitalItem';
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session?.role?.role !== "admin"||session?.role?.role !== "user") {
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
    const resRevenueItem = await fetch(`${process.env.BACKEND_URL}/api/v1/revenue-item/${session?.pbs_code?.pbs_code}`, getMethod);
    const dataRevenueItem = await resRevenueItem.json();
    const resCapitalItem = await fetch(`${process.env.BACKEND_URL}/api/v1/capital-item/${session?.pbs_code?.pbs_code}`, getMethod);
    const dataCapitalItem = await resCapitalItem.json();
    const resNotReceivedCapitalItem = await fetch(`${process.env.BACKEND_URL}/api/v1/capital-item/not-receive/${session?.pbs_code?.pbs_code}`, getMethod);
    const dataNotReceivedCapitalItem = await resNotReceivedCapitalItem.json();
    let dataNotCertifyCapitalItem="",dataNotApproveCapitalItem="";
    if(session?.role?.role !== "admin"){
        const resNotCertifyCapitalItem = await fetch(`${process.env.BACKEND_URL}/api/v1/capital-item/not-certify/${session?.pbs_code?.pbs_code}`, getMethod);
        dataNotCertifyCapitalItem = await resNotCertifyCapitalItem.json();
        const resNotApproveCapitalItem = await fetch(`${process.env.BACKEND_URL}/api/v1/capital-item/not-approve/${session?.pbs_code?.pbs_code}`, getMethod);
        dataNotApproveCapitalItem = await resNotApproveCapitalItem.json();
    }
    // //console.log(data);
    return {
        props: {
            revenueItem: dataRevenueItem.data || [],
            capitalItem: dataCapitalItem.data || [],
            notCertifyCapitalItem: dataNotCertifyCapitalItem.data || [],
            notApproveCapitalItem: dataNotApproveCapitalItem.data || [],
            notReceiveCapitalItem: dataNotReceivedCapitalItem.data || [],


        },
    };
}
const Categories = ({ revenueItem, capitalItem, notCertifyCapitalItem,notApproveCapitalItem, notReceiveCapitalItem }) => {
    //console.log(electricity)
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [formId, setFormId] = useState("");

    //console.log(category);
    return (
        <div>
            {contextHolder}
            <Header>
                <DashboardSidebar setFormId={setFormId}>
                    {/* {!formId && <FeaturedCategories key={category.category} allProducts={category}></FeaturedCategories>} */}

                    {formId == 1 && <CertifyCapitalItem notCertifyCapitalItem={notCertifyCapitalItem}></CertifyCapitalItem>}
                    {formId == 2 && <ApproveCapitalItem notApproveCapitalItem={notApproveCapitalItem}></ApproveCapitalItem>}
                    {formId == 5 && <ReceivedCapitalItem notReceiveCapitalItem={notReceiveCapitalItem}></ReceivedCapitalItem>}
                    {/* {formId == 12 && <ElectricityReport electricity={electricity}></ElectricityReport>}
                    {formId == 13 && <ElectricityReport electricity={electricity1}></ElectricityReport>}
                    {formId == 21 && <ComplainAddForm ></ComplainAddForm>}
                    {formId == 31 && <TransformerAddForm ></TransformerAddForm>} */}
                </DashboardSidebar>
            </Header >

        </div>
    );
};

export default Categories;
