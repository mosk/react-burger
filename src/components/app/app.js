import React from 'react';
import styles from './app.module.css';

import ErrorBoundary from '../../utils/error-boundary';

import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import getDataFromApi from '../../utils/burger-api';

const App = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const getIngredients = async (dataName = `ingredients`) => {
      setLoading(true);
      setIngredients([]);

      const newIngredients = await getDataFromApi(dataName);

      setIngredients(newIngredients);
      setLoading(false);
    }

    getIngredients();
  }, []);

  return (
    <div className="App">
      <ErrorBoundary>
        <AppHeader />
        <main className={styles.main}>
          { !isLoading && (
            <>
              <BurgerIngridients data={ingredients} />
              <BurgerConstructor data={ingredients} />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;