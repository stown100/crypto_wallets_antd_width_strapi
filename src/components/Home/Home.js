import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
import removeCookie from "../hooks/removeCooie";
import getCookie from "../hooks/getCookie";
import TableComponent from "../Table/Table";
import TableAllWalletsComponent from "../TableAllWalets/TableAllWalets";
import NavBar from "../NavBar/NavBar";
const App = ({
  dataSource,
  setDataSource,
  getWallet,
  navBarItems,
  navId,
  setNavId,
  currentUser,
}) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const exit = () => {
    removeCookie("token");
    removeCookie("userId");
    removeCookie("userName");
    router.push("/authorized");
  };

  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <NavBar
        navBarItems={navBarItems}
        setDataSource={setDataSource}
        setNavId={setNavId}
        currentUser={currentUser}
      />
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {navId === 1 ? (
              <TableComponent getWallet={getWallet} dataSource={dataSource} />
            ) : (
              <TableAllWalletsComponent
                getWallet={getWallet}
                dataSource={dataSource}
              />
            )}
          </div>
        </Content>
        <Button type="primary" onClick={exit}>
          Выйти
        </Button>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
