import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { selectMultiple } from "./reducers";

const store = createStore(
  combineReducers({
    selectMultiple,
  }),
  applyMiddleware(thunk)
);

export default store;
