import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const IngredientDetails = () => {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    useSelector((store) => store.itemInModal);

  return (
    <>
      <img
        className={`${styles.image} mb-4`}
        src={image_large}
        alt={name}
        width="480"
        height="240"
      />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <table className={`${styles.table} mb-5`}>
        <thead className={`${styles.table__header}`}>
          <tr>
            <th className={`${styles.table__th}`}>
              <p
                className={`${styles.table__text} text text_type_main-default text_color_inactive`}
              >
                Калории, ккал
              </p>
            </th>
            <th className={`${styles.table__th}`}>
              <p
                className={`${styles.table__text} text text_type_main-default text_color_inactive`}
              >
                Белки, г
              </p>
            </th>
            <th className={`${styles.table__th}`}>
              <p
                className={`${styles.table__text} text text_type_main-default text_color_inactive`}
              >
                Жиры, г
              </p>
            </th>
            <th className={`${styles.table__th}`}>
              <p
                className={`${styles.table__text} text text_type_main-default text_color_inactive`}
              >
                Углеводы, г
              </p>
            </th>
          </tr>
        </thead>
        <tbody className={`${styles.table__body}`}>
          <tr>
            <td className={`${styles.table__td}`}>
              <p
                className={`${styles.table__text} text text_type_digits-default text_color_inactive`}
              >
                {calories}
              </p>
            </td>
            <td className={`${styles.table__td}`}>
              <p
                className={`${styles.table__text} text text_type_digits-default text_color_inactive`}
              >
                {proteins}
              </p>
            </td>
            <td className={`${styles.table__td}`}>
              <p
                className={`${styles.table__text} text text_type_digits-default text_color_inactive`}
              >
                {fat}
              </p>
            </td>
            <td className={`${styles.table__td}`}>
              <p
                className={`${styles.table__text} text text_type_digits-default text_color_inactive`}
              >
                {carbohydrates}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
