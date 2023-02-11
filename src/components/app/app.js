import React from "react";
import ErrorBoundary from "../../utils/error-boundary";

import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getItems } from "../../services/actions/ingredients";

const App = () => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsFailed } = useSelector(store => store.items);

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            {!itemsRequest && !itemsFailed && (
              <>
                <BurgerIngridients data={items} />
                <BurgerConstructor/>
              </>
            )}
          </main>
        </DndProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
