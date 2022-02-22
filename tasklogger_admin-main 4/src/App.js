import React from "react";
// import "./App.css";
import "antd/dist/antd.min.css";
import "./asstes/styles/main.css";
import "./asstes/styles/responsive.css";
import { Provider } from "react-redux";
import store from "./modules/redux/store";

import { CleaningAppAdmin } from "./CleaningAppAdmin";

const App = () => {
  return (
    <Provider store={store}>
      <CleaningAppAdmin />
    </Provider>
  );
};

export default App;
