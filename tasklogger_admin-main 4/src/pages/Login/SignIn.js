/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../modules/redux/actions";
import { Layout, Menu, notification, Button, Row, Col, Typography, Form, Input } from "antd";
import cleaner from "../../asstes/images/cleaner.png";
import baseUrl from "../../modules/common/constant/baseUrl";
const { Title } = Typography;
const { Footer, Content } = Layout;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Login failed",
    description: "Incorrect email or password",
  });
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = ({ email, password }) => {
    setLoading(true);
    axios({
      method: "post",
      url: `${baseUrl}/login`,
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log("see this is response from createBlock", response.data);
        setLoading(false);
        dispatch(loginUser(response.data));
      })
      .catch((err) => {
        openNotificationWithIcon("error");
        console.log("see error");
        setLoading(false);
      });
  };
  return (
    <>
      <Layout style={{ height: "100vh" }} className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around" align="middle" style={{ height: "100%" }}>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    // onClick={userLogging}
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Forgot password?{" "}
                  {/* <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link> */}
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              {/* <img src={signinbg} alt="" /> */}
              <img
                src={cleaner}
                // src={`https://www.alphacleaningsupplies.com.au/wp-content/uploads/2019/05/cleaning-supplies-basket-1-1024x683.jpg`}
                alt=""
                className="border10"
              />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className="copyright">
            {" "}
            Copyright © 2022 Tasklogger by <a href="#pablo">Team 4</a>.{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );
};

export default SignIn;
