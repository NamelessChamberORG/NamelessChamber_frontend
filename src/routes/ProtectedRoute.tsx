import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedUser } from "../features/auth/api/tokenStore";
import { PATHS } from "../constants/path";

const ProtectedRoute = () => {
  const ok = isAuthenticatedUser();

  return ok ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};

export default ProtectedRoute;
