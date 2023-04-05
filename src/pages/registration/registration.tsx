import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../utils/hooks";
import { showPassword } from "../../utils/showPassword";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerRequest } from "../../services/actions/auth";
import styles from "./registration.module.css";
import { TFormEvent } from "../../types/types";

export const Registration: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitHandler = (e: TFormEvent) => {
    e.preventDefault();
    dispatch(registerRequest(values) as any);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <p className="text text_type_main-medium mb-6">Регистрация</p>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
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
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <br />
          <Link to="/login" className={`text text_type_main-default ${styles.link}`}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
