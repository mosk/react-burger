import { FC } from "react";
import styles from "./feed.module.css";
import { OrdersList } from "../../components/orders-list/orders-list";

export const Feed: FC = () => {
  return (
    <main className={styles.content}>
      <OrdersList />
    </main>
  );
};
