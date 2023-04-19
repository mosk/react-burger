import { FC } from "react";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { TOrderData } from "../../../types/types";

interface IOrderProps {
  data: TOrderData;
  showStatus?: boolean;
}

export const Order: FC<IOrderProps> = ({ data, showStatus = true }) => {
  return (
    <>
      <a className={`text text_type_main-medium ${styles.name}`}>Death Star Starship Main бургер</a>
      <p className={`text text_type_digits-default pb-6 ${styles.order}`}>#{data._id}</p>
      <p className={`text text_type_main-default text_color_inactive pb-6 ${styles.date}`}>
        <FormattedDate date={new Date(data.updatedAt)} />
      </p>
      {showStatus && <span className={`text text_type_main-small mt-2 ${styles.status}`}>{data.status}</span>}
      <ul className={`mt-6 ${styles.list}`}>
        {data.ingredients.map((ing: string, i: number) => (
          <li className={styles.image}>{ing}</li>
        ))}
      </ul>
      <p className={`mt-6 ${styles.price}`}>
        <span className="text text_type_digits-default">999&nbsp;</span>
        <CurrencyIcon type="primary" />
      </p>
    </>
  );
};
