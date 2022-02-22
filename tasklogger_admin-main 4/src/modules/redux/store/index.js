import { createStore, combineReducers } from "redux";

import cleaningReducer from "../reducer/cleaningReducer";

const store = createStore(
  combineReducers({
    cleaning: cleaningReducer,
  })
);

export default store;
