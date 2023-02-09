export const ORDER_REQUEST = 'INGREDIENTS_REQUEST';
export const ORDER_SUCCESS = 'INGREDIENTS_SUCCESS';
export const ORDER_FAILED = 'INGREDIENTS_FAILED';

export const getOrder = () => (dispatch) => {
	dispatch({
		type: ORDER_REQUEST
	});
	return getData()
		.then((items) => {
			dispatch({
				type: ORDER_SUCCESS,
				payload: items
			});
		})
		.catch((err) => {
			dispatch({
				type: ORDER_FAILED,
				payload: err
			});
		});
};