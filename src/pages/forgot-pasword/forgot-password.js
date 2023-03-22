import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "../../utils/hooks";
import { showPassword } from "../../utils/showPassword";

import { passwordResetRequest } from "../../services/actions/auth";

import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: "",
  });

  const emailRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordResetRequest(values)).then(() => navigate("/reset-password"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={false}
            ref={emailRef}
            onIconClick={showPassword}
            errorText={"Ошибка"}
            size={"default"}
            required={true}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-1">
          Вспомнили пароль? <br />
          <Link to="/login" className={`text text_type_main-default ${styles.link}`}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
