import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
} from "../actions/constructor";

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
        ingredients: [
          ...state.ingredients.filter((item) => item.id !== action.payload.id),
        ],
      };
    }
    case CONSTRUCTOR_REORDER: {
      const ingredients = [...state.ingredients];

      if (ingredients.length > 1) {
        const ings = ingredients
          .map((ing, i) => {
            const elementsIndex =
              (ing.id === action.payload.to && i) ||
              (ing.id === action.payload.from && i);

            if (elementsIndex > 0) {
              return elementsIndex;
            }

            return false;
          })
          .filter((ing) => ing > 0);

        ingredients.splice(ings[0], 0, ingredients.splice(ings[1], 1)[0]);

        return {
          ...state,
          ingredients,
        };
      }

      return state;
    }
    default: {
      return state;
    }
  }
};
