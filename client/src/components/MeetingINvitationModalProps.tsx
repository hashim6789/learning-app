// // MeetingInvitationModal.tsx
// import React from "react";
// import api from "../shared/utils/api";

// interface MeetingInvitationModalProps {
//   course: string;
//   onAccept?: () => void;
//   onDecline?: () => void;
//   role: "learner" | "mentor";
// }

// const MeetingInvitationModal: React.FC<MeetingInvitationModalProps> = ({
//   course,
//   role,
//   onAccept,
//   onDecline,
// }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//         <h2 className="text-lg font-bold text-blue-600 mb-2">
//           {role === "learner" ? "Incoming Meeting Invitation" : "Calling..."}
//         </h2>
//         <p className="text-blue-800 mb-4">
//           {role === "learner" ? (
//             <>
//               {/* {mentor} has invited you to join a meeting for the course {course}. */}
//               You have been invited to join a meeting for the course {course}.
//             </>
//           ) : (
//             <>
//               {/* Calling {learner} for the course {course}. */}
//               Waiting for the learner to accept the invitation for the course{" "}
//               {course}.
//             </>
//           )}
//         </p>
//         <div className="flex justify-between">
//           <button
//             onClick={onDecline}
//             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
//           >
//             {role === "learner" ? "Decline" : "Cancel"}
//           </button>
//           <button
//             onClick={onAccept}
//             className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none"
//           >
//             {role === "learner" ? "Accept" : "End Call"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingInvitationModal;
