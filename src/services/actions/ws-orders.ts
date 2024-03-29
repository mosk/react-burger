import { TOrderResponse } from "../../types/types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "../constants/ws-orders";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: string;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TOrderResponse;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionClosedAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSGetOrdersAction;
