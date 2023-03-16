import { request } from "../../utils/burger-api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_FAILED = "AUTH_FAILED";

const registerPath = "auth/register";
const loginPath = "auth/login";
const logoutPath = "auth/logout";
const tokenPath = "auth/token";

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
      console.log(res);
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
