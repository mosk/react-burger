import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export default combineReducers({
  items: ingredientsReducer,
  itemsInConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
});
