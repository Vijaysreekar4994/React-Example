import React from "react";
import { Provider } from "react-redux";
import View from "./containers/View";
import "./App.css";
import store from "./data";

function App() {
  return (
    <Provider store={store}>
      <View />
    </Provider>
  );
}

export default App;
