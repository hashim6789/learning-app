// import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import { Video, PhoneCall, PhoneOff } from "lucide-react";

// import prepForCall from "../../shared/utils/webRTC/callPrepare";

// import socketConnection from "../../shared/utils/webRTC/socketConnection";
// import createPeerConnection from "../../shared/utils/webRTC/perrnConnection";
// import clientSocketListeners from "../../shared/utils/webRTC/socketListeners";
// import { useVideoCall } from "../../context/videoCallContext";
// import { Socket } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// interface MainPageProps {}
// type CallTypes = "offer" | "answer";

// const MainPage: React.FC<MainPageProps> = () => {
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
//   const [availableCalls, setAvailableCalls] = useState<any[]>([]);

//   const navigate = useNavigate();

//   // called on "Call" or "Answer"
//   const initCall = async (typeOfCall: CallTypes) => {
//     await prepForCall(callStatus, updateCallStatus, setLocalStream);
//     setTypeOfCall(typeOfCall);
//     console.log("call type =", typeOfCall, localStream);
//   };

//   // useEffect(() => {
//   //   const test = async () => {
//   //     const socket = socketConnection("test");
//   //   };
//   //   test();
//   // }, []);
//   let socket: Socket;

//   useEffect(() => {
//     if (joined) {
//       setUserName(userName);
//       const setCalls = (data: any) => {
//         console.log("calling");
//         setAvailableCalls(data);
//         console.log(data);
//       };

//       const isConnected = (data: { connected: boolean }) => {
//         setConnected(data.connected);
//       };
//       socket = socketConnection(userName);
//       socket.on("setup", isConnected);
//       socket.on("availableOffers", setCalls);
//       socket.on("newOfferWaiting", setCalls);
//     }
//   }, [joined]);

//   useEffect(() => {
//     if (callStatus.haveMedia && !peerConnection) {
//       const { peerConnection, remoteStream } = createPeerConnection(
//         userName,
//         typeOfCall
//       );
//       console.log("callStatus", peerConnection, remoteStream);
//       if (peerConnection && remoteStream) {
//         setPeerConnection(peerConnection);
//         setRemoteStream(remoteStream);
//       }
//     }
//   }, [callStatus.haveMedia]);

//   useEffect(() => {
//     if (typeOfCall && peerConnection) {
//       const socket = socketConnection(userName);
//       clientSocketListeners(
//         socket,
//         typeOfCall,
//         callStatus,
//         updateCallStatus,
//         peerConnection
//       );
//     }
//   }, [typeOfCall, peerConnection]);

//   useEffect(() => {
//     if (remoteStream && peerConnection) {
//       // navigate(`/${typeOfCall}?token=${Math.random()}`);
//       const roomId = "123456";
//       navigate(`/${user}/video-call/${typeOfCall}/${roomId}`);
//     }
//   }, [remoteStream, peerConnection]);

//   const call = async () => {
//     initCall("offer");
//   };

//   const answer = (callData: any) => {
//     initCall("answer");
//     setOfferData(callData);
//   };

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
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-blue-700">
//               Initiate a Call
//             </h2>
//             <button
//               onClick={call}
//               className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center space-x-2 py-3 rounded-md"
//             >
//               <PhoneCall />
//               <span>Start Call</span>
//             </button>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-blue-700">
//               Available Calls
//             </h2>
//             {availableCalls.length === 0 ? (
//               <p className="text-gray-500 text-center">No calls available</p>
//             ) : (
//               availableCalls.map((callData, i) => (
//                 <button
//                   key={i}
//                   onClick={() => answer(callData)}
//                   className="w-full mb-2 bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center space-x-2 py-3 rounded-md"
//                 >
//                   <PhoneOff />
//                   <span>Answer Call from {callData.offererUserName}</span>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;
