import { Navigate, Outlet } from "react-router-dom";
import { getCurrentIdentity } from "../features/auth/api/tokenStore";
import { PATHS } from "../constants/path";

const ProtectedRoute = () => {
  const identity = getCurrentIdentity();
  const ok = !!identity && identity.role !== "ANONYMOUS";

  return ok ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};

export default ProtectedRoute;
