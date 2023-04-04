export type TKeyboardEvent = KeyboardEvent | React.KeyboardEvent;
export type TMouseEvent = MouseEvent | React.MouseEvent<HTMLElement> | React.SyntheticEvent<Element, Event>;

export type TStore = any;

export type TIngredient = {
	calories: number,
	carbohydrates: number,
	fat: number,
	image: string,
	image_large: string,
	image_mobile: string,
	name: string,
	price: number,
	proteins: number,
	type: "bun" | "sauce" | "main",
	__v: number,
	_id: string,
	id: string,
};

export type TTabName = 'bun' | 'sauce' | 'main';