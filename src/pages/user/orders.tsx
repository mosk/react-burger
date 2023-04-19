import { FC } from "react";
import { Nav } from "../../components/profile/nav/nav";
import { OrdersList } from "../../components/orders-list/orders-list";
import styles from "./orders.module.css";

export const Orders: FC = () => {
  return (
    <main className={styles.container}>
      <Nav />
      <section className={styles.content}>
        <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">История заказов</h2>
        <OrdersList />
      </section>
    </main>
  );
};
