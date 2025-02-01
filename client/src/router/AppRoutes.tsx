import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AdminRoutes } from "./AdminRoutes";
import { MentorRoutes } from "./MentorRoutes";
import { LearnerRoutes } from "./LearnerRoutes";
import { NotFoundPage, ServerErrorPage } from "../ErrorPage";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const routes = [
    ...AdminRoutes(isAuthenticated, user),
    ...MentorRoutes(isAuthenticated, user),
    ...LearnerRoutes(isAuthenticated, user),
    { path: "*", element: <NotFoundPage /> },
    { path: "/500", element: <ServerErrorPage /> },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
