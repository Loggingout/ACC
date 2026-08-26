// RequireAdmin.jsx — blocks /admin/* routes unless signed in as an admin
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RequireAdmin() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
