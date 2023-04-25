import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/constants/ws-orders";
import styles from "./feed.module.css";
import { OrdersList } from "../../components/orders-list/orders-list";
import { OrdersGlobalInfo } from "../../components/orders-global-info/orders-global-info";

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={`${styles.feed__title} text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={`${styles.feed__list} custom-scroll`}>{orders.length > 0 && <OrdersList />}</div>
      <div className={styles.feed__info}>{orders.length > 0 && <OrdersGlobalInfo />}</div>
    </main>
  );
};
