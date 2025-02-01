import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import AdminLoginPage from "../modules/admin/pages/AdminLoginPage";
import AdminLayout from "../modules/admin/pages/AdminLayout";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminLearnerManagement from "../modules/admin/pages/learner/AdminLearnerManagement";
import AdminMentorManagement from "../modules/admin/pages/mentor/AdminMentorManagement";
import AdminCourseManagement from "../modules/admin/pages/course/AdminCourseManagement";
import AdminLearnerDetails from "../modules/admin/pages/learner/AdminLernerDetails";
import AdminMentorDetails from "../modules/admin/pages/mentor/AdminMentorDetails";
import AdminCategoryManagement from "../modules/admin/pages/category/AdminCategoryManagement";

export const AdminRoutes = (isAuthenticated: boolean, user: string) => [
  {
    path: "/admin/login",
    element: isAuthenticated ? (
      <Navigate to={`/${user}/dashboard`} />
    ) : (
      <AdminLoginPage />
    ),
  },
  {
    path: "/admin",
    children: [
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "learners", element: <AdminLearnerManagement /> },
              { path: "learners/:learnerId", element: <AdminLearnerDetails /> },
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
];
