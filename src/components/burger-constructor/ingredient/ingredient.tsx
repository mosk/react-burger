import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import styles from "./ingredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER } from "../../../services/actions/constructor";

import { TIngredient } from "../../../types/types";

interface IIngredientProps {
  ingredient: TIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
  const { id, name, price, image } = ingredient;

  const dispatch = useDispatch();

  const handleDeleteItem = (item: TIngredient): void => {
    dispatch({
      type: CONSTRUCTOR_DELETE,
      payload: item,
    });
  };

  const ref = useRef(null);

  const [{ isDrag }, drag] = useDrag({
    type: "SORT_ITEM",
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "SORT_ITEM",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragId: string | unknown = item.id;
      const hoverId: string | unknown = id;

      if (dragId === hoverId) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_REORDER,
        payload: {
          from: dragId,
          to: hoverId,
        },
      });

      item.id = hoverId;
    },
  });

  drag(drop(ref));

  return (
    <li className={`${styles.list__item} ml-3 mr-3 mb-4`} ref={ref} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        extraClass={`${styles.item} ${isDrag && styles.dragged}`}
        handleClose={() => handleDeleteItem(ingredient)}
      />
    </li>
  );
};

export default Ingredient;
