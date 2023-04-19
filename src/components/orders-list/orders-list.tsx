import { FC } from "react";
import styles from "./orders-list.module.css";

import { Order } from "./order/order";

export const OrdersList: FC = () => {
  const ordersList: any = [
    {
      ingredients: [
        "60d3463f7034a000269f45e7",
        "60d3463f7034a000269f45e9",
        "60d3463f7034a000269f45e8",
        "60d3463f7034a000269f45ea",
      ],
      _id: "192356",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "60d3463f7034a000269f45e7",
        "60d3463f7034a000269f45e9",
        "60d3463f7034a000269f45e8",
        "60d3463f7034a000269f45ea",
      ],
      _id: "667",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
  ];

  return (
    <ul className={styles.list}>
      {ordersList.map((data: any, i: number) => (
        <li className={styles.item} key={i}>
          <Order data={data} />
        </li>
      ))}
    </ul>
  );
};
