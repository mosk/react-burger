import { ORDER_ADD } from "../actions/order";

const initialState = {};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ADD: {
      return {
        ...state,
        ID: action.payload.id,
        list: action.payload.ingredients,
        price: action.payload.price,
      };
    }
    default: {
      return state;
    }
  }
};
