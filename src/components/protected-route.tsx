import { useAppSelector } from "@/store";
import type { UserType } from "@/types/user-type";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: UserType[];
  children?: React.ReactNode;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(user.type as UserType)) {
    if (user.type === "sales_agent") {
      return <Navigate to="/my-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
