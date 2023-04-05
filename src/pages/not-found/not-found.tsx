import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./not-found.module.css";

export const NotFound404: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text text_type_main-default">
          Такой страницы нет:( <br />
          <Link to="/" className={`text text_type_main-default ${styles.link}`}>
            Перейти на главную
          </Link>
        </p>
      </div>
    </div>
  );
};
