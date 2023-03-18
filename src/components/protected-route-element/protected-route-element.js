import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
  const { name } = useSelector((state) => state.auth);
  const location = useLocation();

  // авторизованые лезут, куда нельзя
  if (onlyUnAuth && name.length > 0) {
    const { from } = location.state || { from: { pathname: "/" } };

    console.log(`авторизованые лезут, куда нельзя`);

    return <Navigate to={from} />;
  }

  // неавторизованые лезут куда нельзя
  if (!onlyUnAuth && name.length === 0) {
    console.log(`неавторизованые лезут, куда нельзя`);
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  // если всё ок
  console.log(`если всё ок`);
  return children;
};
