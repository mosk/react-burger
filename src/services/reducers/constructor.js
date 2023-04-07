import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from "../constants/constructor";

const initialState = {
  bun: null,
  ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_RESET: {
      return initialState;
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
        return {
          ...state,
          bun: {},
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients.filter((item) => item.id !== action.payload.id)],
      };
    }
    case CONSTRUCTOR_REORDER: {
      const ingredients = [...state.ingredients];

      const draggedNumber = ingredients
        .map((item, i) => (item.id === action.payload.from ? i : null))
        .filter((item) => item !== null)[0];
      const hoveredNumber = ingredients
        .map((item, i) => (item.id === action.payload.to ? i : null))
        .filter((item) => item !== null)[0];

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
