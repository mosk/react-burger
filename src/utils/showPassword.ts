import { TInputEvent } from "../types/types";

export const showPassword = (e: TInputEvent): void => {
  e.preventDefault();
  let inputPassword: any;

  if (e.currentTarget.parentNode) {
    inputPassword = e.currentTarget!.parentNode.querySelector('input[name="password"]');
  }

  if (inputPassword.type === "password") {
    inputPassword.type = "text";
  } else {
    inputPassword.type = "password";
  }
};
