// uuid v4

export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';

export const addToConstructor = (item) => {
	return {
		type: CONSTRUCTOR_ADD,
		payload: {
			...item,
			id: 1
		}
	}
}