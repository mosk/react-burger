import React from "react";
import ErrorBoundary from "../../utils/error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";

import { NotFound404, Registration, SignIn, ForgotPassword, ResetPassword, Profile, Home } from "../../pages";

const App = () => {
  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />

            {/* <Route path="/ingredients/:id" element={ } /> */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
