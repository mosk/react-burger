import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { Nav } from "../../components/profile/nav/nav";
import { OrdersList } from "../../components/orders-list/orders-list";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/constants/ws-orders";
import styles from "./orders.module.css";

export const Orders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);
  const { wsConnected } = useSelector((store) => store.orders);

  useEffect(() => {
    if (!wsConnected) {
      dispatch({ type: WS_CONNECTION_START });
    }

    return () => {
      if (wsConnected) {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConnected]);

  return (
    <main className={styles.container}>
      <Nav />
      <section className={styles.content}>
        <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">История заказов</h2>
        <div className={`${styles.order__list} custom-scroll`}>{orders.length > 0 && <OrdersList />}</div>
      </section>
    </main>
  );
};
