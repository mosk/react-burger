import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { registerRequest } from "../../services/actions/auth";

import styles from "./registration.module.css";

export const Registration = () => {
  const dispatch = useDispatch();
  const { request, authFailed } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerRequest(form));
  };

  const showPassword = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.type = "text";
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {request && <>Loading</>}
        {!request && !authFailed && (
          <>
            <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
              <p className="text text_type_main-medium mb-6">Регистрация</p>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => onChange(e)}
                value={form.name}
                name={"name"}
                error={false}
                ref={nameRef}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="mb-6"
              />
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
                Зарегистрироваться
              </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?{" "}
              <Link to="/login" className={`text text_type_main-default ${styles.link}`}>
                Войти
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
