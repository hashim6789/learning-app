// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the path as needed

interface ProtectedRouteProps {
  requiredRole: string; // The role required to access this route (admin, learner, mentor)
  children?: React.ReactNode; // Optional, in case you pass child elements
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  children,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to={`/${requiredRole}/login`} replace />;
  }

  if (user !== requiredRole) {
    return <Navigate to={`/${requiredRole}/dashboard`} replace />;
  }

  // If the user is authenticated and has the correct role, render the protected content.
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
