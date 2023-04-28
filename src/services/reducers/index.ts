import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./ws-orders";

export default combineReducers({
  items: ingredientsReducer,
  itemsInConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  orders: wsReducer,
});
