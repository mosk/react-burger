import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./app.module.css";

import ErrorBoundary from "../../utils/error-boundary";

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
        <main className={styles.main}>
          {!itemsRequest && !itemsFailed && (
            <>
              <BurgerIngridients data={items} />
              <BurgerConstructor data={items} />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
