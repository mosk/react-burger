import React from "react";
import styles from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../utils/prop-types";

const Ingredient = ({ data }) => {
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

  return (
    <>
      <a href="/" onClick={handleOpenModal}>
        <img
          src={data.image}
          alt={data.name}
          className={`${styles.image} mb-1`}
        />
      </a>
      <h3 className={`${styles.name} text text_type_main-small`}>
        {data.name}
      </h3>
      <p className={styles.price}>
        <span className="text text_type_digits-default">
          {data.price}&nbsp;
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <div className={`${styles.amount} mb-1`}>
        <span className="visually-hidden">Количество: </span>
        <Counter count={1} size="default" extraClass="m-1" />
      </div>
      {ingredientInModal && modalVisibility && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails data={ingredientInModal} />
        </Modal>
      )}
    </>
  );
};

Ingredient.propTypes = {
  data: PropTypes.shape(TYPE_INGREDIENT).isRequired,
};

export default Ingredient;
