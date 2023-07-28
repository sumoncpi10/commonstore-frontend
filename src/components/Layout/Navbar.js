import React, { useState } from 'react';
const { Header } = Layout;
import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import { useSession,  signOut } from "next-auth/react";
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import {  UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Tooltip } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import {  Grid } from "antd";
const { useBreakpoint } = Grid;
import Image from 'next/image';
import { Drawer } from "antd";
import { Row, Col } from 'antd';
const Navbar = () => {
  const { md } = useBreakpoint();
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
    const [visible, setVisibe] = useState(false),
    [key, setKey] = useState("1");
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
    > <Button className="btn" onClick={() => setVisibe(true)}>
          <MenuOutlined />
      </Button>
      
      <Drawer
        title="PC Builder"
          placement="right"
          closable={false}
          onClose={() => setVisibe(false)}
          visible={visible}
    
    >
        <Menu
          
        mode={md ? 'horizontal' : 'inline'}
        onClick={(e) => setKey(e.key)}
        selectedKeys={[key]}
      >
        <Col flex="auto">
          <Link style={{color: "black",textDecoration: 'none' }} href="/profile">
            <Menu.Item>
              <items>Profile</items>
            </Menu.Item>
          </Link>
          <Space wrap>
            {session?.user ? (
              <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<Image src={session?.user?.image} width={25} height={25} />}
              >
                {session.user.name}
              </Dropdown.Button>
            ) : (
              <Link style={{ color: "black",textDecoration: 'none' }} href="/login">
                <Menu.Item>Login</Menu.Item>
              </Link>
            )}
          </Space>
        </Col>
      </Menu>
      </Drawer>
     
      <div className="demo-logo  ">
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "25px",
          }}
        >
          PC Builder
        </Link>
      </div>
      
      <Menu
        theme="primary"
        mode="horizontal"
        style={{
          width: "20%",
          display: "flex",
          fontSize: "20px",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{color: "white", textDecoration: "none" }} 
          href="/profile"
        >
          <items>Profile</items>
        </Link>   <Space wrap>
      {session?.user ? (
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<Image src={session?.user?.image} width={25} height={25} />}>
          {session.user.name}
        </Dropdown.Button>
      ) : (
        <Link style={{ color: "white",textDecoration: "none" }} href="/login">
          Login
        </Link>
      )}
    </Space>
       
      </Menu>
  
    </Header>
  );
};
export default Navbar;
