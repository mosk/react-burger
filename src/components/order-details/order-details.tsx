import { FC, useEffect } from "react";

import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../loader/loader";
import { useSelector, useDispatch } from "react-redux";

import { getOrderID } from "../../services/actions/order";
import { TStore, TIngredient } from "../../types/types";

interface IItemsInConstructor {
  bun?: TIngredient;
  ingredients?: TIngredient[];
}

const OrderDetails: FC = () => {
  const { orderID, orderRequest, orderFailed } = useSelector((store: TStore) => store.order);
  const { bun, ingredients }: IItemsInConstructor = useSelector((store: TStore) => store.itemsInConstructor);
  const dispatch = useDispatch();

  const getItemsID = (itemsList: TIngredient[] | undefined): string[] => {
    if (itemsList) {
      return itemsList.map((item) => item._id);
    } else {
      return [];
    }
  };

  useEffect(() => {
    dispatch(
      getOrderID({
        ingredients: [bun, bun, ...getItemsID(ingredients)],
      } as any) as any
    );
  }, [dispatch, ingredients, bun]);

  const success = () => {
    return (
      <>
        <p className="text_type_digits-large mt-20 mb-8">{orderID}</p>
        <p className="text text_type_main-medium mb-10 pb-10">идентификатор заказа</p>
        <i className={`${styles["icon--success"]} mb-10`}>
          <CheckMarkIcon type="primary" />
        </i>
        <p className="text text_type_main-default mb-2 pt-10">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-20">
          Дождитесь готовности на&nbsp;орбитальной станции
        </p>
      </>
    );
  };

  const loading = () => {
    return (
      <>
        <p className="text text_type_main-medium mt-20 mb-10">Загрузка...</p>
        <Loader />
      </>
    );
  };

  const error = () => {
    return (
      <>
        <p className="text text_type_main-medium mt-20 mb-10">Ошибка!</p>
        <p className="text text_type_main-default text_color_inactive mb-20">{orderID}</p>
      </>
    );
  };

  return <>{orderRequest ? loading() : orderID && !orderFailed ? success() : error()}</>;
};

export default OrderDetails;
