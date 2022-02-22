import React, { useState } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Result, Typography, Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import baseUrl from "../../modules/common/constant/baseUrl";
import { initilizeLocations } from "../../modules/redux/actions";
import CreateLocationForm from "../../modules/form/locationForm/CreateLocationForm";
import CreateUserForm from "../../modules/form/userForm/CreateUserForm";
import CardComponent from "../../modules/common/components/CardComponent";
import CreatePostForm from "../../modules/form/post/createPostForm";
import Post from "./Post";

const { Paragraph, Text, Title } = Typography;
const ResultCard = ({ error }) => {
  // let navigate = useNavigate();
  console.log("this is type of the error ", typeof error);
  console.log("this is type of the error ", error);
  // console.log(
  //   "see this is an error for result card   error[0].response.message -- -- > ",
  //   error[0].response.message
  // );
  console.log(
    "see this is an error for result card   error[0].response.status -- -- > ",
    error[0].response?.status || "error[0].response.status --> undefined"
  );
  console.log(
    "see this is an error for result card  error[0].response.data -- -- > ",
    error[0].response?.data || "error[0].response?.data == => undefined"
  );
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
        title="Posted!!"
        subTitle="You have successfully created the post"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              alert("redirect to post page");
              // setStatusPopup(false);
              // window.location.reload(false);
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
const CreatePost = () => {
  const [statusPopup, setStatusPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;
  const submitPostForm = (values) => {
    console.log("11-12 I have reached here to location action!!!");
    setLoading(true);
    const { subject, description, users, createdBy } = values;
    console.log("see this is values of create post form --------------->", values);
    axios({
      method: "post",
      url: `${baseUrl}/feed/create`,
      data: {
        subject,
        description,
        users,
        createdBy: user.shortid,
      },
    })
      .then((res) => {
        console.log("see this is response from create user", res);
        setLoading(false);
        setStatusPopup(true);
      })
      .catch((err) => {
        // console.log("this is error from err -- --- > ", err);
        // console.log("this is error from err.response -- --- > ", error.response);
        // console.log("this is error from err.response.data -- --- > ", error.response.data);
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
        lg={{ span: 22 }}
        // style={{ background: "green" }}
      >
        {statusPopup ? (
          <ResultCard error={error} setStatusPopup={setStatusPopup} />
        ) : (
          // <CardComponent
          //   bordered={false}
          //   loading={loading}
          //   bodyStyle={{
          //     paddingTop: "20px",
          //     boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          //   }}
          // >
          //   <div style={{ textAlign: "center", marginBottom: "20px" }}>
          //     <Title level={4} type="secondary">
          //       Create Post
          //     </Title>
          //   </div>
          //   <CreatePostForm {...{ submitPostForm }} />
          // </CardComponent>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <CreatePostForm {...{ submitPostForm }} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Post />
              </Card>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

// Block.propTypes = {};

export default CreatePost;
