import IngredientDetails from "../../components/burger-ingredients/ingredient/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";

export const Ingredient = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IngredientDetails />
      </div>
    </div>
  );
};
