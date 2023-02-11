import {
	INGREDIENT_DETAIL_ADD,
	INGREDIENT_DETAIL_DELETE
} from '../actions/ingredient-detail-modal';

const initialState = {};

export const ingredientDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case INGREDIENT_DETAIL_ADD: {
			return {
				...state,
				...action.payload
			}
		}
		case INGREDIENT_DETAIL_DELETE: {
			return {
				...initialState
			}
		}
		default: {
			return state;
		}
	}
};
