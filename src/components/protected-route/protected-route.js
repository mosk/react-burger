import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie.js";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const location = useLocation();
  const isAuth = getCookie("token");

  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool,
};
