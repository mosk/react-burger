import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "../../services/constants/ws-orders";
import { wsReducer, wsInitialState } from "../../services/reducers/ws-orders";

describe("Constructor store", () => {
  test("Should return initial state", () => {
    expect(wsReducer(undefined, {} as any)).toEqual(wsInitialState);
  });

  test("Should return state after successful connect", () => {
    const stateExpect = {
      ...wsInitialState,
      error: undefined,
      wsConnected: true,
    };

    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after error", () => {
    const stateExpect = {
      ...wsInitialState,
      error: "Error",
      wsConnected: false,
    };

    expect(
      wsReducer(wsInitialState, {
        type: WS_CONNECTION_ERROR,
        payload: "Error",
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after close connect", () => {
    const stateExpect = {
      ...wsInitialState,
      error: undefined,
      wsConnected: false,
      orders: [],
    };

    const wsInitialStateConnected = {
      ...wsInitialState,
      error: undefined,
      wsConnected: true,
      orders: [{ number: 1 }, { number: 2 }],
    };

    expect(
      wsReducer(wsInitialStateConnected as any, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(stateExpect);
  });

  test("Should return state after receive orders", () => {
    const stateExpect = {
      ...wsInitialState,
      error: undefined,
      orders: [{ number: 1 }, { number: 2 }, { number: 3 }],
      total: "3",
      totalToday: "1",
    };

    expect(
      wsReducer(wsInitialState, {
        type: WS_GET_ORDERS,
        payload: {
          total: "3",
          totalToday: "1",
          orders: [{ number: 1 }, { number: 2 }, { number: 3 }] as any,
        },
      })
    ).toEqual(stateExpect);
  });
});
