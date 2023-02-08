import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getCookie from "../../src/components/hooks/getCookie";
import setCookie from "../../src/components/hooks/setCookie";
import auth from "../../src/utils/Auth";
import styles from "./authorized-from.module.scss";
const Authorized = () => {
  //   const onFinish = (values) => {
  //     console.log("Received values of form: ", values);
  //   };

  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const token = getCookie("token");

  const login = (identifier, password) => {
    auth
      .authorized({ identifier, password })
      .then((res) => {
        setCookie("token", res.jwt);
        router.push("/");
      })
      .catch(() => alert("Авторизуйтесь"));
  };

  useEffect(() => {
    if (token) {
      auth.getAuthMe(token).then((res) => {
        router.push("/");
      });
    }
  }, [token]);

  return (
    <div className={styles.AuthorizedBlock}>
      <Form
        name="normal_login"
        className={("login-form", styles.AuthorizedForm)}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            onClick={() => login(identifier, password)}
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Authorized;
