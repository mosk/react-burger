import { FC, useEffect, useState } from "react";
// import { useSelector } from "../../utils/hooks";
import { useParams } from "react-router";
import styles from "./order-info.module.css";
import { TOrderData } from "../../types/types";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo: FC = () => {
  const { orderId } = useParams();
  // const { orders } = useSelector((store) => store.orders);

  const [order, setOrder] = useState({} as TOrderData);
  const orderIngs = [];

  useEffect(() => {
    const orders: TOrderData[] = [
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

    const currentOrder = orders.find((order: TOrderData) => order["_id"] === orderId);

    if (typeof currentOrder !== "undefined") {
      setOrder(currentOrder);
    }
  }, [orderId]);

  return (
    order && (
      <>
        <h3 className={`text text_type_main-medium mb-3 ${styles.order__name}`}>Death Star Starship Main бургер</h3>
        <p className={`text text_type_digits-default mb-10 ${styles.order__id}`}>#{order._id}</p>
        <span className={`text text_type_main-default text_color_success mb-15 ${styles.order__status}`}>
          {order.status}
        </span>
        <table className={`${styles.table} mb-10`}>
          <caption className="text text_type_main-medium mb-6">Состав:</caption>
          <thead className={`${styles.table__header} visually-hidden`}>
            <tr>
              <th>
                <p className="text text_type_main-default text_color_inactive">Изображение</p>
              </th>
              <th>
                <p className="text text_type_main-default text_color_inactive">Название</p>
              </th>
              <th>
                <p className="text text_type_main-default text_color_inactive">Количество</p>
              </th>
              <th>
                <p className="text text_type_main-default text_color_inactive">Цена</p>
              </th>
            </tr>
          </thead>
          <tbody className={`${styles.table__body} custom-scroll`}>
            {order.ingredients &&
              order.ingredients.map((order, i) => {
                return (
                  <tr className={styles.table__row} key={i}>
                    <td className={`${styles.table__td} ${styles.table__image}`}>
                      <div className={styles.image__wrapper}>
                        <img src="https://code.s3.yandex.net/react/code/sp_1.png" alt="Флюоресцентная булка R2-D3" />
                      </div>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__name}`}>
                      <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__amount}`}>
                      <p className="text text_type_digits-default">2</p>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__price}`}>
                      <p className="text text_type_digits-default">20&nbsp;</p>
                      <CurrencyIcon type="primary" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className={styles.order__info}>
          <p className={`${styles.order__date} text text_type_main-default text_color_inactive`}>
            <FormattedDate date={new Date(order.updatedAt)} />
          </p>
          <p className={styles.order__price}>
            <span className="text text_type_digits-default">333&nbsp;</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>
    )
  );
};

export default OrderInfo;
