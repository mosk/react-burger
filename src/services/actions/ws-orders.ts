import { TOrderData } from "../../types/types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDER,
} from "../constants/ws-orders";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
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
  readonly payload: TOrderData[];
}

export interface IWSSendOrderAction {
  readonly type: typeof WS_SEND_ORDER;
  readonly payload: TOrderData[];
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionClosedAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSGetOrdersAction
  | IWSSendOrderAction;
