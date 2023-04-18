import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

const preloadedState = {
  items: [],
  itemsInConstructor: [],
  order: {},
  auth: {},
};

export const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});
