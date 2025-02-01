import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LearnerLoginPage from "../modules/learner/pages/LearnerLoginPage";
import LearnerDashboard from "../modules/learner/pages/LearnerDashboard";
import LearnerLayout from "../modules/learner/pages/LearnerLayout";
import LearnerOtpPage from "../modules/learner/pages/LearnerOtpPage";
import LearnerChangePasswordPage from "../modules/learner/pages/LearnerChangePasswordPage";
import LearnerLandingPage from "../modules/learner/pages/LearnerLandingPage";

export const LearnerRoutes = (isAuthenticated: boolean, user: string) => [
  {
    path: "/",
    element:
      user === "learner" ? (
        <LearnerLayout />
      ) : (
        <Navigate to={`/${user}/login`} />
      ),
    children: [{ path: "/", element: <LearnerLandingPage /> }],
  },
  {
    path: "/login",
    element: isAuthenticated ? (
      <Navigate to={user === "learner" ? "/" : `/${user}/dashboard`} />
    ) : (
      <LearnerLoginPage />
    ),
  },
  {
    path: "/learner",
    children: [
      {
        path: "auth/:token/change-password",
        element: <LearnerChangePasswordPage />,
      },
      {
        element: <ProtectedRoute role="learner" />,
        children: [
          { path: "otp", element: <LearnerOtpPage /> },
          {
            element: <LearnerLayout />,
            children: [{ path: "dashboard", element: <LearnerDashboard /> }],
          },
        ],
      },
    ],
  },
];
