import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <a href="/" className={styles.logo}>
        <Logo />
      </a>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default pl-2">Конструктор</span>
        </NavLink>
        <a href="/" className={`${styles.button} ${styles["button--secondary"]} p-5 m-1`}>
          <ListIcon type="secondary" />
          <span className="text text_type_main-default pl-2">Лента заказов</span>
        </a>
      </nav>
      <nav className={`${styles.nav} ${styles["nav--user"]}`}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default pl-2">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
