// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch, RootState } from "../../../store";
// // import {
// //   connectSocket,
// //   disconnectSocket,
// //   getSocket,
// //   setSocketState,
// //   startMeeting,
// // } from "../../../store/slices/socketSlice";
// import api from "../../../shared/utils/api";
// // import { useSocket } from "../../../context/socketContext";

// interface Meeting {
//   _id: string;
//   email: string;
//   course: string;
//   time: string;
// }

// const meetings: Meeting[] = [
//   {
//     _id: "67bdb1d6000ac9b2a97fd13c",
//     email: "hashimhashi774@gmail.com",
//     course: "React Basics",
//     time: "10:00 AM",
//   },
//   {
//     _id: "67bdb1d6000ac9b2a97fd13d",
//     email: "hashimhashi774@gmail.com",
//     course: "Advanced Node.js",
//     time: "11:00 AM",
//   },
//   // Add more meetings as needed
// ];

// // const generateRoomId = () => {
// //   const roomId =
// // }

// const MeetingList: React.FC = () => {
//   const navigate = useNavigate();
//   // const [selectedLearner, setSelectedLearner] = useState<string | null>(null);
//   // const { isConnected } = useSelector((state: RootState) => state.socket);
//   // const dispatch = useDispatch<AppDispatch>();

//   const handleJoinRoom = useCallback(
//     (data: { roomId: string; email: string }) => {
//       console.log("Joining Room", data.roomId);
//       const { email, roomId } = data;
//       navigate(`/room/${roomId}`);
//     },
//     [navigate]
//   );

//   // useEffect(() => {
//   //   dispatch(connectSocket());

//   //   // Cleanup socket connection on unmount
//   //   return () => {
//   //     dispatch(disconnectSocket());
//   //   };
//   // }, [dispatch]);

//   // useEffect(() => {
//   //   if (isConnected) {
//   //     const socket = getSocket();

//   //     if (socket) {
//   //       socket.on("connect", () => {
//   //         dispatch(setSocketState(true));
//   //         console.log("Connected to socket server");
//   //       });

//   //       socket.on("disconnect", () => {
//   //         dispatch(setSocketState(false));
//   //         console.log("Disconnected from socket server");
//   //       });

//   //       return () => {
//   //         socket.disconnect();
//   //       };
//   //     }
//   //   }
//   // }, [dispatch, isConnected]);

//   const startVideoCall = useCallback(async (meetId: string) => {
//     const response = await api.get(`/api/meets/${meetId}/start`);
//     if (response && response.status === 200) {
//       console.log("call started...");
//     }
//   }, []);

//   const handleStartClick = (email: string) => {
//     startVideoCall(email);
//   };
//   return (
//     <div className="p-6 bg-blue-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-blue-600 mb-4">
//         Scheduled Meetings
//       </h1>
//       <ul className="space-y-4">
//         {meetings.map((meeting) => (
//           <li
//             key={meeting._id}
//             className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
//           >
//             <div>
//               <h2 className="text-lg font-semibold text-blue-800">
//                 {meeting.email}
//               </h2>
//               <p className="text-blue-700">{meeting.course}</p>
//               <p className="text-blue-600">{meeting.time}</p>
//             </div>
//             <button
//               onClick={() => {
//                 handleStartClick(meeting._id);
//               }}
//               className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
//             >
//               Start
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MeetingList;
