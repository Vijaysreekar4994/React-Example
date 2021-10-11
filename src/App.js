import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import View from "./view/App";
import SelectMultiple from "./reducer/selectMultiple";

const store = createStore(
  combineReducers({
    SelectMultiple,
  })
);

function App() {
  console.log(store);
  return (
    <Provider store={store}>
      <View />
    </Provider>
  );
}

export default App;
