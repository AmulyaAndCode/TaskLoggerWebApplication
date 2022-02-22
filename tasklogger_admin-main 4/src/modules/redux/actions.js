import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ALL_USERS, INITILIZE_LOCATIONS, LOGIN_USER, LOGOUT_USER } from "./actionConst";

const loginUser = (userDetails) => {
  return {
    type: LOGIN_USER,
    payload: userDetails,
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

const initilizeLocations = (locations) => ({
  type: INITILIZE_LOCATIONS,
  payload: locations,
});
const getUserDetails = (users) => ({
  type: ALL_USERS,
  payload: users,
});

export { loginUser, logoutUser, initilizeLocations, getUserDetails };
