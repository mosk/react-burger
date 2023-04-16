import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader: FC = () => {
  const { name } = useSelector((store) => store.auth);
  const location = useLocation();

  const path = location.pathname;

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
          <BurgerIcon type={path === "/" ? "primary" : "secondary"} />
          <span className="text text_type_main-default pl-2">Конструктор</span>
        </NavLink>
        <NavLink
          to="/abracadabra"
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <ListIcon type="secondary" />
          <span className="text text_type_main-default pl-2">Лента заказов</span>
        </NavLink>
      </nav>
      <nav className={`${styles.nav} ${styles["nav--user"]}`}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <ProfileIcon type={path === "/profile" ? "primary" : "secondary"} />
          <span className="text text_type_main-default pl-2">{name ? name : "Личный кабинет"}</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
