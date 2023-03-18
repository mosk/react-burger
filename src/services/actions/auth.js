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

const accessTokenExpiresTime = 1200; // in seconds

export const registerRequest = (form) => (dispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(registerPath, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  })
    .then((res) => {
      if (res.accessToken) {
        let authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken, {
          expires: accessTokenExpiresTime,
        });
      }
      if (res.refreshToken) {
        let refreshToken = res.refreshToken;
        setCookie("refreshToken", refreshToken);
      }
      dispatch({
        type: AUTH_REGISTER,
        payload: res.user,
      });
    })
    .catch((err) => {
      console.log(err);
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
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  })
    .then((res) => {
      if (res.accessToken) {
        let authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken, {
          expires: accessTokenExpiresTime,
        });
      }
      if (res.refreshToken) {
        let refreshToken = res.refreshToken;
        setCookie("refreshToken", refreshToken);
      }
      dispatch({
        type: AUTH_LOGIN,
        payload: res.user,
      });
    })
    .catch((err) => {
      console.log(err);
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
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    authorization: {
      accessToken: getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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

export const refreshUserRequest = (form) => (dispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return request(authPath, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    authorization: {
      accessToken: getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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

export const checkAuth = () => (dispatch) => {
  if (getCookie("token")) {
    dispatch(authRequest()).finally(() => {
      dispatch({ type: AUTH_CHECKED });
    });
  }
};

const refreshToken = (afterRefresh) => (dispatch) => {
  return request(tokenPath, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then((res) => {
    let authToken = res.accessToken.split("Bearer ")[1];
    setCookie("token", authToken, {
      expires: accessTokenExpiresTime,
    });
    setCookie("refreshToken", res.refreshToken);
    dispatch(afterRefresh);
  });
};
