import { AppDispatch, TUserRegData, TUserData } from "../../types/types";
import { request } from "../../utils/burger-api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { AUTH_REQUEST, AUTH_REGISTER, AUTH_LOGIN, AUTH_FAILED, AUTH_CHECKED, AUTH_LOGOUT } from "../constants/auth";

export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

export interface IAuthRegisterAction {
  readonly type: typeof AUTH_REGISTER;
  readonly payload: TUserRegData;
}

export interface IAuthLoginAction {
  readonly type: typeof AUTH_LOGIN;
  readonly payload: TUserRegData;
}

export interface IAuthFailedAction {
  readonly type: typeof AUTH_FAILED;
  readonly payload: string;
}

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}

export interface IAuthLogoutAction {
  readonly type: typeof AUTH_LOGOUT;
}

export type TAuthActions =
  | IAuthRequestAction
  | IAuthRegisterAction
  | IAuthLoginAction
  | IAuthFailedAction
  | IAuthCheckedAction
  | IAuthLogoutAction;

const registerPath = "auth/register";
const loginPath = "auth/login";
const logoutPath = "auth/logout";
const tokenPath = "auth/token";
const authPath = "auth/user";
const passwordResetPath = "password-reset";
const passwordChangePath = "password-reset/reset";

const accessTokenExpiresTime = 1200; // in seconds

export const registerRequest = (form: TUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(registerPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  })
    .then((res) => {
      let authToken = res.accessToken.split("Bearer ")[1];
      let refreshToken = res.refreshToken;

      setCookie("token", authToken, {
        expires: accessTokenExpiresTime,
      });
      setCookie("refreshToken", refreshToken);

      dispatch({
        type: AUTH_REGISTER,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_FAILED,
        payload: err,
      });
    });
};

export const loginRequest = (form: TUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(loginPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  })
    .then((res) => {
      let authToken = res.accessToken.split("Bearer ")[1];
      let refreshToken = res.refreshToken;

      setCookie("token", authToken, {
        expires: accessTokenExpiresTime,
      });
      setCookie("refreshToken", refreshToken);

      dispatch({
        type: AUTH_LOGIN,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_FAILED,
        payload: err,
      });
    });
};

export const authRequest = () => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(authPath, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => {
      dispatch({
        type: AUTH_LOGIN,
        payload: res.user,
      });
    })
    .catch((err) => {
      if (err === "jwt expired" || err === "jwt malformed") {
        dispatch(refreshToken(authRequest));
      } else {
        dispatch({
          type: AUTH_FAILED,
          payload: err,
        });
      }
    });
};

export const refreshUserRequest = (form: TUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(authPath, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  })
    .then((res) => {
      dispatch({
        type: AUTH_LOGIN,
        payload: res.user,
      });
    })
    .catch((err) => {
      if (err === "You should be authorised") {
        dispatch(refreshToken(authRequest()));
      } else {
        dispatch({
          type: AUTH_FAILED,
          payload: err,
        });
      }
    });
};

export const logoutRequest = () => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(logoutPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then((res) => {
      dispatch({
        type: AUTH_LOGOUT,
      });
      deleteCookie("token");
      deleteCookie("refreshToken");
    })
    .catch((err) => {
      dispatch({
        type: AUTH_FAILED,
        payload: err,
      });
    });
};

export const passwordResetRequest = (form: TUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(passwordResetPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
    }),
  }).catch((err) => {
    dispatch({
      type: AUTH_FAILED,
      payload: err,
    });
  });
};

export const passwordChangeRequest = (form: TUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(passwordChangePath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      token: form.token,
    }),
  }).catch((err) => {
    dispatch({
      type: AUTH_FAILED,
      payload: err,
    });
  });
};

export const checkAuth = () => (dispatch: AppDispatch) => {
  if (getCookie("refreshToken")) {
    dispatch(authRequest()).finally(() => {
      dispatch({ type: AUTH_CHECKED });
    });
  }
};

const refreshToken = (afterRefresh: any) => (dispatch: AppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(tokenPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then((res) => {
      let authToken = res.accessToken.split("Bearer ")[1];
      let refreshToken = res.refreshToken;

      setCookie("token", authToken, {
        expires: accessTokenExpiresTime,
      });
      setCookie("refreshToken", refreshToken);

      dispatch(afterRefresh());
    })
    .catch((err) => {
      dispatch({
        type: AUTH_FAILED,
        payload: err,
      });
    });
};
