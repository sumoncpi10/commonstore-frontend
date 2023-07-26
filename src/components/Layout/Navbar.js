import React from 'react';
const { Header } = Layout;
import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import { useSession,  signOut } from "next-auth/react";
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import {  UserOutlined } from '@ant-design/icons';
import {  Dropdown,  Space, Tooltip } from 'antd';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  
  // message.info('Click on menu item.');
  console.log('click', e);
  if(e.key=="2"){
    signOut()
  }
  if (e.key === "1") {
    router.push('/profile');
  }
};
const items = [
  {
    label: 'Profile',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Logout',
    key: '2',
    icon: <UserOutlined />,
  },

];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
  return (
    <Header
      style={{
        display: "flex",
        backgroundColor:"primary",
        justifyContent: "space-between",
      }}
    >
      <div className="demo-logo">
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "25px",
          }}
        >
          PBS Information
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          width: "20%",
          display: "flex",
          fontSize: "20px",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "white" }}
          href="/profile"
        >
          <items>Profile</items>
        </Link>{session?.user?<Space wrap>
         <Dropdown.Button menu={menuProps}  placement="bottom" icon={<UserOutlined />}>
      {session?.user?.name}
    </Dropdown.Button>
      </Space>:<Link style={{ textDecoration: "none", color: "white" }} href="/login">
          <items>Login</items>
        </Link>  }
        {/* <items>
          <Button onClick={()=>signOut()} type="primary" danger>
            Logout
          </Button>
        </items> */}
      </Menu>
        
{/* <Space wrap> */}
    {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      Dropdown
    </Dropdown.Button> */}
    {/* <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
      Dropdown
    </Dropdown.Button> */}
    {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick} disabled>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      menu={menuProps}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton, {
          loading: true,
        }),
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick} danger>
      Danger
    </Dropdown.Button> */}
  {/* </Space> */}
    </Header>
  );
};
export default Navbar;
