export const showPassword = (e) => {
  e.preventDefault();
  let inputPassword = e.currentTarget.parentNode.querySelector('input[name="password"]');

  if (inputPassword.type === "password") {
    inputPassword.type = "text";
  } else {
    inputPassword.type = "password";
  }
};
