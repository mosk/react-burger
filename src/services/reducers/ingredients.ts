import { TIngredientsState } from "../../types/types";
import { TGetIngredientsActions } from "../actions/ingredients";
import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED } from "../constants/ingredients";

const ingredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (
  state: TIngredientsState = ingredientsInitialState,
  action: TGetIngredientsActions
) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: action.payload,
      };
    }
    case INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
        items: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
