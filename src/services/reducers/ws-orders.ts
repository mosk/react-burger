import { TOrderData, TWSState } from "../../types/types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants/ws-orders";

import { TWSActions } from "../actions/ws-orders";

const fakeOrders: TOrderData[] = [
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "192356",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "665",
    status: "pending",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "666",
    status: "created",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "192352",
    status: "pending",
    number: 0,
    createdAt: "2022-06-23T14:43:22.587Z",
    updatedAt: "2022-07-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "6678",
    status: "done",
    number: 0,
    createdAt: "2023-04-21T14:43:22.587Z",
    updatedAt: "2023-04-21T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "6679",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "492356",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "265",
    status: "pending",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "466",
    status: "created",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "392352",
    status: "pending",
    number: 0,
    createdAt: "2022-06-23T14:43:22.587Z",
    updatedAt: "2022-07-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "2678",
    status: "done",
    number: 0,
    createdAt: "2023-04-21T14:43:22.587Z",
    updatedAt: "2023-04-21T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0947",
    ],
    _id: "1679",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
];

const initialState: TWSState = {
  wsConnected: false,
  orders: [...fakeOrders],
  total: "999",
  totalToday: "998",
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
      const orders: TOrderData[] = { ...action.payload.orders };

      return {
        ...state,
        error: undefined,
        orders: [...orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
