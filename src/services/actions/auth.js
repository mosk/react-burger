import { request } from "../../utils/burger-api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_CHECKED = "AUTH_CHECKED";

const registerPath = "auth/register";
const loginPath = "auth/login";
const logoutPath = "auth/logout";
const tokenPath = "auth/token";
const authPath = "auth/user";
const passwordResetPath = "password-reset";
const passwordChangePath = "password-reset/reset";

const accessTokenExpiresTime = 1200; // in seconds

export const registerRequest = (form) => (dispatch) => {
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

export const loginRequest = (form) => (dispatch) => {
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

export const authRequest = () => (dispatch) => {
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

export const refreshUserRequest = (form) => (dispatch) => {
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

export const logoutRequest = () => (dispatch) => {
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

export const passwordResetRequest = (form) => (dispatch) => {
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

export const passwordChangeRequest = (form) => (dispatch) => {
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

export const checkAuth = () => (dispatch) => {
  if (getCookie("refreshToken")) {
    dispatch(authRequest()).finally(() => {
      dispatch({ type: AUTH_CHECKED });
    });
  }
};

const refreshToken = (afterRefresh) => (dispatch) => {
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
