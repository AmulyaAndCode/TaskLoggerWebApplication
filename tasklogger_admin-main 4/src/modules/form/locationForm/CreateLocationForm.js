import React from "react";
import PropTypes from "prop-types";

import {
  Form,
  Input,
  Button,
  // Typography,
  // Row,
  // Col,
  // Tag,
  // Select,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const isNumeric = (input) => !isNaN(input) && !!input; // you may also check if the value is a nonzero positive integer
// const isOrdered = (start, end) => parseInt(start) < parseInt(end);
// const isRangeValid = (range) =>
//   range.length == 2 && range.every(isNumeric) && isOrdered(range[0], range[1]);
// const isSingleValid = (single) => single.length == 1 && isNumeric(single[0]);

// const roomNumberValidation = (input) => {
//   const inputs = input.split(",").map((x) => x.trim());
//   for (const x of inputs) {
//     if (!x) return false;
//     const pages = x.split("-");
//     if (!isSingleValid(pages) && !isRangeValid(pages)) return false;
//   }

//   return true;
// };

const CreateLocationForm = ({ locationActionFunc, initialValueProp, actionType }) => {
  // const { locationActionFunc, initialValueProp } = props;
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
      name="blockForm"
      initialValues={{
        locationName: initialValueProp.name,
        locationAddress: initialValueProp.location,
        rate: initialValueProp.rate,
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={locationActionFunc}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Location Name"
        name="locationName"
        rules={[
          {
            required: true,
            message: "Please enter Location Name!",
          },
        ]}
      >
        <Input placeholder="Enter Locaiton nameee" />
      </Form.Item>
      <Form.Item
        label="Location Address"
        name="locationAddress"
        rules={[
          {
            required: true,
            message: "Please enter address!",
          },
        ]}
      >
        <Input placeholder="Enter address" />
      </Form.Item>
      {/* <Form.Item
        label="Enter rate"
        name="rate"
        rules={[
          {
            required: true,
            message: "Please enter rate!",
          },
        ]}
      >
        <Input placeholder="Enter rate" />
      </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {actionType === "edit" ? "Edit location" : "Create Location"}
        </Button>
      </Form.Item>
    </Form>
  );
};

CreateLocationForm.propTypes = {
  locationActionFunc: PropTypes.func,
  initialValueProp: PropTypes.object,
};
CreateLocationForm.defaultProps = {
  initialValueProp: { name: "", location: "", rate: 12 },
  actionType: "create",
};

export default CreateLocationForm;
