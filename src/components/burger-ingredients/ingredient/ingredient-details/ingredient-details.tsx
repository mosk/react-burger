import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./ingredient-details.module.css";
import { TIngredient, TStore } from "../../../../types/types";

type TIngredientCurrent = TIngredient | null;

const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();
  const { items } = useSelector((store: TStore) => store.items);
  const [item, setItem] = useState<TIngredientCurrent>(null);

  useEffect(() => {
    if (ingredientId) {
      setItem(items.find((ing: TIngredient) => ing["_id"] === ingredientId));
    }
  }, [ingredientId, items, item]);

  return (
    item && (
      <>
        <img className={`${styles.image} mb-4`} src={item.image_large} alt={item.name} width="480" height="240" />
        <p className="text text_type_main-medium mb-8">{item.name}</p>
        <table className={`${styles.table} mb-5`}>
          <thead className={`${styles.table__header}`}>
            <tr>
              <th className={`${styles.table__th}`}>
                <p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>Калории, ккал</p>
              </th>
              <th className={`${styles.table__th}`}>
                <p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>Белки, г</p>
              </th>
              <th className={`${styles.table__th}`}>
                <p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
              </th>
              <th className={`${styles.table__th}`}>
                <p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
              </th>
            </tr>
          </thead>
          <tbody className={`${styles.table__body}`}>
            <tr>
              <td className={`${styles.table__td}`}>
                <p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
                  {item.calories}
                </p>
              </td>
              <td className={`${styles.table__td}`}>
                <p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
                  {item.proteins}
                </p>
              </td>
              <td className={`${styles.table__td}`}>
                <p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>{item.fat}</p>
              </td>
              <td className={`${styles.table__td}`}>
                <p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
                  {item.carbohydrates}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  );
};

export default IngredientDetails;
