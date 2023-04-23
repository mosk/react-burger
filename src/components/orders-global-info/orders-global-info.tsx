import { FC } from "react";
import styles from "./orders-global-info.module.css";

export const OrdersGlobalInfo: FC = () => {
  return (
    <>
      <div className={`${styles["orders--ready"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium mb-6`}>Готовы:</h3>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default text_color_success">034533</span>
          </li>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default text_color_success">034534</span>
          </li>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default text_color_success">034535</span>
          </li>
        </ul>
      </div>
      <div className={`${styles["orders--in-work"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium mb-6`}>В работе:</h3>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default">034533</span>
          </li>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default">034534</span>
          </li>
          <li className={styles.list__item}>
            <span className="text text_type_digits-default">034535</span>
          </li>
        </ul>
      </div>
      <div className={`${styles["orders--all-time"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium`}>Выполнено за все время:</h3>
        <p className="text text_type_digits-large">28 752</p>
      </div>
      <div className={`${styles["orders--today"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">138</p>
      </div>
    </>
  );
};
