import { TAuthState } from "../../types/types";
import { TAuthActions } from "../actions/auth";
import { AUTH_REQUEST, AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, AUTH_FAILED, AUTH_CHECKED } from "../constants/auth";

const authInitialState: TAuthState = {
  request: false,
  email: "",
  name: "",
  authFailed: false,
  message: "",
  isAuthChecked: false,
};

export const authReducer = (state: TAuthState = authInitialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case AUTH_LOGIN: {
      return {
        ...state,
        request: false,
        email: action.payload.email,
        name: action.payload.name,
        isAuthChecked: true,
        message: "",
      };
    }
    case AUTH_REGISTER: {
      return {
        ...state,
        request: false,
        email: action.payload.email,
        name: action.payload.name,
        isAuthChecked: true,
        message: "",
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        request: false,
        email: "",
        name: "",
        isAuthChecked: false,
        message: "",
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        request: false,
        authFailed: true,
        message: action.payload,
        isAuthChecked: false,
      };
    }
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    default: {
      return state;
    }
  }
};
