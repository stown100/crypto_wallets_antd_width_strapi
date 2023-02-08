import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import getCookie from "../hooks/getCookie";
import api from "@/src/utils/Api";

function NavBar({ navBarItems, setDataSource, setNavId, currentUser }) {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const items = navBarItems.map((i) => i.attributes.title);

  const handleChangeTable = (e) => {
    setNavId(+e.key);
    // if (e.key === "1") {
    //   api.getWallets(token, userId).then((data) => {
    //     setDataSource(data.data);
    //   });
    // }
    // if (e.key === "2") {
    //   api.getInitialWallets(token).then((data) => {
    //     console.log(data);
    //     setDataSource(data.data);
    //   });
    // }
  };
  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <h1>MONETIX</h1>
      </div>
      <Menu
        theme="light"
        mode="inline"
        onClick={(e) => handleChangeTable(e)}
        defaultSelectedKeys={["1"]}
        // items={[UserOutlined, UserOutlined].map((icon, index) => ({
        //   key: String(index + 1),
        //   icon: React.createElement(icon),
        //   label: `nav ${index + 1}`,
        // }))}
        items={items.map((item, index) => ({
          key: String(index + 1),
          label: item,
        }))}
      />
    </Sider>
  );
}

export default NavBar;
