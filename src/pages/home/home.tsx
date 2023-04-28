import { FC } from "react";
import { useSelector } from "../../utils/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

export const Home: FC = () => {
  const { items, itemsRequest, itemsFailed } = useSelector((store) => store.items);

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
