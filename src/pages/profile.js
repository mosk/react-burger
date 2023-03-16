import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const showPassword = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.type = "text";
  };

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
            <NavLink
              to="/exit"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles["link--active"]} text text_type_main-medium`
                  : `${styles.link} text text_type_main-medium`
              }
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>
      <section className={styles.content}>
        <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">Персональные данные</h2>
        <form className={styles.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            icon={"EditIcon"}
            value={name}
            name={"name"}
            error={false}
            ref={nameRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            icon={"EditIcon"}
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
            icon={"EditIcon"}
            value={password}
            name={"password"}
            error={false}
            ref={passwordRef}
            onIconClick={(e) => showPassword(e)}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
        </form>
      </section>
    </main>
  );
};
