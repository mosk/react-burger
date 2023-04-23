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
      orderIngsIDs.forEach((id: string) => {
        const res = items.filter((item) => item._id === id);

        if (res[0].type === "bun") {
          console.log(`булка!`);
        }

        ings.push(res[0]);
      });

      // проверить кол-во булок – должно быть 2

      price = ings.reduce((sum: number, item: TIngredient) => sum + item.price, 0);
    }

    return price;
  }, [items, orderIngsIDs]);

  useEffect(() => {
    if (items.length > 0) {
      const getOrderIngs = () => {
        let ings: TIngredient[] = [];

        orderIngsIDs.forEach((id: string) => {
          const res = items.filter((item) => item._id === id);

          ings.push(res[0]);
        });

        return ings;
      };

      setOrderIngs(getOrderIngs());
    }
  }, [items, orderIngsIDs]);

  return (
    <>
      <h3 className={`text text_type_main-medium ${styles.name}`}>Death Star Starship Main бургер</h3>
      <p className={`text text_type_digits-default pb-6 ${styles.order}`}>#{data._id}</p>
      <p className={`text text_type_main-default text_color_inactive pb-6 ${styles.date}`}>
        <FormattedDate date={new Date(data.updatedAt)} />
      </p>
      {showStatus && <span className={`text text_type_main-small mt-2 ${styles.status}`}>{data.status}</span>}
      <ul className={`mt-6 ${styles.list}`}>
        {orderIngs.length > 0 &&
          data.ingredients.map((ing: string, i: number) => {
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
