import { TWSState } from "../../types/types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants/ws-orders";

import { TWSActions } from "../actions/ws-orders";

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        messages: [...state.orders, { ...action.payload }],
      };

    default:
      return state;
  }
};
