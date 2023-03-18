import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Ingredient from "./ingredient/ingredient";

import { addToConstructor, CONSTRUCTOR_RESET } from "../../services/actions/constructor";
import { ORDER_REQUEST } from "../../services/actions/order";

// RIGHT
const BurgerConstructor = () => {
  const [modalVisibility, setVisible] = useState(false);
  const { orderFailed } = useSelector((store) => store.order);
  const items = useSelector((store) => store.itemsInConstructor);
  const dispatch = useDispatch();

  // dnd – from ings to constructor
  const [{ isHover }, dropTarget] = useDrop({
    accept: ["bun", "main", "sauce"],
    drop: (item) => {
      dispatch(addToConstructor(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  // dnd – move inside constructor
  const [, dropTargetList] = useDrop({
    accept: "constructorItem",
    drop: (item) => {
      console.log(item);
      getDistance();
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const getDistance = () => {
    const listHeight = document.querySelector(`.${styles.list}`).offsetHeight;
    const elHeight = document.querySelector(`.${styles.list} > *`).offsetHeight;

    console.log(listHeight, elHeight);
  };

  // modal
  const handleOpenModal = (e) => {
    e.preventDefault();
    dispatch({
      type: ORDER_REQUEST,
      payload: {
        ingredients: items,
        price: getPrice,
      },
    });
    setVisible(true);
  };

  const handleCloseModal = (e) => {
    setVisible(false);

    !orderFailed &&
      dispatch({
        type: CONSTRUCTOR_RESET,
      });
  };

  const getPrice = useMemo(() => {
    return (items.bun ? items.bun.price * 2 : 0) + items.ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const getIngredients = () => {
    const res = items.ingredients.map((item, i) => <Ingredient ingredient={item} key={item.id} />);

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
          onClick={handleOpenModal}
          disabled={items.bun ? false : true}
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
