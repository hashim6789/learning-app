import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import MentorLayout from "../modules/mentor/pages/MentorLayout";
import MentorDashboard from "../modules/mentor/pages/MentorDashboard";
import MentorLogin from "../modules/mentor/pages/MentorLogin";
import MentorOtpPage from "../modules/mentor/pages/MentorOtp";
import MentorChangePasswordPage from "../modules/mentor/pages/MentorChangePasswordPage";
import MentorCoursesManagement from "../modules/mentor/pages/course/MentorCoursesManagement";
import MentorCreateCoursePage from "../modules/mentor/pages/course/MentorCourseCreationPage";
import MentorCourseDetailsPage from "../modules/mentor/pages/course/CourseDetailsPage";
import MentorMaterialManagement from "../modules/mentor/pages/materials/MentorMaterialManagement";
import MentorCreateMaterial from "../modules/mentor/pages/materials/MentorCreateMaterial";
import MentorMaterialDetailPage from "../modules/mentor/pages/materials/MentorMaterialDeatailPage";
import MentorLessonManagement from "../modules/mentor/pages/lesson/MentorLessonManagement";
import MentorLessonCreation from "../modules/mentor/pages/lesson/MentorLessonCreationPage";
import CreateLesson from "../modules/mentor/pages/lesson/CreateLesson";
import MentorLessonDetailsPage from "../modules/mentor/pages/lesson/MentorLessonDetaisPage";

export const MentorRoutes = (isAuthenticated: boolean, user: string) => [
  {
    path: "/mentor/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <MentorLogin />
    ),
  },
  {
    path: "/mentor",
    children: [
      {
        path: "auth/:token/change-password",
        element: <MentorChangePasswordPage />,
      },
      {
        element: <ProtectedRoute role="mentor" />,
        children: [
          { path: "otp", element: <MentorOtpPage /> },
          {
            element: <MentorLayout />,
            children: [
              { path: "dashboard", element: <MentorDashboard /> },
              { path: "my-courses", element: <MentorCoursesManagement /> },
              { path: "courses/create", element: <MentorCreateCoursePage /> },
              {
                path: "courses/:courseId/",
                element: <MentorCourseDetailsPage />,
              },
              { path: "my-materials", element: <MentorMaterialManagement /> },
              {
                path: "my-materials/create",
                element: <MentorCreateMaterial />,
              },
              {
                path: "my-materials/:materialId",
                element: <MentorMaterialDetailPage />,
              },
              { path: "my-lessons", element: <MentorLessonManagement /> },
              { path: "my-lessons/create", element: <CreateLesson /> },
              {
                path: "my-lessons/:lessonId",
                element: <MentorLessonDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
