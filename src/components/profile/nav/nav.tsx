import { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { logoutRequest } from "../../../services/actions/auth";

import styles from "./nav.module.css";

import { TMouseEvent } from "../../../types/types";

export const Nav: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const profilePath: string = "/profile";
  const ordersPath: string = "/profile/orders";

  const desc = (path: string) => {
    let desc: string = "";

    switch (path) {
      case profilePath:
        desc = "В этом разделе вы можете изменить свои персональные данные";
        break;

      case ordersPath:
        desc = "В этом разделе вы можете просмотреть свою историю заказов";
        break;

      default:
        desc = "В этом разделе вы увидите нечто уникальное...";
        break;
    }

    return desc;
  };

  const onLogoutHandler = (e: TMouseEvent): void => {
    e.preventDefault();
    dispatch(logoutRequest() as any).then(navigate("/login", { replace: true }));
  };

  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <NavLink
            to="/profile"
            end
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
            end
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
          <button type="button" className={`${styles.link} text text_type_main-medium`} onClick={onLogoutHandler}>
            Выход
          </button>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive">{desc(path)}</p>
    </aside>
  );
};
