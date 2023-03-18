import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../../utils/error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { checkAuth } from "../../services/actions/auth";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword, Profile, Home } from "../../pages";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [isAuthChecked, dispatch]);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/profile"
              element={
                <ProtectedRouteElement>
                  <Profile />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRouteElement onlyUnAuth>
                  <SignIn />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteElement onlyUnAuth>
                  <Registration />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement>
                  <ResetPassword />
                </ProtectedRouteElement>
              }
            />

            {/* <Route path="/ingredients/:id" element={ } /> */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
