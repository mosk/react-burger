import {
  AUTH_REQUEST,
  AUTH_LOGIN,
  AUTH_CHECKED,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_FAILED,
} from "../../services/constants/auth";
import { authReducer, authInitialState } from "../../services/reducers/auth";

describe("Auth store", () => {
  test("Should return initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(authInitialState);
  });

  test("Should return state when auth request started", () => {
    const stateExpect = {
      ...authInitialState,
      request: true,
    };

    expect(authReducer(authInitialState, { type: AUTH_REQUEST })).toEqual(stateExpect);
  });

  test("Should return state after auth checked", () => {
    const stateExpect = {
      ...authInitialState,
      isAuthChecked: true,
    };

    expect(authReducer(authInitialState, { type: AUTH_CHECKED })).toEqual(stateExpect);
  });

  test("Should return state after user login", () => {
    const stateExpect = {
      ...authInitialState,
      email: "misha@email.com",
      name: "misha",
      isAuthChecked: true,
    };

    expect(
      authReducer(authInitialState, { type: AUTH_LOGIN, payload: { name: "misha", email: "misha@email.com" } })
    ).toEqual(stateExpect);
  });

  test("Should return state after user register", () => {
    const stateExpect = {
      ...authInitialState,
      email: "misha@email.com",
      name: "misha",
      isAuthChecked: true,
    };

    expect(
      authReducer(authInitialState, { type: AUTH_REGISTER, payload: { name: "misha", email: "misha@email.com" } })
    ).toEqual(stateExpect);
  });

  test("Should return state after user logout", () => {
    const stateExpect = {
      ...authInitialState,
      isAuthChecked: false,
    };

    expect(authReducer(authInitialState, { type: AUTH_LOGOUT })).toEqual(stateExpect);
  });

  test("Should return state after error with message", () => {
    const stateExpect = {
      ...authInitialState,
      authFailed: true,
      message: "Error",
    };

    expect(authReducer(authInitialState, { type: AUTH_FAILED, payload: "Error" })).toEqual(stateExpect);
  });
});
