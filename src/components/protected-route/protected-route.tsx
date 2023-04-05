import { FC, PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

interface IProtectedRouteProps {
  onlyUnAuth: boolean;
}

export const ProtectedRoute: FC<PropsWithChildren<IProtectedRouteProps>> = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth: string | undefined = getCookie("token");

  if (onlyUnAuth && isAuth) {
    navigate(-1);
  }

  if (!onlyUnAuth && !isAuth) {
    navigate("/login", { state: { from: location } });
  }

  return <>{children}</>;
};
