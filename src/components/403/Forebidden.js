import React from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

function Forebidden() {
  const router = useRouter();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => router.push("/authorized")}>
          Войти
        </Button>
      }
    />
  );
}

export default Forebidden;
