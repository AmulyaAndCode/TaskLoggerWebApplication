import React from "react";

import { Card, Row, Col, List, Avatar, Typography } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import myImage from "../../asstes/image/profileImg.jpg";

const { Text, Link } = Typography;
const { Meta } = Card;
const data = [
  {
    title: "Ant Design Title 1",
    description: "Ant Design, a design, is refined by Ant UED Team",
  },
  {
    title: "Ant Design Title 2",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
  },
  {
    title: "Ant Design Title 3",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
  },
  {
    title: "Ant Design Title 4",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
  },
];

const ProfilePage = () => {
  const cleaningData = useSelector((state) => state.cleaning);
  const {
    allUsers,
    // user: { dob, email, firstName, surname, fullName, role, shortid },
  } = cleaningData;
  //   const { dob, email, firstName, surname, fullName, role, shortid } = allUsers;
  return (
    // <Row gutter={[24, 0]}>
    //   <Col xs={24} sm={24} md={12} className="mb-24">
    //     <List
    //       itemLayout="horizontal"
    //       dataSource={data}
    //       renderItem={(item) => (
    //         <List.Item>
    //           <List.Item.Meta
    //             avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
    //             title={<a href="https://ant.design">{item.title}</a>}
    //             description={item.description}
    //           />
    //         </List.Item>
    //       )}
    //     />
    //   </Col>
    //   <Col xs={24} sm={24} md={12} className="mb-24">
    //     <Card
    //       style={{ width: 300 }}
    //       cover={
    //         <img
    //           alt="example"
    //           src="https://st.depositphotos.com/1075946/3526/i/950/depositphotos_35265383-stock-photo-man-sitting-in-office.jpg"
    //         />
    //       }
    //       actions={[
    //         <SettingOutlined key="setting" />,
    //         <EditOutlined key="edit" />,
    //         <EllipsisOutlined key="ellipsis" />,
    //       ]}
    //     >
    //       <Meta
    //         avatar={<Avatar icon={<UserOutlined />} />}
    //         title=""
    //         description={
    //           <div>
    //             <ul>
    //               <li>Name: kabir Pokharel</li>
    //               <li>Role: Admin</li>
    //               <li>email: Admin@gmial.com</li>
    //               <li>DOB: 1994/02/03</li>
    //             </ul>
    //           </div>
    //         }
    //       />
    //     </Card>
    //   </Col>
    // </Row>
    <Row justify="center">
      {allUsers.map(({ dob, email, firstName, surname, fullName, role, shortid }) => (
        <Card
          style={{ width: 320, margin: "30px" }}
          cover={
            <img
              alt="example"
              src="https://st.depositphotos.com/1075946/3526/i/950/depositphotos_35265383-stock-photo-man-sitting-in-office.jpg"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            // avatar={<Avatar icon={<UserOutlined />} />}
            title=""
            description={
              <div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <Text style={{ paddingRight: "4px" }}>{`Name:`}</Text>
                    <Text>{fullName}</Text>
                  </li>
                  <li>
                    <Text style={{ paddingRight: "4px" }}>{`Role:`}</Text>
                    <Text>{role}</Text>
                  </li>
                  <li>
                    <Text style={{ paddingRight: "4px" }}>{`Email:`}</Text>
                    <Text>{email}</Text>
                  </li>
                  <li>
                    <Text style={{ paddingRight: "4px" }}>{`DOB:`}</Text>
                    <Text>{dob}</Text>
                  </li>
                </ul>
              </div>
            }
          />
        </Card>
      ))}
    </Row>
  );
};

export default ProfilePage;
