import { v4 as uuid } from "uuid";
import { TIngredient } from "../../types/types";
import { CONSTRUCTOR_ADD } from "../constants/constructor";

export const addToConstructor = (item: TIngredient) => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: {
      ...item,
      id: uuid(),
    },
  };
};
