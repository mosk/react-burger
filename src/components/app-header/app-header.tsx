import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ROUTES_LIST } from "../../utils/routes";

const AppHeader: FC = () => {
  const { name } = useSelector((store) => store.auth);
  const location = useLocation();

  const path = location.pathname;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <NavLink to={ROUTES_LIST.home} className={styles.logo}>
        <Logo />
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES_LIST.home}
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <BurgerIcon type={path === ROUTES_LIST.home ? "primary" : "secondary"} />
          <span className="text text_type_main-default pl-2">Конструктор</span>
        </NavLink>
        <NavLink
          to={ROUTES_LIST.feed}
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <ListIcon type={path.includes(ROUTES_LIST.feed) ? "primary" : "secondary"} />
          <span className="text text_type_main-default pl-2">Лента заказов</span>
        </NavLink>
      </nav>
      <nav className={`${styles.nav} ${styles["nav--user"]}`}>
        <NavLink
          to={ROUTES_LIST.profile}
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles["button--active"]} p-5 m-1` : `${styles.button} p-5 m-1`
          }
        >
          <ProfileIcon type={path.includes(ROUTES_LIST.profile) ? "primary" : "secondary"} />
          <span className="text text_type_main-default pl-2">{name ? name : "Личный кабинет"}</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
