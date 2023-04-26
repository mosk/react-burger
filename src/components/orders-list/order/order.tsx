import { FC, useEffect, useMemo, useState } from "react";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { TIngredient, TOrderData } from "../../../types/types";
import { useSelector } from "../../../utils/hooks";

interface IOrderProps {
  data: TOrderData;
  showStatus?: boolean;
}

export const Order: FC<IOrderProps> = ({ data, showStatus = true }) => {
  const [orderIngs, setOrderIngs] = useState([] as TIngredient[]);
  const { items } = useSelector((store) => store.items);
  const orderIngsIDs: string[] = data.ingredients;

  const getPrice = useMemo((): number => {
    let ings: TIngredient[] = [];
    let price: number = 0;

    if (items.length > 0) {
      orderIngsIDs.forEach((id) => {
        const res = items.filter((item) => item._id === id);

        ings.push(res[0]);
      });

      price = ings.reduce((sum, item) => sum + item.price, 0);
    }

    return price;
  }, [items, orderIngsIDs]);

  useEffect(() => {
    if (items.length > 0) {
      const getOrderIngs = () => {
        let ings: TIngredient[] = [];

        orderIngsIDs.forEach((id) => {
          const res = items.filter((item) => item._id === id);

          ings.push(res[0]);
        });

        return ings;
      };

      setOrderIngs(getOrderIngs());
    }
  }, [items, orderIngsIDs]);

  const statusTranslate = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };

  return (
    <>
      <h3 className={`text text_type_main-medium ${styles.name}`}>{data.name}</h3>
      <p className={`text text_type_digits-default pb-6 ${styles.order}`}>#{data.number}</p>
      <p className={`text text_type_main-default text_color_inactive pb-6 ${styles.date}`}>
        <FormattedDate date={new Date(data.updatedAt)} />
      </p>
      {showStatus && (
        <span
          className={`text text_type_main-default ${data.status === "done" ? "text_color_success" : ""} mt-2 ${
            styles.status
          }`}
        >
          {statusTranslate[data.status]}
        </span>
      )}
      <ul className={`mt-6 ${styles.list}`}>
        {orderIngs.length > 0 &&
          // eslint-disable-next-line array-callback-return
          data.ingredients.map((ing, i) => {
            const ingsMax: number = 6;
            const ingsAmount: number = data.ingredients.length;
            const ingsRest: number = ingsAmount - ingsMax;

            if (ingsAmount > ingsMax) {
              if (i === 0) {
                return (
                  <li className={styles.image} key={i}>
                    <div className={`${styles.image__wrapper} ${styles["image__wrapper--last"]}`}>
                      <img src={orderIngs[i].image} alt={orderIngs[i].name} />
                    </div>
                    <span className="text text_type_main-small">+{ingsRest}</span>
                  </li>
                );
              }
              if (i < ingsMax) {
                return (
                  <li className={styles.image} key={i}>
                    <div className={styles.image__wrapper}>
                      <img src={orderIngs[i].image} alt={orderIngs[i].name} />
                    </div>
                  </li>
                );
              }
            } else {
              return (
                <li className={styles.image} key={i}>
                  <div className={styles.image__wrapper}>
                    <img src={orderIngs[i].image} alt={orderIngs[i].name} />
                  </div>
                </li>
              );
            }
          })}
      </ul>
      <p className={`mt-6 ${styles.price}`}>
        <span className="text text_type_digits-default">{items.length > 0 && getPrice}&nbsp;</span>
        <CurrencyIcon type="primary" />
      </p>
    </>
  );
};
