import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  // Card,
  Col,
  Row,
  Tag,
  Menu,
  Typography,
} from "antd";
import { SettingFilled, SettingOutlined } from "@ant-design/icons";
import Loader from "../../modules/common/components/Loader";
import baseUrl from "../../modules/common/constant/baseUrl";
import { initilizeLocations } from "../../modules/redux/actions";
import CardComponent from "../../modules/common/components/CardComponent";

const {
  // Title,
  Text,
} = Typography;

const LocationCardBodyWrapper = styled.div`
  padding: 24px;
  cursor: pointer;
  transition: background 0.5s ease-out;
  &:hover {
    background-color: #ebebeb;
  }
`;

const SettingIconWrapper = styled.div`
  padding: "20px";
  margin: "-30px -25px";
  cursor: pointer;
  transition: transform 0.4s ease-out;
  &:hover {
    transform: scale(1.5) rotate(40deg);
  }
`;

const Locations = () => {
  // const [loading, setLoading] = useState(true);
  // const [locations, setLocations] = useState([]);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const cleaningData = useSelector((state) => state.cleaning);
  const { user, locations } = cleaningData;
  // const handleClick = (locationId) => navigate(`/location_details/${locationId}`);
  const handleClick = (locationId) => navigate(`/location/${locationId}/location_detail`);
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     headers: { user: user.shortid },
  //     url: `${baseUrl}/location/viewAll`,
  //   })
  //     .then((res) => {
  //       console.log("see this is response from location page", res);
  //       dispatch(initilizeLocations(res.data.locations));
  //       setLocations(res.data.locations);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log("see this is an error from locaiton page --------> ", err);
  //     });
  // }, []);
  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         height: "300px",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <div>
  //         <Loader />
  //       </div>
  //     </div>
  //   );
  // }
  if (!locations.length) {
    console.log("see this is locations state", locations);
    return <div>No location found, create location first!!!</div>;
  }
  return (
    <div>
      <div className="site-card-wrapper">
        <Row justify="center">
          {locations.map((location) => (
            <Col
              xs={{ span: 20 }}
              md={{ span: 11 }}
              lg={{ span: 7 }}
              style={{ margin: "0 9px 22px 9px" }}
              key={location.shortid}
              span={8}
            >
              <CardComponent
                bodyStyle={{
                  cursor: "pointer",
                  padding: "0",
                }}
                onClick={() => navigate(`/location/${location.shortid}/room_status`)}
                // onClick={() => handleClick(location.shortid)}
                title={location.name}
                extra={
                  <SettingIconWrapper
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(location.shortid);
                    }}
                  >
                    <SettingFilled style={{ color: "#888888" }} />
                  </SettingIconWrapper>
                }
                bordered={false}
              >
                <LocationCardBodyWrapper>
                  {/* <Text>Address: 7 Spence Ave, Myrtle Bank SA 5064</Text> */}
                  <Text>{`Address: ${location.address}`}</Text>
                  <p />
                  <Text>
                    No. of blocks: <Tag color="blue">{location.noOfBlocks}</Tag>
                  </Text>
                </LocationCardBodyWrapper>
              </CardComponent>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

// Locations.propTypes = {};

export default Locations;
