import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import Loader from "../../components/loader/loader";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { logoutRequest } from "../../services/actions/auth";

import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request, authFailed, email, name, message, isAuthChecked } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    name: name,
    email: email,
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
    console.log(`отправка формы`);
    // dispatch(loginRequest(form)).then(navigate("/", { replace: true }));
  };

  const onResetHandler = (e) => {
    e.preventDefault();
    setForm({ ...form, name, email, password: "" });
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutRequest()).then(navigate("/login", { replace: true }));
  };

  const showPassword = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.type = "text";
  };

  if (!isAuthChecked) {
    return <Loader />;
  } else {
    return (
      <main className={styles.container}>
        <aside className={styles.aside}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles["link--active"]} text text_type_main-medium`
                    : `${styles.link} text text_type_main-medium`
                }
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.list__item}>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles["link--active"]} text text_type_main-medium`
                    : `${styles.link} text text_type_main-medium`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.list__item}>
              <button
                type="button"
                className={`${styles.link} text text_type_main-medium`}
                onClick={(e) => onLogoutHandler(e)}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </aside>
        <section className={styles.content}>
          <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">Персональные данные</h2>
          <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => onChange(e)}
              icon={"EditIcon"}
              value={form.name}
              name={"name"}
              error={false}
              ref={nameRef}
              required={true}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
            />
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={(e) => onChange(e)}
              icon={"EditIcon"}
              value={form.email}
              name={"email"}
              error={false}
              ref={emailRef}
              required={true}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
            />
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={(e) => onChange(e)}
              icon={"EditIcon"}
              value={form.password}
              name={"password"}
              error={false}
              ref={passwordRef}
              onIconClick={(e) => showPassword(e)}
              required={true}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              disabled={request}
              extraClass={styles["button--submit"]}
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={(e) => onResetHandler(e)}
              disabled={request}
              extraClass={styles["button--reset"]}
            >
              Отмена
            </Button>
            {authFailed && <p className="text text_type_main-default text_color_inactive">{message}</p>}
          </form>
        </section>
      </main>
    );
  }
};
