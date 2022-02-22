import React, { useState } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  // Form,
  // Input,
  Button,
  // Card,
  Row,
  Col,
  // Tag,
  // Select,
  Result,
  Typography,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import baseUrl from "../../modules/common/constant/baseUrl";
// import { initilizeLocations } from "../../modules/redux/actions";
import CreateLocationForm from "../../modules/form/locationForm/CreateLocationForm";
// import { roomNumberGenerator } from "./LocationFunction";
import CardComponent from "../../modules/common/components/CardComponent";

const { Paragraph, Text, Title } = Typography;

const ResultCard = ({ error, setStatusPopup, navigate }) => {
  if (error.length) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="try">Try Again</Button>,
        ]}
      >
        <div className="desc">
          {error.map((err) => {
            return (
              <>
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
                <Paragraph>
                  <CloseCircleOutlined className="site-result-demo-error-icon" />
                  <span>{err}</span>
                </Paragraph>
              </>
            );
          })}
        </div>
      </Result>
    );
  }
  // else {
  //   return (
  //     <Result
  //       status="success"
  //       title="Successfully created a new Location!"
  //       subTitle="Please add blocks to your Location."
  //       extra={[
  //         <Button
  //           type="primary"
  //           key="console"
  //           onClick={() => {
  //             setStatusPopup(false);
  //             navigate(`/location/${locationId}/location_detail`);
  //             // history.push({
  //             //   pathname: `/location_details/${locationId}`,
  //             // });
  //           }}
  //         >
  //           Add Block
  //         </Button>,
  //         <Button key="buy" onClick={() => alert("redirect page to block menu")}>
  //           Cancel
  //         </Button>,
  //       ]}
  //     />
  //   );
  // }
};
const CreateLocation = () => {
  const [statusPopup, setStatusPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;

  const locationActionFunc = (values) => {
    console.log("11-12 I have reached here to location action!!!");
    setLoading(true);
    const { locationName, rate, locationAddress } = values;
    console.log("see this is values of create location form", values);
    axios({
      method: "post",
      headers: { user: user.shortid },
      url: `${baseUrl}/location/create`,
      data: {
        name: locationName,
        rate,
        address: locationAddress,
      },
    })
      .then((res) => {
        console.log("see this is response from create Location", res);
        // setLoading(false);
        axios({
          method: "get",

          url: `${baseUrl}/location/viewAll`,
        })
          .then((res) => {
            console.log("see this is response including newly added locaiton", res);
            const newLocationId = res.data.locations.find(
              (location) => location.name === locationName
            ).shortid;
            navigate(`/location/${newLocationId}/location_detail`);
            // history.push({
            //   pathname: `/location_details/${newLocationId}`,
            // });

            // dispatch(initilizeLocations(res.data.locations));
            // setLocations(res.data.locations);
            // setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("see this is an error from locaiton page --------> ", err);
          });
        // setStatusPopup(true);
      })
      .catch((err) => {
        setError([...error, err.type]);
        setLoading(false);
        setStatusPopup(true);
        console.log("see this is an error from create location --------> ", err);
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
          <ResultCard {...{ error, setStatusPopup, navigate }} />
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
                Create Location
              </Title>
            </div>
            <CreateLocationForm {...{ locationActionFunc }} />
          </CardComponent>
        )}
      </Col>
    </Row>
  );
};

// Block.propTypes = {};

export default CreateLocation;
