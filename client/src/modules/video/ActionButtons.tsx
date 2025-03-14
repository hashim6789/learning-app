// import React, { RefObject, useRef } from "react";
// import AudioButton from "./AudioButton";
// import VideoButton from "./VideoButton";
// import HangupButton from "./HangupButton";

// interface ActionButtonsProps {
//   localFeedEl: RefObject<HTMLVideoElement>;
//   remoteFeedEl: RefObject<HTMLVideoElement>;
// }

// const ActionButtons: React.FC<ActionButtonsProps> = ({
//   localFeedEl,
//   remoteFeedEl,
// }) => {
//   const menuButtons = useRef(null);

//   return (
//     <div
//       id="menu-buttons"
//       ref={menuButtons}
//       className="flex justify-between items-center p-4 bg-gray-800 rounded-md"
//     >
//       <div className="flex space-x-4">
//         <AudioButton localFeedEl={localFeedEl} />
//         <VideoButton localFeedEl={localFeedEl} />
//       </div>
//       <div className="flex justify-center">
//         <HangupButton localFeedEl={localFeedEl} remoteFeedEl={remoteFeedEl} />
//       </div>
//     </div>
//   );
// };

// export default ActionButtons;
