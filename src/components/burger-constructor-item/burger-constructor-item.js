import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";

import styles from "./burger-constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { CONSTRUCTOR_DELETE } from "../../services/actions/constructor";

// RIGHT
const BurgerConstructorItem = (item) => {
  const { id, name, price, image } = item;

  // const items = useSelector(store => store.itemsInConstructor);
  const dispatch = useDispatch();

  const handleDeleteItem = (item) => {
    dispatch({
      type: CONSTRUCTOR_DELETE,
      payload: item
    })
  };

  // dnd – move inside constructor
  const [{ offset, isDrag }, dragTarget] = useDrag({
    type: 'constructorItem',
    item: id,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      offset: monitor.getDifferenceFromInitialOffset()
    })
  });

  // console.log(offset);

  return (
    <li 
      className={`${styles.list__item} ml-3 mr-3 mb-4`} 
      key={id} 
      ref={dragTarget}
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
