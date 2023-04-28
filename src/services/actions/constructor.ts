import { v4 as uuid } from "uuid";
import { TIngredient } from "../../types/types";
import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from "../constants/constructor";

export interface IAddToConstructorAction {
  readonly type: typeof CONSTRUCTOR_ADD;
  readonly payload: TIngredient;
}

export interface IDeleteFromConstructorAction {
  readonly type: typeof CONSTRUCTOR_DELETE;
  readonly payload: TIngredient;
}

export interface IReorderConstructorAction {
  readonly type: typeof CONSTRUCTOR_REORDER;
  readonly payload: {
    from: string;
    to: string;
  };
}

export interface IResetConstructorAction {
  readonly type: typeof CONSTRUCTOR_RESET;
}

export type TConstructorActions =
  | IAddToConstructorAction
  | IDeleteFromConstructorAction
  | IReorderConstructorAction
  | IResetConstructorAction;

export const addToConstructor = (item: TIngredient) => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: {
      ...item,
      id: uuid(),
    },
  };
};
