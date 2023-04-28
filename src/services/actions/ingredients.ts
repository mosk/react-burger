import { AppDispatch, TIngredient } from "../../types/types";
import { request } from "../../utils/burger-api";
import { INGREDIENTS_FAILED, INGREDIENTS_SUCCESS, INGREDIENTS_REQUEST } from "../constants/ingredients";

export interface IGetIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
  readonly payload: string;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export type TGetIngredientsActions =
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsRequestAction;

export const getItems = () => (dispatch: AppDispatch) => {
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
    .catch((err: Error) => {
      dispatch({
        type: INGREDIENTS_FAILED,
        payload: err.toString(),
      });
    });
};
