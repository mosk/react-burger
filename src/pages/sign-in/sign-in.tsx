import { FC, useRef } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../utils/hooks";
import { showPassword } from "../../utils/showPassword";
import { loginRequest } from "../../services/actions/auth";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./sign-in.module.css";
import { TFormEvent } from "../../types/types";

export const SignIn: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authFailed, message } = useSelector((store) => store.auth);
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const onSubmitHandler = (e: TFormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(values)).then(() => goBack());
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={false}
            ref={emailRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={"ShowIcon"}
            value={values.password}
            name={"password"}
            error={false}
            ref={passwordRef}
            onIconClick={showPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-1">
          Вы — новый пользователь?{" "}
          <Link to="/register" className={`text text_type_main-default ${styles.link}`}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={`text text_type_main-default ${styles.link}`}>
            Восстановить пароль
          </Link>
        </p>
        <p
          style={authFailed ? { visibility: "inherit" } : { visibility: "hidden" }}
          className="text text_type_main-default text_color_inactive mt-4"
        >
          {message}
        </p>
      </div>
    </div>
  );
};
