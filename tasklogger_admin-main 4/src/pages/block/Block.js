import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  // Card,
  Col,
  Row,
  Tag,
  Typography,
} from "antd";
import baseUrl from "../../modules/common/constant/baseUrl";

import { initilizeLocations } from "../../modules/redux/actions";
import Loader from "../../modules/common/components/Loader";
import CardComponent from "../../modules/common/components/CardComponent";

const {
  // Title,
  Text,
} = Typography;

const Block = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;

  useEffect(() => {
    axios({
      method: "get",
      headers: { user: user.shortid },
      url: `${baseUrl}/location/viewAll`,
    })
      .then((res) => {
        console.log("see this is response from location page", res);
        dispatch(initilizeLocations(res.data.locations));
        setLocations(res.data.locations);
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
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  if (!locations.length) {
    console.log("see this is locations state", locations);
    return <div>Create location</div>;
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
                bodyStyle={{ cursor: "pointer" }}
                onClick={() => alert(location.shortid)}
                title={location.name}
                bordered={false}
              >
                <Text>I will use this component to show block status</Text>
                <p />
                <Text>
                  No. of blocks: <Tag color="blue">{location.noOfBlocks}</Tag>
                </Text>
              </CardComponent>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

// Block.propTypes = {};

export default Block;
