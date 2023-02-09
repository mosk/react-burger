import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';

export default combineReducers({
	items: ingredientsReducer,
	itemsInConstructor: constructorReducer
});