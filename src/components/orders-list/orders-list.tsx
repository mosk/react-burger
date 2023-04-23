import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./orders-list.module.css";

import { Order } from "./order/order";
import { TOrderData } from "../../types/types";

export const OrdersList: FC = () => {
  const location = useLocation();

  const ordersList: TOrderData[] = [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "192356",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "667",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "667",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "192356",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "667",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0947",
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
      {ordersList.map((data: TOrderData, i: number) => (
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
