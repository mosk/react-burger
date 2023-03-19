import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../../utils/prop-types";

const Ingredient = ({ data }) => {
  const items = useSelector((store) => store.itemsInConstructor);

  const getIngAmount = useMemo(() => {
    const ingAll = [items.bun, items.bun, ...items.ingredients];
    let ingCurrent = [];

    if (ingAll.length > 0 && ingAll[0] !== null) {
      ingCurrent = ingAll.filter((ing) => ing._id === data._id);
    }

    return ingCurrent.length;
  }, [items, data]);

  // dnd
  const [{ isDrag }, dragRef] = useDrag({
    type: data.type,
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className={`${styles.wrapper} ${isDrag ? styles.dragged : ""}`}>
      <img src={data.image} alt={data.name} className={`${styles.image} mb-1`} />
      <h3 className={`${styles.name} text text_type_main-small`}>{data.name}</h3>
      <p className={styles.price}>
        <span className="text text_type_digits-default">{data.price}&nbsp;</span>
        <CurrencyIcon type="primary" />
      </p>
      {getIngAmount > 0 && (
        <div className={`${styles.amount} mb-1`}>
          <span className="visually-hidden">Количество: </span>
          <Counter count={getIngAmount} size="default" extraClass="m-1" />
        </div>
      )}
    </div>
  );
};

Ingredient.propTypes = {
  data: PropTypes.oneOfType([PropTypes.shape(TYPE_INGREDIENT).isRequired, PropTypes.object]).isRequired,
};

export default Ingredient;
