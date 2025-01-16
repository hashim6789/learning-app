import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  requiredRole,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userRole = user || "learner"; // Replace with actual role from context or state

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to={`/${requiredRole}/login`} replace />;
  }

  if (userRole !== requiredRole) {
    // Redirect to 403 page or home if role mismatch
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
