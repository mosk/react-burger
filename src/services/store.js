import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
// import { customEnhancer } from './enhancers';

const initialState = {
  items: [],
  itemsInConstructor: [],
  itemInModal: {},
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
