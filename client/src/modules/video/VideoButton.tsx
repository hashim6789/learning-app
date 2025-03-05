import React, { RefObject } from "react";
import { useVideoCall } from "../../context/videoCallContext";

interface VideoButtonProps {
  localFeedEl: RefObject<HTMLVideoElement>;
}

const VideoButton: React.FC<VideoButtonProps> = ({ localFeedEl }) => {
  const { callStatus, updateCallStatus, localStream, peerConnection } =
    useVideoCall();

  const startStopVideo = () => {
    if (!localStream || !peerConnection) return;
    const copyCallStatus = { ...callStatus };
    if (copyCallStatus.videoEnabled) {
      copyCallStatus.videoEnabled = false;
      updateCallStatus(copyCallStatus);
      const tracks = localStream.getVideoTracks();
      tracks.forEach((track) => (track.enabled = false));
    } else if (copyCallStatus.videoEnabled === false) {
      copyCallStatus.videoEnabled = true;
      updateCallStatus(copyCallStatus);
      const tracks = localStream.getVideoTracks();
      tracks.forEach((track) => (track.enabled = true));
    } else if (copyCallStatus.videoEnabled === null) {
      copyCallStatus.videoEnabled = true;
      updateCallStatus(copyCallStatus);
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={startStopVideo}
      >
        <i
          className={`fa ${
            callStatus.video === "enabled" ? "fa-video-slash" : "fa-video"
          }`}
        ></i>
      </button>
      <div className="mt-2 text-sm text-white">
        {callStatus.video === "enabled" ? "Stop" : "Start"} Video
      </div>
    </div>
  );
};

export default VideoButton;
