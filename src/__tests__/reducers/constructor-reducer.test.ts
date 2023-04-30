import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
} from "../../services/constants/constructor";
import { constructorReducer, constructorInitialState } from "../../services/reducers/constructor";

describe("Constructor store", () => {
  test("Should return initial state", () => {
    expect(constructorReducer(undefined, {} as any)).toEqual(constructorInitialState);
  });

  test("Should return initial state after reset", () => {
    const constructorInitialStateWithIngredient = {
      ingredients: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
      ],
      bun: {
        name: "Булка",
        type: "bun",
      },
    };

    expect(
      constructorReducer(constructorInitialStateWithIngredient as any, {
        type: CONSTRUCTOR_RESET,
      })
    ).toEqual(constructorInitialState);
  });

  test("Should return state after bun add", () => {
    const stateExpect = {
      ...constructorInitialState,
      bun: {
        name: "Булка",
        type: "bun",
      },
    };

    expect(
      constructorReducer(constructorInitialState, {
        type: CONSTRUCTOR_ADD,
        payload: { name: "Булка", type: "bun" } as any,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after ingredient add", () => {
    const stateExpect = {
      ...constructorInitialState,
      ingredients: [
        ...constructorInitialState.ingredients,
        {
          name: "Соус",
          type: "sauce",
        },
      ],
    };

    expect(
      constructorReducer(constructorInitialState, {
        type: CONSTRUCTOR_ADD,
        payload: { name: "Соус", type: "sauce" } as any,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state without bun after remove bun", () => {
    const stateExpect = {
      ...constructorInitialState,
    };

    expect(
      constructorReducer(constructorInitialState, {
        type: CONSTRUCTOR_DELETE,
        payload: { name: "Булка", type: "bun" } as any,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state without ingredient after remove ingredient", () => {
    const stateExpect = {
      ingredients: [{ name: "Начинка 2", type: "main", id: "24" }],
    };

    const constructorInitialStateWithIngredient = {
      ingredients: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
      ],
    };

    expect(
      constructorReducer(constructorInitialStateWithIngredient as any, {
        type: CONSTRUCTOR_DELETE,
        payload: { name: "Начинка", type: "main", id: "23" } as any,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after reorder ingredients", () => {
    const stateExpect = {
      ingredients: [
        { name: "Начинка 2", type: "main", id: "24" },
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 3", type: "sauce", id: "25" },
      ],
    };

    const constructorInitialStateWithIngredient = {
      ingredients: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
        { name: "Начинка 3", type: "sauce", id: "25" },
      ],
    };

    expect(
      constructorReducer(constructorInitialStateWithIngredient as any, {
        type: CONSTRUCTOR_REORDER,
        payload: { from: "23", to: "24" },
      })
    ).toEqual(stateExpect);
  });

  test("Should return initial state after reorder bad ingredients (id not in list)", () => {
    const stateExpect = {
      ingredients: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
        { name: "Начинка 3", type: "sauce", id: "25" },
      ],
    };

    const constructorInitialStateWithIngredient = {
      ingredients: [
        { name: "Начинка 1", type: "main", id: "23" },
        { name: "Начинка 2", type: "main", id: "24" },
        { name: "Начинка 3", type: "sauce", id: "25" },
      ],
    };

    expect(
      constructorReducer(constructorInitialStateWithIngredient as any, {
        type: CONSTRUCTOR_REORDER,
        payload: { from: "2", to: "23" },
      })
    ).toEqual(stateExpect);
  });
});
