import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../../utils/error-boundary";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { checkAuth } from "../../services/actions/auth";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../burger-ingredients/ingredient/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import { ProtectedRoute } from "../protected-route/protected-route";

import {
  NotFound404,
  Registration,
  SignIn,
  ForgotPassword,
  ResetPassword,
  Profile,
  Orders,
  Home,
  Ingredient,
} from "../../pages";

import { getItems } from "../../services/actions/ingredients";

const App = () => {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { name } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const onCloseHandler = () => {
      navigate(-1);
    };

    useEffect(() => {
      if (name.length === 0) {
        dispatch(checkAuth());
      }
      dispatch(getItems());
    }, [name, dispatch]);

    let background = location.state && location.state.background;

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/ingredients/:ingredientId" element={<Ingredient />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal onClose={onCloseHandler} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    );
  };

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <BrowserRouter>
          <ModalSwitch />
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
