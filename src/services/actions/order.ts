import { AppDispatch, TIngredient } from "../../types/types";
import { request } from "../../utils/burger-api";
import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../constants/order";

export interface IOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
  readonly payload: string;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: string;
}

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export type TOrderActions = IOrderFailedAction | IOrderSuccessAction | IOrderRequestAction;

export const getOrderID = (ingredients: TIngredient[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_REQUEST,
  });
  return request(`orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(ingredients),
  })
    .then((data) => {
      dispatch({
        type: ORDER_SUCCESS,
        payload: data.order.number,
      });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_FAILED,
        payload: err,
      });
    });
};
