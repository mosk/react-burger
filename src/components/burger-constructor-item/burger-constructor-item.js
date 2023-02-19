import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import styles from "./burger-constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
} from "../../services/actions/constructor";

import PropTypes from "prop-types";
import { TYPE_INGREDIENT } from "../../utils/prop-types";

// RIGHT
const BurgerConstructorItem = ({ ingredient }) => {
  const { id, name, price, image } = ingredient;
  const items = useSelector((store) => store.itemsInConstructor);

  const dispatch = useDispatch();

  const handleDeleteItem = (item) => {
    dispatch({
      type: CONSTRUCTOR_DELETE,
      payload: item,
    });
  };

  const ref = useRef(null);

  // dnd – move inside constructor
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
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragId = item.id;
      const hoverId = id;

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
    <li
      className={`${styles.list__item} ml-3 mr-3 mb-4`}
      ref={ref}
      data-handler-id={handlerId}
    >
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

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.shape(TYPE_INGREDIENT).isRequired,
};

export default BurgerConstructorItem;
