import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

const initialState = {
  items: [],
  itemsInConstructor: [],
  order: {},
  auth: {},
};

const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
  initialState,
});

export default store;
