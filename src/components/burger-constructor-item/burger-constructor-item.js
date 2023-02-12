import { useRef } from "react";
import { useDispatch } from "react-redux";
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

// RIGHT
const BurgerConstructorItem = (item) => {
  const { id, name, price, image } = item;

  // const items = useSelector(store => store.itemsInConstructor);
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
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragId = item.id;
      const hoverId = id;

      if (dragId === hoverId) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragId < hoverId && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragId > hoverId && hoverClientY > hoverMiddleY) {
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

  // console.log(offset);

  return (
    <li
      className={`${styles.list__item} ml-3 mr-3 mb-4`}
      key={id}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        extraClass={`${styles.item} ${isDrag && styles.dragged}`}
        handleClose={() => handleDeleteItem(item)}
      />
    </li>
  );
};

export default BurgerConstructorItem;
