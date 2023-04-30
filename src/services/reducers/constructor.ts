import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from "../constants/constructor";
import { TConstructorActions } from "../actions/constructor";
import { TConstructorState } from "../../types/types";

export const constructorInitialState: TConstructorState = {
  ingredients: [],
};

export const constructorReducer = (
  state: TConstructorState = constructorInitialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_RESET: {
      return constructorInitialState;
    }
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case CONSTRUCTOR_DELETE: {
      if (action.payload.type === "bun") {
        delete state.bun;

        return {
          ...state,
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients.filter((item) => item.id !== action.payload.id)],
      };
    }
    case CONSTRUCTOR_REORDER: {
      const ingredients = [...state.ingredients];

      const draggedNumber: number = ingredients
        .map((item, i) => (item.id === action.payload.from ? i : -1))
        .filter((item) => item !== -1)[0];
      const hoveredNumber: number = ingredients
        .map((item, i) => (item.id === action.payload.to ? i : -1))
        .filter((item) => item !== -1)[0];

      ingredients[hoveredNumber] = ingredients.splice(draggedNumber, 1, ingredients[hoveredNumber])[0];

      return {
        ...state,
        ingredients: ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
