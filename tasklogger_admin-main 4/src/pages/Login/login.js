import React from "react";
import "antd/dist/antd.min.css";
import "./loginStyle.css";
import { loginUser } from "../../modules/redux/actions";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);
  console.log("this is cleaning data", cleaningData);

  return (
    <div
      style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
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
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={() => dispatch(loginUser())}
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
