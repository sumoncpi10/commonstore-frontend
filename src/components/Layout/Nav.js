import React, { useState } from "react";
import Nav1 from "./Nav1";
import Nav2 from "./Nav2";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const Nav = () => {
  const [visible, setVisibe] = useState(false),
    [key, setKey] = useState("1");
  return (
    <nav className="navbar">
      <div className="logo">PC Builder</div>
      <div className="nav-container">
        <div className="left-nav">
          <Nav1 key={key} setKey={setKey} />
        </div>
        <div className="right-nav">
          <Nav2 key={key} setKey={setKey} />
        </div>
        <Button className="btn" onClick={() => setVisibe(true)}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="LOGO"
          placement="right"
          closable={false}
          onClose={() => setVisibe(false)}
          visible={visible}
        >
          <Nav1 key={key} setKey={setKey} />
          <Nav2 key={key} setKey={setKey} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Nav;
