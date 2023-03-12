import React from "react";
import ErrorBoundary from "../../utils/error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";

import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword } from '../../pages';

// import BurgerIngridients from "../burger-ingredients/burger-ingredients";
// import BurgerConstructor from "../burger-constructor/burger-constructor";

// import { getItems } from "../../services/actions/ingredients";

const App = () => {
  // const dispatch = useDispatch();
  // const { items, itemsRequest, itemsFailed } = useSelector(
  //   (store) => store.items
  // );

  // React.useEffect(() => {
  //   dispatch(getItems());
  // }, [dispatch]);

  return (
    <div className="app">
      <ErrorBoundary>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* <Route path="/" element={ } />
            
            <Route path="/profile" element={ } />
            <Route path="/ingredients/:id" element={ } /> */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>

          {/* <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              {!itemsRequest && !itemsFailed && (
                <>
                  <BurgerIngridients data={items} />
                  <BurgerConstructor />
                </>
              )}
            </main>
          </DndProvider> */}
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
