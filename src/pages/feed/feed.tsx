import { FC } from "react";
import styles from "./feed.module.css";
import { OrdersList } from "../../components/orders-list/orders-list";
import { OrdersGlobalInfo } from "../../components/orders-global-info/orders-global-info";

export const Feed: FC = () => {
  return (
    <main className={styles.container}>
      <h1 className={`${styles.feed__title} text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={`${styles.feed__list} custom-scroll`}>
        <OrdersList />
      </div>
      <div className={styles.feed__info}>
        <OrdersGlobalInfo />
      </div>
    </main>
  );
};
