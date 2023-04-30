import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from "../../services/constants/order";
import { orderReducer, orderInitialState } from "../../services/reducers/order";

describe("User order store", () => {
  test("Should return initial state", () => {
    expect(orderReducer(undefined, {} as any)).toEqual(orderInitialState);
  });

  test("Should return state when order request started", () => {
    const stateExpect = {
      ...orderInitialState,
      orderRequest: true,
    };

    expect(orderReducer(orderInitialState, { type: ORDER_REQUEST })).toEqual(stateExpect);
  });

  test("Should return state after successful order request", () => {
    const stateExpect = {
      ...orderInitialState,
      orderID: "777",
    };

    expect(orderReducer(orderInitialState, { type: ORDER_SUCCESS, payload: "777" })).toEqual(stateExpect);
  });

  test("Should return state after error with message", () => {
    const stateExpect = {
      ...orderInitialState,
      orderFailed: true,
      orderID: "666",
    };

    expect(orderReducer(orderInitialState, { type: ORDER_FAILED, payload: "666" })).toEqual(stateExpect);
  });
});
