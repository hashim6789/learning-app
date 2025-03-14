// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Video, PhoneCall } from "lucide-react";
// import prepForCall from "../../shared/utils/webRTC/callPrepare";
// import socketConnection from "../../shared/utils/webRTC/socketConnection";
// import clientSocketListeners from "../../shared/utils/webRTC/socketListeners";
// import { useVideoCall } from "../../context/videoCallContext";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { sampleMeet } from "../../shared/sample/sampleMeet";
// import { IMeeting } from "../../shared/types/IMeeting";
// import createPeerConnection from "../../shared/utils/webRTC/perrnConnection";

// interface MentorMainPageProps {}

// type CallTypes = "offer" | "answer";

// const MentorMainPage: React.FC<MentorMainPageProps> = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const {
//     callStatus,
//     userName,
//     peerConnection,
//     remoteStream,
//     localStream,
//     updateCallStatus,
//     setLocalStream,
//     setUserName,
//     setConnected,
//     setPeerConnection,
//     setRemoteStream,
//     setOfferData,
//   } = useVideoCall();

//   const [typeOfCall, setTypeOfCall] = useState<CallTypes>("offer");
//   const [joined, setJoined] = useState<boolean>(false);
//   const [meetings, setMeetings] = useState<IMeeting[]>([]);

//   const navigate = useNavigate();

//   // Function to initialize the call
//   const initCall = async (meeting: IMeeting) => {
//     await prepForCall(callStatus, updateCallStatus, setLocalStream);
//     const { peerConnection, remoteStream } = createPeerConnection(
//       userName,
//       "offer"
//     );
//     if (peerConnection && remoteStream) {
//       setPeerConnection(peerConnection);
//       setRemoteStream(remoteStream);
//       const socket = socketConnection(userName, meeting.roomId);
//       socket.emit("startCall", meeting);

//       // Create an offer
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);

//       // Emit the offer
//       socket.emit("newOffer", offer, meeting);
//       setOfferData(offer);

//       navigate(`/video-call/offer/${meeting.roomId}`);
//     } else {
//       console.error("Failed to create peer connection or remote stream");
//     }
//   };

//   useEffect(() => {
//     if (joined) {
//       // Fetch meetings (using the sampleMeet as an example)
//       const fetchedMeetings: IMeeting[] = [sampleMeet];
//       setMeetings(fetchedMeetings);
//       setUserName(userName);
//       const socket = socketConnection(userName, sampleMeet.roomId);
//       socket.on("setup", (data: { connected: boolean }) => {
//         setConnected(data.connected);
//       });
//     }
//   }, [joined]);

//   // useEffect to set socket listeners for newOffer and newAnswer
//   useEffect(() => {
//     if (typeOfCall && peerConnection) {
//       const socket = socketConnection(userName, sampleMeet.roomId);
//       clientSocketListeners(
//         socket,
//         typeOfCall,
//         callStatus,
//         updateCallStatus,
//         peerConnection
//       );
//     }
//   }, [typeOfCall, peerConnection]);

//   if (!joined) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//         <div className="w-96 shadow-2xl bg-white p-6 rounded-lg">
//           <div className="text-center text-2xl font-bold text-blue-800">
//             WebRTC Video Call
//           </div>
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={() => setJoined(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
//             >
//               Join Call Network
//               <Video className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <div className="text-3xl font-bold text-blue-800 flex items-center mb-6">
//           <PhoneCall className="mr-3 text-blue-600" />
//           Welcome, {userName}
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 text-blue-700">Meetings</h2>
//           {meetings.length === 0 ? (
//             <p className="text-gray-500 text-center">No meetings available</p>
//           ) : (
//             meetings.map((meeting) => (
//               <div key={meeting._id} className="mb-4">
//                 <div className="flex justify-between items-center bg-blue-100 p-3 rounded-md shadow-sm">
//                   <div>
//                     <p className="text-lg font-semibold text-blue-700">
//                       Course: {meeting.courseId}
//                     </p>
//                     <p className="text-gray-600">
//                       Learner: {meeting.learnerId}
//                     </p>
//                     <p className="text-gray-600">Room: {meeting.roomId}</p>
//                     <p className="text-gray-600">Slot: {meeting.slotId}</p>
//                   </div>
//                   <button
//                     onClick={() => initCall(meeting)}
//                     className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center space-x-2 py-2 px-4 rounded-md"
//                   >
//                     <PhoneCall />
//                     <span>Start Call</span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorMainPage;
