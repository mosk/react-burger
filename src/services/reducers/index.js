import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientDetailReducer } from "./ingredient-detail-modal";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export default combineReducers({
  items: ingredientsReducer,
  itemsInConstructor: constructorReducer,
  itemInModal: ingredientDetailReducer,
  order: orderReducer,
  auth: authReducer,
});
