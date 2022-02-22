import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
// import LoginPage from "./pages/Login/login";
// import Main from "./modules/common/components/layout/Main";
import SignIn from "./pages/Login/SignIn";

export const CleaningAppAdmin = () => {
  const cleaningData = useSelector((state) => state.cleaning);
  console.log("this is cleaning data", cleaningData);
  if (!cleaningData.userLoggedIn) {
    return <SignIn />;
  }
  return <Dashboard />;
};
