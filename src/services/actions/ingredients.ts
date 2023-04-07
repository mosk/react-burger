import { request } from "../../utils/burger-api";
import { INGREDIENTS_FAILED, INGREDIENTS_SUCCESS, INGREDIENTS_REQUEST } from "../constants/ingredients";

export const getItems = () => (dispatch: any) => {
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
