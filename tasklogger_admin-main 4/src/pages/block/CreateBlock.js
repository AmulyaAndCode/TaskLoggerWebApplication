import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Input, Button, Card, Row, Col, Tag, Select, Result, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import CreateBlockForm from "../../modules/form/blockForm/CreateBlockForm";
import baseUrl from "../../modules/common/constant/baseUrl";
import { roomNumberGenerator } from "./blockFunciton";

const { Paragraph, Text } = Typography;

const ResultCard = ({
  error,
  setStatusPopup,
  setModalVisible_createBlock,
  loading,
  blockOperation,
}) => {
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
          <Button key="buy">Buy Again</Button>,
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
  } else {
    return (
      <Result
        status="success"
        title={
          blockOperation === "create" ? "Created Block Successfully" : "Edited Block Successfully"
        }
        subTitle="Click on 'Add Block' to add new block to location"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              setStatusPopup(false);
              setModalVisible_createBlock(true);
            }}
          >
            Add Block
          </Button>,
          <Button
            key="buy"
            onClick={() => {
              setStatusPopup(false);
              setModalVisible_createBlock(false);
              // window.location.reload();
            }}
          >
            Done
          </Button>,
        ]}
      />
    );
  }
};
const Block = ({
  loading,
  windowLoaderFunc,
  blockOperation, //check if it is "create" or "edit"
  currentBlock,
  setCurrentBlock,
  setCreateBlock_Loading,
  location_id,
  setModalVisible_createBlock,
}) => {
  console.log("see this is current Block as props - --- - > ", currentBlock);
  const [statusPopup, setStatusPopup] = useState(false);
  // const [loading, setCreateBlock_Loding] = useState(false);
  const [error, setError] = useState([]);
  const cleaningData = useSelector((state) => state.cleaning);
  const { user } = cleaningData;

  const createBlock = (values) => {
    setCreateBlock_Loading(true);
    const { blockName, blockRooms, extras } = values;
    console.log("see this is values", values);
    let data = {
      name: blockName,
      rooms: roomNumberGenerator(blockRooms),
      extras: extras,
      location: location_id,
    };
    if (blockOperation !== "create") {
      data = {
        name: blockName,
        rooms: roomNumberGenerator(blockRooms),
        extras: extras,
        blockId: currentBlock.shortid,
      };
    }
    console.log("see this is data before updating or creating block");
    axios({
      method: "post",
      headers: { user: user.shortid },
      url: blockOperation === "create" ? `${baseUrl}/block/create` : `${baseUrl}/block/update`,
      data,
    })
      .then((response) => {
        console.log("see this is response from createBlock", response);
        setCreateBlock_Loading(false);
        setStatusPopup(true);
      })
      .catch((err) => {
        setError([...error, err.type]);
        setCreateBlock_Loading(false);
        setStatusPopup(true);
        console.log("see this is an error from createBlock --------> ", err);
      });
  };
  return (
    <Row>
      <Col span={24}>
        {statusPopup ? (
          <ResultCard
            {...{
              error,
              setStatusPopup,
              setModalVisible_createBlock,
              windowLoaderFunc,
              blockOperation,
            }}
          />
        ) : (
          <CreateBlockForm {...{ createBlock, loading, blockOperation, currentBlock }} />
        )}
      </Col>
    </Row>
  );
};

Block.propTypes = {};

export default Block;
