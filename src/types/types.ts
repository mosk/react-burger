export type TKeyboardEvent = KeyboardEvent | React.KeyboardEvent;
export type TMouseEvent = MouseEvent | React.MouseEvent<HTMLElement> | React.SyntheticEvent<Element, Event>;
export type TFormEvent = SubmitEvent | Event | React.FormEvent<HTMLFormElement>;
export type TInputEvent = React.SyntheticEvent | React.ChangeEvent<HTMLInputElement>;

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

export type TCustomResponse = Body & Partial<{
	ok: boolean,
	success: boolean,
	message: string,
}>

export type TUserData = Partial<{
	name: string,
	email: string,
	password: string,
}>;

export type TTokenData = Partial<{
	accessToken: string,
	refreshToken: string,
}>

export type TResponseData = TUserData & TTokenData;