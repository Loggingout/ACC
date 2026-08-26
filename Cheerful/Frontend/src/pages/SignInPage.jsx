import { Navigate } from "react-router-dom";
import SignInForm from "../features/account/components/SignInForm";
import { useAuth } from "../hooks/useAuth";

export default function SignInPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (isAuthenticated) return <Navigate to={isAdmin ? "/admin" : "/"} replace />;

  return <SignInForm />;
}
