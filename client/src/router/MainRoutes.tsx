import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import ProtectedRoute from "./ProtectedRoutes";
import AdminLoginPage from "../modules/admin/pages/AdminLoginPage";
import AdminLayout from "../modules/admin/pages/AdminLayout";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminLearnerManagement from "../modules/admin/pages/AdminLearnerManagement";
import AdminMentorManagement from "../modules/admin/pages/AdminMentorManagement";
import AdminCourseManagement from "../modules/admin/pages/AdminCourseManagement";
import AdminCategoryManagement from "../modules/admin/pages/AdminCategoryManagement";
import AdminLearnerDetails from "../modules/admin/pages/AdminLernerDetails";
import AdminMentorDetails from "../modules/admin/pages/AdminMentorDetails";

import MentorLayout from "../modules/mentor/pages/MentorLayout";
import MentorDashboard from "../modules/mentor/pages/MentorDashboard";
import MentorLoginPage from "../modules/mentor/pages/MentorLoginPage";
import MentorCoursesManagement from "../modules/mentor/pages/MentorCoursesManagement";
import MentorCreateCoursePage from "../modules/mentor/pages/MentorCourseCreationPage";
import MentorOtpPage from "../modules/mentor/pages/MentorOtp";

import LearnerLoginPage from "../modules/learner/pages/LearnerLoginPage";
import LearnerDashboard from "../modules/learner/pages/LearnerDashboard";
import LearnerLayout from "../modules/learner/pages/LearnerLayout";
import LessonsCreatePage from "../modules/mentor/pages/LessonsCreationPage";
import LearnerOtpPage from "../modules/learner/pages/LearnerOtpPage";
import LearnerChangePasswordPage from "../modules/learner/pages/LearnerChangePasswordPage";
import LearnerLandingPage from "../modules/learner/pages/LearnerLandingPage";

import { NotFoundPage, ServerErrorPage } from "../ErrorPage";

const MainRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const routes = [
    /**------------------------Learner routes----------------------- */

    /**------------------------Learner routes Started----------------------- */

    //learner landing page route
    {
      path: "/",
      element: <LearnerLayout />,
      children: [{ path: "/", element: <LearnerLandingPage /> }],
    },

    //learner login page route
    {
      path: "/login",
      element: isAuthenticated ? (
        <Navigate to={user === "learner" ? "/" : `/${user}/dashboard`} />
      ) : (
        <LearnerLoginPage />
      ),
    },

    //learner private routes
    {
      path: "/learner",
      children: [
        //unprotected routes
        {
          path: "auth/:token/change-password",
          element: <LearnerChangePasswordPage />,
        },

        //protected routes
        {
          element: <ProtectedRoute role="learner" />,
          children: [
            //layout not required routes
            { path: "otp", element: <LearnerOtpPage /> },

            //layout required routes
            {
              element: <LearnerLayout />,
              children: [{ path: "dashboard", element: <LearnerDashboard /> }],
            },
          ],
        },
      ],
    },
    /**------------------------Learner routes Ended----------------------- */

    /**------------------------Mentor routes----------------------- */

    /**------------------------Mentor routes Started----------------------- */

    //mentor login page route
    {
      path: "/mentor/login",
      element: isAuthenticated ? (
        <Navigate to={`/${user}/dashboard`} />
      ) : (
        <MentorLoginPage />
      ),
    },

    //mentor private routes
    {
      path: "/mentor",
      children: [
        //unprotected routes
        {
          path: "auth/:token/change-password",
          element: <LearnerChangePasswordPage />,
        },
        //protected routes
        {
          element: <ProtectedRoute role="mentor" />,
          children: [
            //layout not required routes
            { path: "otp", element: <MentorOtpPage /> },

            //layout required routes
            {
              element: <MentorLayout />,
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
          ],
        },
      ],
    },

    /**------------------------Mentor routes Ended----------------------- */

    /**------------------------Admin routes----------------------- */

    /**------------------------Admin routes Started----------------------- */

    //Admin login page route
    {
      path: "/Admin/login",
      element: isAuthenticated ? (
        <Navigate to={`/${user}/dashboard`} />
      ) : (
        <AdminLoginPage />
      ),
    },

    //Admin private routes
    {
      path: "/Admin",
      children: [
        //protected routes
        {
          element: <ProtectedRoute role="admin" />,
          children: [
            //layout required routes
            {
              element: <AdminLayout />,
              children: [
                { path: "dashboard", element: <AdminDashboard /> },
                { path: "learners", element: <AdminLearnerManagement /> },
                {
                  path: "learners/:learnerId",
                  element: <AdminLearnerDetails />,
                },
                { path: "mentors", element: <AdminMentorManagement /> },
                { path: "mentors/:mentorId", element: <AdminMentorDetails /> },
                { path: "courses", element: <AdminCourseManagement /> },
                { path: "categories", element: <AdminCategoryManagement /> },
              ],
            },
          ],
        },
      ],
    },

    /**------------------------Admin routes Ended----------------------- */

    // {
    //   path: "/mentor",
    //   element: <ProtectedRoute role="mentor" />,
    //   children: [
    //     { path: "dashboard", element: <MentorDashboard /> },
    //     { path: "my-courses", element: <MentorCoursesManagement /> },
    //     { path: "courses/create", element: <MentorCreateCoursePage /> },
    //     { path: "courses/:courseId/lessons", element: <LessonsCreatePage /> },
    //   ],
    // },
    // {
    //   path: "/admin",
    //   element: <ProtectedRoute role="admin" />,
    //   children: [
    //     { path: "dashboard", element: <AdminDashboard /> },
    //   ],
    // },
    // {
    //   path: "/admin/login",
    //   element: isAuthenticated ? (
    //     <Navigate to="/admin/dashboard" replace />
    //   ) : (
    //     <AdminLoginPage />
    //   ),
    // },
    { path: "*", element: <NotFoundPage /> },
    { path: "/500", element: <ServerErrorPage /> },
  ];

  const element = useRoutes(routes);
  return element;
};

export default MainRoutes;
