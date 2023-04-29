import { useEffect } from "react";
import { useDispatch } from "../../utils/hooks";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ErrorBoundary from "../../utils/error-boundary";

import { checkAuth } from "../../services/actions/auth";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../burger-ingredients/ingredient/ingredient-details/ingredient-details";
import OrderInfo from "../order-info/order-info";
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
  Order,
  Feed,
} from "../../pages";

import { getItems } from "../../services/actions/ingredients";
import { ROUTES_LIST } from "../../utils/routes";

const App = () => {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const background = location.state && location.state.background;

    const onCloseHandler = () => {
      navigate(-1);
    };

    useEffect(() => {
      dispatch(checkAuth());
      dispatch(getItems());
    }, [dispatch]);

    return (
      <>
        <AppHeader />

        <Routes location={background || location}>
          <Route path={ROUTES_LIST.home} element={<Home />} />
          <Route path={ROUTES_LIST.feed} element={<Feed />} />
          <Route path={ROUTES_LIST.notFound} element={<NotFound404 />} />
          <Route path={`${ROUTES_LIST.ingredients}/:ingredientId`} element={<Ingredient />} />
          <Route
            path={ROUTES_LIST.profile}
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES_LIST.profile}${ROUTES_LIST.orders}`}
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES_LIST.profile}${ROUTES_LIST.orders}/:orderId`}
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path={`${ROUTES_LIST.feed}/:orderId`} element={<Order />} />
          <Route
            path={ROUTES_LIST.login}
            element={
              <ProtectedRoute onlyUnAuth>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES_LIST.register}
            element={
              <ProtectedRoute onlyUnAuth>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES_LIST.passwordForgot}
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES_LIST.passwordReset}
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route
              path={`${ROUTES_LIST.ingredients}/:ingredientId`}
              element={
                <Modal onClose={onCloseHandler} title="Детали ингредиента" hideTitle={false}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={`${ROUTES_LIST.profile}${ROUTES_LIST.orders}/:orderId`}
              element={
                <Modal onClose={onCloseHandler} title="Детали заказа" hideTitle={true}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path={`${ROUTES_LIST.feed}/:orderId`}
              element={
                <Modal onClose={onCloseHandler} title="Детали заказа" hideTitle={true}>
                  <OrderInfo />
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
