import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  DatePicker,
  Select,
  // Row,
  // Col,
  // Tag,
  // Select,
} from "antd";
import { formatCamelcase, stringCase } from "../../common/utils/stringCase";

const { Option } = Select;

const CreatePostForm = ({ submitPostForm, initialValueProp, actionType }) => {
  const cleaningData = useSelector((state) => state.cleaning);
  const { allUsers } = cleaningData;

  // const { submitPostForm, initialValueProp } = props;
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
      name="cretePostForm"
      initialValues={{
        subject: initialValueProp.subject, //date
        description: initialValueProp.description, //date
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={submitPostForm}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label={"Subject"}
        name={"subject"}
        rules={[
          {
            required: true,
            message: `Please enter subject!`,
          },
        ]}
      >
        <Input placeholder={`Enter subject`} />
      </Form.Item>
      <Form.Item
        label={"Description"}
        name={"description"}
        rules={[
          {
            required: true,
            message: `Please enter Description!`,
          },
        ]}
      >
        <Input.TextArea style={{ height: "100px" }} placeholder={`Enter Description`} />
      </Form.Item>
      <Form.Item
        label={"Send to"}
        name={"users"}
        rules={[
          {
            required: true,
            message: `Please select atleast one employee!`,
          },
        ]}
      >
        <Select
          mode="tags"
          // disabled
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={[]}
          // onChange={(value) => console.log("this is value -- -->", value)}
        >
          {allUsers.map((user) => (
            <Select.Option key={user.shortid} value={user.shortid}>
              {user.fullName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {actionType === "edit" ? "Edit Post" : "Create Post"}
        </Button>
      </Form.Item>
    </Form>
  );
};

CreatePostForm.propTypes = {
  submitPostForm: PropTypes.func,
  initialValueProp: PropTypes.object,
};
CreatePostForm.defaultProps = {
  initialValueProp: {
    subject: "",
    description: "",
  },
  actionType: "create",
};

export default CreatePostForm;
