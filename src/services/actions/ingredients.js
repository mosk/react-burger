import { request } from "../../utils/burger-api";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";

export const getItems = () => (dispatch) => {
  dispatch({
    type: INGREDIENTS_REQUEST,
  });
  return request(`ingredients`)
    .then((data) => {
      dispatch({
        type: INGREDIENTS_SUCCESS,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: INGREDIENTS_FAILED,
        payload: err,
      });
    });
};
