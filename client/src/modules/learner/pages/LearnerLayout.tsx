import React from "react";
import { Outlet } from "react-router-dom";
// import { io } from "socket.io-client";

import LearnerNavbar from "../components/LearnerNavbar";
import LearnerFooter from "../components/LearnerFooter";
// import MeetingInvitationModal from "../../../components/MeetingINvitationModalProps";

// interface User {
//   id: string;
// }

// interface MeetingInvitation {
//   _id: string;
//   courseId: any;
//   learnerId: string;
//   time: string;
//   roomId: string;
// }

// // Connect to the Socket.io server
// const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
//   upgrade: false,
// });

const LearnerLayout: React.FC = () => {
  // const [meetingInvitation, setMeetingInvitation] =
  //   useState<MeetingInvitation | null>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user: User = JSON.parse(localStorage.getItem("data") ?? "{}");

  //   const handleMeetInvite = (meet: MeetingInvitation) => {
  //     setMeetingInvitation(meet);

  //     const handleJoinMeet = () => {
  //       setMeetingInvitation(null);
  //       console.log("Navigating to meet:", meet.roomId);
  //       // navigate(`/meet/${meet.roomId}`);
  //     };

  //     socket.on(`call:join-${meet.roomId}`, handleJoinMeet);
  //     socket.on(`call:declined-${meet.roomId}`, () =>
  //       setMeetingInvitation(null)
  //     );

  //     return () => {
  //       socket.off(`call:join-${meet.roomId}`, handleJoinMeet);
  //     };
  //   };

  //   socket.on(`call:invite-${user.id}`, handleMeetInvite);

  //   return () => {
  //     socket.off(`call:invite-${user.id}`, handleMeetInvite);
  //   };
  // }, [navigate]);

  // const handleAccept = async () => {
  //   if (meetingInvitation) {
  //     try {
  //       socket.emit("call:accepted", { roomId: meetingInvitation.roomId });
  //     } catch (error) {
  //       console.error("Error accepting call:", error);
  //     }
  //   } else {
  //     console.error("No meeting invitation found");
  //   }
  // };

  // const handleDecline = () => {
  //   if (meetingInvitation) {
  //     socket.emit("call:declined", { roomId: meetingInvitation.roomId });
  //     console.log("Call declined");
  //   } else {
  //     console.error("No meeting invitation found");
  //   }
  // };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <LearnerNavbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>
        <LearnerFooter />
      </div>
      {/* {meetingInvitation && (
        <MeetingInvitationModal
          role="learner"
          course={meetingInvitation.courseId}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )} */}
    </>
  );
};

export default LearnerLayout;
