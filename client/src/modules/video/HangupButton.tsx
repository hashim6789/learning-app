// import React, { RefObject } from "react";
// import { useVideoCall } from "../../context/videoCallContext";

// interface HangupButtonProps {
//   localFeedEl: RefObject<HTMLVideoElement>;
//   remoteFeedEl: RefObject<HTMLVideoElement>;
// }

// const HangupButton: React.FC<HangupButtonProps> = ({
//   localFeedEl,
//   remoteFeedEl,
// }) => {
//   const { callStatus, peerConnection } = useVideoCall();

//   const hangupCall = () => {
//     if (peerConnection && localFeedEl.current && remoteFeedEl.current) {
//       const copyCallStatus = { ...callStatus };
//       copyCallStatus.current = "complete";
//       peerConnection.close();
//       peerConnection.onicecandidate = null;
//       peerConnection.ontrack = null;
//       if (localFeedEl.current) localFeedEl.current.srcObject = null;
//       if (remoteFeedEl.current) remoteFeedEl.current.srcObject = null;
//     }
//   };

//   if (callStatus.current === "complete") {
//     return null;
//   }

//   return (
//     <button
//       onClick={hangupCall}
//       className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
//     >
//       Hang Up
//     </button>
//   );
// };

// export default HangupButton;
