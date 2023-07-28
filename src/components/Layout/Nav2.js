import React from "react";
import { Menu, Grid } from "antd";
const { useBreakpoint } = Grid;
const Nav2 = ({ key, setKey }) => {
  const { md } = useBreakpoint();
  return (
    <Menu
      mode={md ? "horizontal" : "inline"}
      onClick={(e) => setKey(e.key)}
      selectedKeys={[key]}
    >
      <Menu.Item key="4">Item 4</Menu.Item>
      <Menu.SubMenu title="Dorpdown" key="5">
        <Menu.Item key="5:1">Drop Item 1</Menu.Item>
        <Menu.Item key="5:2">Drop Item 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Nav2;
