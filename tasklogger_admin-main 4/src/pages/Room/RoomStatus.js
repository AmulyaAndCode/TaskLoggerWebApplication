import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import baseUrl from "../../modules/common/constant/baseUrl";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../modules/common/components/Loader";
import { Card, Col, Divider, Row, Typography, Switch } from "antd";
import { roomStatusStyle, sortRooms } from "./roomStatusFunc";
const { Title, Text } = Typography;

const LocationCardBodyWrapper = styled.div`
  padding: 24px;
`;
const DispalyRooms = ({ rooms, sortView }) => {
  let roomComponent = [];
  sortRooms(rooms, sortView).forEach((e) => {
    roomComponent.push(
      e.map((val, i) => {
        return (
          <Col key={i} className="gutter-row" span={4}>
            <div
              style={{
                display: "flex",
                fontWeight: "500",
                justifyContent: "center",
                alignItems: "center",
                height: "35px",
                width: "35px",
                borderRadius: "25px",
                ...roomStatusStyle(val.cleaningType || ""),
              }}
            >
              {val.roomId}
            </div>
          </Col>
        );
      })
    );
  });
  return roomComponent;
};
const RoomStatus = (props) => {
  let { location_id } = useParams();
  const [locationData, setLocationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortView, setSortView] = useState(false);
  console.log("hello world #######################", useParams());
  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      headers: { user: user.shortid },
      url: `${baseUrl}/location/${location_id}/roomStatus`,
    })
      .then((res) => {
        setLocationData(res.data.data);
        console.log("res.data.data -- -->", res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("see this is an error from locaiton page --------> ", err);
      });
  }, [location_id]);
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
        <Loader />
      </div>
    );
  }
  return (
    <LocationCardBodyWrapper>
      <Row justify="center" span={24}>
        <Col>
          <Row justify="space-between" style={{ marginBottom: "40px" }}>
            <Col span={12}>
              <div>
                <Title level={3}>{locationData.name}</Title>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "grey",
                  fontWeight: "normal",
                }}
              >
                {locationData.address}
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Switch
                  onChange={() => setSortView(!sortView)}
                  checkedChildren={"Sort"}
                  unCheckedChildren={"Ascending"}
                  defaultChecked
                />
              </div>
            </Col>
          </Row>
          <Row
            justify="space-around"
            gutter={[
              { xs: 8, sm: 36 },
              { xs: 8, sm: 16 },
            ]}
          >
            {locationData.blocks.map((block) => (
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                md={{ span: 11 }}
                lg={{ span: 7 }}
                key={block.shortid}
                style={{
                  marginBottom: "20px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <Row justify="center">
                  <Col>
                    <Title level={5}>{block.name}</Title>
                  </Col>
                </Row>
                <Divider orientation="left">
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Rooms
                  </Text>
                </Divider>
                <div style={{ marginBottom: "40px" }}>
                  <Row
                    justify="flex-start"
                    gutter={[
                      { xs: 8, sm: 16 },
                      { xs: 8, sm: 16 },
                    ]}
                  >
                    <DispalyRooms rooms={block.rooms} sortView={sortView} />
                  </Row>
                </div>
                <div>
                  <Divider orientation="left">
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                      Extras
                    </Text>
                  </Divider>
                  <Row
                    gutter={[
                      { xs: 8, sm: 16 },
                      { xs: 8, sm: 16 },
                    ]}
                  >
                    {block.extras.map((val, i) => {
                      return (
                        <Col key={i} className="gutter-row">
                          <div
                            style={{
                              // background: "#05c46b",
                              display: "flex",
                              fontWeight: "500",
                              textTransform: "capitalize",
                              // color: "white",
                              padding: "1px 12px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "20px",
                              ...roomStatusStyle(val.cleaningType || ""),
                            }}
                          >
                            {val.type}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </LocationCardBodyWrapper>
  );
};

RoomStatus.propTypes = {};

export default RoomStatus;
