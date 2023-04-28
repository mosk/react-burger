import { FC, useRef } from "react";
import { useDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "../../utils/hooks";
import { showPassword } from "../../utils/showPassword";
import { passwordChangeRequest } from "../../services/actions/auth";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { TFormEvent } from "../../types/types";

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  const codeRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitHandler = (e: TFormEvent) => {
    e.preventDefault();
    dispatch(passwordChangeRequest(values)).then(() => navigate("/"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
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
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            error={false}
            ref={codeRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
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
