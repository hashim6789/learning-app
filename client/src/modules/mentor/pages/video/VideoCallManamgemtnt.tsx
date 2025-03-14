// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../store";
// import {
//   setConnected,
//   setLocalStream,
//   setPeerConnection,
//   setRemoteStream,
// } from "../../../../store/slices/videoCallSlice";
// import { Video, Mic, PhoneOff, Monitor, Share2, Settings } from "lucide-react";
// import { Socket } from "socket.io-client";

// interface VideoCallManagementProps {}

// function generateUniqueId() {
//   return crypto.getRandomValues(new Uint32Array(4)).join("-");
// }

// // Example usage
// // const uniqueId = generateUniqueId();
// // console.log(uniqueId);

// const VideoCallManagement: React.FC<VideoCallManagementProps> = ({}) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { localStream, remoteStream, connected } = useSelector(
//     (state: RootState) => state.videoCall
//   );
//   // const handleMeeting = () => {
//   //   const peerConnection = new RTCPeerConnection();
//   // };
//   const openMediaDevices = async (constraints: MediaStreamConstraints) => {
//     return await navigator.mediaDevices.getUserMedia(constraints);
//   };

//   useEffect(() => {
//     // Initialize peer connection

//     const handleMeeting = async () => {
//       try {
//         // Get local media stream
//         // navigator.mediaDevices
//         //   .getUserMedia({ video: true, audio: true })
//         //   .then((stream) => {
//         //     dispatch(setLocalStream(stream));
//         //     stream.getTracks().forEach((track) => {
//         //       peerConnection.addTrack(track, stream);
//         //     });
//         //   });

//         // Get local media stream
//         const stream = await openMediaDevices({ video: true, audio: true });
//         console.log("Got MediaStream:", stream);

//         dispatch(setLocalStream(stream));

//         stream.getTracks().forEach((track) => {
//           peerConnection.addTrack(track, stream);
//         });

//         // Get remote media stream
//         peerConnection.ontrack = (event) => {
//           const remoteStream = new MediaStream();
//           event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track);
//           });
//           dispatch(setRemoteStream(remoteStream));
//           dispatch(setConnected(true));
//         };

//         dispatch(setPeerConnection(peerConnection));
//       } catch (error) {
//         console.error("Error accessing media devices.", error);
//       }
//     };

//     const peerConnection = new RTCPeerConnection();
//     handleMeeting();
//   }, [dispatch]);

//   useEffect(() => {

//     Socket
// })

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//             <h1 className="text-xl font-semibold">Version Control System</h1>
//           </div>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <Settings className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Video Area */}
//           <div className="lg:col-span-2">
//             <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
//               {/* Main Video */}
//               <video
//                 autoPlay
//                 playsInline
//                 className="w-full h-full object-cover"
//                 ref={(video) => {
//                   if (video && localStream) {
//                     video.srcObject = localStream;
//                   }
//                 }}
//               />
//               {/* Small Preview Video */}
//               {connected && (
//                 <div className="absolute top-4 right-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-800 rounded-lg overflow-hidden">
//                   <video
//                     autoPlay
//                     playsInline
//                     className="w-full h-full object-cover"
//                     ref={(video) => {
//                       if (video && remoteStream) {
//                         video.srcObject = remoteStream;
//                       }
//                     }}
//                   />
//                 </div>
//               )}

//               {/* Video Controls */}
//               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
//                 <div className="flex justify-center space-x-4">
//                   <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
//                     <Video className="w-6 h-6" />
//                   </button>
//                   <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
//                     <Mic className="w-6 h-6" />
//                   </button>
//                   <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white">
//                     <PhoneOff className="w-6 h-6" />
//                   </button>
//                   <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
//                     <Monitor className="w-6 h-6" />
//                   </button>
//                   <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
//                     <Share2 className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Course Content Sidebar */}
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold mb-2">Course Contents</h2>
//               <div className="text-sm text-gray-600">2/5 COMPLETED</div>
//             </div>

//             <div className="space-y-4">
//               {/* {courseContents.map((section, index) => (
//               <div key={index} className="border-b border-gray-100 pb-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-600">{section.duration}</span>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-gray-600">
//                       {section.lessons} Lessons
//                     </span>
//                   </div>
//                   {section.completed && (
//                     <span className="text-green-500 text-sm">Completed</span>
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-medium">{section.title}</h3>
//                   {section.locked && (
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))} */}
//             </div>

//             {/* Chat Box */}
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-4">Chat Box</h2>
//               <div className="h-32 bg-gray-50 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCallManagement;
