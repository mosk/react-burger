import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginRequest } from "../../services/actions/auth";

import styles from "./sign-in.module.css";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request, authFailed } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form)).then(navigate("/", { replace: true }));
  };

  const showPassword = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.type = "text";
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => onChange(e)}
            value={form.email}
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
            onChange={(e) => onChange(e)}
            icon={"ShowIcon"}
            value={form.password}
            name={"password"}
            error={false}
            ref={passwordRef}
            onIconClick={(e) => showPassword(e)}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-1">
          Вы — новый пользователь?{" "}
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
      </div>
    </div>
  );
};
