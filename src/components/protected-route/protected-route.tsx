import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

interface IProtectedRouteProps {
  onlyUnAuth: boolean;
}

export const ProtectedRoute: FC<PropsWithChildren<IProtectedRouteProps>> = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const isAuth: string | undefined = getCookie("token");

  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return <>{children}</>;
};
