import { useState, useMemo, FC, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Ingredient from "./ingredient/ingredient";

import { addToConstructor } from "../../services/actions/constructor";
import { ORDER_REQUEST } from "../../services/constants/order";
import { CONSTRUCTOR_RESET } from "../../services/constants/constructor";

import { TStore, TMouseEvent, TIngredient } from "../../types/types";

const BurgerConstructor: FC = () => {
  const [modalVisibility, setVisible] = useState<boolean>(false);
  const { orderFailed } = useSelector((store: TStore) => store.order);
  const items = useSelector((store: TStore) => store.itemsInConstructor);
  const { isAuthChecked } = useSelector((store: TStore) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isHover }, dropTarget] = useDrop({
    accept: ["bun", "main", "sauce"],
    drop: (item) => {
      dispatch(addToConstructor(item as TIngredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [, dropTargetList] = useDrop({
    accept: "constructorItem",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const onOrderButtonClick = (e: TMouseEvent): void => {
    e.preventDefault();

    if (isAuthChecked) {
      dispatch({
        type: ORDER_REQUEST,
        payload: {
          ingredients: items,
          price: getPrice,
        },
      });
      setVisible(true);
    } else {
      navigate("/login", { replace: true });
    }
  };

  const handleCloseModal = (): void => {
    setVisible(false);

    !orderFailed &&
      dispatch({
        type: CONSTRUCTOR_RESET,
      });
  };

  const getPrice = useMemo((): number => {
    return (
      (items.bun ? items.bun.price * 2 : 0) +
      items.ingredients.reduce((sum: number, item: TIngredient) => sum + item.price, 0)
    );
  }, [items]);

  const getIngredients = (): ReactNode => {
    const res = items.ingredients.map((item: TIngredient, i: number) => <Ingredient ingredient={item} key={item.id} />);

    return res;
  };

  return (
    <section className={`${styles.section} ml-5 mr-5 pt-25`} ref={dropTarget}>
      <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">Состав бургера</h2>
      {items.bun ? (
        <div className={`${styles["ingredient-top"]} mb-4`}>
          <ConstructorElement
            text={`${items.bun.name} (верх)`}
            price={items.bun.price}
            thumbnail={items.bun.image}
            type="top"
            isLocked={true}
          />
        </div>
      ) : (
        <div className={`${styles["ingredient-top"]} ${styles.empty} ${isHover ? styles.hover : ""} mb-4`}>
          <span className="text text_type_main-small">Место для верхней булки</span>
        </div>
      )}
      <div className={`${styles.wrapper} custom-scroll`}>
        {items.ingredients.length <= 0 && (
          <div className={`${styles["ingredient-middle"]} ${styles.empty} ${isHover ? styles.hover : ""} mb-4`}>
            <span className="text text_type_main-small">Место для начинки</span>
          </div>
        )}

        <ul className={`${styles.list} mb-4`} ref={dropTargetList}>
          {items.ingredients.length > 0 && getIngredients()}
        </ul>
      </div>
      {items.bun ? (
        <div className={`${styles["ingredient-bottom"]} mb-4`}>
          <ConstructorElement
            text={`${items.bun.name} (низ)`}
            price={items.bun.price}
            thumbnail={items.bun.image}
            type="bottom"
            isLocked={true}
          />
        </div>
      ) : (
        <div className={`${styles["ingredient-bottom"]} ${styles.empty} ${isHover ? styles.hover : ""} mb-4`}>
          <span className="text text_type_main-small">Место для нижней булки</span>
        </div>
      )}
      <div className={styles.order}>
        <p className={`${styles.price} mr-10`}>
          {getPrice > 0 && (
            <>
              <span className="text text_type_digits-default">{getPrice}&nbsp;</span>
              <CurrencyIcon type="primary" />
            </>
          )}
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={(e) => onOrderButtonClick(e)}
          disabled={!items.bun}
        >
          Оформить заказ
        </Button>
        {modalVisibility && (
          <Modal onClose={handleCloseModal} title="">
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
