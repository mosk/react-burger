import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../services/store";
import { TAuthActions } from "../services/actions/auth";
import { TConstructorActions } from "../services/actions/constructor";
import { TGetIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";

export type TKeyboardEvent = KeyboardEvent | React.KeyboardEvent;
export type TMouseEvent = MouseEvent | React.MouseEvent<HTMLElement> | React.SyntheticEvent<Element, Event>;
export type TFormEvent = SubmitEvent | Event | React.FormEvent<HTMLFormElement>;
export type TInputEvent = React.SyntheticEvent | React.ChangeEvent<HTMLInputElement>;

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "sauce" | "main";
  __v: number;
  _id: string;
  id?: string;
};

export type TTabName = "bun" | "sauce" | "main";

export type TCustomResponse = Body &
  Partial<{
    ok: boolean;
    success: boolean;
    message: string;
  }>;

export type TUserData = Partial<{
  name: string;
  email: string;
  password: string;
  token: string;
}>;

export type TTokenData = Partial<{
  accessToken: string;
  refreshToken: string;
}>;

export type TResponseData = TUserData & TTokenData;

// State
export type TAuthState = Partial<{
  request: boolean;
  email: string;
  name: string;
  authFailed: boolean;
  message: string;
  isAuthChecked: boolean;
}>;

export type TConstructorState = Partial<{
  bun: TIngredient | number;
  ingredients: TIngredient[] | [];
}>;

export type TIngredientsState = Partial<{
  items: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
}>;

export type TOrderState = Partial<{
  orderID: string | null;
  orderRequest: boolean;
  orderFailed: boolean;
}>;

export type TAppActions = TAuthActions | TConstructorActions | TGetIngredientsActions | TOrderActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;

export type AppThunkAction<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TAppActions>;

export type AppDispatch = typeof store.dispatch;
