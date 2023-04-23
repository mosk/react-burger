import { FC } from "react";
import OrderInfo from "../../components/order-info/order-info";
import styles from "./order-info.module.css";

export const Order: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <OrderInfo />
      </div>
    </div>
  );
};
