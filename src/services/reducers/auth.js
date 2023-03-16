import { AUTH_REQUEST, AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, AUTH_FAILED } from "../actions/auth";

const initialState = {
  request: false,
  email: "",
  name: "",
  authFailed: false,
  message: "",
  accessToken: "",
  refreshToken: "",
};

export const authReducer = (state = initialState, action) => {
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
      };
    }
    case AUTH_REGISTER: {
      return {
        ...state,
        request: false,
        email: action.payload.email,
        name: action.payload.name,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
        items: action.payload,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        request: false,
        authFailed: true,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
