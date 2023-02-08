import api from "@/src/utils/Api";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import getCookie from "../hooks/getCookie";
const { Option } = Select;
const App = ({ getWallet }) => {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const date = new Date();
  const [open, setOpen] = useState(false);
  const [disabledState, setDisablesState] = useState(false);
  const [clickSubmith, setClickSubmith] = useState(false);
  const [wallet, setWallet] = useState({
    wallet_type: "",
    card_number: "",
    description: "",
    user: [userId],
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const handleChangeInput = (e) => {
    const value = e?.target?.value;
    const name = e?.target?.id;
    if (e === "card" || e === "crypto") {
      setWallet((prev) => {
        let newState = { ...prev };
        newState = {
          ...prev,
          wallet_type: e,
          card_number: wallet.card_number,
          description: wallet.description,
          user: [userId],
        };
        return newState;
      });
    }
    if (name === "number") {
      setWallet((prev) => {
        let newState = { ...prev };
        newState = {
          ...prev,
          wallet_type: wallet.wallet_type,
          card_number: value,
          description: wallet.description,
          user: [userId],
        };
        return newState;
      });
    }
    if (name === "description") {
      setWallet((prev) => {
        let newState = { ...prev };
        newState = {
          ...prev,
          wallet_type: wallet.wallet_type,
          card_number: wallet.card_number,
          description: value,
          user: [userId],
        };
        return newState;
      });
    }
  };

  const addWallet = () => {
    api
      .addUserWallet(token, { data: wallet })
      .then((res) => {
        setOpen(false);
        getWallet(token, userId);
      })
      .catch((err) => console.log(err));
    setClickSubmith(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {date.getDate() > 5 && date.getDate() <= 15 ? (
        <Button
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
          style={{ margin: "0 0 25px" }}
        >
          New wallet
        </Button>
      ) : (
        <h1 className="form-add-wallet__title">
          Внесение изменений в реквизиты можно производить с 6-го по 15-е число
          каждого месяца
        </h1>
      )}

      <Drawer
        title="Create a new account"
        width={720}
        onClose={addWallet}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={addWallet}
              type="primary"
              disabled={disabledState ? true : false}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                name="type"
                label="Type"
                value={wallet.type}
                onChange={(e) => handleChangeInput(e)}
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the type"
                  onChange={(e) => handleChangeInput(e)}
                >
                  <Option value="card">Card</Option>
                  <Option value="crypto">Crypto</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="number"
                label="Number"
                value={wallet.card_number}
                onChange={(e) => handleChangeInput(e)}
                rules={[
                  {
                    required: true,
                    message: "Please enter number",
                  },
                ]}
              >
                <Input placeholder="Please enter number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                value={wallet.description}
                onChange={(e) => handleChangeInput(e)}
                rules={[
                  {
                    required: true,
                    message: "please enter description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default App;
