import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngridients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import { getItems } from "../../services/actions/ingredients";

import styles from "./home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsFailed } = useSelector((store) => store.items);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.content}>
        {!itemsRequest && !itemsFailed && (
          <>
            <BurgerIngridients data={items} />
            <BurgerConstructor />
          </>
        )}
      </main>
    </DndProvider>
  );
};
