import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';

export default combineReducers({
	ingredients: ingredientsReducer
});