import { FC } from "react";
import { useSelector } from "../../utils/hooks";
import styles from "./orders-global-info.module.css";

export const OrdersGlobalInfo: FC = () => {
  const { orders, total, totalToday } = useSelector((store) => store.orders);

  return (
    <>
      <div className={`${styles["orders--ready"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium mb-6`}>Готовы:</h3>
        <ul className={styles.list}>
          {orders &&
            orders
              .filter((order) => order.status === "done")
              .map((orderDone) => {
                return (
                  <li className={styles.list__item}>
                    <span className="text text_type_digits-default text_color_success">{orderDone._id}</span>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className={`${styles["orders--in-work"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium mb-6`}>В работе:</h3>
        <ul className={styles.list}>
          {orders &&
            orders
              .filter((order) => order.status === "pending")
              .map((orderPending) => {
                return (
                  <li className={styles.list__item}>
                    <span className="text text_type_digits-default">{orderPending._id}</span>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className={`${styles["orders--all-time"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium`}>Выполнено за все время:</h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={`${styles["orders--today"]} ${styles["orders"]} mb-15`}>
        <h3 className={`{styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </>
  );
};
