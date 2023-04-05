import { FC } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";
import { TStore } from "../../types/types";

export const Home: FC = () => {
  const { items, itemsRequest, itemsFailed } = useSelector((store: TStore) => store.items);

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
