import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  DatePicker,
  Select,
  TimePicker,
  // Row,
  // Col,
  // Tag,
  // Select,
} from "antd";
import { formatCamelcase, stringCase } from "../../common/utils/stringCase";
import baseUrl from "../../common/constant/baseUrl";
import Loader from "../../common/components/Loader";

const { RangePicker } = DatePicker;
const { Option } = Select;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};
const GenerateReportForm = () => {
  const [loading, setLoading] = useState(false);
  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;
  const onFinish = (fieldsValue) => {
    setLoading(true);
    console.log("see this is fields value -- ->", fieldsValue);
    // Should format date value before submit.
    // const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      //   "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
      //   "date-time-picker": fieldsValue["date-time-picker"].format("YYYY-MM-DD HH:mm:ss"),
      //   "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
      //   "range-picker": [rangeValue[0].format("YYYY-MM-DD"), rangeValue[1].format("YYYY-MM-DD")],
      "range-time-picker": [
        rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      ],
      //   "time-picker": fieldsValue["time-picker"].format("HH:mm:ss"),
    };
    console.log("Received values of form: ", values);

    axios({
      method: "get",
      headers: { user: user.shortid },
      responseType: "blob",
      // url: `${baseUrl}/report/get?startTime=2022-02-10T03:59:19.295Z&endTime=2021-02-13T03:59:19.295Z&user=feh198rbF`,
      url: `http://localhost:4000/report/get?startTime=2022-02-10T03:59:19.295Z&endTime=2021-02-13T03:59:19.295Z&user=feh198rbF`,
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv"); //or any other extension
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("see this is an error from locaiton page --------> ", err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: >--->", errorInfo);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "200px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <Form
      name="downloadReportForm"
      initialValues={
        {
          // startDate: initialValueProp.startDate, //date
          // endDate: initialValueProp.endDate, //date
        }
      }
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
        <RangePicker
          showTime
          // format="YYYY-MM-DD HH:mm:ss"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Download
        </Button>
      </Form.Item>
    </Form>
  );
};

GenerateReportForm.propTypes = {
  submitPostForm: PropTypes.func,
  initialValueProp: PropTypes.object,
};
GenerateReportForm.defaultProps = {
  initialValueProp: {
    startDate: "",
    endDate: "",
  },
  actionType: "create",
};

export default GenerateReportForm;
