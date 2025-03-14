// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useVideoCall } from "../../context/videoCallContext";
// import socketConnection from "../../shared/utils/webRTC/socketConnection";
// import VideoMessageBox from "./VideoMessageBox";
// import ActionButtons from "./ActionButtons";

// const AnswerVideo: React.FC = () => {
//   const {
//     localStream,
//     remoteStream,
//     peerConnection,
//     callStatus,
//     userName,
//     offerData,
//   } = useVideoCall();
//   const remoteFeedEl = useRef<HTMLVideoElement>(null);
//   const localFeedEl = useRef<HTMLVideoElement>(null);
//   const navigate = useNavigate();
//   const [videoMessage, setVideoMessage] = useState(
//     "Please enable video to startttt!"
//   );
//   const [answerCreated, setAnswerCreated] = useState(false);

//   useEffect(() => {
//     if (!localStream) {
//       navigate(`/`);
//     } else {
//       if (remoteFeedEl.current) {
//         remoteFeedEl.current.srcObject = remoteStream;
//       }
//       if (localFeedEl.current) {
//         localFeedEl.current.srcObject = localStream;
//       }
//     }
//   }, [localStream, remoteStream, navigate]);

//   useEffect(() => {
//     if (peerConnection) {
//       peerConnection.ontrack = (e) => {
//         if (e?.streams?.length) {
//           setVideoMessage("");
//         } else {
//           setVideoMessage("Disconnected...");
//         }
//       };
//     }
//   }, [peerConnection]);

//   useEffect(() => {
//     const addOfferAndCreateAnswerAsync = async () => {
//       if (!peerConnection) return;
//       await peerConnection.setRemoteDescription(offerData.offer);
//       const answer = await peerConnection.createAnswer();
//       await peerConnection.setLocalDescription(answer);
//       const copyOfferData = { ...offerData, answer, answerUserName: userName };
//       const socket = socketConnection(userName);
//       const offerIceCandidates = await socket.emitWithAck(
//         "newAnswer",
//         copyOfferData
//       );
//       offerIceCandidates.forEach((c: RTCIceCandidate) => {
//         peerConnection.addIceCandidate(c);
//       });
//       setAnswerCreated(true);
//     };

//     if (!answerCreated && callStatus.videoEnabled) {
//       addOfferAndCreateAnswerAsync();
//     }
//   }, [
//     peerConnection,
//     offerData,
//     callStatus.videoEnabled,
//     answerCreated,
//     userName,
//   ]);

//   return (
//     <div className="flex flex-col items-center p-5">
//       <div className="flex justify-between w-full max-w-4xl space-x-5">
//         <VideoMessageBox message={videoMessage} />
//         <video
//           id="local-feed"
//           ref={localFeedEl}
//           autoPlay
//           controls
//           playsInline
//           className="w-1/2 border-2 border-gray-300 rounded-lg"
//         ></video>
//         <video
//           id="remote-feed"
//           ref={remoteFeedEl}
//           autoPlay
//           controls
//           playsInline
//           className="w-1/2 border-2 border-gray-300 rounded-lg"
//         ></video>
//       </div>
//       <ActionButtons localFeedEl={localFeedEl} remoteFeedEl={remoteFeedEl} />
//     </div>
//   );
// };

// export default AnswerVideo;
