import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import styles from "./orders-list.module.css";

import { Order } from "./order/order";

export const OrdersList: FC = () => {
  const location = useLocation();
  const { orders } = useSelector((store) => store.orders);

  return (
    <ul className={styles.list}>
      {orders.map((data, i) => (
        <li className={styles.item} key={i}>
          <Link
            to={{ pathname: `${location.pathname}/${data._id}` }}
            state={{ background: location }}
            className={styles.item__wrapper}
            style={{ display: "flex" }}
          >
            <Order data={data} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
