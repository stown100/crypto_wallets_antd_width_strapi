import api from "@/src/utils/Api";
import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Button,
  Popover,
} from "antd";
import { useEffect, useState } from "react";
import getCookie from "../hooks/getCookie";
import FormAddWallet from "../FormAddWallet/FormAddWallet";

function TableAllWalletsComponent({ dataSource, getWallet }) {
  const token = getCookie("token");
  const userId = getCookie("userId");
  let arr = [];
  for (let i = 0; i < dataSource.length; i++) {
    arr.push(dataSource[i]?.attributes?.user?.data?.attributes?.username);
  }
  arr = new Set(arr);
  const testArr = [...arr].map((item) => ({ text: item, value: item }));

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "key",
    // },
    {
      title: "username",
      dataIndex: ["attributes", "user", "data", "attributes", "username"],
      filters: testArr,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        record.attributes.user.data.attributes.username.startsWith(value),
      width: "30%",
    },
    {
      title: "wallet",
      dataIndex: ["attributes", "wallet_type"],
      width: "10%",
    },
    {
      title: "number",
      dataIndex: ["attributes", "card_number"],
      width: "40%",
    },
    {
      title: "description",
      dataIndex: ["attributes", "description"],
      width: 40,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      {/* <FormAddWallet getWallet={getWallet} /> */}
      <Form component={false}>
        <Table
          // components={{
          //   body: {
          //     cell: EditableCell,
          //   },
          // }}
          onChange={onChange}
          bordered
          columns={columns}
          dataSource={dataSource}
          rowClassName="editable-row"
        />
      </Form>
    </>
  );
}
export default TableAllWalletsComponent;
