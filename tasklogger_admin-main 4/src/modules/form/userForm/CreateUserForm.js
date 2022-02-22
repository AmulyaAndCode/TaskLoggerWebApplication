import React from "react";
import PropTypes from "prop-types";

import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  DatePicker,
  // Row,
  // Col,
  // Tag,
  // Select,
} from "antd";
import { formatCamelcase, stringCase } from "../../common/utils/stringCase";

const CreateUserForm = ({ submitUserForm, initialValueProp, actionType }) => {
  // const { submitUserForm, initialValueProp } = props;
  console.log("see this is  =---->", initialValueProp);
  // console.log("loading from block form page--- > ", loading);
  // console.log("this is ref --- > ", ref);
  // const [form] = Form.useForm();

  // useImperativeHandle(ref, () => ({
  //   resetBlockForm() {
  //     form.resetFields();
  //     alert("Child function called");
  //   },
  // }));

  // // useImperativeHandle(ref, () => {
  // //   console.log("triggered from parent element");
  // //   const resetForm = () => form.resetFields();
  // // });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: >--->", errorInfo);
  };

  return (
    <Form
      name="createUserForm"
      initialValues={{
        // firstName: initialValueProp.firstName,
        // surname: initialValueProp.surname,
        // role: initialValueProp.role, //["admin", "editor", "user"]
        // dob: initialValueProp.dob, //date
        // email: initialValueProp.email,
        // password: initialValueProp.password,
        // ###################################################### V
        firstName: "",
        surname: "",
        role: "admin", //["admin", "editor", "user"]
        dob: initialValueProp.dob, //date
        email: "kabirpokharel12@gmail.com",
        password: "admin123",
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={submitUserForm}
      onFinishFailed={onFinishFailed}
    >
      {["firstName", "surname"].map((field, id) => {
        const formattedLabel = formatCamelcase(field);
        const labelTitle = stringCase(formattedLabel, "capitalize");
        return (
          <Form.Item
            label={labelTitle}
            name={field}
            key={id + field}
            rules={[
              {
                required: true,
                message: `Please enter ${formattedLabel}!`,
              },
            ]}
          >
            <Input placeholder={`Enter ${formattedLabel}`} />
          </Form.Item>
        );
      })}
      <Form.Item
        label={"Role"}
        name={"role"}
        rules={[
          {
            required: true,
            message: "Please enter user role!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="admin">Admin</Radio>
          <Radio value="editor">Editor</Radio>
          <Radio value="user">User</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={"Date of Birth"}
        name={"dob"}
        rules={[
          {
            required: true,
            message: `Please enter Date of Birth!`,
          },
        ]}
      >
        <DatePicker placeholder={"Enter DOB"} />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        type="password"
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        // hasFeedback
      >
        <Input.Password
          style={{ border: "1px solid #d9d9d9", borderRadius: "6px", padding: "0 10px" }}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        // hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("The two passwords that you entered do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          style={{ border: "1px solid #d9d9d9", borderRadius: "6px", padding: "0 10px" }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {actionType === "edit" ? "Edit User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

CreateUserForm.propTypes = {
  submitUserForm: PropTypes.func,
  initialValueProp: PropTypes.object,
};
CreateUserForm.defaultProps = {
  initialValueProp: {
    firstName: "",
    surname: "",
    role: "", //["admin", "editor", "user"]
    dob: "", //date
    email: "",
    password: "",
  },
  actionType: "create",
};

export default CreateUserForm;
