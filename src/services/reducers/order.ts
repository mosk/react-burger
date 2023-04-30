import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED } from "../constants/order";
import { TOrderActions } from "../actions/order";
import { TOrderState } from "../../types/types";

export const orderInitialState: TOrderState = {
  orderID: "",
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state: TOrderState = orderInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderID: action.payload,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderID: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
