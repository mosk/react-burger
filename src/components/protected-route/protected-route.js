import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const { name } = useSelector((state) => state.auth);
  const location = useLocation();

  if (onlyUnAuth && name.length > 0) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && name.length === 0) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool,
};
