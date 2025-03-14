import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import MentorDashboard from "../modules/mentor/pages/MentorDashboard";
import MentorLogin from "../modules/mentor/pages/MentorLogin";
import MentorOtpPage from "../modules/mentor/pages/MentorOtp";
import MentorChangePasswordPage from "../modules/mentor/pages/MentorChangePasswordPage";
import MentorCoursesManagement from "../modules/mentor/pages/course/MentorCoursesManagement";
import MentorCreateCoursePage from "../modules/mentor/pages/course/CourseForm";
import MentorCourseDetailsPage from "../modules/mentor/pages/course/CourseDetailsPage";
import MentorMaterialManagement from "../modules/mentor/pages/materials/MentorMaterialManagement";
import MentorCreateMaterial from "../modules/mentor/pages/materials/MentorCreateMaterial";
import MentorMaterialDetailPage from "../modules/mentor/pages/materials/MentorMaterialDeatailPage";
import MentorLessonManagement from "../modules/mentor/pages/lesson/MentorLessonManagement";
// import CourseCreationPage from "../modules/mentor/pages/course/CourseDeatailsPage";
import CreateLesson from "../modules/mentor/pages/lesson/CreateLesson";
import MentorLessonDetailsPage from "../modules/mentor/pages/lesson/MentorLessonDetaisPage";
import Layout from "../modules/mentor/pages/Layout";
import MentorProfile from "../modules/mentor/pages/ProfilePage";
import MentorCreateCourse from "../modules/mentor/pages/course/MentorCreateCourse";
// import VideoCallManagement from "../modules/mentor/pages/video/VideoCallManamgemtnt";
import MainChatLayout from "../modules/chat/LearnerChatManagement";
import SlotManager from "../modules/mentor/pages/meetings/MentorMeetingManagement";
// import MainPage from "../modules/video/VideoCallManagement";
// import CallingPage from "../modules/video/CallingPage";
import MentorOfferComponent from "../modules/call/MentorOfferComponent";
// import LobbyScreen from "../modules/call/LobbyScreec";
// import { SocketProvider } from "../context/socketContext";
// import RoomPage from "../modules/call/RoomPage";
import VideoCall from "../modules/call/VideoCallComponent";

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
            // element: <MentorLayout />,
            element: <Layout />,
            children: [
              { path: "dashboard", element: <MentorDashboard /> },
              { path: "profile", element: <MentorProfile /> },

              { path: "my-courses", element: <MentorCoursesManagement /> },
              { path: "courses/create", element: <MentorCreateCourse /> },
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
              // { path: "meetings", element: <VideoCallManagement /> },
              { path: "meetings", element: <SlotManager /> },
              { path: "my-chats", element: <MainChatLayout /> },
              // { path: "video-call", element: <MainPage /> },
              // {
              //   path: "video-call/offer/:roomId",
              //   element: <CallingPage />,
              // },
              {
                path: "lobby/:roomId",
                // element: (
                //   <SocketProvider>
                //     <LobbyScreen role="mentor" />,
                //   </SocketProvider>
                // ),
                element: <VideoCall />,
              },
              // {
              //   path: "room/:roomId",
              //   element: (
              //     <SocketProvider>
              //       <RoomPage />,
              //     </SocketProvider>
              //   ),
              // },
              {
                path: "offer/:roomId",
                element: <MentorOfferComponent role="mentor" />,
              },
            ],
          },
        ],
      },
    ],
  },
];
