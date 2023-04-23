import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { socketMiddleware } from "./middleware";

const wsUrl: string = "wss://norma.nomoreparties.space/orders";
const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = configureStore({
  reducer,
  middleware: [thunk, socketMiddleware(wsUrl, wsActions)],
  devTools: process.env.NODE_ENV !== "production",
});
