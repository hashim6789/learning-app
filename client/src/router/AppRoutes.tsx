import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import AdminLoginPage from "../modules/admin/pages/AdminLoginPage";
// import LearnerLoginPage from "../modules/learner/pages/LearnerLoginPage";
// import MentorLoginPage from "../modules/mentor/pages/MentorLoginPage";
import AdminLayout from "../modules/admin/pages/AdminLayout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminLearnerManagement from "../modules/admin/pages/AdminLearnerManagement";
import AdminMentorManagement from "../modules/admin/pages/AdminMentorManagement";
import AdminCourseManagement from "../modules/admin/pages/AdminCourseManagement";
import AdminCategoryManagement from "../modules/admin/pages/AdminCategoryManagement";
import AdminLearnerDetails from "../modules/admin/pages/AdminLernerDetails";
import AdminMentorDetails from "../modules/admin/pages/AdminMentorDetails";

//mentor module
import MentorLayout from "../modules/mentor/pages/MentorLayout";
import MentorDashboard from "../modules/mentor/pages/MentorDashboard";
import MentorLoginPage from "../modules/mentor/pages/MentorLoginPage";
import MentorCoursesManagement from "../modules/mentor/pages/MentorCoursesManagement";
import MentorCreateCoursePage from "../modules/mentor/pages/MentorCourseCreationPage";

//learner module
import LearnerLoginPage from "../modules/learner/pages/LearnerLoginPage";
import LearnerDashboard from "../modules/learner/pages/LearnerDashboard";
import LearnerLayout from "../modules/learner/pages/LearnerLayout";
import LessonsCreatePage from "../modules/mentor/pages/LessonsCreationPage";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const routes = [
    // Admin Routes
    {
      path: "/admin",
      element:
        isAuthenticated && user === "admin" ? (
          <AdminLayout />
        ) : isAuthenticated ? (
          <Navigate to={`/${user}/dashboard`} replace />
        ) : (
          <Navigate to="/admin/login" replace />
        ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "learners", element: <AdminLearnerManagement /> },
        { path: "learners/:learnerId", element: <AdminLearnerDetails /> },
        { path: "mentors", element: <AdminMentorManagement /> },
        { path: "mentors/:mentorId", element: <AdminMentorDetails /> },
        { path: "courses", element: <AdminCourseManagement /> },
        { path: "courses", element: <AdminCourseManagement /> },
        { path: "categories", element: <AdminCategoryManagement /> },
        // Add other admin pages here
      ],
    },
    {
      path: "/admin/login",
      element: !isAuthenticated ? (
        <AdminLoginPage />
      ) : (
        <Navigate to="/admin/dashboard" replace />
      ),
    },

    // Learner Routes
    {
      path: "/learner",
      element:
        isAuthenticated && user === "learner" ? (
          <LearnerLayout />
        ) : isAuthenticated ? (
          <Navigate to={`/${user}/dashboard`} replace />
        ) : (
          <Navigate to="/learner/login" replace />
        ),
      children: [
        { path: "dashboard", element: <LearnerDashboard /> },
        // Add other learner pages here
      ],
    },
    {
      path: "/learner/login",
      element: !isAuthenticated ? (
        <LearnerLoginPage />
      ) : (
        <Navigate to="/learner/dashboard" replace />
      ),
    },

    // // Mentor Routes
    {
      path: "/mentor",
      element:
        isAuthenticated && user === "mentor" ? (
          <MentorLayout />
        ) : isAuthenticated ? (
          <Navigate to={`/${user}/dashboard`} replace />
        ) : (
          <Navigate to={`/${user}/login`} replace />
        ),
      children: [
        { path: "dashboard", element: <MentorDashboard /> },
        { path: "my-courses", element: <MentorCoursesManagement /> },
        { path: "courses/create", element: <MentorCreateCoursePage /> },
        {
          path: "courses/:courseId/lessons",
          element: <LessonsCreatePage />,
        },
      ],
    },
    {
      path: "/mentor/login",
      element: !isAuthenticated ? (
        <MentorLoginPage />
      ) : (
        <Navigate to="/mentor/dashboard" replace />
      ),
    },
  ];

  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
