import { getData } from '../../utils/burger-api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const getItems = () => (dispatch) => {
	dispatch({
		type: GET_ITEMS_REQUEST
	});
	return getData()
		.then((items) => {
			dispatch({
				type: GET_ITEMS_SUCCESS,
				payload: items
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ITEMS_FAILED,
				payload: err
			});
		});
};