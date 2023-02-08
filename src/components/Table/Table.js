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
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import getCookie from "../hooks/getCookie";
import FormAddWallet from "../FormAddWallet/FormAddWallet";

function TableComponent({ dataSource, getWallet }) {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const date = new Date();

  const confirm = (e) => {
    deleteWallet(e);
  };
  const cancel = (e) => {
    console.log(e);
  };

  const [columns, setColumns] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "key",
    // },
    {
      title: "wallet",
      dataIndex: ["attributes", "wallet_type"],
      width: "10%",
    },
    {
      title: "number",
      dataIndex: ["attributes", "card_number"],
      width: "50%",
    },
    {
      title: "description",
      dataIndex: ["attributes", "description"],
      width: 40,
    },
    // {
    //   title: "username",
    //   dataIndex: ["attributes", "user", "data", "attributes", "username"],
    // },
    {
      title: "Action",
      key: "operation",
      render: (key) =>
        // С пятого числа (включительно) до 15го (не включительно) нельзя удалять кошельки
        date.getDate() > 5 && date.getDate() <= 15 ? (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(key.key)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger>
              Delete
            </Button>
          </Popconfirm>
        ) : (
          // <Popconfirm
          //   title="Don't delete"
          //   description=""
          //   // onCancel={cancel}
          // >
          //   <Button type="text" danger disabled={true}>
          //     Delete
          //   </Button>
          // </Popconfirm>
          <Tooltip placement="topLeft" title="Don't delete" disabled={true}>
            <Button>Delete</Button>
          </Tooltip>
        ),
    },
  ]);

  // console.log(date.getDate() >= 5);
  // console.log(date.getDate() < 15)

  const deleteWallet = (id) => {
    api.deleteUserWallet(token, id).then((res) => {
      getWallet(token, userId);
    });
  };

  return (
    <>
      <FormAddWallet getWallet={getWallet} />
      <Form component={false}>
        <Table
          // components={{
          //   body: {
          //     cell: EditableCell,
          //   },
          // }}
          bordered
          columns={columns}
          dataSource={dataSource}
          rowClassName="editable-row"
        />
      </Form>
    </>
  );
}
export default TableComponent;
