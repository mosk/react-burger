import { request } from "../../utils/burger-api";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";

const list = {
  ingredients: [],
};

export const getOrderID =
  (orderIngredients = list) =>
  (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    });
    return request(`orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(orderIngredients),
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
