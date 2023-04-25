import { FC, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { useParams } from "react-router";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/constants/ws-orders";
import styles from "./order-info.module.css";
import { TOrderData, TIngredient } from "../../types/types";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { orders } = useSelector((store) => store.orders);
  const { items } = useSelector((store) => store.items);

  const [order, setOrder] = useState({} as TOrderData);
  const [orderIngs, setOrderIngs] = useState([] as TIngredientWithAmount[]);

  // useEffect(() => {
  //   if (orders.length === 0) {
  //     dispatch({ type: WS_CONNECTION_START });
  //   }

  //   return () => {
  //     dispatch({ type: WS_CONNECTION_CLOSED });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [orders]);

  type TIngredientWithAmount = TIngredient & {
    amount: number;
  };

  useEffect(() => {
    const currentOrder = orders.find((order: TOrderData) => order["_id"] === orderId);

    if (typeof currentOrder !== "undefined") {
      setOrder(currentOrder);
    }
  }, [orderId, orders]);

  useEffect(() => {
    if (items.length > 0 && order.ingredients) {
      const getOrderIngs = () => {
        let ings: TIngredientWithAmount[] = [];
        let ingsIDs: string[] = [];

        order.ingredients.forEach((id: string, i: number) => {
          const res = items.filter((item) => item._id === id);

          if (ingsIDs.includes(res[0]._id)) {
            let currentIngIndex = ingsIDs.indexOf(res[0]._id);

            ings[currentIngIndex].amount += ings[currentIngIndex].amount;
          } else {
            ingsIDs.push(res[0]._id);
            ings.push({ ...res[0], amount: 1 });
          }
        });

        return ings;
      };

      setOrderIngs(getOrderIngs());
    }
  }, [items, order]);

  const getPrice = useMemo((): number => {
    let price: number = 0;

    if (orderIngs.length > 0) {
      price = orderIngs.reduce((sum: number, item: TIngredientWithAmount) => sum + item.price * item.amount, 0);
    }

    return price;
  }, [orderIngs]);

  const statusTranslate = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };

  return (
    order && (
      <>
        <h3 className={`text text_type_main-medium mb-3 ${styles.order__name}`}>{order.name}</h3>
        <p className={`text text_type_digits-default mb-10 ${styles.order__id}`}>#{order.number}</p>
        <span className={`text text_type_main-default text_color_success mb-15 ${styles.order__status}`}>
          {statusTranslate[order.status]}
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
            {orderIngs &&
              orderIngs.map((ing: TIngredientWithAmount, i: number) => {
                return (
                  <tr className={styles.table__row} key={i}>
                    <td className={`${styles.table__td} ${styles.table__image}`}>
                      <div className={styles.image__wrapper}>
                        <img src={ing.image} alt={ing.name} />
                      </div>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__name}`}>
                      <p className="text text_type_main-default">{ing.name}</p>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__amount}`}>
                      <p className="text text_type_digits-default">{ing.amount}</p>
                    </td>
                    <td className={`${styles.table__td} ${styles.table__price}`}>
                      <p className="text text_type_digits-default">{ing.price}&nbsp;</p>
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
            <span className="text text_type_digits-default">{getPrice}&nbsp;</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>
    )
  );
};

export default OrderInfo;
