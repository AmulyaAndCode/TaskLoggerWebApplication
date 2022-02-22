import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, Tag, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardComponent from "../../common/components/CardComponent";
import { useEffect } from "react";
import { numberToRange } from "../../../pages/block/blockFunciton";

const { Option } = Select;

const isNumeric = (input) => !isNaN(input) && !!input; // you may also check if the value is a nonzero positive integer
const isOrdered = (start, end) => parseInt(start) < parseInt(end);
const isRangeValid = (range) =>
  range.length == 2 && range.every(isNumeric) && isOrdered(range[0], range[1]);
const isSingleValid = (single) => single.length == 1 && isNumeric(single[0]);

const roomNumberValidation = (input) => {
  const inputs = input.split(",").map((x) => x.trim());
  for (const x of inputs) {
    if (!x) return false;
    const pages = x.split("-");
    if (!isSingleValid(pages) && !isRangeValid(pages)) return false;
  }

  return true;
};

const CreateBlockForm = (props) => {
  const { createBlock, loading, blockOperation, currentBlock } = props;
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (blockOperation === "edit") {
      form.setFieldsValue({
        blockName: currentBlock?.name || "",
        blockRooms: currentBlock?.rooms && numberToRange(currentBlock.rooms),
        extras: currentBlock?.extras || [],
      });
    } else {
      form.setFieldsValue({
        blockName: "",
        blockRooms: "",
        extras: [],
      });
    }
  }, [currentBlock, form, blockOperation]);
  return (
    <Form
      form={form}
      name="blockForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      // initialValues={
      //   {
      //     // // blockName: currentBlock?.name || "",
      //     // blockRooms: currentBlock?.rooms || [],
      //     // extras: currentBlock?.extras || [],
      //   }
      // }
      onFinish={createBlock}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Block Name"
        name="blockName"
        placeholder="Enter block name"
        rules={[
          {
            required: true,
            message: "Please enter block Name!",
          },
        ]}
      >
        <Input placeholder="Enter block name" />
      </Form.Item>
      <Form.Item
        label="Block rooms"
        name="blockRooms"
        rules={[
          {
            required: true,
            message: "Please input block rooms!",
          },
          {
            validator(_, value) {
              if (roomNumberValidation(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("Please enter the room number as per suggestion"));
              }
            },
          },
        ]}
      >
        <Input placeholder="Enter room no. (Eg. 1,3-5 equals to 1,3,4,5)" />
      </Form.Item>
      <Form.Item
        label="Extras"
        name="extras"
        rules={[
          {
            required: true,
            message: "Please enter extra areas that needs cleaning!",
          },
        ]}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Enter extras (press 'Enter' key after each item)"
          dropdownStyle={{ display: "none" }}
          // onChange={handleChange}
        >
          {/* {children} */}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Row>
          <Col span={4}>
            <Button loading={loading} type="primary" htmlType="submit">
              {blockOperation === "edit" ? "Edit" : "Add"}
            </Button>
          </Col>
          {/* <Col offset={4} span={4}>
            <Button loading={loading} onClick={() => form.resetFields()} danger>
              Delete
            </Button>
          </Col> */}
        </Row>
      </Form.Item>
    </Form>
  );
};

CreateBlockForm.propTypes = {
  createBlock: PropTypes.func,
  loading: PropTypes.bool,
};

export default CreateBlockForm;
