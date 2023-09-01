import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Head from "next/head";

import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import AuthorizedRoute from "@/components/AuthorizedRoute";

const ProfilePage = () => {
  // //console.log("role from profile",role);
  return (
    <div style={{ textAlign: "center" }}>
      <Head>
        <title>User Profile</title>
      </Head>
      {/* <AuthorizedRoute roles={['admin']}> */}
      <h1>User Profile</h1>
      <Avatar size={64} icon={<UserOutlined />} />
      {/* </AuthorizedRoute> */}
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return (
    <Header>
      <Sidebar>
        {page}
      </Sidebar>
    </Header >
  )
}
