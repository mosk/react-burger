import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderId from "../order-id/order-id";
import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../utils/prop-types";

// RIGHT
const BurgerConstructor = ({ data }) => {
  const [modalVisibility, setVisible] = React.useState(false);
  const [ingredientInModal, setIngredientInModal] = React.useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIngredientInModal({
      calories: data.calories,
      carbohydrates: data.carbohydrates,
      fat: data.fat,
      image_large: data.image_large,
      name: data.name,
      proteins: data.proteins,
    });
    setVisible(true);
  };

  const handleCloseModal = (e) => {
    setVisible(false);
  };

  const getOrderID = () => {
    return 9999999;
  };

  return (
    <section className={`${styles.section} ml-5 mr-5 pt-25`}>
      <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">
        Состав бургера
      </h2>
      {data.map(
        (item, i) =>
          i === 0 && (
            <div className={`${styles["ingredient-top"]} mb-4`} key={item._id}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                type="top"
                isLocked={true}
              />
            </div>
          )
      )}
      <div className={`${styles.wrapper} custom-scroll`}>
        <ul className={`${styles.list} mb-4`}>
          {data.map((item, i) => (
            <li
              className={`${styles.list__item} ml-3 mr-3 mb-4`}
              key={item._id}
            >
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
      {data.map(
        (item, i) =>
          i === 1 && (
            <div
              className={`${styles["ingredient-bottom"]} mb-10`}
              key={item._id}
            >
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                type="bottom"
                isLocked={true}
              />
            </div>
          )
      )}
      <div className={styles.order}>
        <p className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-default">999999&nbsp;</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
        {ingredientInModal && modalVisibility && (
          <Modal onClose={handleCloseModal} title="">
            <OrderId id={getOrderID()} />
          </Modal>
        )}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(TYPE_INGREDIENT).isRequired)
    .isRequired,
};

export default BurgerConstructor;
