import React from "react";
import { Menu, Grid } from "antd";
const { useBreakpoint } = Grid;
const Nav1 = ({ key, setKey }) => {
  const { md } = useBreakpoint();
  return (
    <Menu
      mode={md ? "horizontal" : "inline"}
      onClick={(e) => setKey(e.key)}
      selectedKeys={[key]}
    >
      <Menu.Item key="1">Item 1</Menu.Item>
      <Menu.Item key="2">Item 2</Menu.Item>
      <Menu.Item key="3">Item 3</Menu.Item>
    </Menu>
  );
};

export default Nav1;
