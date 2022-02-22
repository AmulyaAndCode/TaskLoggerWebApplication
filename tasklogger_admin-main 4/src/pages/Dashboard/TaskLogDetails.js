import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import baseUrl from "../../modules/common/constant/baseUrl";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../modules/common/components/Loader";
import { loginUser } from "../../modules/redux/actions";
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
const TaskLogDetails = (props) => {
  // let { location_id } = useParams();
  const [taskLogData, setTaskLogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortView, setSortView] = useState(false);

  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;
  console.log("see this is user details %%%%%%%%%%%%%%%", user);
  useEffect(() => {
    setLoading(true);
    // ***********************dummy data S
    setTaskLogData(taskLogDataFromServer);
    // setLoading(false);
    // ***********************dummy data E

    axios({
      method: "get",
      headers: { user: user.shortid },
      url: `${baseUrl}/tasklog/viewAll?startTime=2021-08-24T03:59:19.295Z&endTime=2021-09-30T03:59:19.295Z`,
    })
      .then((res) => {
        // setTaskLogData(res.data.taskLogDetails);
        console.log(
          `${baseUrl}/tasklog/viewAll?startTime=2021-08-24T03:59:19.295Z&endTime=2021-09-30T03:59:19.295Z`,
          res
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("see this is an error from locaiton page --------> ", err);
      });
  }, []);
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
    <div style={{ padding: "25px" }}>
      {taskLogData.map((taskLogElem) => (
        <Row key={taskLogElem.shortid} span={24} style={{ marginBottom: "60px" }}>
          <Col span={24}>
            <Row style={{ marginBottom: "40px" }}>
              <Col span={12}>
                <div>
                  <Title level={3}>{taskLogElem.user.shortid}</Title>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: "normal",
                  }}
                >
                  {taskLogElem.location.name}
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
                    unCheckedChildren={"Default"}
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
              {taskLogElem.task.map((taskObj) => (
                <Col
                  className="gutter-row"
                  xs={{ span: 24 }}
                  md={{ span: 11 }}
                  lg={{ span: 7 }}
                  key={taskObj.block.name}
                  style={{
                    marginBottom: "20px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <Row justify="center">
                    <Col>
                      <Title level={5}>{taskObj.block.name}</Title>
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
                      <DispalyRooms rooms={taskObj.block.rooms} sortView={sortView} />
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
                      {taskObj.block.extras.map((val, i) => {
                        return (
                          <Col key={i} className="gutter-row">
                            <div
                              style={{
                                display: "flex",
                                fontWeight: "500",
                                textTransform: "capitalize",
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
      ))}
    </div>
  );
};

TaskLogDetails.propTypes = {};

export default TaskLogDetails;

const taskLogDataFromServer = [
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "612480c35ba49556186eed4b",
              roomId: 1,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed4c",
              roomId: 2,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed4d",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed4e",
              roomId: 60,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "612480c35ba49556186eed4f",
              type: "toilet 1",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "612480c35ba49556186eed51",
              roomId: 7,
              cleaningType: "thorough",
            },
            {
              _id: "612480c35ba49556186eed52",
              roomId: 20,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612480c35ba49556186eed53",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "612480c35ba49556186eed55",
              roomId: 2,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed56",
              roomId: 10,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed57",
              roomId: 12,
              cleaningType: "thorough",
            },
            {
              _id: "612480c35ba49556186eed58",
              roomId: 14,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed59",
              roomId: 15,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed5a",
              roomId: 16,
              cleaningType: "thorough",
            },
            {
              _id: "612480c35ba49556186eed5b",
              roomId: 21,
              cleaningType: "daily",
            },
            {
              _id: "612480c35ba49556186eed5c",
              roomId: 22,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612480c35ba49556186eed5d",
              type: "dining hall",
              cleaningType: "thorough",
            },
            {
              _id: "612480c35ba49556186eed5e",
              type: "lounge",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "Amulya karrolu",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "_rI8QHBt7",
    startAt: "2021-08-24T05:16:25.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "612481215ba49556186eed61",
              roomId: 5,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed62",
              roomId: 6,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed63",
              roomId: 7,
              cleaningType: "thorough",
            },
            {
              _id: "612481215ba49556186eed64",
              roomId: 20,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612481215ba49556186eed65",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "612481215ba49556186eed67",
              roomId: 6,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed68",
              roomId: 23,
              cleaningType: "thorough",
            },
            {
              _id: "612481215ba49556186eed69",
              roomId: 8,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612481215ba49556186eed6a",
              type: "toilet 1",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "612481215ba49556186eed6c",
              roomId: 1,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed6d",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed6e",
              roomId: 5,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed6f",
              roomId: 9,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed70",
              roomId: 11,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed71",
              roomId: 13,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed72",
              roomId: 17,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed73",
              roomId: 19,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed74",
              roomId: 23,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed75",
              roomId: 33,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed76",
              roomId: 34,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed77",
              roomId: 36,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed78",
              roomId: 37,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed79",
              roomId: 41,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed7a",
              roomId: 43,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed7b",
              roomId: 44,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed7c",
              roomId: 45,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed7d",
              roomId: 46,
              cleaningType: "daily",
            },
            {
              _id: "612481215ba49556186eed7e",
              roomId: 50,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "612481215ba49556186eed7f",
              type: "toilet 2",
              cleaningType: "thorough",
            },
            {
              _id: "612481215ba49556186eed80",
              type: "kitchen",
              cleaningType: "thorough",
            },
            {
              _id: "612481215ba49556186eed81",
              type: "store room",
              cleaningType: "thorough",
            },
            {
              _id: "612481215ba49556186eed82",
              type: "game room",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "Nawaraj Bhandari",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "fQdp8010E",
    startAt: "2021-08-24T05:17:48.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "6126f5b05ba49556186eed95",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed96",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed97",
              roomId: 5,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed98",
              roomId: 20,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "6126f5b05ba49556186eed99",
              type: "toilet 1",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "6126f5b05ba49556186eed9b",
              roomId: 6,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed9c",
              roomId: 7,
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eed9d",
              roomId: 20,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed9e",
              roomId: 23,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eed9f",
              roomId: 8,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "6126f5b05ba49556186eeda0",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "6126f5b05ba49556186eeda2",
              roomId: 8,
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eeda3",
              roomId: 9,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eeda4",
              roomId: 10,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eeda5",
              roomId: 11,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eeda6",
              roomId: 14,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eeda7",
              roomId: 15,
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eeda8",
              roomId: 16,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eeda9",
              roomId: 17,
              cleaningType: "daily",
            },
            {
              _id: "6126f5b05ba49556186eedaa",
              roomId: 22,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6126f5b05ba49556186eedab",
              type: "dining hall",
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eedac",
              type: "kitchen",
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eedad",
              type: "store room",
              cleaningType: "thorough",
            },
            {
              _id: "6126f5b05ba49556186eedae",
              type: "game room",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "Sabin kafle",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "L77WUS3jd",
    startAt: "2021-08-26T01:59:49.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "6126f6225ba49556186eedb1",
              roomId: 1,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedb2",
              roomId: 25,
              cleaningType: "thorough",
            },
            {
              _id: "6126f6225ba49556186eedb3",
              roomId: 60,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6126f6225ba49556186eedb4",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "6126f6225ba49556186eedb6",
              roomId: 5,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "6126f6225ba49556186eedb7",
              type: "toilet 1",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "6126f6225ba49556186eedb9",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedba",
              roomId: 7,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedbb",
              roomId: 12,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedbc",
              roomId: 13,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedbd",
              roomId: 18,
              cleaningType: "daily",
            },
            {
              _id: "6126f6225ba49556186eedbe",
              roomId: 20,
              cleaningType: "thorough",
            },
            {
              _id: "6126f6225ba49556186eedbf",
              roomId: 23,
              cleaningType: "thorough",
            },
            {
              _id: "6126f6225ba49556186eedc0",
              roomId: 24,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6126f6225ba49556186eedc1",
              type: "lounge",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "OG6C14oAi",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "7YZyvtqmj",
    startAt: "2021-08-26T02:01:42.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "6129ca24a5f7f5971fedc8b5",
              roomId: 2,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8b6",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8b7",
              roomId: 20,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8b8",
              roomId: 25,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8b9",
              roomId: 60,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6129ca24a5f7f5971fedc8ba",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "6129ca24a5f7f5971fedc8bc",
              roomId: 7,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8bd",
              roomId: 20,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8be",
              roomId: 23,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "6129ca24a5f7f5971fedc8bf",
              type: "toilet 1",
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c0",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "6129ca24a5f7f5971fedc8c2",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c3",
              roomId: 14,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c4",
              roomId: 15,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c5",
              roomId: 21,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c6",
              roomId: 32,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c7",
              roomId: 33,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c8",
              roomId: 37,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8c9",
              roomId: 38,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8ca",
              roomId: 39,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8cb",
              roomId: 40,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8cc",
              roomId: 44,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8cd",
              roomId: 46,
              cleaningType: "daily",
            },
            {
              _id: "6129ca24a5f7f5971fedc8ce",
              roomId: 47,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6129ca24a5f7f5971fedc8cf",
              type: "dining hall",
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8d0",
              type: "lounge",
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8d1",
              type: "toilet 2",
              cleaningType: "thorough",
            },
            {
              _id: "6129ca24a5f7f5971fedc8d2",
              type: "kitchen",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "DVGeKlbeD",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "5sg_ZfPL8",
    startAt: "2021-08-28T05:27:39.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "6129ca77a5f7f5971fedc8d5",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8d6",
              roomId: 5,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8d7",
              roomId: 6,
              cleaningType: "thorough",
            },
          ],
          extras: [],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "6129ca77a5f7f5971fedc8d9",
              roomId: 5,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca77a5f7f5971fedc8da",
              roomId: 6,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8db",
              roomId: 8,
              cleaningType: "daily",
            },
          ],
          extras: [],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "6129ca77a5f7f5971fedc8dd",
              roomId: 2,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8de",
              roomId: 5,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca77a5f7f5971fedc8df",
              roomId: 9,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e0",
              roomId: 10,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e1",
              roomId: 11,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e2",
              roomId: 16,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e3",
              roomId: 17,
              cleaningType: "daily",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e4",
              roomId: 22,
              cleaningType: "thorough",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e5",
              roomId: 23,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "6129ca77a5f7f5971fedc8e6",
              type: "store room",
              cleaningType: "thorough",
            },
            {
              _id: "6129ca77a5f7f5971fedc8e7",
              type: "game room",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "OG6C14oAi",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "NFZHrlThO",
    startAt: "2021-08-28T05:31:53.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "612afb1a4f045c2a05ecc4c1",
              roomId: 2,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4c2",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4c3",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4c4",
              roomId: 5,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4c5",
              roomId: 25,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4c6",
              roomId: 60,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612afb1a4f045c2a05ecc4c7",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "612afb1a4f045c2a05ecc4c9",
              roomId: 6,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4ca",
              roomId: 7,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4cb",
              roomId: 20,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4cc",
              roomId: 23,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612afb1a4f045c2a05ecc4cd",
              type: "dining hall",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "612afb1a4f045c2a05ecc4cf",
              roomId: 8,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d0",
              roomId: 10,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d1",
              roomId: 11,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d2",
              roomId: 13,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d3",
              roomId: 14,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d4",
              roomId: 15,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d5",
              roomId: 16,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d6",
              roomId: 17,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d7",
              roomId: 18,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d8",
              roomId: 20,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4d9",
              roomId: 21,
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4da",
              roomId: 22,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4db",
              roomId: 23,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4dc",
              roomId: 26,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4dd",
              roomId: 28,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4de",
              roomId: 34,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4df",
              roomId: 40,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e0",
              roomId: 43,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e1",
              roomId: 45,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e2",
              roomId: 46,
              cleaningType: "daily",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e3",
              roomId: 50,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612afb1a4f045c2a05ecc4e4",
              type: "dining hall",
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e5",
              type: "toilet 2",
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e6",
              type: "store room",
              cleaningType: "thorough",
            },
            {
              _id: "612afb1a4f045c2a05ecc4e7",
              type: "game room",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "DVGeKlbeD",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "LchOfNft9",
    startAt: "2021-08-29T03:11:30.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
  {
    task: [
      {
        block: {
          name: "Block 1",
          rooms: [
            {
              _id: "612afb5c4f045c2a05ecc4ea",
              roomId: 6,
              cleaningType: "thorough",
            },
            {
              _id: "612afb5c4f045c2a05ecc4eb",
              roomId: 7,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4ec",
              roomId: 20,
              cleaningType: "daily",
            },
          ],
          extras: [
            {
              _id: "612afb5c4f045c2a05ecc4ed",
              type: "toilet 1",
              cleaningType: "thorough",
            },
          ],
        },
      },
      {
        block: {
          name: "Block 2",
          rooms: [
            {
              _id: "612afb5c4f045c2a05ecc4ef",
              roomId: 5,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f0",
              roomId: 8,
              cleaningType: "thorough",
            },
          ],
          extras: [],
        },
      },
      {
        block: {
          name: "Block 3",
          rooms: [
            {
              _id: "612afb5c4f045c2a05ecc4f2",
              roomId: 3,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f3",
              roomId: 4,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f4",
              roomId: 24,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f5",
              roomId: 32,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f6",
              roomId: 33,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f7",
              roomId: 35,
              cleaningType: "thorough",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f8",
              roomId: 37,
              cleaningType: "thorough",
            },
            {
              _id: "612afb5c4f045c2a05ecc4f9",
              roomId: 38,
              cleaningType: "thorough",
            },
            {
              _id: "612afb5c4f045c2a05ecc4fa",
              roomId: 39,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4fb",
              roomId: 44,
              cleaningType: "daily",
            },
            {
              _id: "612afb5c4f045c2a05ecc4fc",
              roomId: 47,
              cleaningType: "thorough",
            },
          ],
          extras: [
            {
              _id: "612afb5c4f045c2a05ecc4fd",
              type: "toilet 1",
              cleaningType: "thorough",
            },
            {
              _id: "612afb5c4f045c2a05ecc4fe",
              type: "lounge",
              cleaningType: "thorough",
            },
          ],
        },
      },
    ],
    user: {
      shortid: "OG6C14oAi",
    },
    location: {
      name: "Carmelite",
      shortid: "Wg1CRPoQY",
    },
    shortid: "asUGy3un1",
    startAt: "2021-08-29T03:12:51.000Z",
    endAt: "",
    time: 0,
    total: 0,
    reason: "",
  },
];
