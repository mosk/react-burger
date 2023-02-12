import styles from "./order-id.module.css";
import {
  CheckMarkIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "react-redux";

const OrderId = () => {
  const { ID, list, price } = useSelector((store) => store.order);

  // const ings = [list.bun, list.bun, ...list.ingredients];
  // const ingsNames = ings.map((ing) => ing.name);
  // const getOrderList = () => {
  //   return (
  //     <p className="text text_type_main-default mb-2">
  //       Состав: <br/>{ingsNames.map((name, i) => i !== ingsNames.length - 1 ? <>{name}, <br/></> : <>{name}.</>)}
  //     </p>
  //   )
  // };

  // { !getOrderList() }

  return (
    <>
      <p className="text_type_digits-large mt-20 mb-8">{ID}</p>
      <p className="text text_type_main-medium mb-10 pb-10">
        идентификатор заказа
      </p>
      <i className={`${styles["icon--success"]} mb-10`}>
        <CheckMarkIcon type="primary" />
      </i>
      <p className="text text_type_main-default mb-2 pt-10">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mb-2">
        Цена:&nbsp;
        <span className="text text_type_digits-default">{price}&nbsp;</span>
        <span style={{ verticalAlign: "middle" }}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на&nbsp;орбитальной станции
      </p>
    </>
  );
};

export default OrderId;
