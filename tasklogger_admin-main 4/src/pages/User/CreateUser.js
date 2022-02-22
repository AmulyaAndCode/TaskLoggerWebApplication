import React, { useState } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { Button, Row, Col, Result, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import baseUrl from "../../modules/common/constant/baseUrl";
import { initilizeLocations } from "../../modules/redux/actions";
import CreateLocationForm from "../../modules/form/locationForm/CreateLocationForm";
import CreateUserForm from "../../modules/form/userForm/CreateUserForm";
import CardComponent from "../../modules/common/components/CardComponent";

const { Paragraph, Text, Title } = Typography;
const ResultCard = ({ error }) => {
  // let navigate = useNavigate();
  console.log("typeof error --- ->", typeof error);
  console.log("error -- --> ", error);

  // console.log(
  //   "see this is an error for result card   error[0].response.message -- -- > ",
  //   error[0].response.message
  // );
  // console.log("error[0].response.body -- -- > ", error[0].response?.body);
  // console.log("error[0].response.data -- -- > ", error[0].response?.data);
  // console.log("error[0].Error -- -- > ", error[0]["Error"]);
  if (error.length) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          // <Button type="primary" key="console">
          //   Go Console
          // </Button>,
          <Button onClick={() => window.location.reload(false)} key="try">
            Try Again
          </Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          {error.map((err, id) => (
            <Paragraph key={id}>
              <CloseCircleOutlined className="site-result-demo-error-icon" />
              <span style={{ marginLeft: "0.5rem" }}>{err.response.data.message}</span>
            </Paragraph>
          ))}
        </div>
      </Result>
    );
  } else {
    return (
      <Result
        status="success"
        title="Successfully created a new user!"
        subTitle="Please talley the details of new user."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              // setStatusPopup(false);

              window.location.reload(false);
              // navigate(`/location/${locationId}/location_detail`);
              // history.push({
              //   pathname: `/location_details/${locationId}`,
              // });
            }}
          >
            Done
          </Button>,
          <Button key="buy" onClick={() => alert("redirect page to block menu")}>
            Cancel
          </Button>,
        ]}
      />
    );
  }
};
const CreateUser = () => {
  const [statusPopup, setStatusPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const submitUserForm = (values) => {
    console.log("11-12 I have reached here to location action!!!");
    setLoading(true);
    const { firstName, surname, role, dob, email, password } = values;
    console.log("see this is values of create location form", values);
    axios({
      method: "post",
      url: `${baseUrl}/signup`,
      data: {
        firstName,
        surname,
        role, //["admin", "editor", "user"]
        dob, //date
        email,
        password,
      },
    })
      .then((res) => {
        console.log("see this is response from create user", res);
        setLoading(false);
        setStatusPopup(true);
      })
      .catch((err) => {
        console.log("error.response.data ---- --- -->", err.response?.data);
        console.log("error.response.status ---- --- -->", err.response?.status);
        console.log("error.response.headers ---- --- -->", err.response?.headers);
        setError([...error, err]);
        setLoading(false);
        setStatusPopup(true);
        console.log("see this is an error from create user --------> ", err);
      });
  };
  return (
    <Row justify="center">
      <Col
        xs={{ span: 24 }}
        lg={{ span: 18 }}
        // style={{ background: "green" }}
      >
        {statusPopup ? (
          <ResultCard error={error} setStatusPopup={setStatusPopup} />
        ) : (
          <CardComponent
            bordered={false}
            loading={loading}
            bodyStyle={{
              paddingTop: "20px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Title level={4} type="secondary">
                Create User
              </Title>
            </div>
            <CreateUserForm {...{ submitUserForm }} />
          </CardComponent>
        )}
      </Col>
    </Row>
  );
};

// Block.propTypes = {};

export default CreateUser;
