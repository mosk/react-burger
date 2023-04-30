import { INGREDIENTS_FAILED, INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS } from "../../services/constants/ingredients";
import { ingredientsReducer, ingredientsInitialState } from "../../services/reducers/ingredients";

describe("Ingredients store", () => {
  test("Should return initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(ingredientsInitialState);
  });

  test("Should return state when request start", () => {
    const stateExpect = {
      ...ingredientsInitialState,
      itemsRequest: true,
    };

    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: INGREDIENTS_REQUEST,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after successful request", () => {
    const stateExpect = {
      ...ingredientsInitialState,
      items: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
      ],
      itemsRequest: false,
      itemsFailed: false,
    };

    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: INGREDIENTS_SUCCESS,
        payload: [
          { name: "Начинка 1", type: "main", id: "23" },
          { name: "Начинка 2", type: "main", id: "24" },
        ] as any,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after failed request", () => {
    const stateExpect = {
      ...ingredientsInitialState,
      itemsRequest: false,
      itemsFailed: true,
      message: "Error",
    };

    expect(
      ingredientsReducer(ingredientsInitialState, {
        type: INGREDIENTS_FAILED,
        payload: "Error",
      })
    ).toEqual(stateExpect);
  });
});
