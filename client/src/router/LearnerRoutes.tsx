import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LearnerLoginPage from "../modules/learner/pages/LearnerLoginPage";
import LearnerDashboard from "../modules/learner/pages/LearnerDashboard";
import LearnerLayout from "../modules/learner/pages/LearnerLayout";
import LearnerOtpPage from "../modules/learner/pages/LearnerOtpPage";
import LearnerChangePasswordPage from "../modules/learner/pages/LearnerChangePasswordPage";
import LearnerLandingPage from "../modules/learner/pages/LearnerLandingPage";
import CourseDetails from "../modules/learner/pages/course/CourseDetailPage";
import LearnerCoursesPage from "../modules/learner/pages/course/LearnerCoursesPage";

import { loadStripe } from "@stripe/stripe-js";
import { config } from "../shared/configs/config";
import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "../components/CheckoutForm";
import SubscriptionCheckout from "../modules/learner/pages/payment/SubscriptionCheckout";
import WrappedCourseCheckout from "../modules/learner/pages/payment/CourseCheckoutPage";
// const stripePromise = loadStripe(config.VITE_STRIPE_PK);
import PaymentSuccess from "../modules/learner/pages/payment/PaymentSuccess";
import SubscriptionSuccess from "../modules/learner/pages/payment/SubscriptionSuccessPage";
import LearnerProfile from "../modules/learner/pages/LearnerProfile";
import MyLearningsPage from "../modules/learner/pages/MyLearningsPage";
import LearningCoursePage from "../modules/learner/pages/learnings/LearningCoursePage";
import MaterialContent from "../modules/learner/components/learnings/MaterialContent";
import CourseGroupChat from "../modules/learner/pages/chat/LearnerChatManagement";
import VideoCallPage from "../modules/learner/pages/video/VideoCallPage";
// import { SocketProvider } from "../context/socketContext";
import MainChatLayout from "../modules/chat/LearnerChatManagement";
// import MainPage from "../modules/video/VideoCallManagement";
// import { VideoCallProvider } from "../context/videoCallContext";
// import CallingPage from "../modules/video/CallingPage";
// import AnswerVideo from "../modules/video/AnsweringPage";
import LearnerMeetingScheduling from "../modules/learner/pages/meeting/LearenrMeetingScheduling";
import LearnerAnswerComponent from "../modules/call/LearnerAnswerComponent";
import MentorOfferComponent from "../modules/call/MentorOfferComponent";
// import LobbyScreen from "../modules/call/LobbyScreec";
// import RoomPage from "../modules/call/RoomPage";
import VideoCall from "../modules/call/VideoCallComponent";

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
        path: "courses",
        element: <LearnerLayout />,
        children: [
          { path: "", element: <LearnerCoursesPage /> },
          { path: ":courseId", element: <CourseDetails /> },
        ],
      },
      {
        element: <ProtectedRoute role="learner" />,
        children: [
          { path: "otp", element: <LearnerOtpPage /> },
          {
            element: <LearnerLayout />,
            children: [
              { path: "dashboard", element: <LearnerDashboard /> },
              { path: "profile", element: <LearnerProfile /> },
              {
                path: "checkout/:courseId",
                element: <WrappedCourseCheckout />,
              },
              {
                path: "subscription-plans",
                element: <SubscriptionCheckout />,
              },
              {
                path: "payment-success/:purchaseId",
                element: <PaymentSuccess />,
              },
              {
                path: "subscription-success/:subscriptionId",
                element: <SubscriptionSuccess />,
              },
              {
                path: "my-learnings",
                element: <MyLearningsPage />,
                children: [],
              },
              {
                path: "my-learnings/:progressId",
                element: <LearningCoursePage />,
              },

              {
                path: "chat",
                element: (
                  // <SocketProvider>
                  <MainChatLayout />
                  // </SocketProvider>
                ),
              },
              {
                path: "meets/:mentorId/:courseId",
                element: <LearnerMeetingScheduling />,
              },
              // { path: "video-call", element: <VideoCallPage /> },
              // {
              //   path: "video-call",
              //   element: <MainPage />,
              // },
              // {
              //   path: "video-call/answer/:roomId",
              //   element: <AnswerVideo />,
              // },

              {
                path: "lobby/:roomId",
                element: <VideoCall />,
                // element: (
                //   <SocketProvider>
                //     <LobbyScreen role="learner" />,
                //   </SocketProvider>
                // ),
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
                path: "answer/:roomId",
                element: <MentorOfferComponent role="learner" />,
              },
              // { path: "answer/:roomId", element: <LearnerAnswerComponent /> },
            ],
          },
        ],
      },
    ],
  },
];
