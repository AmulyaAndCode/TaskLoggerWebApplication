import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Block from "../block/Block";
import CreateLocation from "../Location/CreateLocation";
import Location from "../Location/Location";
import LocationDetails from "../Location/LocationDetails";
import RoomStatus from "../Room/RoomStatus";
import DashboardBodyNew from "./DashboardBodyNew";
import CreateUser from "../User/CreateUser";
import Main from "../../modules/common/components/layout/Main";
import CreatePost from "../Post/CreatePost";
import TaskLogDetails from "./TaskLogDetails";
import ProfilePage from "../Profile/ProfilePage";
import GenerateReport from "../TasklogReport/GenerateReport";

const Dashboard = () => {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path="/dashboard" element={<DashboardBodyNew />} />
          <Route path="/" element={<DashboardBodyNew />} />
          <Route path="/location" element={<Location />} />
          <Route path="/location/:location_id/location_detail" element={<LocationDetails />} />
          <Route path="/location/:location_id/room_status" element={<RoomStatus />} />
          <Route path="/view_tasklog" element={<TaskLogDetails />} />
          <Route path="/create_location" element={<CreateLocation />} />
          <Route path="/create_user" element={<CreateUser />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/generate_report" element={<GenerateReport />} />

          {/* <Route path="/block" element={<Block />} /> */}
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

export default Dashboard;
